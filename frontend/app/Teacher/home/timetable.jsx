import React, { useState, useEffect, useContext } from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { ThemeContext } from '@/hooks/ThemeProvider';
import Header from '@/components/ui/Header';

const timeTable = () => {

    const { theme } = useContext(ThemeContext);
    const { width, height } = Dimensions.get("window");
    const isPortrait = height > width;
    const size = isPortrait? width * 0.15: height * 0.15;

    const styles = StyleSheet.create({
        container: {
            background: theme.background,
            alignItems: 'center'
        },
        heading: {
            fontWeight: 'bold',
            fontSize: size * 0.5,
            textAlign: 'center',
            color: theme.headingText,
        },
        tableCont: {
            // alignItems: 'center',
            width: '98%',
            borderWidth: 1,
            borderColor: theme.border,
        },
        tableRow: {
            width:'100%',
            padding: 3,
            flexDirection: 'row',
            justifyContent:'space-evenly',
            alignItems: 'center',
        },
        tableTop: {
            color: theme.subHeadingText,
            fontSize: 14,
            width: 80,
            textAlign: 'center',
            borderWidth: 2,
            borderColor: theme.border,
        },
        tableCell: {
            color: theme.text,
            fontSize: 14,
            width: '5.555%',
            textAlign: 'center',
            borderWidth: 2,
            borderColor: theme.border,
        }
    });

    return (
        <ScrollView 
            style = {{ backgroundColor: theme.background }}
            contentContainerStyle = {styles.container} 
        >
                <Header />
            <Text style = {styles.heading} >Time Table</Text>
            <ScrollView 
                style = {styles.tableCont} 
                contentContainerStyle = {{alignItems: 'center', }}
                horizontal
            >
                <View style = {styles.tableRow}>
                    <Text style = { styles.tableTop } >
                        Day
                    </Text>
                    <Text style = { styles.tableTop } >
                        9:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        9:30
                    </Text>                    
                    <Text style = { styles.tableTop } >
                        10:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        10:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        11:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        11:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        12:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        12:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        1:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        1:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        2:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        2:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        3:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        3:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        4:00
                    </Text>
                    <Text style = { styles.tableTop } >
                        4:30
                    </Text>
                    <Text style = { styles.tableTop } >
                        5:00
                    </Text>
                </View>
            </ScrollView>
        </ScrollView>
    )
}

export default timeTable;