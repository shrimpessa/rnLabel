// экран для отдельного поста
import React from 'react';
import { StyleSheet, View, ScrollView, Image, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppText } from '../components/ui/AppText'
import { AppButton } from '../components/ui/AppButton'
import { DATA } from '../data';
import { APP_COLORS } from '../enums/APP_COLORS';
import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';

export const PostScreen = ({ navigation }) => {
    const postID = navigation.getParam('postID')

    const post = DATA.find(p => p.id === postID)

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
                onPress: () => {},
              },
            ],
            { cancelable: false }
        );
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
    const iconName = booked ? 'ios-star' : 'ios-star-outlined'

    return {
        headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Take photo'
                iconName={iconName}
                onPress={() => console.log('Press photo')}
              />
            </HeaderButtons>
          ),
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