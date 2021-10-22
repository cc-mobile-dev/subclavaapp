import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './PaidJoinModal.style';
import { ClavaModal } from '../ClavaModal';
import { mapLogoIcon } from '../../../../utilities';
import { compose } from 'recompose';
import {
  connectAuth,
  connectChatrooms,
  connectJoinedChatrooms,
  connectSubscriptions,
  connectGiveaways,
} from '../../../../redux';
import Modal from 'react-native-modal';
import { forwardRef } from 'react';
import { navigate } from '../../../../utilities/navigation';
import BalanceTag from '../BalanceTag/BalanceTag';
import { FetchLoader } from '../FetchLoader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PaidJoinModal = props => {
  const {
    giveawaysState: { selectedGiveaway, isFetching, memberships },
    authState: { currentUser },
  } = props;

  const [visibile, setVisible] = useState(false);
  const [later, setLater] = useState(false)

  useEffect(() => {
    // props.getSubscriptions()
  }, []);

  useEffect(() => {
    // if (!selectedGiveaway) {
    //   setVisible(false)
    //   // setTimeout(() => , 500);
    // } else {

    // }

    setVisible(!!selectedGiveaway);
    setLater(selectedGiveaway?.expires > Date.now())
  }, [selectedGiveaway]);

  const onBackdropPress = () => {
    setVisible(false);
    props.unsetSelectedGiveaway()
  };

  // const data = (tryingToJoin &&
  //   props.chatroomsState.allChatrooms.find(
  //     c => c.objectId === tryingToJoin.chatroomId,
  //   )) || { imageUrl: '' };

  const onSelect = () => {
    if (later) {
      //membership
      props.modifyGiveawaysSubscriptions({ giveawayId: selectedGiveaway.objectId })
    } else {
      props.joinGiveaway({
        giveawayId: selectedGiveaway.objectId
      });
    }
  };

  const isSubbed = memberships[selectedGiveaway?.objectId]?.active

  return (
    <Modal
      isVisible={visibile}
      style={{ flex: 1, margin: 0, justifyContent: 'flex-end' }}
      onBackButtonPress={onBackdropPress}
      swipeDirection="down"
      onSwipeComplete={onBackdropPress}
      onBackdropPress={onBackdropPress}>
      {/* {tryingToJoin && */}
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.header}>
          </View>
          <View style={styles.textContainer}>

          </View>
          <View style={{ paddingRight: 10 }}>
            <BalanceTag inverted size="small" />
          </View>
        </View>
        <View style={{ marginTop: -15 }}>
          <Image
            style={styles.avatar}
            source={{
              uri: selectedGiveaway?.user?.profileImage?.url || mapLogoIcon,
            }}
          />
          <Text style={styles.title}>{selectedGiveaway?.title}</Text>
          <Text style={styles.description}>
            {selectedGiveaway?.description}
          </Text>
        </View>
        <FetchLoader loading={isFetching}>
          <TouchableOpacity
            onPress={() => onSelect()}
            style={{
              ...styles.joinButton,
              backgroundColor: isSubbed ? '#379D4D' : '#fff'
            }}>
            <Text style={{
              ...styles.joinButtonTitle,
              color: isSubbed ? '#fff' : '#333'
            }}>{later ? (isSubbed ? 'Subscribed' : 'Get Notified') : 'Join Now'}</Text>
          </TouchableOpacity>
        </FetchLoader>
      </View>
    </Modal>
  );
};

export default compose(
  connectAuth(),
  connectChatrooms(),
  connectJoinedChatrooms(),
  connectSubscriptions(),
  connectGiveaways(),
)(PaidJoinModal);

// style={{ top: hp('0%'), right: wp('0%') }}
