import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { APP_COLORS } from '../enums/APP_COLORS';
import { AppText } from './ui/AppText';
import { seasonHandler } from './seasonHandler';

export const Post = ({ post, onOpen }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
            <View style={styles.post}>
                <ImageBackground style={styles.image} source={{uri: post.img}}>
                    <View style={styles.textWrap}>
                        <View style={{flexDirection: 'row'}}>
                            {seasonHandler(post.season)}
                            <AppText style={styles.title}>{post.text}</AppText>
                        </View>                    
                        <AppText style={styles.title}>{new Date(post.date).toLocaleDateString()}</AppText>
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
        height: 200,
        borderWidth: 1,
        borderRadius: 16, 
        borderColor: APP_COLORS.ORANGE,
        overflow: 'hidden'
    },
    textWrap: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: APP_COLORS.TRANSPARENT_BLACK,
        opacity: 0.8
    },
    title: {
        color: APP_COLORS.WHITE,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingTop: '1%'
    }
})