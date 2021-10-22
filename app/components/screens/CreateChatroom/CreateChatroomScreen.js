import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { compose } from 'recompose';

import styles from './CreateChatroomScreen.style';

import { PURPLE, GREEN } from '../../../config/style';
import {
  connectGiveaways,
  connectGlobal,
  connectAuth,
  connectSendBird,
} from '../../../redux';
import { UploadImage } from '../components/UploadImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { toast } from '../../../utilities/toast';
import { InputLabel } from '../components/InputLabel';
import { InputDatePicker } from '../components/InputDatePicker'
import navigation from '../../../utilities/navigation';

const CreateChatroomScreen = props => {

  const { route: { params } } = props;

  const [title, setTitle] = useState(params?.title);
  const [description, setDescription] = useState(params?.description);
  const [date, setDate] = useState(params?.expires)
  const [imageUrl, setImageUrl] = useState(params?.imageUrl);
  const [isNew, setIsNew] = useState(!params?.objectId)
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      title: !isNew ? 'Edit Scheduled Live' : 'Create',
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      headerRight: () => !isNew && <Feather name='trash' color='#f00' size={22} onPress={() => {
        Alert.alert('Confirm', 'Are you sure you want to delete this Live?', [
          {
            text: 'Yes',
            onPress: () => {
              props.deleteGiveaway({
                giveawayId: params.objectId
              })
            }
          },
          {
            text: 'No',
            onPress: null
          }
        ])
      }} />
    });
  }, [params, props.navigation]);

  const canSubmit = () => {
    return title && description;
    // && imageUrl
  };

  useEffect(() => {
    setSpinnerVisible(props.giveawaysState.isFetching);
  }, [props.giveawaysState.isFetching]);

  const _handleSubmit = () => {
    // createFakeChatrooms();
    // return;

    if (!canSubmit) {
      return
    }

    if (date && date.getTime() < Date.now()) {
      toast(
        'Schedule live time has already passed',
      );
      return
    }

    if (!title) {
      toast(
        'Please fill out the title and description fields in order to create your Live.',
      );
      return;
    }

    const bodyParams = {
      title,
      description,
      imageUrl,
      //doing this to different between now and later lives
      //passed to giveaways
      expires: date ? date.getTime() : 0
    };

    // giveaway exists and needs to be updated
    if (!isNew) {
      props.updateGiveaway({
        ...bodyParams,
        id: params.objectId
      })

      setTimeout(() => {
        toast(
          'Live updated successfully',
        );
        props.navigation.goBack()
      }, 1000)
    } else {
      // else create a new giveaway
      props.createGiveaway(bodyParams);
    }

    setTitle('');
    setDescription('')
    setDate(null)
    setImageUrl(null);
  };

  useEffect(() => {
    // const { title, description, rules, imageUrl } = newChatroomData;
    // setTitle('');
    // setImageUrl(null);
    // setDate(null)

  }, []);

  // useEffect(() => {
  //   // setNewChatroomData({ title, description, rules, imageUrl });
  // }, [title, imageUrl, description, rules]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
          <View style={styles.imageWrapper}>
            <UploadImage
              onLoading={() => { }}
              imageUrl={imageUrl && imageUrl.url}
              defaultIcon="camera"
              onSelect={file => setImageUrl(file)}
              size={hp('10%')}
              iconSize={hp('3%')}
              imageStyle={{
                width: 80,
                height: 120,
                borderRadius: 10
              }}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.CreateBody}>
              Fill in the information below to host a Live in Clava
            </Text>
          </View>

          <InputLabel
            wrapperStyle={{
              backgroundColor: canSubmit() ? '#E5FFE0' : '#EBDFFF',
            }}
            inputProps={{
              placeholder: "Name your Live",
              placeholderTextColor: "#b4b4b4",
              style: styles.input,
              value: title,
              onChangeText: setTitle,
              maxLength: 18
            }}>
          </InputLabel>
          <InputLabel
            wrapperStyle={{
              backgroundColor: canSubmit() ? '#E5FFE0' : '#EBDFFF',
            }}
            inputProps={{
              placeholder: "Write your Live description",
              placeholderTextColor: "#b4b4b4",
              style: styles.inputDescription,
              value: description,
              onChangeText: setDescription,
              maxLength: 18,
              maxLength: 160,
              multiline: true
            }}>
          </InputLabel>
          <InputDatePicker
            value={date}
            wrapperStyle={{
              backgroundColor: canSubmit() ? '#E5FFE0' : '#EBDFFF',
            }}
            onSelect={d => setDate(d)}
          />
          <TouchableOpacity
            style={{
              ...styles.greenButton,
              backgroundColor: canSubmit() ? '#379D4D' : '#EBDFFF',
              shadowColor: canSubmit() ? '#379D4D' : '#333',
            }}
            onPress={_handleSubmit}>
            <Text
              style={{
                ...styles.buttonText,
                color: canSubmit() ? '#E5FFE0' : '#848383',
              }}>
              {date ? `${!isNew ? 'Update' : 'Create'} Live` : 'Go Live'}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default compose(
  connectGiveaways(),
  connectGlobal(),
  connectAuth(),
)(CreateChatroomScreen);
