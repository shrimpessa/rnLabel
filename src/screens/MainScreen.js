import React from 'react';
import { ProgressViewIOSComponent, StyleSheet, View } from 'react-native';
import { AppText } from '../components/ui/AppText'
import { AppButton } from '../components/ui/AppButton'

export const MainScreen = ({ navigation }) => {

    const goToPost = () => {
        navigation.navigate('Post')
    }

    return (
        <View style={styles.center}>
            <AppText>Main screen</AppText>
            <AppButton onPress={goToPost}>
                Go to post
            </AppButton>
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