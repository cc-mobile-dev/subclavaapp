import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'recompose';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-easy-toast';
import { filter, includes, debounce, get } from 'lodash';

import styles from './SearchScreen.style';
import { MarkerModal } from '../components/MarkerModal';
import { connectChatrooms, connectGlobal, connectSearch, connectAuth, connectJoinedChatrooms, connectSendBird, promisify } from '../../../redux';
import { searchPlaces, getPlaceDetails } from '../../../utilities';
import { mapLogoIcon } from '../../../utilities/constants';
import { color, addJoinedChatroom } from '../../../utilities';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const SearchScreen = props => {
  const {
    chatroomsState: { allChatrooms },
    searchState: { recentSearches },
    navigation: { navigate, goBack },
    authState: { currentUser },
    joinedChatroomsState,
    addToRecentSearches,
  } = props;
  const [filterText, setFilterText] = useState('');
  const [filteredChatrooms, setFilteredChatrooms] = useState([]);
  const [places, setPlaces] = useState([]);
  const [showSubModal, setShowSubmodal] = useState(false);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const toastRef = useRef();

  const _handlePressBack = () => {
    goBack();
  };

  const _renderSearchResultItem = ({ item, index }) => {
    if (item.placeId) {
      return _renderPlaceItem({ item, index });
    } else {
      return _renderChatroomItem({ item, index });
    }
  };

  const _renderChatroomItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => _handlePressChatroomItem(item)}>
        <View style={styles.listItem}>
          <View style={[styles.listItemImageWrapper, styles.shadow]}>
            <Image source={{ uri: item.imageUrl || mapLogoIcon }} style={styles.listItemImage} />
          </View>
          <View style={styles.listItemTextContainer}>
            <Text style={styles.listItemName}>{item.name}</Text>
            <Text style={styles.listItemDescription}>{item.description}</Text>
          </View>
          <Feather name="chevron-right" style={styles.listItemRightIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderPlaceItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => _handlePressPlaceItem(item)}>
        <View style={styles.listItem}>
          <View style={[styles.listItemImageWrapper, styles.shadow]}>
            <Feather name="map-pin" style={styles.listItemLeftIcon} />
          </View>
          <Text style={styles.listItemName}>{item.description}</Text>
          <Feather name="chevron-right" style={styles.listItemRightIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  const _handlePressChatroomItem = item => {
    const currentUserIsAdmin = item.adminId === currentUser.id;
    const alreadyJoinedChatroom = joinedChatroomsState.joinedChatrooms.find(sub => sub.id === item.id);
    if (currentUserIsAdmin || alreadyJoinedChatroom) {
      _enterChatroom(item);
    } else {
      setCurrentChatroom(item);
      setShowSubmodal(true);
    }
  };

  const _joinChatroom = () => {
    const membership = {
      userId: currentUser.id,
      chatroomId: currentChatroom.id,
      adminId: currentChatroom.adminId,
      currentUser
    };

    addJoinedChatroom(membership)
      .then((response) => {
        if (response.status === 'ok') {
          setCurrentChatroom(null);
          setShowSubmodal(false);
          _enterChatroom(currentChatroom);
          props.joinedChatrooms()
        } else {
          toastRef.current.show('Error joining chatroom. Please contact support if error persists.');
        }
      })
      .catch((err) => {
        toastRef.current.show(err.message || 'Failed to subscribe to chatroom');
      });
  }

  const _enterChatroom = (chatroom) => {
    addToRecentSearches(chatroom);
    props.onJoinGroupChannel(chatroom.id, chatroom.isPublic)
    navigate('ChatroomScreen', {
      chatroom,
    });
  }

  const _handlePressPlaceItem = item => {
    // Already have location, item from recent
    if (item.location) {
      goBack();
      if (props.navigation.state.params.onSelectPlace)
        props.navigation.state.params.onSelectPlace(item);
      addToRecentSearches(item);
    } else {
      getPlaceDetails({ placeid: item.placeId })
        .then(res => {
          const location = get(res, 'result.geometry.location', null);

          if (location) {
            const recentItem = { ...item, location };
            goBack();
            if (props.navigation.state.params.onSelectPlace)
              props.navigation.state.params.onSelectPlace(recentItem);
            addToRecentSearches(recentItem);
          }
        })
        .catch(err => {
          console.log('get place detail err', err);
        });
    }
  };

  const _handleChangeFilterText = text => {
    setFilterText(text);
  };

  useEffect(() => {
    const filtered = filter(allChatrooms, obj => includes(obj.name.toLowerCase(), filterText.toLowerCase()));
    setFilteredChatrooms(filtered);
    // debouncedSearchForPlaces(filterText);
  }, [filterText]);

  const searchForPlaces = input => {
    searchPlaces({ input })
      .then(res => {
        const predictions = res.predictions || [];
        const places = predictions.map(obj => {
          return {
            id: obj.id,
            description: obj.description,
            placeId: obj.place_id,
          };
        });
        setPlaces(places);
      })
      .catch(err => {
        console.log('search places err', err);
        setPlaces([]);
      });
  };

  const debouncedSearchForPlaces = debounce(searchForPlaces, 500);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{filterText ? 'Search' : 'Recent Searches'}</Text>
          <TouchableOpacity style={styles.headerBackButton} onPress={_handlePressBack}>
            <Feather name="chevron-left" style={styles.headerBackButtonText} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          enableOnAndroid
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.keyboardAwareScrollViewContainer}>
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={filterText ? filteredChatrooms.concat(places) : recentSearches}
            renderItem={_renderSearchResultItem}
            keyExtractor={(item, index) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <TextInput
            value={filterText}
            onChangeText={_handleChangeFilterText}
            placeholder={'Search places or chatrooms...'}
            placeholderTextColor={'#fff'}
            style={[styles.filterTextInput, styles.shadow]}
            underlineColorAndroid={'transparent'}
            returnKeyType={'search'}
          />
          {!!currentChatroom && <MarkerModal
            isVisible={showSubModal && !!currentChatroom}
            data={currentChatroom}
            onJoin={_joinChatroom}
            onBackdropPress={() => setCurrentChatroom(null)}
          />}
          <Toast
            ref={toastRef}
            style={{
              backgroundColor: color.INFO.backgroundColor,
              borderColor: color.INFO.borderColor,
              maxWidth: screenWidth * 0.8,
            }}
            position="center"
            positionValue={screenHeight * 0.1}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={1}
            textStyle={{ color: color.INFO.color }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default compose(
  connectChatrooms(),
  connectJoinedChatrooms(),
  connectSearch(),
  connectGlobal(),
  connectAuth(),
  connectSendBird(),
)(SearchScreen);
