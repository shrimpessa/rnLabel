// все роуты приложения
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { APP_COLORS } from '../enums/APP_COLORS';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { BookedScreen } from '../screens/BookedScreen';

const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? APP_COLORS.WHITE : APP_COLORS.CYPRUS,
            borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
            borderBottomColor: APP_COLORS.CYPRUS                
        },
        headerTintColor: Platform.OS === 'ios' ? APP_COLORS.CYPRUS : APP_COLORS.WHITE
    }
}

const PostNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Post: PostScreen
    },
    navigatorOptions
)

const BookedNavigator = createStackNavigator(
    {
        Booked: BookedScreen,
        Post: PostScreen
    },
    navigatorOptions
)

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarIcon: info => (
                <Ionicons name='ios-albums' size={25} color={info.tintColor} />
            ),
            tabBarLabel: 'Все'
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarIcon: info => (
                <Ionicons name='ios-star' size={25} color={info.tintColor} />
            ),
            tabBarLabel: 'Избранное'
        }
    }
}

const BottomNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(
        bottomTabsConfig,
        {
            activeTintColor: APP_COLORS.WHITE,
            shifting: true,
            barStyle: {
                backgroundColor: APP_COLORS.CYPRUS
            }
        }
    ) 
    : createBottomTabNavigator(  
        bottomTabsConfig,  
        {
            tabBarOptions: {
                activeTintColor: APP_COLORS.CYPRUS
            }
        }
    )

const AboutNavigator = createStackNavigator(
    {
        About: AboutScreen
    },
    navigatorOptions
)

const CreateNavigator = createStackNavigator(
    {
        Create: CreateScreen
    },
    navigatorOptions
)

// главный навигатор
const MainNavigator = createDrawerNavigator({
    // главное и избранное
    PostTabs: {
      screen: BottomNavigator
    },
    About: {
      screen: AboutNavigator
    },
    Create: {
        screen: CreateNavigator
    }
  })
  
  export const AppNavigation = createAppContainer(MainNavigator)