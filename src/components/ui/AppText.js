// дефолтный вариант для Text
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { APP_COLORS } from '../../enums/APP_COLORS';

export const AppText = props => (
    <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
)

const styles = StyleSheet.create({
    default: {
        fontSize: 14,
        color: APP_COLORS.BLACK, 
    }
})