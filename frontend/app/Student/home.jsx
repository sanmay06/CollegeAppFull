import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import Header from '@/components/ui/Header'
import { ThemeContext } from '@/hooks/ThemeProvider'

const StudentLogin = () => {
  const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.background,
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },
    })

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
        </SafeAreaView>
    )
}

export default StudentLogin