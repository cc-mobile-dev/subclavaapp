import React from 'react';
import { Image } from 'react-native';
import { compose } from 'recompose';
import { connectAuth, connectJoinedChatrooms } from '../../../../redux';
import { HomeScreen, ChatroomScreen, ChatroomInfoScreen } from '../..';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoLiveScreen from '../../GoLive/GoLiveScreen';

const Stack = createStackNavigator();

const AuthNavigator = props => {
  const { currentUser } = props.authState;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          title: 'Lives',
          headerTitleStyle: {
            fontSize: 32,
            paddingLeft: 8,
            color: '#5D32D3',
          },
          headerStyle: {
            backgroundColor: '#fff',
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name={'ChatroomScreen'}
        component={ChatroomScreen}
        options={({ navigation, route }) => {
          return {
            title: route.params.chatroom && route.params.chatroom.name,
            headerTintColor: '#5D32D3',
            headerTitleStyle: {
              fontSize: 22,
            },
            headerRight: props => (
              <Icon
                color={props.tintColor}
                size={25}
                name={'settings-outline'}
                onPress={() =>
                  navigation.navigate('ChatroomInfoScreen', {
                    chatroom: route.params.chatroom,
                    isAdmin:
                      currentUser.objectId ===
                      route.params.chatroom.admin.objectId,
                  })
                }
              />
            ),
            headerRightContainerStyle: {
              paddingRight: 25,
            },
            tabBarVisible: false,
          };
        }}
      />
      <Stack.Screen
        name={'ChatroomInfoScreen'}
        component={ChatroomInfoScreen}
        options={({ navigation, route }) => ({
          title: `${route.params.chatroom.name} Info`,
          headerRight: props => (
            <Icon color={props.tintColor} size={25} name={'pencil-outline'} />
          ),
        })}
      />
      <Stack.Screen name={'GoLive'} component={GoLiveScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
