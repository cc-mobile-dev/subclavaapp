import React from 'react';
import { CreateChatroomScreen, CategorySelectionScreen } from '../..';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

const CreateChatroomNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#5D32D3',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#333',
          //   color: '#E5FFE0',
          fontFamily: 'SF Pro Rounded',
          margin: 0,
          padding: 0
        },
        headerStyle: {
          backgroundColor: '#fff',
          //   backgroundColor: '#222',
          //   backgroundColor: '#421290',
          shadowOpacity: 0,
          padding: 0,
          margin: 0,
          elevation: 0
        },
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerLeftContainerStyle: {

        },
        headerBackTitleVisible: false,
        headerRightContainerStyle: {

        },
      }}>
      <Stack.Screen
        name={'CreateChatroomScreen'}
        component={CreateChatroomScreen}
        options={{
          title: 'Create'
        }}
      />
      <Stack.Screen
        name={'CategorySelection'}
        component={CategorySelectionScreen}
        options={{
          title: 'Groupchat Category',
        }}
      />
    </Stack.Navigator>
  );
};

export default CreateChatroomNavigator;
