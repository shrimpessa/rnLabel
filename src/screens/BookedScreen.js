import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { DATA } from '../data';
import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {

    const openPostHandler = post => {
        navigation.navigate('Post', { 
            postID: post.id, 
            date: post.date,
            booked: post.booked
        })
    }

    return (
      <PostList 
        data={DATA.filter(post => post.booked)} 
        onOpen={openPostHandler} 
      />
    )
}

BookedScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Избранное',
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