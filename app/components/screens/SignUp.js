import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  TouchableOpacity,
  Animated,
  Keyboard,
  ScrollView,
  Dimensions,
  TextInput,
  Text,
  View,
} from 'react-native';
import signUpStyle from './SignUp.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';
import Toast from 'react-native-easy-toast';
import { useDarkMode } from 'react-native-dark-mode';
import Spinner from 'react-native-loading-spinner-overlay';

// import DismissKeyboardView from './components/dismissKeyboardHOC';
import CountryCodeSelector from './components/CountryCodeSelector';
import { color, uploadPublicImage } from '../../utilities';
import { connectAnimation, connectAuth } from '../../redux';
import { compose } from 'recompose';
import { UploadImage } from './components/UploadImage';
import { InputLabel } from './components/InputLabel';
import { toast } from '../../utilities/toast';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const SignUp = props => {
  const top = new Animated.Value(screenHeight);
  const { navigate } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [width, setWidth] = useState(20);
  const [checked, setChecked] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const isDarkMode = useDarkMode();
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [isInfluencer, setIsInfluencer] = useState(false);
  const [influencerCode, setInfluencerCode] = useState('');
  const inputs = {};

  useEffect(() => {
    toggleSignUp();
    return () => Keyboard.dismiss();
  }, []);

  useEffect(() => {
    toggleSignUp();
  }, [props.animationState.action]);

  const toggleSignUp = () => {
    if (props.animationState.action === 'openSignUp') {
      Animated.spring(top, {
        toValue: 0,
        useNativeDriver: false
      }).start();
    }

    if (props.animationState.action === 'closeSignUp') {
      Keyboard.dismiss();
      Animated.spring(top, {
        toValue: screenHeight,
        useNativeDriver: false
      }).start();
    }
  };

  // useEffect(() => {
  //   setWidth(20 + (countryCode.length - 2) * 10);
  // }, [countryCode]);

  // const formatDate = date => {
  //   var d = new Date(date),
  //     month = '' + (d.getMonth() + 1),
  //     day = '' + d.getDate(),
  //     year = d.getFullYear();

  //   if (month.length < 2) month = '0' + month;
  //   if (day.length < 2) day = '0' + day;

  //   return [month, day, year].join('/');
  // };

  const submitSignUp = () => {
    const params = {
      firstName,
      lastName,
      username,
      password,
      email: email.toLowerCase(),
      dob: Date.now(),
      avatarUrl,
      isInfluencer: true,
    };

    if (firstName.length === 0) {
      toast('Please enter your first name!', 3000);
      return;
    } else if (lastName.length === 0) {
      toast('Please enter your last name!', 3000);
      return;
    } else if (email.length === 0) {
      toast('Please enter phone number!', 3000);
      return;
    } else if (username.length === 0) {
      toast('Please enter your username!', 3000);
      return;
    } else if (password.length === 0) {
      toast('Please enter your password!', 3000);
      return;
    }

    props.signup(params);
  };

  const focusTheField = id => {
    inputs[id].focus();
  };

  return (
    <AnimatedContainer style={{ top }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          <View style={signUpStyle.Container}>
            <TouchableOpacity
              style={signUpStyle.BackBtnWrapper}
              onPress={() => props.closeSignUp()}>
              <Ionicons name="ios-arrow-back" size={25} color="#EBDFFF" />
            </TouchableOpacity>
            <View style={signUpStyle.HeaderWrapper}>
              <Text style={signUpStyle.SignUpHeader}>Sign Up</Text>
              <UploadImage
                onLoading={loading => setSpinnerVisible(loading)}
                imageUrl={avatarUrl && avatarUrl.url}
                onSelect={file => setAvatarUrl(file)}
                imageStyle={{
                  marginTop: 20,
                }}
              />
            </View>
            <View style={signUpStyle.Content}>
              <InputLabel>
                <TextInput
                  ref={input => {
                    inputs['firstName'] = input;
                  }}
                  onChangeText={val => setFirstName(val)}
                  value={firstName}
                  style={signUpStyle.Input}
                  placeholder="Enter your First Name..."
                  placeholderTextColor="#797979"
                  onSubmitEditing={() => {
                    focusTheField('lastName');
                  }}
                />
              </InputLabel>

              <InputLabel>
                <TextInput
                  ref={input => {
                    inputs['lastName'] = input;
                  }}
                  value={lastName}
                  style={signUpStyle.Input}
                  onChangeText={val => setLastName(val)}
                  placeholder="Enter your Last Name..."
                  placeholderTextColor="#797979"
                  onSubmitEditing={() => {
                    focusTheField('email');
                  }}
                />
              </InputLabel>

              <InputLabel>
                <TextInput
                  ref={input => {
                    inputs['email'] = input;
                  }}
                  autoCapitalize={'none'}
                  value={email}
                  style={signUpStyle.Input}
                  onChangeText={email => setEmail(email)}
                  placeholder="Enter your Email..."
                  placeholderTextColor="#797979"
                  onSubmitEditing={() => focusTheField('username')}
                />
              </InputLabel>

              <InputLabel>
                <TextInput
                  ref={input => {
                    inputs['username'] = input;
                  }}
                  autoCapitalize={'none'}
                  value={username}
                  style={signUpStyle.Input}
                  onChangeText={val => setUsername(val)}
                  placeholder="Enter your Username..."
                  placeholderTextColor="#797979"
                  onSubmitEditing={() => {
                    focusTheField('password');
                  }}
                />
              </InputLabel>

              <InputLabel>
                <TextInput
                  ref={input => {
                    inputs['password'] = input;
                  }}
                  autoCapitalize={'none'}
                  value={password}
                  style={signUpStyle.Input}
                  onChangeText={val => setPassword(val)}
                  placeholder="Enter your Password..."
                  placeholderTextColor="#797979"
                  secureTextEntry
                />
              </InputLabel>
              {/* <View style={signUpStyle.TalentWrapper}>
                <CheckBox
                  rightText="Sign up as an Influencer, Brand, or Creative?"
                  uncheckedCheckBoxColor="#EBDFFF"
                  checkedCheckBoxColor="#E5FFE0"
                  isChecked={isInfluencer}
                  onClick={() => setIsInfluencer(!isInfluencer)}
                />
                <Text style={signUpStyle.TalentText}>
                  Sign up as an Influencer, Brand, or Creative?
                </Text>
              </View> */}

              <View style={signUpStyle.AgreeWrapper}>
                <TouchableOpacity>
                  <CheckBox
                    uncheckedCheckBoxColor="#EBDFFF"
                    // checkBoxColor="#EBDFFF"
                    checkedCheckBoxColor="#E5FFE0"
                    isChecked={checked}
                    onClick={() => {
                      setChecked(!checked);
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={signUpStyle.AgreeLink}
                  onPress={() => navigate('TermsOfService')}>
                  {' '}
                  Agree to Terms and Conditions{' '}
                </Text>
              </View>
              <TouchableOpacity
                style={signUpStyle.SignUpBtn}
                onPress={() => submitSignUp()}>
                <Text style={signUpStyle.SignUpBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <Spinner visible={spinnerVisible} />
    </AnimatedContainer>
  );
};

const Container = styled.View`
  position: absolute;
  background: white;
  height: 100%;
  width: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
  background-color: #7823ff;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

export default compose(
  connectAuth(),
  connectAnimation(),
)(SignUp);

/*
      const WrapperBirthday = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #6039fe;
`;

const WrapperPhoneInput = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #6039fe;
`;

const CountryCode = styled.Text`
  padding-top: 11px;
  color: #6039fe;
`;

const TextPhoneInput = styled.TextInput`
  height: 40px;
  color: #6039fe;
  width: 200px;
`;


      <StyledText>Birthday</StyledText>
              <WrapperBirthday>
                <DatePicker
                  style={{ width: '100%' }}
                  date={dob}
                  mode="date"
                  placeholder="Enter Birthday"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    datePicker: {
                      backgroundColor: isDarkMode ? 'black' : 'white'
                    },
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateText: {
                      color: '#6039fe',
                    },
                    placeholderText: {
                      color: '#6039fe',
                    },
                    dateInput: {
                      borderWidth: 0,
                      color: '#6039fe',
                      alignItems: 'flex-start',
                      marginLeft: 40,
                    },
                  }}
                  onDateChange={dob => {
                    setDob(dob);
                  }}
                />
              </WrapperBirthday> */

// const InsideContainer = styled.View`
//   height: 100%;
//   width: 100%;
//   padding: ${screenHeight * 0.02}px ${screenWidth * 0.1}px;
// `;

// const Back = styled.View`
//   flex-direction: row;
//   margin-top: ${screenHeight * 0.07}px;
// `;

// const Cover = styled.View`
//   flex-direction: row;
//   width: 100%;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 20px;
// `;

// const SignUpText = styled.Text`
//   font-size: 28px;
//   font-weight: bold;
//   color: #6039fe;
// `;

// const CloseView = styled.View`
//   height: 50px;
//   width: 50px;
//   border-radius: 25px;
//   background-color: white;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0 15px 10px rgba(0, 0, 0, 0.15);
//   elevation: 10px;
// `;

// const Content = styled.View`
//   margin-top: ${screenHeight * 0.01}px;
// `;

// const InfluencerText = styled.Text`
//   font-style: normal;
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 16px;
//   text-align: center;
// `;

// color: #6039fe;
// const StyledText = styled.Text`
//   font-size: 19px;
//   font-weight: 700;
//   margin-top: 20;
// `;

// const StyledTextInput = styled.TextInput`
//   border-bottom-width: 1px;
//   border-bottom-color: #6039fe;
//   height: 40px;
//   color: #6039fe;
// `;

// const Wrapper = styled.View`
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-top: ${screenHeight * 0.03}px;
// `;

// const TermsText = styled.Text`
//   font-size: 12px;
//   font-weight: 300;
//   color: #3609fe;
// `;

// // color: #3ee8b5;
// const TermsLink = styled.Text`
//   font-size: 15px;
//   font-weight: 300;
//   text-decoration-line: underline;
//   color: #49d868;
// `;

// // background-color: #3ee8b5;
// const SignUpBtn = styled.View`
//   height: 40px;
//   width: 280px;
//   background-color: #49d868;
//   box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
//   border-radius: 14px;
//   justify-content: center;
//   align-self: center;
//   margin-top: ${screenHeight * 0.02}px;
//   margin-bottom: ${screenHeight * 0.05}px;
// `;

// const SignUpTxt = styled.Text`
//   font-size: 18px;
//   font-weight: 500;
//   color: white;
//   align-self: center;
// `;
/* {isInfluencer && (
                <StyledTextInput
                  ref={input => {
                    inputs['influencerCode'] = input;
                  }}
                  value={influencerCode}
                  onChangeText={val => setInfluencerCode(val)}
                  placeholder="Enter Code(Supplied by Admin)"
                  placeholderTextColor="#6039fe"
                  secureTextEntry
                />
              )} */
