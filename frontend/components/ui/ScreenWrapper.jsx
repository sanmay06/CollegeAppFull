import React, { useContext } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/hooks/ThemeProvider';

const ScreenWrapper = ({ children, style }) => {
    const { theme, colorScheme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        content: {
            flex: 1,
            paddingHorizontal: 16, // Standard horizontal padding
        },
    });

    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
            />
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default ScreenWrapper;
