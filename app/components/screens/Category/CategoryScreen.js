import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'recompose';
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Toast from 'react-native-easy-toast';

import Feather from 'react-native-vector-icons/Feather';
import styles from './CategoryScreen.style.js';
import { MarkerModal } from '../components/MarkerModal';
import { mapLogoIcon } from '../../../utilities/constants';
import { PURPLE } from '../../../config/style';
import { promisify, connectAuth, connectJoinedChatrooms, connectChatrooms, connectSendBird, connectSubscriptions, connectGiveaways } from '../../../redux';
import { getChatroomsByCategory } from '../../../utilities';
import { color, addJoinedChatroom } from '../../../utilities';
import { PaidJoinModal } from '../components/PaidJoinModal';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ChatroomItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <View style={[styles.listItemImageWrapper, styles.shadow]}>
          <Image source={{ uri: data.imageUrl || mapLogoIcon }} style={styles.listItemImage} />
        </View>
        <Text style={styles.listItemName}>{data.name}</Text>
        <View style={styles.deleteButton}>
          <Feather name="chevron-right" color={PURPLE.dark} size={22} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategoryScreen = props => {
  const {
    navigation: { navigate },
    route: { params: { category } },
    authState: { currentUser },
    joinedChatroomsState,
    chatroomsState: { allChatrooms }
  } = props;
  const [categoryChatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [showSubmodal, setShowSubmodal] = useState(false);
  const [currentEntitlement, setCurrentEntitlement] = useState(props.subscriptionsState.entitlement)
  const toastRef = useRef();

  useEffect(() => {
    // get category from navigator and fetch using category
    // const { data } = await getChatroomsByCategory(category);
    // setChatrooms(data);
    const chatrooms = allChatrooms.filter(item => item.categories.includes(category));
    setChatrooms(chatrooms);
    props.getSubscriptions()
    props.getUserSubscriptions()
    props.checkSubscriptions()
    props.getGiveaways()
  }, []);

  // only way to hack this
  // after purchase check entitlment and then 
  // navigate to join the chatroom like normal
  useEffect(() => {
    const { latestPurchasedDate, latestTransactionDate } = props.subscriptionsState
    if (latestPurchasedDate > latestTransactionDate) {
      _joinChatroom(true)
    }
  }, [props.subscriptionsState.latestTransactionDate, props.subscriptionsState.latestPurchasedDate])

  const _fetchChatrooms = async () => {
    const { data } = await getChatroomsByCategory(category);
    setChatrooms(data);
  }

  const _handlePressItem = item => {
    const currentUserIsAdmin = item.adminId === currentUser.id;
    const alreadyJoinedChatroom = joinedChatroomsState.joinedChatrooms.find(sub => sub.id === item.id);
    if (currentUserIsAdmin || alreadyJoinedChatroom) {
      _enterChatroom(item);
    } else {
      setCurrentChatroom(item);
      setShowSubmodal(true);
    }
  };

  const _joinChatroom = (isPaid = false) => {
    let paid = isPaid && props.subscriptionsState.latestPurchasedProduct
    const membership = {
      userId: currentUser.id,
      chatroomId: currentChatroom.id,
      adminId: currentChatroom.adminId,
      currentUser,
      price: paid ? props.subscriptionsState.latestPurchasedProduct.price : 0,
      product: paid ? props.subscriptionsState.latestPurchasedProduct.identifier : 'free',
      expiresAt: paid ? props.subscriptionsState.latestExpirationDate : null
    };

    addJoinedChatroom(membership)
      .then(response => {
        if (response.status === 'ok') {
          setCurrentChatroom(null);
          setShowSubmodal(false);
          _enterChatroom(currentChatroom);
          props.joinedChatrooms();
        } else {
          toastRef.current.show('Error joining chatroom. Please contact support if error persists.');
        }
      })
      .catch(err => {
        toastRef.current.show(err.message || 'Failed to subscribe to chatroom');
      })
  }

  const _enterChatroom = (chatroom) => {
    props.onJoinGroupChannel(chatroom.id, chatroom.isPublic)
    navigate('ChatroomScreen', {
      chatroom,
    });
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.route.params.category} Chatrooms</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigate('Home')}>
          <Feather name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categoryChatrooms}
        renderItem={({ item, index }) => <ChatroomItem data={item} onPress={_handlePressItem} />}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      />
      {!!currentChatroom
        ? (currentChatroom.price > 0
          ? <PaidJoinModal
            isVisible={showSubmodal && !!currentChatroom}
            data={{
              ...currentChatroom,
              products: props.subscriptionsState.subscriptions
            }}
            onJoin={props.subscribeToChatroom}
            onBackdropPress={() => setCurrentChatroom(null)}
          />
          : <MarkerModal
            isVisible={showSubmodal && !!currentChatroom}
            data={currentChatroom}
            onJoin={_joinChatroom}
            onBackdropPress={() => setCurrentChatroom(null)}
          />)
        : <View></View>
      }
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
    </SafeAreaView>
  );
};

export default compose(
  connectAuth(),
  connectSendBird(),
  connectChatrooms(),
  connectJoinedChatrooms(),
  connectSubscriptions(),
  connectGiveaways()
)(CategoryScreen);
