import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/ui/AppText'

export const BookedScreen = () => {
    return (
        <View style={styles.center}>
            <AppText>BookedScreen</AppText>
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