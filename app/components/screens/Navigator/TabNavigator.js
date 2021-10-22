import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trending from '../Trending';
import Alerts from '../Alerts';
import Upload from '../Upload';
// import Home from '../Home';
import Profile from '../Profile';

const activeColor = '#3EE8B5';
const inactiveColor = '#6039fe';
//
// const HomeStack = createStackNavigator({
//   HomeScreen: Home,
// });

const TrendingStack = createStackNavigator({
  TrendingScreen: Trending,
});

const AlertStack = createStackNavigator({
  AlertScreen: Alerts,
});

const UploadStack = createStackNavigator({
  UploadScreen: Upload,
});

const ProfileStack = createStackNavigator({
  ProfileScreen: Profile,
});

// HomeStack.navigationOptions = {
//   tabBarLabel: Home,
//   tabBarIcon: ({ focused }) => (
//     <Icon.Ionicons name="ios-home" size={24} color={focused ? activeColor : inactiveColor} />
//   ),
// };

TrendingStack.navigationOptions = {
  tabBarLabel: Trending,
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-trending-up" size={24} color={focused ? activeColor : inactiveColor} />
  ),
};

UploadStack.navigationOptions = {
  tabBarLabel: Upload,
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-add" size={24} color={focused ? activeColor : inactiveColor} />
  ),
};

AlertStack.navigationOptions = {
  tabBarLabel: Alerts,
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-megaphone" size={20} color={focused ? activeColor : inactiveColor} />
  ),
};

ProfileStack.navigationOptions = {
  tabBarLabel: Profile,
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-contact" size={20} color={focused ? activeColor : inactiveColor} />
  ),
};

const TabNavigator = createBottomTabNavigator({
  // HomeStack,
  TrendingStack,
  UploadStack,
  AlertStack,
  ProfileStack,
});

export default TabNavigator;
