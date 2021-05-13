import React, { useEffect, useCallback } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { getCareSignPicture } from '../components/getCareSignPicture';
import { loadCareSigns } from '../store/actions/careSignsAction'

import { AppHeaderIcon } from '../components/ui/AppHeaderIcon';
import { AppText } from '../components/ui/AppText'
import { ScrollView } from 'react-native-gesture-handler';
import { APP_COLORS } from '../enums/APP_COLORS';

export const GarmentCareSignsScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCareSigns())
      }, [dispatch])

    const allCareSigns = useSelector(state => state.careSigns.allCareSigns)

    const getCareSigns = tag => {
      let signsSet = []
      allCareSigns.map(item => {
          { if (item.tag == tag) {signsSet.push(item)} }
      })
      return (
          signsSet.map(i => {
              return (
                  <View style={styles.itemContainer}>
                      <ImageBackground key={i + 10} style={{width: 60, height: 60}} source={{ uri: i.img }} />
                      <View style={{ width: '82%'}}>
                          <AppText style={styles.careSignTitle}>{i.title}</AppText>
                          <AppText style={styles.careSignText}>{i.text}</AppText>
                      </View>
                  </View>    
              )
          })
      )
    }

    return (
        <ScrollView style={{backgroundColor: APP_COLORS.WHITE}}>
            <View style={styles.container}>
                <AppText style={styles.titles}>Стирка</AppText>
                <View style={{padding: 10, display: 'flex', flexWrap: 'wrap'}}>
                    {getCareSigns("wash")}
                </View>
            </View>
            <View style={styles.container}>
                <AppText style={styles.titles}>Отбеливание</AppText>
                <View style={{padding: 10, display: 'flex', flexWrap: 'wrap'}}>
                    {getCareSigns("bleach")}
                </View>
            </View>
            <View style={styles.container}>
                <AppText style={styles.titles}>Сушка (отжим)</AppText>
                <View style={{padding: 10, display: 'flex', flexWrap: 'wrap'}}>
                    {getCareSigns("dry")}
                </View>
            </View>
            <View style={styles.container}>
                <AppText style={styles.titles}>Глажение и прессование</AppText>
                <View style={{padding: 10, display: 'flex', flexWrap: 'wrap'}}>
                    {getCareSigns("iron")}
                </View>
            </View>
            <View style={styles.container}>
                <AppText style={styles.titles}>Профессиональный уход</AppText>
                <View style={{padding: 10, display: 'flex', flexWrap: 'wrap'}}>
                    {getCareSigns("dryclean")}
                </View>
            </View>
        </ScrollView>
    )
}

GarmentCareSignsScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Знаки по уходу',
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
    container: {
      padding: 10
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    titles: {
        paddingLeft: 10,
        paddingBottom: 8,
        fontSize: 18,
        color: APP_COLORS.BROWN,
        fontWeight: '700'
    },
    careSignTitle: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
        color: APP_COLORS.BROWN,
    },
    careSignText: {
      fontSize: 14,
      fontWeight: '400',
      paddingHorizontal: 10,
      color: APP_COLORS.BLACK,
  },
  itemContainer: {
      flexDirection: 'row', 
      marginBottom: 16, 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 16,
      padding: 10,
      borderColor: APP_COLORS.ORANGE
  }
})