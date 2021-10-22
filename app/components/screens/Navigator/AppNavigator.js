import { createStackNavigator, createAppContainer } from 'react-navigation-stack';
// import TabNavigator from './TabNavigator';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Profile from '../Profile';
// import Home from '../Home';
import Trending from '../Trending';
import Alerts from '../Alerts';

const AppNavigator = createStackNavigator({
  SignIn,
  SignUp,
  Profile,
  // Home,
  Trending,
  Alerts,
});

export default createAppContainer(AppNavigator);
