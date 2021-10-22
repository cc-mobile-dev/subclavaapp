import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-easy-toast';
import { compose } from 'recompose';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TextInput } from 'react-native-gesture-handler';
import styles from './EditAccountScreen.style';
import { promisify, connectAuth, connectSharedAction } from '../../../redux';
import { uploadImage, color } from '../../../utilities';
import NavigationService from '../../../utilities/navigation';
import { DeleteAccountModal } from '../components/DeleteAccountModal';
import { InputLabel } from '../components/InputLabel';
import navigation from '../../../utilities/navigation';
import { UploadImage } from '../components/UploadImage';
import { toast } from '../../../utilities/toast';
const Parse = require('parse/react-native');

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const EditAccountScreen = props => {
  const {
    authState: { currentUser },
    navigation: { navigate, goBack },
  } = props;

  const [editMode, setEditMode] = useState(true);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const toastRef = useRef();

  useEffect(() => {
    setUsername(currentUser.username);
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setDob(currentUser.birthday);
    setEmail(currentUser.email);
    setAvatarUrl(currentUser.profileImage);
  }, []);

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: (props) => <Feather
  //       name={editMode ? 'check' : 'edit-2'}
  //       style={editMode ? styles.saveIcon : styles.editIcon}
  //       onPress={_handleEditButton}
  //     />
  //   })
  // }, [editMode])

  const _handleEditButton = () => {
    props.updateUser({
      username,
      firstName,
      lastName,
      email,
      imageUrl: avatarUrl,
    });
  };

  const forgotPassword = async () => {
    try {
      await Parse.User.requestPasswordReset(currentUser.email);
      toast(
        'Please check your inbox or spam for password reset instructions',
        2000,
      );
    } catch (e) {
      toast('Could not send reset password email', 2000);
      console.log(e);
    }
  };

  const _handleDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  const _handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const _handleConfirmDelete = () => {
    setSpinnerVisible(true);
    promisify(props.deleteUser, {})
      .then(res => {
        setSpinnerVisible(false);
        setDeleteModalVisible(false);
        props.userLogout();
        NavigationService.navigate('NoAuth');
      })
      .catch(err => {
        toastRef.current.show(err.message || 'Failed to delete account', 2000);
        setSpinnerVisible(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.containerWrapper}>
          <View style={styles.imageWrapper}>
            <UploadImage
              onLoading={loading => setSpinnerVisible(loading)}
              imageUrl={currentUser.imageUrl && currentUser.imageUrl.url}
              name={currentUser.objectId}
              onSelect={file => setAvatarUrl(file)}
            />
          </View>
          <InputLabel>
            <TextInput
              value={username}
              style={styles.inputs}
              underlineColorAndroid={'transparent'}
              editable={editMode}
              onChangeText={setUsername}
            />
          </InputLabel>
          <InputLabel>
            <TextInput
              value={firstName}
              style={styles.inputs}
              editable={editMode}
              onChangeText={setFirstName}
            />
          </InputLabel>
          <InputLabel>
            <TextInput
              value={lastName}
              style={styles.inputs}
              underlineColorAndroid={'transparent'}
              editable={editMode}
              onChangeText={setLastName}
            />
          </InputLabel>
          <InputLabel>
            <TextInput
              value={email}
              style={styles.inputs}
              underlineColorAndroid={'transparent'}
              editable={editMode}
              onChangeText={setEmail}
            />
          </InputLabel>
          {/* <View style={styles.inputItem}>
            <View style={styles.inputLabelWrapper}>
              <Text style={styles.inputLabel}>Birthday</Text>
              <View style={styles.inputLabelUnderline} />
            </View>
            <DatePicker
              style={{ width: '100%' }}
              date={dob}
              mode="date"
              showIcon={false}
              disabled={!editMode}
              placeholder="Enter Birthday"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateText: {
                  color: '#6039fe',
                  fontWeight: 'bold',
                  fontSize: 19,
                  lineHeight: 22,
                },
                placeholderText: {
                  color: '#6039fe',
                },
                dateInput: {
                  borderWidth: 0,
                  color: '#6039fe',
                  alignItems: 'flex-start',
                },
                disabled: {
                  backgroundColor: 'transparent',
                },
              }}
              onDateChange={dob => {
                setDob(dob);
              }}
            />
          </View> */}
          {/* <View style={styles.inputItem}>
            <View style={styles.inputLabelWrapper}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.inputLabelUnderline} />
            </View>
            <TextInput
              value={newPassword}
              style={styles.input}
              underlineColorAndroid={'transparent'}
              editable={editMode}
              onChangeText={val => setNewPassword(val)}
              secureTextEntry
            />
          </View>
          <View style={styles.inputItem}>
            <View style={styles.inputLabelWrapper}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <View style={styles.inputLabelUnderline} />
            </View>
            <TextInput
              value={oldPassword}
              style={styles.input}
              underlineColorAndroid={'transparent'}
              editable={editMode}
              onChangeText={val => setOldPassword(val)}
              secureTextEntry
            />
          </View> */}

          {/* {editMode ? (
          <Text style={styles.editModeDescription}>Tap the field you want to edit</Text>
        ) : (
            <TouchableOpacity style={styles.deleteButton} onPress={_handleDeleteAccount}>
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          )} */}

          <TouchableOpacity
            style={styles.wrapperReset}
            onPress={forgotPassword}>
            <Text style={styles.input}>{'Reset Password'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={_handleEditButton}>
            <Text style={styles.buttonText}>{'Update'}</Text>
          </TouchableOpacity>

          <Spinner visible={setSpinnerVisible} />
        </View>
      </KeyboardAwareScrollView>

      <DeleteAccountModal
        isVisible={deleteModalVisible}
        onBackdropPress={_handleCancelDelete}
        onCancel={_handleCancelDelete}
        onConfirm={_handleConfirmDelete}
      />

      {/* <Toast
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
      /> */}
    </SafeAreaView>
  );
};

export default compose(
  connectAuth(),
  connectSharedAction(),
)(EditAccountScreen);
