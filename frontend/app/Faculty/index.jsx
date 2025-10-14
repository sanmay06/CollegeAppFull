import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/hooks/ThemeProvider'
import Header from '@/components/ui/Header'
import { useRouter } from 'expo-router'
import Card from '@/components/ui/Card'
import Menu from '@/components/ui/Menu'
import items from '@/constants/items'

const Home = () => {
    const router = useRouter();
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
            {/* <Header /> */}
           <Menu items = {items}  path = "Faculty"/>
        </SafeAreaView>
    )
}

export default Home;