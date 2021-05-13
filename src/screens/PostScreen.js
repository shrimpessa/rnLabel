// экран для отдельного поста
import React, { useEffect, useCallback } from 'react';
import { 
    StyleSheet, 
    View, 
    ScrollView,
    Alert, 
    ImageBackground 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AntDesign } from '@expo/vector-icons'; 

import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { APP_COLORS } from '../enums/APP_COLORS';
import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { removePost, toogleBooked } from '../store/actions/postActions';
import { loadCareSigns } from '../store/actions/careSignsAction';
import { seasonHandler } from '../components/seasonHandler'
import { getCareSignPicture } from '../components/getCareSignPicture';

export const PostScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCareSigns())
    }, [dispatch])

    const allCareSigns = useSelector(state => state.careSigns.allCareSigns)

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
        dispatch(toogleBooked(post))
    }, [dispatch, post])

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            "Удаление вещи",
            "Вы точно хотите удалить эту вещь?",
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

    const currencyHandler = () => {
        switch(post.currency) {     
            case "ruble":
              return "RUB";
            case "hryvnia":
              return "UAH";
            case "dollar":
              return "USD";
            case "euro":
              return "EUR";
            case "poundsterling":
              return "GBP";
            case "yen":
              return "JPY";
            case "yuan":
              return "CNY";
            case "won":
              return "KRW";
            default:
              return "RUB";
        }
    }

    const checkingStringForEmptiness = (string) => {
        let thisString
        string.trim() == ''
            ? thisString = <AntDesign style={styles.sizeText} name="smileo" size={20} color={APP_COLORS.BROWN} />
            : thisString = <AppText style={styles.sizeText}>{string}</AppText>
        return thisString
    }

    const checkingPriceForEmptiness = (price) => {
        let thisPrice
        price !== null 
            ? thisPrice = <AppText style={styles.sizeText}>{price}</AppText>
            : thisPrice = <AntDesign style={styles.sizeText} name="smileo" size={20} color={APP_COLORS.BROWN} />
        return thisPrice
    }

    const checkingNotesForEmptiness = (note) => {
        let thisNote
        if (note == null) {
            return 'Вы не добавили каких-либо заметок.'
        }
        note.trim() == ''
            ? thisNote = <AppText style={styles.notesText}>Вы не оставили заметок.</AppText>
            : thisNote = <AppText style={styles.notesText}>{note}</AppText>
        return thisNote
    }

    // действия при удалении поста
    if (!post) {
        return null
    }

    const getPictureBlock = () => {
        return (
            <ImageBackground style={styles.image} source={{uri: post.img}}>
                <View style={styles.headerTextWrap}>
                    <View style={{flexDirection: 'row'}}>
                        {seasonHandler(post.season)}
                        <AppText style={styles.upText}>{post.text}</AppText>
                    </View>                    
                    <AppText style={styles.upText}>{new Date(post.date).toLocaleDateString()}</AppText>
                </View>
            </ImageBackground>
        )
    }

    const getPriceBlock = () => {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={styles.titles}>Цена</AppText>
                 </View>            
                <View style={styles.priceCurrencyBlock}>                
                    <AppText style={styles.priceText}>{checkingPriceForEmptiness(post.price)}</AppText>
                    <AppText style={styles.currencyText}>{currencyHandler()}</AppText>
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
                <View style={{padding: 10, display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                    {getCareSignPicture(post.caresigns, allCareSigns)}
                </View>
            </View>
        )
    }

    const getNotesBlock = () => {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={styles.titles}>Заметки</AppText>
                </View>                
                <AppText style={styles.notesText}>{checkingNotesForEmptiness(post.notes)}</AppText>               
            </View>
        )
    }

    const getButtonsBlock = () => {
        return (
            <View style={styles.buttonsBlock}>
                <AppButton onPress={removeHandler}>
                    Удалить
                </AppButton>
            </View>
        )
    }

    const getUnderwearSizesBlock = () => {
        return (
            <View style={styles.underwearContainer}>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={styles.titles}>Размеры</AppText>
                </View>
                
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>IT</AppText>
                    </View>
                    {checkingStringForEmptiness(post.it)}
                    </View> 
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>EU</AppText>
                    </View>
                    {checkingStringForEmptiness(post.eu)}
                    </View>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>ES</AppText>
                    </View>
                    {checkingStringForEmptiness(post.es)}
                    </View>
                </View> 
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>FR</AppText>
                    </View>
                    {checkingStringForEmptiness(post.fr)}
                    </View>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>UK</AppText>
                    </View>
                    {checkingStringForEmptiness(post.uk)}
                    </View>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>USA</AppText>
                    </View>
                    {checkingStringForEmptiness(post.usa)}
                    </View>  
                </View>
            </View>
        )
    }

    const getTopBottomAndShoesSizesBlock = () => {
        return (
            <View style={styles.underwearContainer}>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={styles.titles}>Размеры</AppText>
                </View>
                
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>US</AppText>
                    </View>
                    {checkingStringForEmptiness(post.us)}
                    </View> 
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>UK</AppText>
                    </View>
                    {checkingStringForEmptiness(post.uk)}
                    </View>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>FR</AppText>
                    </View>
                    {checkingStringForEmptiness(post.fr)}
                    </View>
                </View> 
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>INT</AppText>
                    </View>
                    {checkingStringForEmptiness(post.universalSize)}
                    </View>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>JP</AppText>
                    </View>
                    {checkingStringForEmptiness(post.jp)}
                    </View>
                    <View style={styles.sizeBlock}>
                    <View style={styles.countryCodeBlock} >
                        <AppText style={styles.countryCodeTitle}>CHN</AppText>
                    </View>
                    {checkingStringForEmptiness(post.chn)}
                    </View>  
                </View>
            </View>
        )
    }

    const getOutwearSizesBlock = () => {
        return (
            <View style={styles.underwearContainer}>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={styles.titles}>Размеры</AppText>
                </View>
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlockForTwoElements}>
                        <View style={styles.countryCodeBlock} >
                            <AppText style={styles.countryCodeTitle}>RU</AppText>
                        </View>
                        {checkingStringForEmptiness(post.ru)}
                    </View>
                </View> 
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlockForTwoElements}>
                        <View style={styles.countryCodeBlock} >
                            <AppText style={styles.countryCodeTitle}>US</AppText>
                        </View>
                        {checkingStringForEmptiness(post.us)}
                    </View>
                    <View style={styles.sizeBlockForTwoElements}>
                        <View style={styles.countryCodeBlock} >
                            <AppText style={styles.countryCodeTitle}>INT</AppText>
                        </View>
                        {checkingStringForEmptiness(post.universalSize)}
                    </View> 
                </View>
            </View>
        )
    }

    const getAccessoriesSizesBlock = () => {
        return (
            <View style={styles.underwearContainer}>
                <View style={{flexDirection: 'row'}}>
                    <AppText style={styles.titles}>Размеры</AppText>
                </View>
                <View style={styles.underwearLineBlock}>
                    <View style={styles.sizeBlockForTwoElements}>
                        <View style={styles.countryCodeBlock} >
                            <AppText style={styles.countryCodeTitle}>RU</AppText>
                        </View>
                        {checkingStringForEmptiness(post.ru)}
                    </View>
                    <View style={styles.sizeBlockForTwoElements}>
                        <View style={styles.countryCodeBlock} >
                            <AppText style={styles.countryCodeTitle}>INT</AppText>
                        </View>
                        {checkingStringForEmptiness(post.universalSize)}
                    </View>
                </View>
            </View>
        )
    }

    let topBottomAndShoesScreenPart = (
        <View>
            {getPictureBlock()}
            {getTopBottomAndShoesSizesBlock()}
            {getPriceBlock()}
            {getCareSignsBlock()}
            {getNotesBlock()}
            {getButtonsBlock()}
        </View>    
    )

    let underwearScreenPart = (
        <View>
            {getPictureBlock()}
            {getUnderwearSizesBlock()}
            {getPriceBlock()}
            {getCareSignsBlock()}
            {getNotesBlock()}
            {getButtonsBlock()}
        </View>
    )
    let outerwearScreenPart = (
        <View>
            {getPictureBlock()}
            {getOutwearSizesBlock()}
            {getPriceBlock()}
            {getCareSignsBlock()}
            {getNotesBlock()}
            {getButtonsBlock()}
        </View>    
    )
    let accessoriesScreenPart = (
        <View>
            {getPictureBlock()}
            {getAccessoriesSizesBlock()}
            {getPriceBlock()}
            {getCareSignsBlock()}
            {getNotesBlock()}
            {getButtonsBlock()}
        </View>
    )
    let clearScreenPart =(<View></View>)

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
        <ScrollView style={styles.wrapper}>
            {renderPartChoice(post.category)}
            <View style={{paddingTop: 80}} />
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({ navigation }) => {
    const booked = navigation.getParam('booked')
    const text = navigation.getParam('text')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? "ios-bookmark" : "ios-bookmark-outline"
    return {
        headerTitle: text,
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
    wrapper: {
        padding: 10,
        backgroundColor: APP_COLORS.WHITE
    },
    image: {
        width: '100%',
        height: 380,
        borderWidth: 1,
        borderRadius: 16, 
        borderColor: APP_COLORS.ORANGE,
        overflow: 'hidden'
    },
    headerTextWrap: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: APP_COLORS.TRANSPARENT_BLACK,
        opacity: 0.8,
    },
    titles: {
        padding: 10,
        fontSize: 18,
        color: APP_COLORS.BROWN,
        fontWeight: '700'
    },
    underline: {
        borderBottomWidth: 1.4, 
        marginHorizontal: 10, 
        marginBottom: 4, 
        borderColor: APP_COLORS.BROWN
    },
    upText: {
        color: APP_COLORS.WHITE,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingTop: '1%'
    },
    buttonsBlock: {
        paddingHorizontal: 10
    },
    // ЦЕНА И ВАЛЮТА
    priceCurrencyBlock: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginHorizontal: 10,
        borderWidth: 1, 
        borderRadius: 16,
        borderColor: APP_COLORS.LIGHT_ORANGE,
        backgroundColor: APP_COLORS.LIGHT_ORANGE
    },
    priceText: {
        color: APP_COLORS.WHITE, 
        fontSize: 16, 
        textAlign: 'center', 
        padding: 10, 
        fontWeight: '600'
    },
    currencyText: {
        color: APP_COLORS.LIGTH_YELLOW, 
        fontSize: 16, 
        textAlign: 'center', 
        padding: 10, 
        fontWeight: '500', 
        fontStyle: 'italic'
    },
    // ЗАМЕТКИ
    notesText: {
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: 10,
        paddingBottom: 50,
        color: APP_COLORS.BROWN,
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
    seasonBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    sizeBlock: {
        width: 64,        
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
    sizeBlockForTwoElements: {
        width: '30%',
    },
})