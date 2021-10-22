import React from 'react';
import { Image } from 'react-native';
import { compose } from 'recompose';
import { connectAuth } from '../../../../redux';
import {
  HomeScreen,
  // MapScreen,
  CreateChatroomScreen,
  ProfileScreen,
  Notifications,
  FavoriteChatroomsScreen,
  CreatedChatroomsScreen,
  SearchScreen,
  SettingsScreen,
  EditAccountScreen,
  ChatroomScreen,
  ChatroomInfoScreen,
  PdfDisplay,
  BlockedUsersScreen,
  CategoryScreen,
  CategorySelectionScreen,
} from '../..';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoLiveScreen from '../../GoLive/GoLiveScreen';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import ProfileNavigator from './ProfileNavigator';
import CreateChatroomNavigator from './CreateChatroomNavigator';
import NotificationNavigator from './NotificationNavigator';
import MinuteNavigator from './MinuteNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const NavBar = props => {
  const {
    authState: { currentUser },
  } = props;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#5D32D3',
        inactiveTintColor: '#C4C4C4',
        showLabel: false,

        style: {
          borderTopWidth: 0,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              color={color}
              size={25}
              name={'home-variant-outline'}
              style={{ marginTop: 5 }}
            />
          ),
          tabBarVisible: route.state && !(route.state.index > 0),
        })}
      />
      <Tab.Screen
        name="Minute"
        component={MinuteNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              color={color}
              size={25}
              name={'clock-outline'}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name='Search'
        component={SearchNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Icon color={color} size={25} name={'magnify'} />
          ),
        }}
      /> */}
      {/* {currentUser && currentUser.isInfluencer && (
       
      )} */}
       <Tab.Screen
          name="CreatedChatrooms"
          component={CreateChatroomNavigator}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, focused }) => (
              <Icon
                color={color}
                size={25}
                name={'plus'}
                style={{ marginTop: 5 }}
              />
            ),
          }}
        />
      {/* <Tab.Screen
        name="Notifications"
        component={NotificationNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              color={color}
              size={25}
              name={'bell-outline'}
              style={{ marginTop: 5 }}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => ((
            // !currentUser.avatarUrl ?
            <Icon
              color={color}
              size={25}
              name={'cog'}
              style={{ marginTop: 5 }}
            /> /*: <Image */ /*: <Image*/ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */ /*: <Image */
            // : <Image
            // source={{ uri: currentUser.avatarUrl }}
            // style={{
            //   width: 25,
            //   height: 25,
            //   borderRadius: 12.5
            // }}/>
          ) /*: <Image */),
        }}
      />
    </Tab.Navigator>
  );
};

export default compose(connectAuth())(NavBar);
