import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { APP_COLORS } from '../../enums/APP_COLORS';

export const AppLoader = () => {
    return(
        <View style={styles.center}>
            <ActivityIndicator size="large" color={APP_COLORS.CYPRUS} />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})