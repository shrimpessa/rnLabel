// экран для отдельного поста
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/ui/AppText'

export const PostScreen = () => {
    return (
        <View style={styles.center}>
            <AppText>PostScreen</AppText>
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