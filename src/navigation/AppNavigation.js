// все роуты приложения
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import { APP_COLORS } from '../enums/APP_COLORS';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';

const PostNavigator = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: () => ({title: 'Мой блог'})
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

export const AppNavigation = createAppContainer(PostNavigator)