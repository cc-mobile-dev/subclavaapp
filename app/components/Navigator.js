import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// navigation config
import { NavBar } from './screens/components/NavBar';
import {
  SignIn,
  OnboardScreen,
  OnboardScreen2,
  OnboardScreen3,
  Verification,
  ResetPassword,
  PdfDisplay,
  TalentForm,
  LiveVideoScreen,
  CreateChatroomScreen
} from '../components/screens';
import { useEffect, useState } from 'reactn';
import StartupScreen from './screens/StartupScreen';
import { connect } from 'react-redux';
import { connectAuth } from '../redux';
import { compose, withProps } from 'recompose';
import { PURPLE } from '../config/style';
const Parse = require('parse/react-native');

/**
 * @file Manages application navigation
 */

// const Navigator = createAppContainer(
//   createSwitchNavigator({
//     Startup: StartupScreen,
//     NoAuth: NoAuthStack,
//     Auth: NavBar,
//   })
// );

const Stack = createStackNavigator();

const NoAuth = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="Onboard" component={OnboardScreen} />
    <Stack.Screen name="Verification" component={Verification} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="TermsOfService" component={PdfDisplay} options={{
      headerShown: true,
      headerBackTitle: false,
      title: 'Terms & Conditions'
    }} />
  </Stack.Navigator>
);

const MainStack = props => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    let t = await Parse.User.currentAsync();
    if (t) {
      props.setUser(t.toJSON());
    }
    setLoading(false);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="NoAuth"
      mode="modal">
      {loading ? (
        <Stack.Screen
          name="Loading"
          component={StartupScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : !(
        props.authState &&
        props.authState.currentUser &&
        props.authState.onboarded
      ) ? (
            <Stack.Screen
              name="NoAuth"
              component={NoAuth}
              options={() => ({
                headerShown: false,
              })}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={NavBar}
              options={() => ({
                headerShown: false,
              })}
            />
          )}
      <Stack.Screen
        name="TalentForm"
        component={TalentForm}
        options={{
          title: 'Creative Application',
          headerStyle: {
            backgroundColor: '#421290',
            shadowOpacity: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: wp('5%'),
            paddingTop: 2,
          },
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="LiveVideo"
        component={LiveVideoScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditGiveaway"
        component={CreateChatroomScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#5D32D3',
          headerTitleStyle: {
            fontSize: 19,
            fontWeight: 'bold',
            fontFamily: 'SF Pro Rounded',
          },
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: 'transparent',
          },
          headerLeftContainerStyle: {
            paddingLeft: 25,
          },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const RootStack = compose(connectAuth())(MainStack);

const RootNavigator = forwardRef((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  );
});

export default RootNavigator;
