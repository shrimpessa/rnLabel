import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { AppText } from '../components/ui/AppText';
import { AppMultilineTextInput } from '../components/ui/AppMultilineTextInput';
import { AppTextInput } from '../components/ui/AppTextInput';
import { addPost } from '../store/actions/postActions';
import { PhotoPicker } from '../components/PhotoPicker';
import { APP_COLORS } from '../enums/APP_COLORS';
import { TextInput } from 'react-native-gesture-handler';

export const CreateScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  
  const [it, setIt] = useState('')
  const [eu, setEu] = useState('')
  const [es, setEs] = useState('')
  const [fr, setFr] = useState('')
  const [uk, setUk] = useState('')
  const [usa, setUsa] = useState('')

  const [price, setPrice] = useState()
  const [currency, setCurrency] = useState()

  const [notes, setNotes] = useState('')

  // при изменении не будет рендериться компонент
  const imgRef = useRef()

  const saveHandler = () => {
    const thisLabel = {
      text: text,
      img: imgRef.current,
      date: new Date().toJSON(),
      booked: false,      
      category: category,
      price: price, // !!
      currency: currency, // !!
      // style: style, // !!
      // season: season, // !!

      it: it,
      eu: eu,
      es: es,
      fr: fr,
      uk: uk,
      usa: usa,

      // size: size, // !!
      // caresigns: caresigns,

      notes: notes,
    }
    dispatch(addPost(thisLabel))
    navigation.navigate('Main')
  }

  const photoPickHandler = uri => {
    imgRef.current = uri
  }

  const defineRenderPart = value => {
    setCategory(value)
  }

  let clearScreenPart = (<View style={{height: 500}} />)

  // НАЧАЛО - Нижнее белье
  let underwearScreenPart = (
    <View>
      <AppTextInput 
        style={styles.textInputArea}
        placeholder="Название ващей вещи"
        value={text}
        onChangeText={setText}
      />

      <PhotoPicker onPick={photoPickHandler} />

      {/* Блок с размерами */}
      <View style={styles.underwearContainer}>
        <AppText style={styles.headerText}>Размеры</AppText>  
        <View style={styles.underwearLineBlock}>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>IT</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="2C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={3}
                autoCorrect={false} 
                value={it}
                onChangeText={setIt}
              />
            </View> 
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>EU</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="75C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={3}
                autoCorrect={false} 
                value={eu}
                onChangeText={setEu}
              />
            </View>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>ES</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="85C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={3}
                autoCorrect={false} 
                value={es}
                onChangeText={setEs}
              />
            </View>
        </View> 
        <View style={styles.underwearLineBlock}>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>FR</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="85C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={3}
                autoCorrect={false} 
                value={fr}
                onChangeText={setFr}
              />
            </View>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>UK</AppText>
              </View>
              <AppTextInput
                style={styles.input} 
                placeholder="34C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={3}
                autoCorrect={false} 
                value={uk}
                onChangeText={setUk}
              />
            </View>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>USA</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="34C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={3}
                autoCorrect={false} 
                value={usa}
                onChangeText={setUsa}
              />
            </View>  
        </View>     
    </View>
    {/* Блок цены */}
    <View style={styles.elementsNearbyContainer}> 
      <AppTextInput
        style={{ width: '50%' }}
        placeholder="Цена"
        placeholderTextColor={APP_COLORS.LIGHT_GREY}
        autoCorrect={false} 
        value={price}
        onChangeText={setPrice}
        keyboardType='numeric'
      />
      <Picker
        style={{ width: 120, height: Platform.OS === 'android' ? 100 : '100%', margin: -10}}
        itemStyle={{ fontSize: 16, color: APP_COLORS.CYPRUS }}
        selectedValue={currency}
        onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
      >
        <Picker.Item label="RUB ₽" value="ruble" />
        <Picker.Item label="UAH ₴" value="hryvnia" />
        <Picker.Item label="USD $" value="dollar" />
        <Picker.Item label="EUR €" value="euro" />
        <Picker.Item label="GBP £" value="poundsterling" />
        <Picker.Item label="JPY ¥" value="yen" />
        <Picker.Item label="CNY ¥" value="yuan" />
        <Picker.Item label="KRW ₩" value="won" />
      </Picker>
    </View>
    {/* Блок заметок */}
    <AppText style={styles.headerText}>Заметки</AppText>  
    <AppMultilineTextInput 
      style={styles.textInputArea}
      placeholder="Здесь можно сохранить дополнительную информацию о вашей вещи :)"
      value={notes}
      onChangeText={setNotes}
    />

    {/* Кнопка для сохранения новой вещи */}
    <Button
      style={styles.createButton}
      title="Сохранить вещь" 
      color={APP_COLORS.CYPRUS} 
      onPress={saveHandler}
      disabled={!text && !imgRef.current}
    />
  </View>
)
// КОНЕЦ - Нижнее белье

  return (
    // <ScrollView>
    //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //     <View>{underwearScreenPart}</View>
    //   </TouchableWithoutFeedback>      
    // </ScrollView>
    
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>

          <DropDownPicker
            items={[
                {label: 'Верх', value: 'top', icon: () => <Icon name="star" size={18} color={APP_COLORS.CYPRUS} />},
                {label: 'Низ', value: 'bottom', icon: () => <Icon name="star" size={18} color={APP_COLORS.CYPRUS} />},
                {label: 'Нижнее белье и купальники', value: 'underwear', icon: () => <Icon name="star" size={18} color={APP_COLORS.CYPRUS} />},
                {label: 'Верхняя одежда', value: 'outerwear', icon: () => <Icon name="star" size={18} color={APP_COLORS.CYPRUS} />},
                {label: 'Аксессуары', value: 'accessories', icon: () => <Icon name="star" size={18} color={APP_COLORS.CYPRUS} />},
                {label: 'Обувь', value: 'footwear', icon: () => <Icon name="star" size={18} color={APP_COLORS.CYPRUS} />}
            ]}
            defaultNull
            containerStyle={{height: 40}}
            style={{padding: 10, height: '100%', backgroundColor: APP_COLORS.WHITE}}
            itemStyle={{justifyContent: 'flex-start'}}
            labelStyle={{color: APP_COLORS.BLACK}}
            dropDownMaxHeight={300}
            activeLabelStyle={{color: APP_COLORS.LIGHT_GREY}}
            placeholder="Выберите категорию одежды"
            onChangeItem={item => defineRenderPart(item.value)}
          />
          {category === 'underwear'
            ? underwearScreenPart
            : clearScreenPart
          }
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Добавить новую вещь',
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
    padding: 10,
    // flex: 1,
    // justifyContent: 'space-between',     
  },
  textInputArea: {
    marginBottom: 10
  },
  createButton: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  headerText: {
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 8,
    color: APP_COLORS.CYPRUS
  },
  elementsNearbyContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  // underwear
  underwearContainer: {
    borderWidth: 1.4,
    borderRadius: 5,
    padding: 10,
    backgroundColor: APP_COLORS.WHITE
  },  
  underwearLineBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  sizeBlock: {
    width: 64,
  },
  countryCodeBlock: {        
    borderStyle: 'solid',      
    borderWidth: 1.4,
    borderRadius: 3,
    borderColor: APP_COLORS.CYPRUS,  
    backgroundColor: APP_COLORS.CYPRUS 
  },
  countryCodeTitle: {   
    textAlign: 'center',
    color: APP_COLORS.WHITE      
  },
  input: {
    textAlign: 'center',
  },
})