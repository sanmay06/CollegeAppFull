import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import ThemeButton from '@/components/ui/ThemeButton';
import { ThemeContext } from '@/hooks/ThemeProvider';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card.background, // Use card background for header to stand out from screen bg
      width: '100%',
      marginBottom: 16,
      // Add subtle shadow
      shadowColor: theme.card.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderBottomWidth: 1,
      borderBottomColor: theme.card.border,
    },
    image: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    textContainer: {
      flex: 1,
      marginHorizontal: 12,
      alignItems: 'center',
    },
    text: {
      color: theme.text,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '700',
    },
    subText: {
      color: theme.subHeadingText || theme.textLight,
      textAlign: 'center',
      fontSize: 12,
      marginTop: 2,
    },
    hr: {
      display: 'none', // Remove the HR line for cleaner look
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/BIT logo.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>BANGALORE INSTITUTE OF TECHNOLOGY</Text>
        <Text style={styles.subText}>An Autonomous Institute under VTU</Text>
      </View>
      <ThemeButton />
    </View>
  );
};

export default Header;
