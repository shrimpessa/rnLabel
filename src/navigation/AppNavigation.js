// все роуты приложения
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { APP_COLORS } from '../enums/APP_COLORS';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';

const PostNavigator = createStackNavigator(
    {
        Main: {
            screen: MainScreen,            
            navigationOptions: () => ({
                title: 'Мой блог',
                
            })
        },
        Post: {
            screen: PostScreen,
            navigationOptions: () => ({
                title: 'Пост',
                // headerStyle: {
                //     backgroundColor: APP_COLORS.DARK_SEA_GREEN
                // }
            }),        
        }
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? APP_COLORS.WHITE : APP_COLORS.CYPRUS,
                borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                borderBottomColor: APP_COLORS.CYPRUS                
            },
            headerTintColor: Platform.OS === 'ios' ? APP_COLORS.CYPRUS : APP_COLORS.WHITE
        }
    }
)

const BookedNavigator = createStackNavigator(
    {
        Booked: BookedScreen,
        Post: PostScreen
    },
    {
        initialRouteName: 'Booked',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? APP_COLORS.WHITE : APP_COLORS.CYPRUS,
                borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                borderBottomColor: APP_COLORS.CYPRUS                
            },
            headerTintColor: Platform.OS === 'ios' ? APP_COLORS.CYPRUS : APP_COLORS.WHITE
        }
    }
)

const BottomNavigator = createBottomTabNavigator(
    {
        Post: {
            screen: PostNavigator,
            navigationOptions: {
                tabBarIcon: info => (
                    <Ionicons name='ios-albums' size={25} color={info.tintColor} />
                )
            }
        },
        Booked: {
            screen: BookedNavigator,
            navigationOptions: {
                tabBarIcon: info => (
                    <Ionicons name='ios-star' size={25} color={info.tintColor} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: APP_COLORS.CYPRUS
        }
    }
)

export const AppNavigation = createAppContainer(BottomNavigator)