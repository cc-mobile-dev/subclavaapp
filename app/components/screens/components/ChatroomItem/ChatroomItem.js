import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';

import styles from './ChatroomItem.style';
import {
  connectJoinedChatrooms,
  connectAuth,
  connectGiveaways,
  connectChatrooms,
} from '../../../../redux';
import { PURPLE } from '../../../../config/style';
import { mapLogoIcon } from '../../../../utilities/constants';
import { useEffect } from 'reactn';
import { CountdownTimer } from '../CountdownTimer';

const ChatroomItem = props => {
  const { data, onPress, isLast } = props;

  const [chatroom, setChatroom] = useState(null);

  useEffect(() => {
    setChatroom(
      props.chatroomsState.allChatrooms.find(c => c && c.objectId === data.chatroom.objectId),
    );
  }, [props.chatroomsState.allChatrooms]);

  let active = data && data.isActive;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <View
        style={{
          ...styles.listItem,
          ...(active && styles.liveListItem),
          ...isLast && { shadowOpacity: 0 }
        }}>
        <View style={styles.listItemImageWrapper}>
          <Image
            source={{
              uri: (chatroom && chatroom.admin.imageUrl && chatroom.admin.imageUrl.url) || mapLogoIcon,
            }}
            style={styles.listItemImage}
          />
        </View>
        <View style={styles.listItemInfo}>
          <Text style={styles.listItemName}>{`${chatroom && chatroom.admin.username}'s live`}</Text>
          {/* <Text style={styles.listItemSubtitle}>
            <Feather name={data.isLive ? "users" : "users"} style={styles.userIcon} />
            {` 1/1000`}
          </Text> */}
        </View>
        <View
          style={{
            ...styles.right,
            flex: active ? 3 : 2,
          }}>
          <View style={styles.rightElements}>
            {active && data && <CountdownTimer giveaway={data} />}
            <View style={active ? styles.lockButton : styles.chevronButton}>
              <Feather name={active ? "lock" : "clock"} style={active ? styles.lockIcon : styles.chevronIcon} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default compose(connectChatrooms())(ChatroomItem);
