import React, { useContext, useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/hooks/ThemeProvider';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    leftIcon,
    rightIcon,
    keyboardType,
    autoCapitalize
}) => {
    const { theme } = useContext(ThemeContext);
    const [isFocused, setIsFocused] = useState(false);

    const styles = StyleSheet.create({
        container: {
            marginBottom: 16,
            width: '100%',
        },
        label: {
            color: theme.labelText,
            marginBottom: 6,
            fontSize: 14,
            fontWeight: '500',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.input.background,
            borderWidth: 1,
            borderColor: error ? theme.error : (isFocused ? theme.input.focus : theme.input.border),
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 48, // Standard touch target height
        },
        input: {
            flex: 1,
            color: theme.text,
            fontSize: 16,
            paddingVertical: 8, // Ensure text is vertically centered
        },
        iconLeft: {
            marginRight: 10,
        },
        iconRight: {
            marginLeft: 10,
        },
        errorText: {
            color: theme.error,
            fontSize: 12,
            marginTop: 4,
        }
    });

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={theme.input.placeholder}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default Input;
