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
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: theme.background,
      width: '100%',
    },
    image: {
      width: width * 0.1,
      height: width * 0.1,
      resizeMode: 'contain',
    },
    textContainer: {
      flex: 1,
      marginHorizontal: 10,
      alignItems: 'center',
    },
    text: {
      color: theme.text,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    subText: {
      color: theme.text,
      textAlign: 'center',
      fontSize: 14,
    },
    hr: {
      width: '60%',
      height: 2,
      backgroundColor: theme.text,
      marginVertical: 4,
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
        <View style={styles.hr} />
        <Text style={styles.subText}>An Autonomous Institute under VTU</Text>
      </View>
      <ThemeButton />
    </View>
  );
};

export default Header;
