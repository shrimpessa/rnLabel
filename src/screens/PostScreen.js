// экран для отдельного поста
import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppText } from '../components/ui/AppText'
import { AppButton } from '../components/ui/AppButton'
import { useDispatch, useSelector } from 'react-redux'

import { APP_COLORS } from '../enums/APP_COLORS';
import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { removePost, toogleBooked } from '../store/actions/postActions';

export const PostScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const postID = navigation.getParam('postID')
    const post = useSelector(state => 
        state.post.allPosts.find(p => p.id === postID)
    )

    // есть ли в массиве постов тот, с которым мы счс работаем
    const booked = useSelector(state =>
        state.post.bookedPosts.some(post => post.id === postID)
    )

    // если флаг booked изменится, тогда задаем его как параметр для навигации
    useEffect(() => {
        navigation.setParams({ booked })
    }, [booked])


    
    const toggleHandler = useCallback(() => {
        dispatch(toogleBooked(postID))
    }, [dispatch, postID])

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить этот пост?",
            [
              {
                text: "Отменить",
                style: "cancel",
              },
              {
                text: "Удалить",                
                style: "destructive",
                onPress: () => {
                    navigation.navigate('Main')
                    dispatch(removePost(postID))
                },
              },
            ],
            { cancelable: false }
        );
    }

    // действия при удалении поста
    if (!post) {
        return null
    }

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <AppText>{post.text}</AppText>
            </View>
            <AppButton onPress={removeHandler} color={APP_COLORS.CYPRUS}>
                Удалить
            </AppButton>
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({ navigation }) => {
    const date = navigation.getParam('date')
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? "ios-bookmark" : "ios-bookmark-outline"
    return {
        headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Take photo'
                iconName={iconName}
                onPress={toggleHandler}
              />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200       
    },
    textWrap: {
        padding: 10
    }
})