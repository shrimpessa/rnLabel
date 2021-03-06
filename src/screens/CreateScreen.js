import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView, 
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Platform,
  Text
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';

import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { AppText } from '../components/ui/AppText';
import { AppMultilineTextInput } from '../components/ui/AppMultilineTextInput';
import { AppTextInput } from '../components/ui/AppTextInput';
import { addPost } from '../store/actions/postActions';
import { PhotoPicker } from '../components/PhotoPicker';
import { APP_COLORS } from '../enums/APP_COLORS';
import { loadCareSigns } from '../store/actions/careSignsAction';
import { CareSignsList } from '../components/CareSignsList';

export const CreateScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState()
  const [currency, setCurrency] = useState('ruble')
  const [season, setSeason] = useState('autumnSpring')  
  
  const [fr, setFr] = useState('')
  const [uk, setUk] = useState('')
  const [usa, setUsa] = useState('')

  const [us, setUs] = useState('')
  const [jp, setJp] = useState('')
  const [chn, setChn] = useState('')

  const [ru, setRu] = useState('')

  const [universalSize, setUniversalSize] = useState('')

  const [it, setIt] = useState('')
  const [eu, setEu] = useState('')
  const [es, setEs] = useState('')
  
  const [caresigns, setCaresigns] = useState('')
  const [notes, setNotes] = useState('')

  // при изменении не будет рендериться компонент
  const imgRef = useRef()

  useEffect(() => {
    dispatch(loadCareSigns())
  }, [dispatch])

  const allCareSigns = useSelector(state => state.careSigns.allCareSigns)

  const saveHandler = () => {
    const thisLabel = {
      text: text,
      img: imgRef.current,
      date: new Date().toJSON(),
      booked: false,      
      category: category,
      price: price,
      currency: currency,
      season: season,
      fr: fr,
      uk: uk,
      usa: usa,
      us: us,
      jp: jp,
      chn: chn,
      ru: ru,
      universalSize: universalSize,
      it: it,
      eu: eu,
      es: es,  
      caresigns: caresigns,
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

  const getSaveButton = () => {
    return <Button
      style={styles.createButton}
      title="Сохранить вещь" 
      color={APP_COLORS.ORANGE} 
      onPress={saveHandler}
      disabled={!text && !imgRef.current}
    />
  }

  const getTitleInput = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
            <AppText style={styles.titles}>Название</AppText>          
        </View>
        <AppTextInput 
            style={styles.textInputArea}
            placeholder="Название ващей вещи"
            value={text}
            onChangeText={setText}
        />
      </View>
    )
  }

  const getPhotoPickerButton = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
              <AppText style={styles.titles}>Фотография</AppText>          
          </View>
        <PhotoPicker onPick={photoPickHandler} />
      </View> 
    )
  }

  const getSeasonSelectionBlock = () => {
    return (
      <View>
          <View style={{flexDirection: 'row'}}>
              <AppText style={styles.titles}>Сезонность</AppText>          
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 10}}>          
              <RadioButton.Group onValueChange={newValue => setSeason(newValue)} value={season}>
                <View style={{flexDirection: 'row'}}>          
                  <RadioButton color= {APP_COLORS.ORANGE} value="summer" status={season === 'summer' ? 'checked' : 'unchecked' } />
                  <Text style={styles.radioButtonText}>Лето</Text>
                </View>
                <View style={{flexDirection: 'row'}}>          
                  <RadioButton color= {APP_COLORS.ORANGE} value="autumnSpring" status={season === 'autumnSpring' ? 'checked' : 'unchecked' } />
                  <Text style={styles.radioButtonText}>Осень/весна</Text>
                </View>
                <View style={{flexDirection: 'row'}}>          
                  <RadioButton color= {APP_COLORS.ORANGE} value="winter" status={season === 'winter' ? 'checked' : 'unchecked' } />
                  <Text style={styles.radioButtonText}>Зима</Text>
                </View>
              </RadioButton.Group>
          </View>
      </View>
    )
  }

  const getPriceBlock = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <AppText style={styles.titles}>Цена</AppText>                    
        </View>
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
            style={{ width: '50%', height: Platform.OS === 'android' ? 100 : '100%', margin: -10}}
            itemStyle={{ fontSize: 16, color: APP_COLORS.BROWN }}
            selectedValue={currency}
            onValueChange={(itemValue) => setCurrency(itemValue)}
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
      </View>
    )
  }

  const getCareSignsBlock = () => {
    return (
      <View>
          <View style={{flexDirection: 'row'}}>
              <AppText style={styles.titles}>Знаки по уходу</AppText>                    
          </View>
          <CareSignsList style={{flexDirection: 'row'}} data={allCareSigns} onCareSignPress={onCareSignPress} />
      </View>
    )
  }

  const getNotesBlock = () => {
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
            <AppText style={styles.titles}>Заметки</AppText>
        </View>
        <AppMultilineTextInput 
          style={styles.multilineTextInput}
          placeholder="Здесь можно сохранить дополнительную информацию о вашей вещи."
          value={notes}
          onChangeText={setNotes}
        />
      </View>
    )
  }

  const getUnderwearSizesPack = () => {
    return(
      <View style={styles.underwearContainer}>
        <View style={{flexDirection: 'row'}}>
            <AppText style={styles.titles}>Размеры</AppText>
        </View>
        <View style={styles.underwearLineBlock}>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>IT</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="2C"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
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
                maxLength={6}
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
                maxLength={6}
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
                maxLength={6}
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
                maxLength={6}
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
                maxLength={6}
                autoCorrect={false} 
                value={usa}
                onChangeText={setUsa}
              />
            </View>  
        </View>     
      </View>
    )
  }

  const getTopBottomAndShoesSizesPack = () => {
    return(
      <View style={styles.underwearContainer}>
        <View style={{flexDirection: 'row'}}>
            <AppText style={styles.titles}>Размеры</AppText>
        </View>
        <View style={styles.underwearLineBlock}>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>US</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="8 1/2"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={us}
                onChangeText={setUs}
              />
            </View> 
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>UK</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="8"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={uk}
                onChangeText={setUk}
              />
            </View>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>FR</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="42"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={fr}
                onChangeText={setFr}
              />
            </View>
        </View> 
        <View style={styles.underwearLineBlock}>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>INT</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="S"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={2}
                autoCorrect={false} 
                value={universalSize}
                onChangeText={setUniversalSize}
              />
            </View>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>JP</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="265"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={jp}
                onChangeText={setJp}
              />
            </View>
            <View style={styles.sizeBlock}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>CHN</AppText>
              </View>
              <AppTextInput
                style={styles.input} 
                placeholder="260"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={chn}
                onChangeText={setChn}
              />
            </View>
        </View>     
      </View>
    )
  }

  const getOutwearSizesPack = () => {
    return(
      <View style={styles.underwearContainer}>
        <View style={{flexDirection: 'row'}}>
            <AppText style={styles.titles}>Размеры</AppText>
        </View>
        <View style={styles.underwearLineBlock}>            
            <View style={styles.sizeBlockForTwoElements}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>RU</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="164-80-88"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={14}
                autoCorrect={false} 
                value={ru}
                onChangeText={setRu}
              />
            </View>        
        </View>
        <View style={styles.underwearLineBlock}>
            <View style={styles.sizeBlockForTwoElements}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>US</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="6,8"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={us}
                onChangeText={setUs}
              />
            </View> 
            <View style={styles.sizeBlockForTwoElements}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>INT</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="S"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={2}
                autoCorrect={false} 
                value={universalSize}
                onChangeText={setUniversalSize}
              />
            </View> 
        </View>
      </View>
    )
  }

  const getAccessoriesSizesPack = () => {
    return(
      <View style={styles.underwearContainer}>
        <View style={{flexDirection: 'row'}}>
            <AppText style={styles.titles}>Размеры</AppText>
        </View>
        <View style={styles.underwearLineBlock}>            
            <View style={styles.sizeBlockForTwoElements}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>RU</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="7"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={6}
                autoCorrect={false} 
                value={ru}
                onChangeText={setRu}
              />
            </View>
            <View style={styles.sizeBlockForTwoElements}>
              <View style={styles.countryCodeBlock} >
                <AppText style={styles.countryCodeTitle}>INT</AppText>
              </View>
              <AppTextInput 
                style={styles.input} 
                placeholder="S"
                placeholderTextColor={APP_COLORS.LIGHT_GREY}
                maxLength={2}
                autoCorrect={false} 
                value={universalSize}
                onChangeText={setUniversalSize}
              />
            </View> 
        </View>
      </View>
    )
  }
  
  const onCareSignPress = (careSignId, isCareSignSelected) => {
    let careSignsString = ''
    if (!isCareSignSelected) {
      careSignsString += careSignId + '#'
      setCaresigns(caresigns + careSignsString)
    } else {
      careSignsString = caresigns.split(careSignId).join('');
      setCaresigns(careSignsString)
    }
  }    

  // Нижнее белье
  let underwearScreenPart = (
    <View>
      {getTitleInput()}
      {getPhotoPickerButton()}
      {getSeasonSelectionBlock()}
      {getUnderwearSizesPack()}
      {getPriceBlock()}
      {getCareSignsBlock()}    
      {getNotesBlock()}
      {getSaveButton()}
      <View style={{paddingTop: 80}} />    
    </View>
  )
  // «Верх и платья», «Низ» или «Обувь»
  let topBottomAndShoesScreenPart = (
    <View>
      {getTitleInput()}
      {getPhotoPickerButton()}
      {getSeasonSelectionBlock()}
      {getTopBottomAndShoesSizesPack()}
      {getPriceBlock()}
      {getCareSignsBlock()}
      {getNotesBlock()}
      {getSaveButton()}
      <View style={{paddingTop: 80}} />    
    </View>
  )
  // Верхняя одежда
  let outerwearScreenPart = (
    <View>
      {getTitleInput()}
      {getPhotoPickerButton()}
      {getSeasonSelectionBlock()}
      {getOutwearSizesPack()}
      {getPriceBlock()}
      {getCareSignsBlock()}
      {getNotesBlock()}
      {getSaveButton()}
      <View style={{paddingTop: 80}} />    
    </View>
  )
  // Аксессуары
  let accessoriesScreenPart = (
    <View>
      {getTitleInput()}
      {getPhotoPickerButton()}
      {getSeasonSelectionBlock()}
      {getAccessoriesSizesPack()}
      {getPriceBlock()}
      {getCareSignsBlock()}
      {getNotesBlock()}
      {getSaveButton()}
      <View style={{paddingTop: 80}} />    
    </View>
  )

  let clearScreenPart = (<View style={{height: 500}} />)

  const renderPartChoice = category => {
      switch(category) {     
        case "top":
          return topBottomAndShoesScreenPart;
        case "bottom":
          return topBottomAndShoesScreenPart;
        case "underwear":
          return underwearScreenPart;
        case "outerwear":
          return outerwearScreenPart;
        case "accessories":
          return accessoriesScreenPart;
        case "footwear":
          return topBottomAndShoesScreenPart;
        default:
          return clearScreenPart
      }
  }

  return (    
    <ScrollView style={{backgroundColor: APP_COLORS.WHITE}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <DropDownPicker
            items={[
                {label: 'Верх', value: 'top', icon: () => <Icon name="star" size={18} color={APP_COLORS.BROWN} />},
                {label: 'Низ', value: 'bottom', icon: () => <Icon name="star" size={18} color={APP_COLORS.BROWN} />},
                {label: 'Нижнее белье и купальники', value: 'underwear', icon: () => <Icon name="star" size={18} color={APP_COLORS.BROWN} />},
                {label: 'Верхняя одежда', value: 'outerwear', icon: () => <Icon name="star" size={18} color={APP_COLORS.BROWN} />},
                {label: 'Аксессуары', value: 'accessories', icon: () => <Icon name="star" size={18} color={APP_COLORS.BROWN} />},
                {label: 'Обувь', value: 'footwear', icon: () => <Icon name="star" size={18} color={APP_COLORS.BROWN} />}
            ]}
            defaultNull
            containerStyle={{height: 40}}
            style={{padding: 10, height: '100%', backgroundColor: APP_COLORS.WHITE}}
            itemStyle={{justifyContent: 'flex-start'}}
            labelStyle={{color: APP_COLORS.BROWN, fontWeight: '600', fontSize: 15}}
            dropDownMaxHeight={300}
            activeLabelStyle={{color: APP_COLORS.LIGHT_GREY}}
            placeholder="Выберите категорию одежды"
            onChangeItem={item => defineRenderPart(item.value)}
          />
          {renderPartChoice(category)}
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
    padding: 10     
  },
  titles: {
    padding: 10,
    fontSize: 18,
    color: APP_COLORS.BROWN,
    fontWeight: '700'
  },
  textInputArea: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  createButton: {
    position: 'absolute'
  },
  headerText: {
    fontWeight: '500',
    padding: 10,
    marginBottom: 10,
    paddingBottom: 8,
    fontSize: 16,
    color: APP_COLORS.CYPRUS
  },
  elementsNearbyContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  multilineTextInput: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '500',
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    borderColor: APP_COLORS.BROWN,
    marginBottom: 16
  },
  underwearContainer: {
    marginVertical: 10,
    borderColor: APP_COLORS.ORANGE,
    backgroundColor: APP_COLORS.WHITE
  },  
  underwearLineBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
  },
  sizeBlock: {
    width: 64,
  },
  sizeBlockForTwoElements: {
    width: '30%',
  },
  sizeText: {
      color: APP_COLORS.BROWN,
      marginTop: 4,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '500',
      borderWidth: 1,
      borderRadius: 16,
      padding: 10,
      borderColor: APP_COLORS.ORANGE
  },
  countryCodeBlock: {        
      borderStyle: 'solid',      
      borderWidth: 1,
      borderRadius: 16,
      borderColor: APP_COLORS.LIGHT_ORANGE,  
      backgroundColor: APP_COLORS.LIGHT_ORANGE,
      padding: 4
  },
  countryCodeTitle: {   
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: APP_COLORS.WHITE
  },
  priceBlock: {
      flexDirection: 'row', 
      justifyContent: 'space-around',        
  },
  input: {
    textAlign: 'center',
  },
  radioButtonText: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 10,
    color: APP_COLORS.BROWN,
    marginTop: Platform.OS == 'android' ? '5.4%' : '6%'
  },
})