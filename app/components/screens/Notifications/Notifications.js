import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';
// import { Avatar } from 'stream-chat-expo';
// import Toast from 'react-native-easy-toast';

import styles from './Notifications.style';
import {
  connectAuth,
  connectNotification,
  connectGlobal,
  connectChatrooms,
} from '../../../redux';
import { getMessage, getNotificationMessage } from './constants';
import { mapLogoIcon } from '../../../utilities/constants';

const NotificationItem = ({ event, getChatroom, navigate }) => {
  const chatroom = getChatroom(event.data.giveaway.chatroom.objectId);

  const timeDifference = (previous) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 52;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - new Date(previous).getTime();

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + 's';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + 'm';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + 'h';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + 'd';
    }

    else {
      return Math.round(elapsed / msPerMonth) + ' ago';
    }
  }

  return (
    chatroom ? <TouchableOpacity
      onPress={() => { }}
      style={styles.notificationItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.listItemImageWrapper}>
          <Image
            source={{
              uri: event.chatroom && event.chatroom.admin.imageUrl ? event.chatroom.admin.imageUrl.url : mapLogoIcon,
            }}
            style={styles.listItemImage}
          />
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.headerTitle}>
            {`${getNotificationMessage(event.type, chatroom)}`}
          </Text>
          {event.data.giveaway && <Text style={styles.menuItemText}>{`${event.data.giveaway.description}`}</Text>}
        </View>
        <View style={styles.endView}>
          <Text style={styles.timeText}>
            <Feather name="clock" size={13} color="#555" />
            {` ${timeDifference(event.createdAt)}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity> : <View />
  );
};

const Notifications = props => {
  const {
    navigation: { navigate },
    authState: { currentUser },
    notificationState,
    chatClient,
  } = props;

  const handleGoToProfile = () => {
    navigate('Profile', {
      chatClient,
    });
  };

  useEffect(() => {
    props.getNotifications();
  }, []);

  const handleCreateChatroom = () => {
    if (!props.globalState.location) {
      alert(
        'Please enable location services in settings in order to create a chatroom.',
      );
      return;
    }

    navigate('CreateChatroom', { chatClient });
  };

  const handleGoToHome = () => {
    navigate('Home');
  };

  const getChatroom = chatRoomId => {
    const {
      chatroomsState: { allChatrooms },
    } = props;
    const chatroomIndex = allChatrooms.findIndex(
      room => room.objectId === chatRoomId,
    );
    const chatroom = allChatrooms[chatroomIndex];
    return chatroom;
  };



  return (
    <View style={styles.container}>
      <FlatList
        data={notificationState.items}
        renderItem={({ item, index }) => (
          <NotificationItem
            event={item}
            getChatroom={getChatroom}
            navigate={navigate}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        onRefresh={() => props.getNotifications()}
        refreshing={props.notificationState.isFetching}
      // contentContainerStyle={{ alignItems: 'flex-start' }}
      // style={{ marginTop: 20, marginLeft: 10 }}
      />
      {/* <ActionButton
        buttonColor={PURPLE.eletricViolet}
        size={40}
        offsetY={40}
        renderIcon={() => <Feather name={'bell'} style={styles.buttonIcon} />}>
        <ActionButton.Item buttonColor={BLUE.dark} onPress={handleGoToHome}>
          <Feather name="home" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={BLUE.dark}
          onPress={handleCreateChatroom}>
          <Feather name="plus" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={BLUE.dark} onPress={handleGoToProfile}>
          {currentUser.avatarUrl ? (
            <Image
              source={{ uri: currentUser.avatarUrl }}
              style={styles.actionButtonImage}
            />
          ) : (
            <Feather name="user" style={styles.actionButtonIcon} />
          )}
        </ActionButton.Item>
      </ActionButton> */}
    </View>
  );
};

Notifications.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default compose(
  connectGlobal(),
  connectAuth(),
  connectNotification(),
  connectChatrooms(),
)(Notifications);
