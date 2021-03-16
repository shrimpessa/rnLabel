import React from 'react';
import { 
    StyleSheet, 
    View, 
    TouchableOpacity, 
    Platform, 
    TouchableNativeFeedback 
} from 'react-native';
import { APP_COLORS } from '../../enums/APP_COLORS';
import { AppText } from './AppText';

export const AppButton = ({ children, onPress, color=APP_COLORS.LIGHT_GREY }) => {

    const Wrapper = 
        Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return(
        <Wrapper onPress={onPress} activeOpacity={0.7} >
            <View style={{ ...styles.button, backgroundColor: color }}>
                <AppText style={styles.text}>{children}</AppText>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        color:APP_COLORS.WHITE
    }
})