import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/postActions';

export const MainScreen = ({ navigation }) => {

    const openPostHandler = post => {
        navigation.navigate('Post', { 
            postID: post.id,
            text: post.text,
            date: post.date,
            booked: post.booked
        })
    }

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(loadPosts())
    }, [dispatch])

    const allPosts = useSelector(state => state.post.allPosts)

    const loading = useSelector(state => state.loading)

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <PostList 
        data={allPosts} 
        onOpen={openPostHandler} 
      />
    )
}

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Моя одежда',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName='ios-add-circle-outline'
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})