import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  Text,
  Easing,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-easy-toast';
import { compose } from 'recompose';

import SignUp from './SignUp';
import CountryCodeSelector from './components/CountryCodeSelector';
import { color, forgotPassword } from '../../utilities';
import { promisify, connectAnimation, connectAuth } from '../../redux';
import signInStyle from './SignIn.style';
import { InputLabel } from './components/InputLabel';
import styles from './components/UploadImage/UploadImage.style';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const Parse = require('parse/react-native');

const SignIn = props => {
  const scale = new Animated.Value(1);
  const opacity = new Animated.Value(1);
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [width, setWidth] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const {
    navigation: { navigate },
  } = props;

  const toastRef = useRef();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);

    return () => Keyboard.dismiss();
  }, []);

  useEffect(() => {
    // if (props.animationState.action === 'openSignUp') {
    //   Animated.timing(scale, {
    //     toValue: 0.9,
    //     duration: 300,
    //     easing: Easing.in(),
    //   }).start();
    //   Animated.spring(opacity, {
    //     toValue: 0.5,
    //   }).start();

    //   StatusBar.setBarStyle('light-content', true);
    // }

    // if (props.animationState.action === 'closeSignUp') {
    //   Animated.timing(scale, {
    //     toValue: 1,
    //     duration: 300,
    //     easing: Easing.in(),
    //   }).start();
    //   Animated.spring(opacity, {
    //     toValue: 1,
    //   }).start();
    // }

    StatusBar.setBarStyle('dark-content', true);
  }, [props.animationState.action]);

  useEffect(() => {
    setWidth(20 + (countryCode.length - 2) * 10);
  }, [countryCode]);

  const openResetPassword = () => {
    navigate('ResetPassword');
  };

  const submitSignIn = () => {
    const params = {
      password,
      username: email,
    };

    if (email.length === 0) {
      toastRef.current.show('Please enter your Username!', 1000);
      return;
    } else if (password.length === 0) {
      toastRef.current.show('Please enter your Password!', 1000);
      return;
    }
    // setIsLoading(true);

    // const searchParams = Object.keys(params)
    //   .map(key => {
    //     return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    //   })
    //   .join('&');

    props.login(params);

    // promisify(props.login, searchParams)
    //   .then(() => {
    //     AsyncStorage.setItem('@clava:email', email)
    //     // .then(() => navigate('Auth'))
    //   })
    //   .catch(error => toastRef.current.show(error.message || 'Unknow error'))
    //   .finally(() => setIsLoading(false))
  };

  return (
    <RootView>
      <SignUp navigate={navigate} />
      <AnimatedContainer
        style={{
          transform: [{ scale }],
          opacity,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.select({
              ios: -100,
              android: -100
            })}
            keyboardShouldPersistTaps={true}>
            <View style={signInStyle.HeaderWrapper}>
              <Text style={signInStyle.SignInText}>Sign In</Text>
            </View>
            {/* <ChatContainer> */}
            {/* </ChatContainer> */}
            <InputLabel>
              <TextInput
                autoCapitalize={'none'}
                style={signInStyle.Input}
                value={email}
                onChangeText={email => setEmail(email)}
                placeholder="Enter Username..."
                placeholderTextColor="#797979"
              />
            </InputLabel>
            <Image
              style={signInStyle.chatImage}
              source={require('../../assets/images/ClockSignUp.png')}
            />
            <Image
              style={signInStyle.heartImage}
              source={require('../../assets/images/SignupHeart.png')}
            />
            <Image
              style={signInStyle.videoImage}
              source={require('../../assets/images/SignupVideo.png')}
            />
            <InputLabel>
              <TextInput
                style={signInStyle.Input}
                value={password}
                onChangeText={password => setPassword(password)}
                placeholder="Enter Password..."
                placeholderTextColor="#797979"
                secureTextEntry
              />
            </InputLabel>
            <TouchableOpacity
              style={signInStyle.ForgotPassWrapper}
              // () => submitForgotPassword()
              onPress={() => openResetPassword()}>
              <Text style={signInStyle.ForgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={signInStyle.SignInBtnWrapper}
              onPress={() => submitSignIn()}>
              <View style={signInStyle.SignInBtn}>
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={signInStyle.BtnText}>Sign In</Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={signInStyle.WrapperSignUp}>
              <Text style={signInStyle.SignUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={props.openSignUp}>
                <Text style={signInStyle.SignUpCTA}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Toast
          ref={toastRef}
          style={{
            backgroundColor: color.INFO.backgroundColor,
            borderColor: color.INFO.borderColor,
            maxWidth: screenWidth * 0.8,
          }}
          position="top"
          positionValue={screenHeight * 0.1}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={1}
          textStyle={{ color: color.INFO.color }}
        />
      </AnimatedContainer>
    </RootView>
  );
};

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  background: #421290;
  flex: 1;
  position: relative;
  padding: ${screenWidth * 0.1}px;
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

// const Cover = styled.View`
//   flex-direction: row;
//   margin-bottom: -10;
//   margin-top: ${screenHeight * 0.2}px;
//   position: relative;
// `;

// const SignInText = styled.Text`
//   font-size: 28px;
//   color: #e5ffe0;
//   font-family: 'SF Pro Rounded';
// `;

// const SignInBtn = styled.View`
//   background-color: #379d4d;
//   border-radius: 20;
//   box-shadow: 0 18px 10px rgba(0, 0, 0, 0.05);
//   elevation: 10;
//   width: 285px;
//   height: 54px;
//   align-self: center;
//   justify-content: center;
//   align-items: center;

// const WrapperSignUp = styled.View`
//   flex-direction: row;
//   height: 80px;
//   justify-content: center;
//   align-items: center;
//   margin-top: ${screenHeight * 0.2}px;
// `;

// const SignUpCTA = styled.Text`
//   font-size: 17px;
//   font-weight: 900;
//   color: #e5ffe0;
//   margin-left: 5px;
//   text-decoration: underline;
//   text-decoration-color: #e5ffe0;
//   font-family: 'SF Pro Rounded';
// `;

// const SignUpText = styled.Text`
//   font-size: 17px;
//   font-weight: 300;
//   color: #ebdfff;
//   font-family: 'SF Pro Rounded';
// `;

// // const SignInContainer = styled.View`
// //   margin-top: ${screenHeight * 0.03}px;
// // `;

// const WrapperInput = styled.View`
//   flex-direction: row;
//   background-color: #ebdfff;
//   border-radius: 20;
//   padding-left: 10;
//   margin-top: 10;
//   margin-bottom: 10;
// `;

// const TextUsernameInput = styled.TextInput`
//   height: 54px;
//   color: #6039fe;
//   width: 200px;
// `;

// const TextInputPassword = styled.TextInput`
//   height: 54px;
//   color: #6039fe;
// `;

// const ForgotPass = styled.Text`
//   font-size: 14px;
//   font-weight: 300;
//   color: #ebdfff;
//   align-self: center;
//   font-family: 'SF Pro Rounded';
// `;

SignIn.navigationOptions = screenProps => ({
  headerShown: false,
});

export default compose(
  connectAuth(),
  connectAnimation(),
)(SignIn);
