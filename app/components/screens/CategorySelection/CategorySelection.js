import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import { compose } from 'recompose';
import styles from './CategorySelection.style';
import {
  connectChatrooms,
  connectGlobal,
  connectAuth,
  connectSendBird,
  connectSubscriptions,
} from '../../../redux';
import { createChatroom } from '../../../utilities/api';
import { GREEN, PURPLE } from '../../../config/style';

const CategorySelectionScreen = props => {
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState({
    Food: {
      chosen: false,
      value: 'Food',
      image: require('../../../assets/images/Hamburger.png'),
    },
    Travel: {
      chosen: false,
      value: 'Travel',
      image: require('../../../assets/images/Travel.png'),
    },
    Shoes: {
      chosen: false,
      value: 'Shoes',
      image: require('../../../assets/images/Shoes.png'),
    },
    Music: {
      chosen: false,
      value: 'Music',
      image: require('../../../assets/images/Music.png'),
    },
    Fashion: {
      chosen: false,
      value: 'Fashion',
      image: require('../../../assets/images/Fashion.png'),
    },
    Beauty: {
      chosen: false,
      value: 'Beauty',
      image: require('../../../assets/images/Beauty.png'),
    },
  });

  const {
    navigation: { navigate, goBack },
    route: {
      params: { title, description, rules, imageUrl, allowUserUploads },
    },
    chatroomsState: { newChatroomData },
    globalState: { location },
    setNewChatroomData,
    getChatrooms,
    createGroupChannel,
    authState: { currentUser },
  } = props;

  const canSubmit = () => {
    return categories.length > 0;
  };

  const categoryUpdate = category => {
    const {
      [category]: { chosen },
    } = categoryList;
    const removingCatOrAddingAndNotFull = chosen || categories.length < 3;
    // using value of chosen when the pressing happens, so remove if true, add if false
    categoryList[category].chosen = !chosen;
    if (chosen) {
      // remove category
      categories.splice(categories.indexOf(category), 1);
      setCategories([...categories]);
    } else {
      categories.push(category);
      setCategories([...categories]);
    }
    setCategoryList({ ...categoryList });
  };

  const _handleSubmit = () => {
    if (!title) {
      alert(
        'Please fill out the title and description fields in order to create your chatroom.',
      );
      return;
    }

    // const { latitude, longitude } = location;
    let latitude = 0, longitude = 0

    const bodyParams = {
      name: title,
      description,
      rules,
      imageUrl,
      categories,
      latitude,
      longitude,
      allowUserUploads,
      isPublic: true,
    };

    setSpinnerVisible(true);
    createChatroom(bodyParams)
      .then(async res => {
        setSpinnerVisible(false);

        if (res.status === 'ok' && res.data) {
          // props.gotChatroom({ chatroom: res.data })
          console.log('create response data: ', res.data);
          getChatrooms({ currentUser });
          const groupChannel = await createGroupChannel({
            isPublic: true,
            isEphemeral: false,
            isDistinct: false,
            name: title,
            coverImage: imageUrl,
            channelUrl: res.data.id,
          });

          const categoriesUnchosen = { ...categoryList };
          categories.forEach(category => {
            categoriesUnchosen[category].chosen = false;
          });
          setCategories([]);
          setCategoryList(categoriesUnchosen);
          setNewChatroomData({
            title: '',
            description: '',
            rules: '',
            imageUrl: '',
          });
          navigate('ChatroomScreen', {
            chatroom: res.data,
            previousScreen: 'CategorySelection',
          });
          return;
        }

        // AsyncStorage.removeItem('@clava:accessToken');
        // AsyncStorage.removeItem('@clava:refreshToken');
        // navigate('NoAuth');
        setTimeout(
          () => alert(res.message || 'Failed to create chatroom'),
          100,
        );
      })
      .catch(err => {
        setSpinnerVisible(false);
        setTimeout(
          () => alert(err.message || 'Failed to create chatroom'),
          100,
        );
      });
  };


  useEffect(() => {
    setNewChatroomData({ title, description, rules, imageUrl, categories });
  }, [categories]);

  const categoryListArray = Object.values(categoryList);

  return (
    <View style={styles.safeContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {'Select Your Categories (At Least One)'}
          </Text>
        </View>
        <View style={styles.categoryContainer}>
          {categoryListArray.map(category => (
            <View style={styles.box}>
              <TouchableOpacity
                style={
                  category.chosen ? styles.innerActive : styles.innerInactive
                }
                onPress={() => categoryUpdate(category.value)}>
                <Image source={category.image} style={styles.emoji} />
                <Text style={styles.category}>{category.value}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Spinner visible={spinnerVisible} />
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={{
          ...styles.greenButton,
          backgroundColor: canSubmit() ? GREEN.turquoise : PURPLE.eletricViolet
        }}
        onPress={() => _handleSubmit()}>
        <Text style={styles.buttonText}>
          {'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// chosen category color: 49D868
export default compose(
  connectChatrooms(),
  connectGlobal(),
  connectAuth(),
  connectSendBird()
)(CategorySelectionScreen);
