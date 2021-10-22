import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';

import { connectJoinedChatrooms, connectAuth } from '../../../redux';
import styles from './FavoriteChatroomsScreen.style';
import { mapLogoIcon } from '../../../utilities/constants';
import Icon from 'react-native-vector-icons/Feather';
import { PURPLE } from '../../../config/style';

const ChatroomItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View style={styles.listItem}>
        <View style={[styles.listItemImageWrapper, styles.shadow]}>
          <Image
            source={{ uri: data.imageUrl || mapLogoIcon }}
            style={styles.listItemImage}
          />
        </View>
        <Text style={styles.listItemName}>{data.name}</Text>
        <View style={styles.deleteButton}>
          <Feather name="chevron-right" color={PURPLE.dark} size={22} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FavoriteChatroomsScreen = props => {
  const {
    navigation: { goBack, navigate, getParam },
    // authState: { currentUser },
    joinedChatroomsState: { joinedChatrooms },
  } = props;

  // const chatClient = getParam('chatClient');

  const _handlePressItem = chatroom => {
    // const channel = chatClient.channel('messaging', chatroom.id);

    navigate('ChatroomScreen', {
      chatroom,
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={joinedChatrooms}
        renderItem={({ item, index }) => (
          <ChatroomItem data={item} onPress={_handlePressItem} />
        )}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default compose(
  connectAuth(),
  connectJoinedChatrooms(),
)(FavoriteChatroomsScreen);
