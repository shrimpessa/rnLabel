// дефолтный вариант для TextInput
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { APP_COLORS } from '../../enums/APP_COLORS';

export const AppMultilineTextInput = props => (
    <TextInput         
        style={{ ...styles.default, ...props.style }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        maxLength={props.maxLength}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        multiline
    >
        {props.children}
    </TextInput>
)

const styles = StyleSheet.create({
    default: {
        borderStyle: 'solid',
        borderRadius: 3,
        fontSize: 14,
        borderWidth: 1.4,
        padding: 10,
        height: 180,
        borderColor: APP_COLORS.CYPRUS
    }
})