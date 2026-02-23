import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/hooks/ThemeProvider";

export default function Menu(props) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { width: screenWidth } = Dimensions.get("window");

  // simplified responsive logic
  const isWeb = screenWidth > 768;
  const numColumns = isWeb ? 4 : 2;
  const gap = 16;
  const padding = 16;

  // Calculate item width based on available space
  const availableWidth = screenWidth - (padding * 2) - (gap * (numColumns - 1));
  const itemWidth = isWeb ? 160 : availableWidth / numColumns;

  const renderItem = ({ item }) => (
    <View style={{ width: itemWidth, marginBottom: gap, marginRight: (item.id % numColumns === 0) ? 0 : gap }}>
      <TouchableOpacity
        style={styles(theme).card}
        onPress={() => router.push(props.path + item.link)}
        activeOpacity={0.7}
      >
        <View style={styles(theme).iconContainer}>
          {item.icon === "MaterialCommunityIcons" && (
            <MaterialCommunityIcons
              name={item.iconName}
              size={32}
              color={theme.primary}
            />
          )}
          {item.icon === "Ionicons" && (
            <Ionicons
              name={item.iconName}
              size={32}
              color={theme.primary}
            />
          )}
        </View>

        <View style={styles(theme).textContainer}>
          <Text style={styles(theme).title} numberOfLines={2}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles(theme).subtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      style={styles(theme).container}
      contentContainerStyle={styles(theme).listContent}
      data={props.items}
      horizontal={false}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      key={numColumns}
    />
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    listContent: {
      padding: 16,
      // alignItems: 'center', // Centering might break specific grid alignment logic, let's keep default
    },
    card: {
      backgroundColor: theme.card.background,
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
      justifyContent: "center",
      aspectRatio: 1, // Square cards
      width: '100%',
      // Shadows
      shadowColor: theme.card.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: theme.card.border,
    },
    iconContainer: {
      padding: 12,
      borderRadius: 50,
      backgroundColor: theme.primary + '15', // 15% opacity
      marginBottom: 12,
    },
    textContainer: {
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 12,
      color: theme.textLight,
      textAlign: "center",
      marginTop: 4,
    },
  });
