import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-easy-toast';
import { compose } from 'recompose';

import styles from './ChatroomInfoScreen.style';
import { DeleteChatroomModal } from '../components/DeleteChatroomModal';
import { PURPLE, BLUE, GREEN } from '../../../config/style';
import {
  connectChatrooms,
  connectAuth,
  connectSendBird,
  connectJoinedChatrooms,
  connectGiveaways,
} from '../../../redux';
import { uploadImage, mapLogoIcon, color } from '../../../utilities';
import {
  deleteChatroom,
  deleteJoinedChatroom,
  updateChatroom,
} from '../../../utilities/api';
import InputLabel from '../components/InputLabel/InputLabel';
import { toast } from '../../../utilities/toast';
import Clipboard from '@react-native-community/clipboard';
import { UploadImage } from '../components/UploadImage';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ChatroomInfo = props => {
  const {
    navigation: { navigate, goBack },
    joinedChatroomsState: { subbed },
    chatroomsState: { allChatrooms, createdChatrooms },
    authState: { currentUser },
    route: {
      params: { chatroom, isAdmin },
    },
    giveawaysState: { currentGiveaway },
  } = props;

  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [name, setName] = useState(chatroom.name);
  const [description, setDescription] = useState(chatroom.description);
  const [rules, setRules] = useState(chatroom.rules);
  const [imageUrl, setImageUrl] = useState(chatroom.imageUrl);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [allowUserUploads, setAllowUploads] = useState(
    chatroom.allowUserUploads,
  );
  const [editMode, setEditMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const toastRef = useRef();

  const toggleAllowUpload = () => {
    setAllowUploads(!allowUserUploads);
  };

  const _handlePickImage = async () => {
    let result = await new Promise(resolve => {
      ImagePicker.showImagePicker(
        {
          allowsEditing: true,
          mediaType: 'photo',
        },
        response => {
          console.log(response);
          resolve({
            cancelled: response.error || response.didCancel,
            base64: `data:${response.type};base64,${response.data}`,
          });
        },
      );
    });

    if (!result.cancelled && result.base64) {
      setSpinnerVisible(true);
      try {
        const res = await uploadImage({ data: result.base64 });
        if (res.status === 'ok' && res.data) {
          setImageUrl(res.data);
        }
        setSpinnerVisible(false);
      } catch (err) {
        setSpinnerVisible(false);
      }
    }
  };

  const _checkForEmptyFields = () => {
    const nameEmpty = name.trim().length === 0;
    const descriptionEmpty = description.trim().length === 0;
    if (nameEmpty) {
      return 'Name field cannot be left empty.';
    }
    if (descriptionEmpty) {
      return 'Description field cannot be left empty.';
    }
    return '';
  };

  const _editPress = () => {
    const errors = _checkForEmptyFields();
    if (errors) {
      toast(errors, 2000);
    } else {
      props.updateChatroom({
        id: currentChatroom.objectId,
        name,
        description,
      });
    }
  };

  const _handleConfirm = () => {
    if (isAdmin) {
      _deleteChatroom();
    } else {
      _leaveChatroom();
    }
    setShowModal(false);
  };

  const _deleteChatroom = () => {
    props.deleteChatroom({ chatroomId: currentChatroom.objectId });
  };

  const _leaveChatroom = () => {
    setSpinnerVisible(true);
    const bodyData = {
      chatroomId: chatroom.id,
      adminId: chatroom.adminId,
      currentUser,
    };
    deleteJoinedChatroom(bodyData)
      .then(() => {
        setSpinnerVisible(false);
        props.joinedChatrooms();
        props.navigation.replace('Home');
      })
      .catch(err => {
        console.log('error leaving chatroom: ', err);
        setSpinnerVisible(false);
        toastRef.current.show(err.message || 'Error leaving chatroom', 5000);
      });
  };

  const copyLink = () => {
    Clipboard.setString(`https://4fm8o.app.link/${currentChatroom.objectId}`);
    toast('Link copied');
  };

  useEffect(() => {
    let currentChatIndex = 0;
    currentChatIndex = allChatrooms.findIndex(
      room => room.objectId === chatroom.objectId,
    );
    setCurrentChatroom(allChatrooms[currentChatIndex]);
    // if (isAdmin) {

    // } else {
    //   currentChatIndex = subbed.findIndex(
    //     room => room.objectId === chatroom.objectId,
    //   );
    //   setCurrentChatroom(subbed[currentChatIndex]);
    // }
  }, [allChatrooms]);

  useEffect(() => {
    setSpinnerVisible(props.chatroomsState.isFetching);
  }, [props.chatroomsState.isFetching]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: props =>
        isAdmin && (
          <Feather
            name={isAdmin ? 'trash' : 'log-out'}
            style={{ color: '#f00' }}
            size={25}
            onPress={() => setShowModal(true)}
          />
        ),
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <SafeAreaView style={styles.safeContainer}> */}
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
        {!!currentChatroom && isAdmin && (
          <View style={styles.infoContainer}>
            <UploadImage
              onLoading={loading => setSpinnerVisible(loading)}
              imageUrl={imageUrl && imageUrl.url}
              defaultIcon="camera"
              onSelect={file => setImageUrl(file)}
              size={100}
              iconSize={40}
            />
            {/* <View style={styles.memberCountContainer}>
            <Text style={styles.inputTitle}>Member Count:</Text>
            <Text style={styles.memberCountText}>{` ${currentChatroom.memberCount}`}</Text>
          </View> */}
            <InputLabel>
              <TextInput
                placeholder={'Chatroom name'}
                // placeholderTextColor={'#6039FE80'}
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </InputLabel>
            <InputLabel>
              <TextInput
                placeholder={'Chatroom description'}
                // placeholderTextColor={'#6039FE80'}
                style={styles.input}
                value={description}
                onChangeText={setDescription}
              />
            </InputLabel>
            <View style={styles.allowShareSection}>
              <Text style={styles.allowShareText}>
                Users can share pictures/videos:{' '}
              </Text>
              <View style={styles.allowShareToggleContainer}>
                {editMode && (
                  <Switch
                    value={allowUserUploads}
                    onValueChange={toggleAllowUpload}
                    trackColor={{ true: '#D9D9DC' }}
                    thumbColor={allowUserUploads ? GREEN.turquoise : PURPLE.med}
                  />
                )}
                <Text
                  style={
                    allowUserUploads
                      ? styles.allowShareEnabled
                      : styles.allowShareDisabled
                  }>
                  {allowUserUploads ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={_editPress}>
              <Text style={styles.buttonText}>Edit Groupchat</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.shareButton} onPress={copyLink}>
          <Text style={styles.buttonText}>{'Copy Share Url'}</Text>
        </TouchableOpacity>
        {showModal && (
          <DeleteChatroomModal
            data={chatroom}
            isVisible={showModal}
            action={isAdmin ? 'delete' : 'leave'}
            onBackDropPress={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            onConfirm={_handleConfirm}
          />
        )}
        <Spinner visible={spinnerVisible} />
      </KeyboardAwareScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default compose(
  connectChatrooms(),
  connectJoinedChatrooms(),
  connectAuth(),
  connectSendBird(),
  connectGiveaways(),
)(ChatroomInfo);
