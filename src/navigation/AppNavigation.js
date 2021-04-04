// все роуты приложения
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import { APP_COLORS } from '../enums/APP_COLORS';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { GarmentCareSignsScreen } from '../screens/GarmentCareSignsScreen';
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
            tabBarLabel: 'Мои бирки'
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarIcon: info => (
                <Ionicons name='ios-star' size={25} color={info.tintColor} />
            ),
            tabBarLabel: 'Любимые'
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
    
const GarmentCareSignsNavigator = createStackNavigator(
    {
        GarmentCareSigns: GarmentCareSignsScreen
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
const MainNavigator = createDrawerNavigator(
    {
        // главное и избранное
        PostTabs: {
            screen: BottomNavigator,
            navigationOptions: {
                drawerLabel: 'Мои ярлыки',
                drawerIcon: (
                    <Ionicons 
                        name="ios-home" 
                        size={24} 
                        color={APP_COLORS.CYPRUS} 
                    />
                )
            }
        },
        Create: {
            screen: CreateNavigator,
            navigationOptions: {
                drawerLabel: 'Новый ярлык',
                drawerIcon: (
                    <Ionicons 
                        name="ios-add-circle" 
                        size={24} 
                        color={APP_COLORS.CYPRUS} 
                    />
                )
            }
        },
        GarmentCareSigns: {
            screen: GarmentCareSignsNavigator,
            navigationOptions: {
                drawerLabel: 'Знаки по уходу',
                drawerIcon: (
                    <Ionicons 
                        name="ios-information" 
                        size={24} 
                        color={APP_COLORS.CYPRUS} 
                    />
                )
            }
        }    
    },
    {
        contentOptions: {
            activeTintColor: APP_COLORS.CYPRUS
        }
    }
)
  
  export const AppNavigation = createAppContainer(MainNavigator)