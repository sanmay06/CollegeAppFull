import { ThemeContext } from '@/hooks/ThemeProvider';
import React, { useContext } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native' ;

export default Table = ( props ) => {

    const { theme } = useContext(ThemeContext);
    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

    const isPortrait = screenHeight >= screenWidth;
    const baseSize = isPortrait ? screenWidth : screenHeight;


    const Update = (rowIndex, key, value) => {
        props.update(true);
        props.setData(prev => {
        const updated = [...prev]; // copy array
        updated[rowIndex] = { ...updated[rowIndex], [key]: value }; // copy & update object
        return updated;
        });
    };
    const widthArray = props.width || {
        admin:   ['5%', '15%', '15%', '10%', '10%', '5%', '20%', '20%', '10%'],
        teacher: ['5%', '15%', '15%', '15%', '15%', '15%', '10%', '10%'],
        student: ['5%', '15%', '15%', '15%', '15%', '15%', '10%', '10%', '10%', '10%']
      };

    const styles = StyleSheet.create({
        table: {
            borderRadius: baseSize * 0.02,
            overflow: "hidden",
            alignSelf: "center",
            backgroundColor: theme.card.background,
            width: '100%',
        },
        row: {
            flexDirection: "row",
            paddingVertical: screenHeight * 0.005,
            paddingHorizontal: screenWidth * 0.02,
        },
        header: {
            backgroundColor: theme.primary,
        },
        headerText: {
            fontWeight: "bold",
            fontSize: baseSize * 0.035,
            color: theme.button.color,
        },
        cell: {
            fontSize: baseSize * 0.025,
            color: theme.text,
            borderBottomWidth: 1,
            borderBottomColor: theme.border || "#ccc",
            paddingVertical: 4,
            textAlign: 'left'
        },
        cellLarge: {
            flex: 2,
            fontSize: baseSize * 0.025,
            color: theme.text,
        },
        altRow: {
            backgroundColor: theme.niceBackground,
        },
        normalRow: {
            backgroundColor: theme.card.background,
        },
        footer: {
            backgroundColor: theme.secondary,
        },
        footerText: {
            fontWeight: "bold",
            fontSize: baseSize * 0.045,
            color: theme.card.background,
        },
    });

    return (
        <ScrollView>

            <View style = {styles.table}>
                <View style = {[styles.header, styles.row]}>
                    {props.header && props.header.map((head, ind) => (
                        <Text key = {ind} style = {[styles.headerText, {width: widthArray[props.role][ind] || "auto"}]}>{head}</Text>
                    ))}
                </View>

                    {props.data && props.data.map((row) => (
                        <View style = {styles.row} >
                            {props.keys.map((head, ind) => (
                                <TextInput 
                                    style = {[styles.cell, {width: widthArray[props.role][ind]}]}
                                    value = {row[head]}
                                    onChangeText = {(text) => Update(ind, head, text)}
                                />
                            ))}
                        </View>
                    ))}

            </View>
        </ScrollView>
    )
}   