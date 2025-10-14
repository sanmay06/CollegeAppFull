import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { ThemeContext } from '@/hooks/ThemeProvider';
import { timeToMinutes, minutesToTime } from '@/utils/timeUtils';

// Match the TimeTable component constants
const TIME_BLOCK_WIDTH = 100;
const MIN_DURATION = 30;
const MAX_DURATION = 180;
const MAX_TIMETABLE_END = 17 * 60; // 5:00 PM in minutes

// Enhanced helper function for cascading time updates with pushing
const updateCascadingCellsWithPush = (currentEndTime, currentIndex, cells, currentStartTime) => {
  const currentEndMins = timeToMinutes(currentEndTime);
  const currentStartMins = timeToMinutes(currentStartTime);
  const expansionAmount = currentEndMins - timeToMinutes(cells[currentIndex].et);
  
  // If we're shrinking, just update the immediate next cell
  if (expansionAmount <= 0) {
    return updateNextCellOnly(currentEndTime, currentIndex, cells, currentStartTime);
  }
  
  // If we're expanding, push all subsequent cells forward
  const updatedCells = [...cells];
  
  // Find all cells that come after the current cell chronologically
  const subsequentCells = cells
    .map((cell, idx) => ({ ...cell, originalIndex: idx }))
    .filter((cell, idx) => idx !== currentIndex && timeToMinutes(cell.st) >= currentStartMins)
    .sort((a, b) => timeToMinutes(a.st) - timeToMinutes(b.st));
  
  // Push each subsequent cell forward by the expansion amount
  subsequentCells.forEach((cell) => {
    const cellIndex = cell.originalIndex;
    const currentCellStartMins = timeToMinutes(cell.st);
    const currentCellEndMins = timeToMinutes(cell.et);
    
    // Calculate new times
    const newStartMins = currentCellStartMins + expansionAmount;
    const newEndMins = currentCellEndMins + expansionAmount;
    
    // Check if pushing would exceed timetable bounds
    if (newEndMins <= MAX_TIMETABLE_END) {
      updatedCells[cellIndex] = {
        ...updatedCells[cellIndex],
        st: minutesToTime(newStartMins),
        et: minutesToTime(newEndMins)
      };
    }
  });
  
  return updatedCells;
};

// Simple next cell update for shrinking
const updateNextCellOnly = (currentEndTime, currentIndex, cells, currentStartTime) => {
  const otherCells = cells.map((cell, idx) => ({ ...cell, originalIndex: idx }))
    .filter((_, idx) => idx !== currentIndex);
  
  const nextCells = otherCells
    .filter(cell => timeToMinutes(cell.st) >= timeToMinutes(currentStartTime))
    .sort((a, b) => timeToMinutes(a.st) - timeToMinutes(b.st));
  
  if (nextCells.length === 0) return cells;
  
  const nextCell = nextCells[0];
  const nextCellIndex = nextCell.originalIndex;
  
  const updatedCells = [...cells];
  updatedCells[nextCellIndex] = {
    ...updatedCells[nextCellIndex],
    st: currentEndTime
  };
  
  return updatedCells;
};

const ResizableTableCell = ({ data, day, index, setCells, dayCells, setDelete }) => {
  const { theme } = useContext(ThemeContext);
  const startMins = timeToMinutes(data.st);
  const endMins = timeToMinutes(data.et);
  const initialBlocks = Math.max(1, Math.floor((endMins - startMins) / 30));
  const width = useSharedValue(initialBlocks * TIME_BLOCK_WIDTH);
  const startWidth = useSharedValue(0);

  // Create styles inside the component where theme is accessible
  const styles = StyleSheet.create({
    container: {
      height: 110,
      backgroundColor: theme.card.background,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.primary,
      marginVertical: 6,
      marginHorizontal: 2,
      flexDirection: 'row',
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    content: {
      flex: 1,
      padding: 10,
      justifyContent: 'space-evenly',
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    subjectInput: {
      flex: 1,
      fontSize: 13,
      fontWeight: '600',
      color: theme.text,
      backgroundColor: `${theme.background}DD`,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: `${theme.primary}30`,
    },
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    timeBox: {
      flex: 1,
      backgroundColor: `${theme.primary}20`,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timeLabel: {
      fontSize: 12,
      color: theme.subHeadingText,
      fontWeight: '600',
    },
    timeValue: {
      fontSize: 13,
      color: theme.primary,
      fontWeight: '700',
    },
    resizer: {
      width: 28,
      backgroundColor: `${theme.primary}BB`,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: 1,
      borderLeftColor: `${theme.secondary}66`,
    },
    resizerHandle: {
      width: 4,
      height: 24,
      backgroundColor: 'rgba(255,255,255,0.4)',
      borderRadius: 2,
      marginBottom: 4,
    },
    resizerText: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 18,
      fontWeight: '900',
    },
    deleteButton: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: `${theme.error || '#ff4444'}44`,
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 4,
      zIndex: 10,
    },
    deleteText: {
      color: theme.error || '#ff4444',
      fontSize: 11,
      fontWeight: 'bold',
    },
  });
  
  

  // ENHANCED: Pan gesture with cell pushing logic
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startWidth.value = width.value;
    })
    .onUpdate((event) => {
      const newWidth = startWidth.value + event.translationX;
      const snapped = Math.max(
        TIME_BLOCK_WIDTH, 
        Math.round(newWidth / TIME_BLOCK_WIDTH) * TIME_BLOCK_WIDTH
      );
      width.value = snapped;
    })
    .onEnd(() => {
      const snappedBlocks = Math.round(width.value / TIME_BLOCK_WIDTH);
      const newDuration = snappedBlocks * 30;
      const newEndMins = startMins + newDuration;

      // ENHANCED: More permissive expansion logic
      const calculateMaxEndTime = () => {
        // Check if expansion would push cells beyond timetable end
        const expansionAmount = newEndMins - endMins;
        
        if (expansionAmount <= 0) {
          // Shrinking - no special limits needed
          return Math.max(newEndMins, startMins + MIN_DURATION);
        }
        
        // Expanding - check if subsequent cells can be pushed
        const subsequentCells = dayCells
          .filter((_, idx) => idx !== index && timeToMinutes(dayCells[idx].st) >= startMins)
          .sort((a, b) => timeToMinutes(a.st) - timeToMinutes(b.st));
        
        if (subsequentCells.length === 0) {
          // No subsequent cells - allow expansion up to max duration or timetable end
          return Math.min(startMins + MAX_DURATION, MAX_TIMETABLE_END);
        }
        
        // Check if pushing all subsequent cells would exceed bounds
        const lastSubsequentCell = subsequentCells[subsequentCells.length - 1];
        const lastCellNewEndMins = timeToMinutes(lastSubsequentCell.et) + expansionAmount;
        
        if (lastCellNewEndMins <= MAX_TIMETABLE_END) {
          // Safe to expand and push
          return Math.min(newEndMins, startMins + MAX_DURATION);
        } else {
          // Can't push beyond bounds - limit expansion
          return Math.min(endMins + (MAX_TIMETABLE_END - lastCellNewEndMins + expansionAmount), startMins + MAX_DURATION);
        }
      };

      const maxAllowedEndMins = calculateMaxEndTime();
      const finalEndMins = Math.max(Math.min(newEndMins, maxAllowedEndMins), startMins + MIN_DURATION);
      const finalBlocks = Math.max(1, Math.floor((finalEndMins - startMins) / 30));
      const finalEndTime = minutesToTime(startMins + finalBlocks * 30);

      console.log('🔍 Enhanced Resize Debug:', {
        originalEndMins: endMins,
        newEndMins,
        maxAllowedEndMins,
        finalEndMins,
        finalEndTime,
        isExpanding: finalEndMins > endMins,
        subsequentCellsCount: dayCells.filter((_, idx) => idx !== index && timeToMinutes(dayCells[idx].st) >= startMins).length
      });

      runOnJS(setCells)((prev) => {
        const currentDayUpdated = [...prev[day]];
        
        // Update current cell
        currentDayUpdated[index] = { 
          ...currentDayUpdated[index], 
          et: finalEndTime 
        };
        
        // ENHANCED: Use the new cascading function with pushing
        const cascadedCells = updateCascadingCellsWithPush(
          finalEndTime, 
          index, 
          currentDayUpdated, 
          data.st
        );
        
        return { ...prev, [day]: cascadedCells };
      });

      width.value = withSpring(finalBlocks * TIME_BLOCK_WIDTH, {
        damping: 15,
        stiffness: 150,
      });
    });

  // Use useAnimatedReaction to respond to data changes instead of useEffect
  useAnimatedReaction(
    () => {
      return { st: data.st, et: data.et };
    },
    (current, previous) => {
      if (!previous || current.st !== previous.st || current.et !== previous.et) {
        const newStart = timeToMinutes(current.st);
        const newEnd = timeToMinutes(current.et);
        const blocks = Math.max(1, Math.floor((newEnd - newStart) / 30));
        width.value = withSpring(blocks * TIME_BLOCK_WIDTH, {
          damping: 15,
          stiffness: 150,
        });
      }
    }
  );

  // DELETE: Remove this cell from the day
  const handleDelete = () => {
    setCells((prev) => {
      const currentDayCells = [...prev[day]];
      const deletedCell = currentDayCells[index];

      if(data.id && setDelete)
        setDelete(prev => [...prev, data.id]);
  
      const deletedStartMins = timeToMinutes(deletedCell.st);
      const deletedEndMins = timeToMinutes(deletedCell.et);
      const duration = deletedEndMins - deletedStartMins;
  
      // Remove the current cell
      currentDayCells.splice(index, 1);
  
      // Shift subsequent cells back by the duration
      const updatedCells = currentDayCells.map((cell, idx) => {
        const cellStartMins = timeToMinutes(cell.st);
        const cellEndMins = timeToMinutes(cell.et);
  
        // Only shift cells that come after the deleted cell
        if (cellStartMins >= deletedEndMins) {
          const newStart = Math.max(cellStartMins - duration, deletedStartMins); // prevent overlap
          const newEnd = Math.max(cellEndMins - duration, newStart + MIN_DURATION);
          return {
            ...cell,
            st: minutesToTime(newStart),
            et: minutesToTime(newEnd),
          };
        }
        return cell;
      });
  
      return { ...prev, [day]: updatedCells };
    });
  };
  


  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  // Enhanced handleChange with cascading updates
  const handleChange = (field, value) => {
    setCells((prev) => {
      const updated = [...prev[day]];
      updated[index] = { ...updated[index], [field]: value };
      
      // If end time is manually changed, cascade with pushing
      if (field === 'et') {
        const cascadedCells = updateCascadingCellsWithPush(value, index, updated, data.st);
        return { ...prev, [day]: cascadedCells };
      }
      
      return { ...prev, [day]: updated };
    });
  };

  const cell = dayCells[index];

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
      <View style={styles.content}>
        <View style={styles.subjectHeader}>
          {/* <Text style={styles.subjectLabel}>📚</Text> */}
          <TextInput
            style={styles.subjectInput}
            placeholder="Subject Code"
            placeholderTextColor={`${theme.text}60`}
            value={data.subjectCode}
            onChangeText={(t) => handleChange('subjectCode', t)}
          />
           <TextInput
            style={styles.subjectInput}
            placeholder="Teacher Name"
            placeholderTextColor={`${theme.text}60`}
            value={data.teacherName}
            onChangeText={(t) => handleChange('teacherName', t)}
          />
          <TextInput
            style={styles.subjectInput}
            placeholder="Subject Name"
            placeholderTextColor={`${theme.text}60`}
            value={data.subjectName}
            onChangeText={(t) => handleChange('subjectName', t)}
          />
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.timeInputContainer}>
            <Text style={styles.endTimeText}>{cell.st} - {cell.et}</Text>
          </View>
        </View>
      </View>
      
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.resizer}>
          <View style={styles.resizerHandle} />
          <Text style={styles.resizerText}>⋮⋮</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default ResizableTableCell;
