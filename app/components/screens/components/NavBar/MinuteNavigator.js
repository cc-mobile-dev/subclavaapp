import React from 'react';
import { CreateChatroomScreen, CategorySelectionScreen } from '../..';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MinutesScreen } from '../..';

const Stack = createStackNavigator();

const MinuteNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerTintColor: '#5D32D3',
        headerTitleStyle: {
          fontSize: hp('3.4%'),
          fontWeight: 'bold',
          paddingLeft: 12,
          paddingTop: 10,
          color: '#333',
          //   color: '#E5FFE0',
          fontFamily: 'SF Pro Rounded',
        },
        headerStyle: {
          backgroundColor: '#fff',
          //   backgroundColor: '#222',
          //   backgroundColor: '#421290',
          shadowOpacity: 0,
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
      <Stack.Screen
        name={'Minutes'}
        component={MinutesScreen}
        options={{
          title: 'Minutes',
        }}
      />
    </Stack.Navigator>
  );
};

export default MinuteNavigator;
