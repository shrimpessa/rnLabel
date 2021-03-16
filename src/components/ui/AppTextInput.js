// дефолтный вариант для TextInput
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { APP_COLORS } from '../../enums/APP_COLORS';

export const AppTextInput = props => (
    <TextInput         
        style={{ ...styles.default, ...props.style }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        maxLength={props.maxLength}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}        
    >
        {props.children}
    </TextInput>
)

const styles = StyleSheet.create({
    default: {
        borderStyle: 'solid',
        fontSize: 14,
        borderBottomWidth: 2,
        padding: 10,
        borderBottomColor: APP_COLORS.input
    }
})