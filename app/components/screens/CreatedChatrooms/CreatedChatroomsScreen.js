import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';
import Spinner from 'react-native-loading-spinner-overlay';

import { connectChatrooms, connectAuth } from '../../../redux';
import styles from './CreatedChatroomsScreen.style';
import { deleteChatroom } from '../../../utilities/api';
import { DeleteChatroomModal } from '../components/DeleteChatroomModal';
import { mapLogoIcon } from '../../../utilities/constants';

const ChatroomItem = props => {
  const { data, onPress, onDelete } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <View style={[styles.listItemImageWrapper, styles.shadow]}>
          <Image source={{ uri: data.imageUrl || mapLogoIcon }} style={styles.listItemImage} />
        </View>
        <Text style={styles.listItemName}>{data.name}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(data)}>
          <Feather name="trash-2" style={styles.deleteButtonIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const CreatedChatroomsScreen = props => {
  const {
    navigation: { goBack, navigate },
    chatroomsState: { createdChatrooms, allChatrooms },
    authState: { currentUser },
  } = props;

  const [chatrooms, setChatrooms] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const _handlePressItem = chatroom => {
    navigate('ChatroomScreen', {
      chatroom,
    });
  };

  const _handleDeleteItem = chatroom => {
    setItemToDelete(chatroom);
  };

  const _handleConfirmDelete = () => {
    if (!itemToDelete) return;

    setSpinnerVisible(true);
    deleteChatroom(itemToDelete.id)
      .then(res => {
        console.log('delete chatroom response', res);
        setSpinnerVisible(false);
        setItemToDelete(null);
        props.getChatrooms({ currentUser });
      })
      .catch(err => {
        console.log('delete chatroom error', err);
        setSpinnerVisible(false);
      });
  };

  const _handleCancelDelete = () => {
    setItemToDelete(null);
  };

  useEffect(() => {
    if (currentUser) {
      console.log('created chat effect')
      // const myChatrooms = filter(allChatrooms, obj => obj.adminId === currentUser.id);
      setChatrooms([...createdChatrooms]);
    } else {
      setChatrooms([]);
    }
  }, [allChatrooms]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={chatrooms}
        renderItem={({ item, index }) => (
          <ChatroomItem data={item} onPress={_handlePressItem} onDelete={_handleDeleteItem} />
        )}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      />
      <Spinner visible={spinnerVisible} />
      {!!itemToDelete && (
        <DeleteChatroomModal
          action='delete'
          data={itemToDelete}
          isVisible={!!itemToDelete}
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
  connectChatrooms()
)(CreatedChatroomsScreen);
