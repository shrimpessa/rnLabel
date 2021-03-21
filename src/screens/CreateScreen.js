import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { AppText } from '../components/ui/AppText'
import { AppTextInput } from '../components/ui/AppTextInput'
import { AppButton } from '../components/ui/AppButton'
import { addPost } from '../store/actions/postActions';

export const CreateScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const [text, useText] = useState('')

  const img = 'https://cdn.lifehacker.ru/wp-content/uploads/2020/03/Corgi_1583857179.jpg'

  const saveHandler = () => {
    const thisPost = {
      date: new Date().toJSON(),
      text: text, // совпадает со стейтом выше
      img: img,
      booked: false
    }
    dispatch(addPost(thisPost))
    navigation.navigate('Main')
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <AppText style={styles.title}>CreateScreen</AppText>
          <AppTextInput 
            style={styles.textArea}
            placeholder="Введите текст поста"
            value={text}
            onChangeText={useText}
            multiline
          />
          <Image 
            style={{ width: '100%', height: 200, marginBottom: 10 }}
            source={{ uri: img }} 
          />
          <AppButton onPress={saveHandler}>
            Создать пост
          </AppButton>      
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Создать пост',
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
    wrapper: {
        padding: 10       
    },
    title: {
      textAlign: 'center',
      marginVertical: 10
    },
    textArea: {
      marginBottom: 10
    }
})