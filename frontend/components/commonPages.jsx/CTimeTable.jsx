import React, { useState, useContext } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { ThemeContext } from '@/hooks/ThemeProvider';
import Header from '@/components/ui/Header';
import api from '@/Axios';
import ResizableTableCell from '@/components/ui/EditableTableCell';
import { timeToMinutes, minutesToTime } from '@/utils/timeUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Shared constants for consistency
const TIME_BLOCK_WIDTH = 100; // Increased for better readability
const TABLE_CELL_HEIGHT = 80;
const DAY_LABEL_WIDTH = 120; // Increased for better day label display

const CTT = () => {
  const { theme } = useContext(ThemeContext);
  const { width, height } = Dimensions.get('window');
  const isPortrait = height > width;
  const size = isPortrait ? width * 0.15 : height * 0.15;
  const [msg, setMsg] = useState('');
  const [dets, setDets] = useState({ sem: '', sec: '', branch: '' });
  const [Cells, setCells] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  });

  const DayMap = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
  };

  const addTimeTable = async () => {
    if (dets.sem.trim() === '' || dets.sec.trim() === '') return;
    try {
      console.log('Cells:', Cells);
      const branch = await AsyncStorage.getItem('branch');
      const fromatCeels = Object.entries(Cells).flatMap(([key, items]) =>
        items.map((item) => ({
          ...item,
          day: DayMap[key],
          section: dets.sec,
          semester: dets.sem,
          branch: branch,
        }))
      );

      const filtered = fromatCeels.filter(obj => obj && typeof obj === 'object');

      console.log(filtered);
      const response = await api.post('timetable/create', filtered);
      if (response.data !== 'Done') setMsg("Error saving timetable");
      else setMsg("Timetable saved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const addCell = (day) => () => {
    setCells((prev) => {
      const prevDayCells = prev[day] || [];
      const lastCell = prevDayCells[prevDayCells.length - 1];

      const defaultStart = lastCell?.et || '9:00';
      const defaultEnd = minutesToTime(timeToMinutes(defaultStart) + 30);

      return {
        ...prev,
        [day]: [
          ...prevDayCells,
          { subjectCode: '', st: defaultStart, et: defaultEnd },
        ],
      };
    });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.niceBackground || theme.background,
      paddingBottom: 120,
      alignItems: 'center',
      paddingHorizontal: 16,
      minHeight: height,
    },
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 200,
      backgroundColor: `${theme.primary}15`,
    },
    heading: {
      fontWeight: '800',
      fontSize: Math.min(size * 0.7, 32),
      textAlign: 'center',
      color: theme.headingText,
      marginVertical: 28,
      letterSpacing: 1.2,
      textShadowColor: `${theme.primary}30`,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    formContainer: {
      width: '100%',
      maxWidth: 400,
      marginBottom: 32,
      backgroundColor: theme.card.background,
      borderRadius: 20,
      padding: 24,
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    labelCont: {
      marginBottom: 24,
    },
    label: {
      color: theme.labelText,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 12,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    input: {
      color: theme.text,
      borderColor: theme.primary,
      borderWidth: 2,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 20,
      fontSize: 16,
      backgroundColor: theme.background,
      fontWeight: '500',
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    tableCont: {
      borderRadius: 20,
      borderWidth: 0,
      marginTop: 24,
      backgroundColor: theme.card.background,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        },
        android: {
          elevation: 12,
        },
      }),
    },
    tableHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primary, // Fixed: RN doesn't support linear-gradient string in background
      borderBottomWidth: 3,
      borderBottomColor: theme.secondary,
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: `${theme.border}60`,
      backgroundColor: theme.background,
    },
    dayLabel: {
      color: '#FFFFFF',
      fontSize: 16,
      width: DAY_LABEL_WIDTH,
      textAlign: 'center',
      paddingVertical: 18,
      fontWeight: '800',
      backgroundColor: theme.primary,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    timeSlotHeader: {
      color: '#FFFFFF',
      fontSize: 11,
      width: TIME_BLOCK_WIDTH,
      textAlign: 'center',
      paddingVertical: 18,
      fontWeight: '700',
      backgroundColor: theme.secondary,
      borderRightWidth: 1,
      borderRightColor: 'rgba(255,255,255,0.3)',
      letterSpacing: 0.3,
    },
    dayRowLabel: {
      color: '#FFFFFF',
      fontSize: 15,
      width: DAY_LABEL_WIDTH,
      textAlign: 'center',
      paddingVertical: 20,
      fontWeight: '700',
      backgroundColor: theme.primary,
      letterSpacing: 0.8,
      borderRightWidth: 2,
      borderRightColor: theme.secondary,
    },
    tableCell: {
      width: TIME_BLOCK_WIDTH,
      height: TABLE_CELL_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: `${theme.border}40`,
      backgroundColor: `${theme.niceBackground}80`,
    },
    addButton: {
      width: TIME_BLOCK_WIDTH,
      height: TABLE_CELL_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.button.background,
      borderRightWidth: 1,
      borderRightColor: `${theme.border}40`,
      borderRadius: 12,
      margin: 6,
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    addButtonPressed: {
      backgroundColor: theme.buttonActive?.background || theme.primaryDark,
      transform: [{ scale: 0.95 }],
    },
    addButtonText: {
      fontWeight: '900',
      fontSize: 28,
      color: theme.button?.color || theme.button?.text || '#FFFFFF',
      textShadowColor: `${theme.primary}30`,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    saveButton: {
      backgroundColor: theme.primary,
      paddingVertical: 18,
      paddingHorizontal: 48,
      borderRadius: 20,
      marginTop: 32,
      alignSelf: 'center',
      minWidth: 180,
      borderWidth: 2,
      borderColor: theme.secondary,
      ...Platform.select({
        ios: {
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    saveButtonPressed: {
      backgroundColor: theme.secondary,
      transform: [{ scale: 0.96 }],
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '800',
      textAlign: 'center',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    scrollContainer: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    emptyStateContainer: {
      padding: 40,
      alignItems: 'center',
      backgroundColor: `${theme.niceBackground}60`,
      borderRadius: 16,
      marginVertical: 20,
    },
    emptyStateText: {
      color: theme.subHeadingText,
      fontSize: 16,
      fontStyle: 'italic',
      textAlign: 'center',
    },
  });

  const renderDayRow = (day, label) => {
    const hasClasses = Cells[day]?.length > 0;

    return (
      <View style={styles.tableRow}>
        <Text style={styles.dayRowLabel}>{label}</Text>

        {hasClasses ? (
          Cells[day].map((cell, index) => (
            <ResizableTableCell
              key={index}
              data={cell}
              day={day}
              index={index}
              setCells={setCells}
              dayCells={Cells[day]}
            />
          ))
        ) : (
          <View style={styles.tableCell}>
            <Text style={styles.emptyStateText}>—</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={addCell(day)}
          android_ripple={{
            color: theme.buttonActive.background,
            borderless: false,
          }}
        >
          <Text style={styles.addButtonText}>＋</Text>
        </Pressable>
      </View>
    );
  };


  return (
    <ScrollView
      style={{ backgroundColor: theme.niceBackground || theme.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.gradientOverlay} />
      <Header />
      <Text style={styles.heading}>📅 Time Table</Text>

      <View style={styles.formContainer}>
        <View style={styles.labelCont}>
          <Text style={styles.label}>📚 Semester</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter semester (e.g., 3rd Sem)"
            placeholderTextColor={`${theme.text}60`}
            value={dets.sem}
            onChangeText={(text) => setDets({ ...dets, sem: text })}
          />
        </View>

        <View style={styles.labelCont}>
          <Text style={styles.label}>🏫 Section</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter section (e.g., A, B, C)"
            placeholderTextColor={`${theme.text}60`}
            value={dets.sec}
            onChangeText={(text) => setDets({ ...dets, sec: text })}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
        <View style={styles.tableCont}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.dayLabel}>📅 Day</Text>
            {[
              '9:00 - 9:30',
              '9:30 - 10:00',
              '10:00 - 10:30',
              '10:30 - 11:00',
              '11:00 - 11:30',
              '11:30 - 12:00',
              '12:00 - 12:30',
              '12:30 - 1:00',
              '1:00 - 1:30',
              '1:30 - 2:00',
              '2:00 - 2:30',
              '2:30 - 3:00',
              '3:00 - 3:30',
              '3:30 - 4:00',
              '4:00 - 4:30',
              '4:30 - 5:00',
            ].map((slot, i) => (
              <Text key={i} style={styles.timeSlotHeader}>
                {slot}
              </Text>
            ))}
          </View>

          {/* Day Rows */}
          {renderDayRow('mon', '📅 Monday')}
          {renderDayRow('tue', '📅 Tuesday')}
          {renderDayRow('wed', '📅 Wednesday')}
          {renderDayRow('thu', '📅 Thursday')}
          {renderDayRow('fri', '📅 Friday')}
          {renderDayRow('sat', '📅 Saturday')}
        </View>
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          pressed && styles.saveButtonPressed
        ]}
        onPress={addTimeTable}
        android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <Text style={styles.saveButtonText}>💾 Save Timetable</Text>
      </Pressable>
      <Text style={{ color: theme.text, textAlign: 'center', marginTop: 16 }}>
        {msg}
      </Text>
    </ScrollView>
  );
};

export default CTT;
