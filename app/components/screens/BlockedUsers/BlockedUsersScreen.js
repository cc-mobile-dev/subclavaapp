import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';
import { filter } from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import { connectChatrooms, connectAuth, connectSendBird } from '../../../redux';
import styles from './BlockedUsersScreen.style';
import { deleteChatroom } from '../../../utilities/api';
import { ConfirmModal } from '../components/ConfirmModal';
import { sbCreateBlockedUserListQuery } from '../../../redux/modules/sendbird/sendbirdActions';

export const UserItem = props => {
  const { data, onPress, onDelete, last } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={last ? styles.lastListItem : styles.listItem}>
        <View style={[styles.listItemImageWrapper, styles.shadow]}>
          {data.profileUrl ? (
            <Image source={{ uri: data.profileUrl }} style={styles.listItemImage} />
          ) : (
            <Feather name="user" style={styles.markerIcon} />
          )}
        </View>
        <Text style={styles.listItemName}>{data.nickname}</Text>
        {onDelete && <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(data)}>
          <Feather name="x-circle" style={styles.deleteButtonIcon} />
        </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
};

const BlockedUsersScreen = props => {
  const {
    navigation: { goBack, navigate, getParam },
    sendBirdState: { blockUser: { list: blockedUserList, unblockedUserId } },
    authState: { currentUser },
    getBlockUserList,
    initBlockUser
  } = props;

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const _handlePressItem = chatroom => {
    // setSelectedItem(item);
  };

  const _handleDeleteItem = item => {
    setSelectedItem(item);
  };

  const _handleConfirmDelete = () => {
    if (!selectedItem) return;

    setSpinnerVisible(true);
    props.onUnblockUserPress(selectedItem.userId);
  };

  const _handleCancelDelete = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (selectedItem && unblockedUserId === selectedItem.userId) {
      setSpinnerVisible(false);
      setSelectedItem(null);
    }

    // if (unblockedUserId) {
    //   // initBlockUser();
    // }

    // let q = sbCreateBlockedUserListQuery();
    // getBlockUserList(q)
  }, [unblockedUserId]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={blockedUserList}
        renderItem={({ item, index }) => (
          <UserItem key={index} data={item} onPress={_handlePressItem} onDelete={_handleDeleteItem} />
        )}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      />
      <Spinner visible={spinnerVisible} />
      {!!selectedItem && (
        <ConfirmModal
          title={`Are you sure you want to unblock @${selectedItem.nickname}`}
          isVisible={!!selectedItem}
          onBackdropPress={_handleCancelDelete}
          onCancel={_handleCancelDelete}
          onConfirm={_handleConfirmDelete}
        />
      )}
    </SafeAreaView>
  );
};

export default compose(
  connectAuth(),
  connectChatrooms(),
  connectSendBird()
)(BlockedUsersScreen);