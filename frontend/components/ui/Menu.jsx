// components/ui/Menu.jsx
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
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const isPortrait = screenHeight >= screenWidth;
  const path = props.path;
  const isWeb = screenWidth > 768;
  const cardSize = isWeb
    ? 140
    : isPortrait
    ? screenWidth * 0.35
    : screenHeight * 0.28;

  const cardRadius = 18;

  const renderItem = ({ item }) => (
    <View style={styles(theme, cardSize, cardRadius, isWeb).itemContainer}>
      <TouchableOpacity
        style={styles(theme, cardSize, cardRadius, isWeb).card}
        onPress={() => router.push(path + "/" + item.link)}
        activeOpacity={0.8}
      >
        <View style={styles(theme, cardSize, cardRadius, isWeb).iconContainer}>
          {item.icon === "MaterialCommunityIcons" && (
            <MaterialCommunityIcons
              name={item.iconName}
              size={isWeb ? 36 : cardSize * 0.25}
              color={theme.primary}
            />
          )}
          {item.icon === "Ionicons" && (
            <Ionicons
              name={item.iconName}
              size={isWeb ? 36 : cardSize * 0.25}
              color={theme.primary}
            />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles(theme, cardSize, cardRadius, isWeb).titleContainer}>
        <Text
          style={styles(theme, cardSize, cardRadius, isWeb).title}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        {item.subtitle && (
          <Text
            style={styles(theme, cardSize, cardRadius, isWeb).subtitle}
            numberOfLines={1}
          >
            {item.subtitle}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles(theme, cardSize, cardRadius, isWeb).container}>
      <FlatList
        style={styles(theme, cardSize, cardRadius, isWeb).list}
        contentContainerStyle={
          styles(theme, cardSize, cardRadius, isWeb).listContainer
        }
        data={props.items}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = (theme, cardSize, cardRadius, isWeb) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
    },
    list: {
      backgroundColor: theme.background,
      paddingHorizontal: isWeb ? 20 : 10,
    },
    listContainer: {
      alignItems: "center",
      paddingVertical: 10,
      maxWidth: isWeb ? 900 : "100%",
      alignSelf: "center",
    },
    itemContainer: {
      margin: isWeb ? 14 : 10,
      alignItems: "center",
      width: isWeb ? 160 : cardSize + 16,
    },
    card: {
      backgroundColor: theme.card.background,
      width: cardSize,
      height: cardSize,
      borderRadius: cardRadius,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor:
        theme.background === "#121212"
          ? "rgba(129, 199, 132, 0.25)"
          : "rgba(76, 175, 80, 0.12)",
    },
    iconContainer: {
      padding: isWeb ? 10 : 12,
      borderRadius: 14,
      backgroundColor:
        theme.background === "#121212"
          ? "rgba(129, 199, 132, 0.15)"
          : "rgba(76, 175, 80, 0.08)",
    },
    titleContainer: {
      marginTop: 10,
      alignItems: "center",
      paddingHorizontal: 4,
    },
    title: {
      fontSize: isWeb ? 14 : 13,
      fontWeight: "600",
      color: theme.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 11,
      color: theme.labelText,
      textAlign: "center",
      marginTop: 2,
      opacity: 0.8,
    },
  });
