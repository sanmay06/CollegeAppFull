import React, { useContext } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ThemeContext } from '@/hooks/ThemeProvider';

const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'medium', // small, medium, large
    disabled = false,
    loading = false,
    style,
    textStyle,
    icon
}) => {
    const { theme } = useContext(ThemeContext);

    const getBackgroundColor = () => {
        if (disabled) return theme.button.disabled;
        switch (variant) {
            case 'primary': return theme.button.background;
            case 'secondary': return theme.secondary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return theme.button.background;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.textLight;
        switch (variant) {
            case 'primary': return theme.button.text;
            case 'secondary': return '#FFFFFF';
            case 'outline': return theme.primary;
            case 'ghost': return theme.text;
            default: return theme.button.text;
        }
    };

    const getBorder = () => {
        if (variant === 'outline') return {
            borderWidth: 1,
            borderColor: disabled ? theme.button.disabled : theme.primary
        };
        return {};
    };

    const getPadding = () => {
        switch (size) {
            case 'small': return { paddingVertical: 6, paddingHorizontal: 12 };
            case 'large': return { paddingVertical: 14, paddingHorizontal: 24 };
            default: return { paddingVertical: 10, paddingHorizontal: 16 }; // medium
        }
    };

    const styles = StyleSheet.create({
        button: {
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            opacity: disabled ? 0.7 : 1,
            ...getPadding(),
            backgroundColor: getBackgroundColor(),
            ...getBorder(),
        },
        text: {
            color: getTextColor(),
            fontWeight: '600',
            fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
        },
        iconContainer: {
            marginRight: 8,
        }
    });

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={({ pressed }) => [
                styles.button,
                style,
                { opacity: pressed ? 0.8 : (disabled ? 0.7 : 1) }
            ]}
        >
            {loading ? (
                <ActivityIndicator size="small" color={getTextColor()} />
            ) : (
                <>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </>
            )}
        </Pressable>
    );
};

export default Button;
