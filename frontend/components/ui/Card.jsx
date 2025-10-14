import React from 'react'
import { Text, View, Dimensions, StyleSheet, Pressable } from 'react-native';


const Card = ( props ) => {

    const theme = props.theme;
    const { width, height } = Dimensions.get("window");
    const isPortrait = height > width;
    const cardSize = isPortrait ? width * 0.3 : width * 0.15;
    const styles = StyleSheet.create({
        card: {
          backgroundColor: theme.background,
          width: cardSize,
          height: cardSize,
          borderRadius: cardSize / 10,
          padding: 15,
          margin: 10,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
          borderColor: theme.border,
          borderWidth: 1,
        },
        cardTitle: {
          fontSize: cardSize / 6,
          fontWeight: "bold",
          color: theme.text,
          textAlign: "center",
        },
        input: {
          fontSize: cardSize / 6,
          fontWeight: "bold",
          width: cardSize * 0.8,
          color: theme.text,
          textAlign: "center",
          borderWidth: 1,
          borderColor: 'white',
        },
      });

      return (
          <Pressable 
            onPress = {() => {props.router.push(props.link)}}
          >
            <View 
              style={styles.card}
            >
              <Text style={styles.cardTitle}>{props.name}</Text>
            </View>
          </Pressable>
        );
}

export default Card;