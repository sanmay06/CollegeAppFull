import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ThemeContext } from '@/hooks/ThemeProvider'
import Header from '@/components/ui/Header'
import ScreenWrapper from '@/components/ui/ScreenWrapper'

// Placeholder dashboard for students
const StudentLogin = () => {
    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            padding: 20,
        },
        welcomeText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 8,
        },
        subText: {
            fontSize: 14,
            color: theme.textLight,
        }
    })

    return (
        <ScreenWrapper style={{ paddingHorizontal: 0 }}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Student Dashboard</Text>
                <Text style={styles.subText}>Welcome back to your portal.</Text>
                {/* Add Student specific menu items here later */}
            </View>
        </ScreenWrapper>
    )
}

export default StudentLogin