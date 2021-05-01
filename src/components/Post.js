import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { APP_COLORS } from '../enums/APP_COLORS';
import { AppText } from './ui/AppText';

export const Post = ({ post, onOpen }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
            <View style={styles.post}>
                <ImageBackground style={styles.image} source={{uri: post.img}}>
                    <View style={styles.textWrap}>
                        <AppText style={styles.title}>{post.text}</AppText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        backgroundColor: APP_COLORS.TRANSPARENT_BLACK,
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
    title: {
        color: APP_COLORS.WHITE
    }
})