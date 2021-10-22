import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import {
  connectAuth,
  connectJoinedChatrooms,
  connectGiveaways,
} from '../../../../redux';
import { HomeScreen, ChatroomScreen, ChatroomInfoScreen } from '../..';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoLiveScreen from '../../GoLive/GoLiveScreen';
import { CountdownTimer } from '../CountdownTimer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

const ChatroomRightHeader = ({
  route,
  currentUser,
  navigation,
  tintColor,
  giveaway,
}) => (
  <View style={{ flexDirection: 'row' }}>
    {(currentUser.objectId === route.params.chatroom.admin.objectId &&
      !giveaway) &&
      <TouchableOpacity
        style={{
          marginRight: wp('4%'),
          backgroundColor: '#5D43DA',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onPress={() => {
          if (route.params.toggleGoLive) {
            route.params.toggleGoLive();
          }
        }}>
        <Text
          style={{
            fontSize: hp('1.5%'),
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            width: wp('16%'),
            paddingVertical: hp('0.5%'),
            paddingHorizontal: wp('1%'),
          }}>
          Go Live
        </Text>
      </TouchableOpacity>
    }
    <Icon
      color={tintColor}
      size={hp('3%')}
      name={'settings-outline'}
      onPress={() =>
        navigation.navigate('ChatroomInfoScreen', {
          chatroom: route.params.chatroom,
          isAdmin:
            currentUser.objectId === route.params.chatroom.admin.objectId,
        })
      }
    />
  </View>
);

const HomeNavigator = props => {
  const { currentUser } = props.authState;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerTintColor: '#5D32D3',
        headerTitleStyle: {
          fontSize: 19,
          fontWeight: 'bold',
          fontFamily: 'SF Pro Rounded',
        },
        headerStyle: {
          shadowOpacity: 0,
          backgroundColor: 'transparent',
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
        name={'Home'}
        component={HomeScreen}
        options={{
          title: 'Lives',
          headerTitleStyle: {
            fontSize: hp('3.4%'),
            fontWeight: 'bold',
            paddingLeft: 12,
            paddingTop: 10,
            color: '#333',
            fontFamily: 'SF Pro Rounded',
          },
          headerStyle: {
            backgroundColor: '#fff',
            shadowOpacity: 0,
            height: hp('12%'),
            elevation: 0
          },
        }}
      />
      {/* <Stack.Screen
        name={'ChatroomScreen'}
        component={ChatroomScreen}
        options={({ navigation, route }) => {
          return {
            title: route.params.chatroom && route.params.chatroom.name,
            headerTintColor: '#333',
            headerTitleStyle: {
              fontSize: hp('2.4%'),
              fontWeight: 'bold',
              color: '#333',
            },
            headerRight: data => (
              <ChatroomRightHeader
                {...data}
                navigation={navigation}
                currentUser={currentUser}
                route={route}
                giveaway={props.giveawaysState.all.find(
                  g => g.chatroom && g.chatroom.objectId === route.params.chatroom.objectId,
                )}
              />
            ),
            headerRightContainerStyle: {
              paddingRight: 20,
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
            <Icon color={props.tintColor} size={20} name={'pencil-outline'} />
          ),
        })}
      /> */}
      <Stack.Screen
        name={'GoLive'}
        component={GoLiveScreen}
        options={{
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default compose(
  connectJoinedChatrooms(),
  connectAuth(),
  connectGiveaways(),
)(HomeNavigator);
