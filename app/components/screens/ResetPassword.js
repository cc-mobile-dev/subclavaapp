import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import resetstyles from './ResetPassword.style';
import { color, resetPassword, forgotPassword } from '../../utilities';
import { connectAnimation, connectAuth } from '../../redux';
import { compose } from 'recompose';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ResetPassword = props => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const {
    navigation: { navigate },
  } = props;

  useEffect(() => {
    status === 'ok' && props.closeSignUp();
  }, [status]);

  const tapBackground = () => {
    Keyboard.dismiss();
  };

  const returnToLogin = () => {
    props.forgotPassword(code)
    setTimeout(() => {
      navigate('SignIn');
    }, 1000)

  };

  return (
    <TouchableWithoutFeedback onPress={tapBackground}>
      <View style={resetstyles.Container}>
        <View style={resetstyles.ImageWrapper}>
          <Image
            style={resetstyles.EmailImage}
            source={require('../../assets/images/EmailImage.png')}
          />
        </View>
        <Text style={resetstyles.Header}>Reset Password</Text>
        <Text style={resetstyles.Body}>
          Enter the email below associated with your account. After you hit
          submit there will be a link sent to your email to reset your password.
        </Text>
        <View style={resetstyles.WrapperInput}>
          <TextInput
            autoCapitalize={'none'}
            style={resetstyles.Input}
            placeholder="Enter Email..."
            placeholderTextColor="#555"
            keyboardType="email-address"
            onChangeText={val => setCode(val.toLowerCase())}
          />
        </View>
        {/* <P>
          Enter a new password below and then hit the submit button to change
          your password.
        </P>
        <TextInput
          placeholder="Enter New Passowrd"
          onChangeText={val => setNewPassword(val)}
          secureTextEntry
        /> */}
        <View style={resetstyles.resendWrapper}>
          <Text style={resetstyles.caption}>Didn't receive an email?</Text>
          <TouchableOpacity onPress={() => returnToLogin()}>
            <Text style={resetstyles.captionBold}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={resetstyles.BtnWrapper}>
          <TouchableOpacity
            style={resetstyles.CancelBtn}
            onPress={() => navigate('SignIn')}>
            <Text style={resetstyles.CancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={resetstyles.SubmitBtn}
            onPress={() => returnToLogin()}>
            <Text style={resetstyles.SubmitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default compose(connectAnimation(), connectAuth())(ResetPassword);
