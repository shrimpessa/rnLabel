// все роуты приложения
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
            navigationOptions: () => ({title: 'Пост номер 42'})
        }
    },
    {
        initialRouteName: 'Main'
    }
)

export const AppNavigation = createAppContainer(PostNavigator)