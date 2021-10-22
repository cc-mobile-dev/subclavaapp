import React from 'react';
import { Image } from 'react-native';
import { compose } from 'recompose';
import { connectAuth } from '../../../../redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Notifications } from '../..';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const NotificationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerTintColor: '#333',
        headerTitleStyle: {
          fontSize: hp('3.4%'),
          fontWeight: 'bold',
          fontFamily: 'SF Pro Rounded',
          paddingLeft: 12,
          paddingTop: 10,
        },
        headerStyle: {
          shadowOpacity: 0,
          backgroundColor: '#fff',
          height: hp('12%'),
          elevation: 0
        },
        headerLeftContainerStyle: {
          paddingLeft: 25,
        },
        headerBackTitleVisible: false,
        headerRightContainerStyle: {
          paddingRight: 25,
        },
      }}>
      <Stack.Screen name={'Notifications'} component={Notifications} />
    </Stack.Navigator>
  );
};

export default NotificationNavigator;
