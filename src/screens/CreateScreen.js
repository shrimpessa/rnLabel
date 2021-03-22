import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { AppText } from '../components/ui/AppText'
import { AppTextInput } from '../components/ui/AppTextInput'
import { AppButton } from '../components/ui/AppButton'
import { addPost } from '../store/actions/postActions';
import { PhotoPicker } from '../components/PhotoPicker';
import { APP_COLORS } from '../enums/APP_COLORS';

export const CreateScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const [text, useText] = useState('')
  // при изменении не будет рендериться компонент
  const imgRef = useRef()

  const saveHandler = () => {
    const thisPost = {
      date: new Date().toJSON(),
      text: text, // совпадает со стейтом выше
      img: imgRef.current,
      booked: false
    }
    dispatch(addPost(thisPost))
    navigation.navigate('Main')
  }

  const photoPickHandler = uri => {
    imgRef.current = uri
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
          <PhotoPicker onPick={photoPickHandler} />
          <Button 
            style={{ padding: 10}}
            title="Создать пост" 
            color={APP_COLORS.CYPRUS} 
            onPress={saveHandler}
            disabled={!text}
          />    
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