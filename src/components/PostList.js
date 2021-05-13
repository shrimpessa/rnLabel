import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Post } from './Post'
import { APP_COLORS } from '../enums/APP_COLORS'
import { AppText } from './ui/AppText'

export const PostList = ({ data, onOpen }) => {

    if (!data.length) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <AppText style={styles.title}>
                    Пока что здесь ничего нет!
                </AppText>
                <AntDesign style={styles.sizeText} name="smileo" size={100} color={APP_COLORS.LIGHT_ORANGE} />
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={data}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10    
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: APP_COLORS.BROWN,
        fontWeight: '700',
        marginBottom: 10
    },
})