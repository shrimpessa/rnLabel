import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { DATA } from '../data';
import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { PostList } from '../components/PostList';

export const MainScreen = ({ navigation }) => {

    const openPostHandler = post => {
        navigation.navigate('Post', { 
            postID: post.id, 
            date: post.date,
            booked: post.booked
        })
    }

    return (
      <PostList 
        data={DATA} 
        onOpen={openPostHandler} 
      />
    )
}

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Мой блог',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName='ios-camera'
          // перейти на страницу Create
          onPress={() => navigation.push('Create')}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Toggle drawer'
          iconName='ios-menu'
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
})