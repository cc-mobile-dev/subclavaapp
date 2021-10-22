import React, { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { compose } from 'recompose';
import talentStyle from './TalentForm.style';
import { connectAuth } from '../../../redux';
import { InputLabel } from '../components/InputLabel';
import styles from '../components/InputLabel/InputLabel.style';
import Spinner from 'react-native-loading-spinner-overlay';
import { toast } from '../../../utilities/toast';

const Parse = require('parse/react-native');

const TalentForm = props => {

  const [app, setApp] = useState({
    socialAccounts: '',
    firstName: '',
    lastName: '',
    address: '',
    paypal: false,
    venmo: false,
    cashapp: false,
    other: false
  })

  const {
    navigation: { navigate },
  } = props;

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);

    return () => Keyboard.dismiss();
  }, []);

  const onEdit = (name, value) => {
    setApp({
      ...app,
      [name]: value
    });
  }
  const onSubmit = () => {
    const {
      socialAccounts,
      firstName,
      lastName,
      address,
      paypal,
      venmo,
      cashapp,
      other
    } = app;
    console.tron.log(app)

    if (socialAccounts.length === 0) {
      toast('Please enter your social accounts!', 3000);
      return;
    } else if (firstName.length === 0) {
      toast('Please enter your first name!', 3000);
      return;
    } else if (lastName.length === 0) {
      toast('Please enter your last name!', 3000);
      return;
    } else if (address.length === 0) {
      toast('Please enter your address!', 3000);
      return;
    } else if (!(!paypal || !venmo || !cashapp || !other)) {
      toast('Please select at least one payment option!', 3000);
      return;
    }

    props.updateTalentForm(app)
  }


  return (
    <View style={talentStyle.Container}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={50}>
        {/* <View style={talentStyle.header}>
          <TouchableOpacity
            style={talentStyle.chevronWrapper}
            onPress={() => props.closeSignUp()}>
            <Ionicons name="ios-arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={talentStyle.headerText}>Apply</Text>
          <View style={talentStyle.chevronWrapper} />
        </View> */}
        {/* <ChatContainer> */}
        {/* </ChatContainer> */}
        <View style={talentStyle.contentWrapper}>
          <Text style={talentStyle.body}>
            Please fill out the information below to Apply as a Creative. We'll
            need this type of information in order to send your earnings. This
            personal data will not be shared.
          </Text>

          <InputLabel>
            <TextInput
              style={styles.input}
              value={app.firstName}
              onChangeText={text => onEdit('firstName', text)}
              placeholder="Confirm Legal First Name..."
              placeholderTextColor="#797979"
            />
          </InputLabel>
          <InputLabel>
            <TextInput
              style={styles.input}
              value={app.lastName}
              onChangeText={text => onEdit('lastName', text)}
              placeholder="Confirm Legal Last Name..."
              placeholderTextColor="#797979"
            />
          </InputLabel>
          <InputLabel>
            <TextInput
              style={styles.input}
              onChangeText={text => onEdit('address', text)}
              placeholder="Enter your address..."
              placeholderTextColor="#797979"
            />
          </InputLabel>
          <View>
            <Text style={talentStyle.chooseText}>
              Choose how you want to get paid below:
            </Text>
            <View style={talentStyle.wrapper}>
              <View style={talentStyle.wrapperVertical}>
                <TouchableOpacity style={talentStyle.wrapper} onPress={() => onEdit('paypal', !app.paypal)}>
                  <CheckBox
                    uncheckedCheckBoxColor="#EBDFFF"
                    // checkBoxColor="#EBDFFF"
                    checkedCheckBoxColor="#E5FFE0"
                    isChecked={app.paypal}
                    onClick={() => { }}
                  />
                  <Text style={talentStyle.chooseOption}>Paypal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={talentStyle.wrapper} onPress={() => onEdit('other', !app.other)}>
                  <CheckBox
                    uncheckedCheckBoxColor="#EBDFFF"
                    // checkBoxColor="#EBDFFF"
                    onClick={() => { }}
                    checkedCheckBoxColor="#E5FFE0"
                    isChecked={app.other}
                  />
                  <Text style={talentStyle.chooseOption}>Other</Text>
                </TouchableOpacity>
              </View>
              <View style={talentStyle.wrapperVertical}>
                <TouchableOpacity style={talentStyle.wrapper} onPress={() => onEdit('venmo', !app.venmo)}>
                  <CheckBox
                    uncheckedCheckBoxColor="#EBDFFF"
                    // checkBoxColor="#EBDFFF"
                    checkedCheckBoxColor="#E5FFE0"
                    isChecked={app.venmo}
                    onClick={() => { }}
                  />
                  <Text style={talentStyle.chooseOption}>Venmo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={talentStyle.wrapper} onPress={() => onEdit('cashapp', !app.cashapp)}>
                  <CheckBox
                    uncheckedCheckBoxColor="#EBDFFF"
                    // checkBoxColor="#EBDFFF"
                    checkedCheckBoxColor="#E5FFE0"
                    isChecked={app.cashapp}
                    onClick={() => { }}
                  />
                  <Text style={talentStyle.chooseOption}>CashApp</Text>
                </TouchableOpacity>
              </View>
            </View>
            <InputLabel>
              <TextInput
                style={styles.input}
                value={app.socialAccounts}
                onChangeText={text => onEdit('socialAccounts', text)}
                placeholder="@username, for multiple seperate with commas"
                placeholderTextColor="#797979"
              />
            </InputLabel>
            <View style={talentStyle.AgreeWrapper}>
              {/* <TouchableOpacity style={talentStyle.wrapper}>
                <CheckBox
                  uncheckedCheckBoxColor="#EBDFFF"
                  // checkBoxColor="#EBDFFF"
                  checkedCheckBoxColor="#E5FFE0"
                  isChecked={checked}
                  onClick={() => {
                    setChecked(!checked);
                  }}
                />
              </TouchableOpacity> */}
              {/* <Text
                style={talentStyle.AgreeLink}
                onPress={() => navigate('TermsOfService')}>
                {' '}
                Agree to Terms and Conditions{' '}
              </Text> */}
            </View>
            <TouchableOpacity
              style={talentStyle.ApplyBtn}
              onPress={() => onSubmit()}
            >
              <Text style={talentStyle.ApplyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* </AnimatedContainer> */}
      <Spinner visible={props.authState.isFetching} />
    </View>
  );
};


export default compose(
  connectAuth(),
)(TalentForm);
