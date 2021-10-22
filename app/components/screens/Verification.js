import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-easy-toast';
import { compose } from 'recompose';

import { color, verify, resendVerify } from '../../utilities';
import { connectAnimation, promisify, connectAuth } from '../../redux';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const Verification = props => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const toastRef = useRef();
  const {
    navigation: {
      navigate,
      state: {
        params: { phoneNumber, password },
      },
    },
  } = props;

  useEffect(() => {
    status === 'ok' && props.closeSignUp();
  }, [status]);

  const tapBackground = () => {
    Keyboard.dismiss();
  };

  const resendCode = () => {
    const params = {
      phoneNumber,
    };

    const searchParams = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');

    resendVerify(searchParams)
      .then(body => {
        toastRef.current.show(body.message, 2000);
      })
      .catch(error => console.log(error.message));
  };

  const submitCode = () => {
    const params = {
      phoneNumber,
      code,
      password
    };

    const searchParams = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');

    if (code.length > 0) {
      verify(searchParams)
        .then(body => {
          setStatus(body.status);
          if (body.status === 'ok') {
            promisify(props.login, searchParams)
              .then(() => {
                AsyncStorage.setItem('@clava:phoneNumber', phoneNumber)
                  .then(() => {
                    // setTimeout(() => navigate('Onboard', { phoneNumber: params.phoneNumber, code }), 3000)
                    navigate('Auth', { screen: 'Home' })
                })
              })
          } else {
            toastRef.current.show(body.message, 2000);
          }
        })
        .catch(error => console.log(error.message));
    } else {
      toastRef.current.show(
        'Please enter the verification code! If you havent received yet, please click Resend to resend the verification code',
        3000
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={tapBackground}>
      <Container>
        {/* {status === 'ok' ? (
          <Cover>
            <Wrapper>
              <Ionicons name="ios-checkmark-circle" size={30} color="#3EE8B5" />
              <Title2>Verification</Title2>
              <Title2>Complete</Title2>
            </Wrapper>
          </Cover>
        ) : ( */}
            <Cover>
              <Wrapper>
                <Ionicons name="ios-phone-portrait" size={50} color="#6039fe" />
                <Title>Verification</Title>
              </Wrapper>
              <P>Please type the verification code sent to your mobile device in the space below.</P>
              <TextInput
                placeholder="Enter Verification Code..."
                keyboardType="numeric"
                onChangeText={val => setCode(val)}
              />
              <WrapperResend>
                <Resend>Didn't receive code?</Resend>
                <TouchableOpacity onPress={() => resendCode()}>
                  <Send>Resend</Send>
                </TouchableOpacity>
              </WrapperResend>
              <TouchableOpacity onPress={() => submitCode()}>
                <SubmitButton>
                  <Submit>Submit</Submit>
                </SubmitButton>
              </TouchableOpacity>
            </Cover>
          {/* )} */}
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
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default compose(connectAuth(),connectAnimation())(Verification)

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${screenHeight * 0.02}px ${screenWidth * 0.1}px;
`;

const Cover = styled.View`
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title2 = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: #6039fe;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 700;
  margin-left: ${screenWidth * 0.05}px;
  color: #6039fe;
`;

const P = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #6039fe;
  margin-top: 20px;
  text-align: center;
`;

const TextInput = styled.TextInput`
  color: #6039fe;
  border-bottom-width: 1;
  border-bottom-color: #3ee8b5;
  box-shadow: 0 10px 10px rgba(134, 130, 130, 0.15);
  margin-top: 20px;
  padding: 2px 5px;
  width: 200px;
`;

const WrapperResend = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Resend = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #6039fe;
`;

const Send = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #6039fe;
  text-decoration-line: underline;
  margin-left: 10px;
`;

const SubmitButton = styled.View`
  background-color: #6039fe;
  box-shadow: 0 10px 10px rgba(134, 130, 130, 0.15);
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 25px;
`;

const Submit = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 600;
`;
