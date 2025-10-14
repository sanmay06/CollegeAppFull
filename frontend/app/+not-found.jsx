import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@/hooks/ThemeProvider';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textLink: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});

// Updated ThemedView to use ThemeContext
const ThemedView = ({ style, lightColor, darkColor, ...otherProps }) => {
  const { theme, colorScheme } = useContext(ThemeContext);
  
  // Use provided colors or fallback to theme colors
  const backgroundColor = lightColor && colorScheme === 'light' 
    ? lightColor 
    : darkColor && colorScheme === 'dark' 
    ? darkColor 
    : theme.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

// Updated ThemedText to use ThemeContext
function ThemedText({ style, lightColor, darkColor, type = 'default', ...rest }) {
  const { theme, colorScheme } = useContext(ThemeContext);
  
  // Use provided colors or fallback to theme colors
  const color = lightColor && colorScheme === 'light' 
    ? lightColor 
    : darkColor && colorScheme === 'dark' 
    ? darkColor 
    : theme.text;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.textLink : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
