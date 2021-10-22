import React from 'react';
import { Image } from 'react-native';
import { compose } from 'recompose';
import { connectAuth } from '../../../../redux';
import {
  ProfileScreen,
  CreatedChatroomsScreen,
  SettingsScreen,
  EditAccountScreen,
  PdfDisplay,
  BlockedUsersScreen,
  FavoriteChatroomsScreen,
} from '../..';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoLiveScreen from '../../GoLive/GoLiveScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

const ProfileNavigator = props => {
  const { currentUser } = props.authState;
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerTintColor: '#333',
        headerTitleStyle: {
          fontSize: hp('3.4%'),
          paddingLeft: 12,
          fontWeight: 'bold',
          fontFamily: 'SF Pro Rounded',
          color: '#333',
        },
        headerStyle: {
          shadowOpacity: 0,
          backgroundColor: '#fff',
          height: hp('13%'),
          elevation: 0
        },
        headerLeftContainerStyle: {
          paddingLeft: 30,
        },
        headerRightContainerStyle: {
          paddingRight: 30,
        },
      }}>
      <Stack.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: `@${currentUser && currentUser.username}`,
        })}
      />
      <Stack.Screen
        name={'EditAccount'}
        component={EditAccountScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Edit Account',
          headerTitleStyle: {
            fontSize: 19,
            fontWeight: 'bold',
            color: '#333',
            fontFamily: 'SF Pro Rounded',
          },
          headerStyle: {
            backgroundColor: '#fff',
            shadowOpacity: 0,
            height: hp('13%'),
            elevation: 0
          },
        }}
      />
      <Stack.Screen
        name={'PrivacyPolicy'}
        component={PdfDisplay}
        options={{
          title: 'Privacy Policy',
        }}
      />
      <Stack.Screen
        name={'BlockedUsers'}
        component={BlockedUsersScreen}
        options={{
          title: 'Blocked Users',
        }}
      />
      <Stack.Screen
        name={'CreatedList'}
        component={CreatedChatroomsScreen}
        options={{
          title: 'Created Chatrooms',
        }}
      />
      <Stack.Screen
        name={'FavoriteChatrooms'}
        component={FavoriteChatroomsScreen}
        options={{
          title: 'Subscribed Chatrooms',
        }}
      />
    </Stack.Navigator>
  );
};

export default compose(connectAuth())(ProfileNavigator);
