import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';
import { find, get } from 'lodash';

import {
  connectAuth,
  connectGlobal,
  connectPromotions,
  connectChatrooms,
} from '../../../redux';
import styles from './PromotionsScreen.style';
import { distance } from '../../../utilities/location';
import { PURPLE, GREEN } from '../../../config/style';

const baltimoreLocation = {
  latitude: 39.2904,
  longitude: -76.6122,
};

const PromotionsScreen = props => {
  const {
    navigation: { goBack, navigate, getParam },
    // authState: {currentUser},
    globalState: { location, constants },
    chatroomsState: { allChatrooms },
    promotionsState: { didVoteForPromotions, coupons },
    voteForPromotions,
  } = props;

  const chatClient = getParam('chatClient');

  const PromotionItem = props => {
    const { coupon, onPress } = props;
    const constantChatrooms = get(constants, 'chatrooms', {});
    const promotionItem = find(constantChatrooms, {
      zonetapId: coupon._id,
    });
    const chatroom = promotionItem
      ? find(allChatrooms, { id: promotionItem.clavaId }) || {}
      : {};
    return (
      <TouchableOpacity onPress={() => onPress(chatroom)}>
        {promotionItem && <View style={styles.listItem}>
          <View style={[styles.listItemImageWrapper, styles.shadow]}>
            {chatroom.imageUrl ? (
              <Image
                source={{ uri: chatroom.imageUrl }}
                style={styles.listItemImage}
              />
            ) : (
              <Feather name="map-pin" style={styles.markerIcon} />
            )}
          </View>
          <View style={styles.listItemBody}>
            <Text style={styles.listItemName}>{chatroom.name}</Text>
            <Text style={[styles.listItemDescription, { textAlign: 'center' }]}>
              {coupon.title}
            </Text>
          </View>
          <View style={styles.listItemRightButton}>
            <Feather
              name="chevron-right"
              style={styles.listItemRightButtonIcon}
            />
          </View>
        </View>}
      </TouchableOpacity>
    );
  };

  const _handlePressItem = chatroom => {
    if (chatroom) {
      // const channel = chatClient.channel('messaging', chatroom.id);

      navigate('ChatroomScreen', {
        chatroom,
        chatClient,
        // channel,
      });
    }
  };

  const _handleVoteForPromotion = () => {
    const { latitude, longitude } = location;
    voteForPromotions({ latitude, longitude });
  };

  const isNotBaltimore =
    location &&
    distance(
      location.latitude,
      location.longitude,
      baltimoreLocation.latitude,
      baltimoreLocation.longitude,
    ) > 30;

  const arePromotions = coupons.length > 0;
  console.log('promotion constants: ', constants);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Announcements</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <Feather name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.bellButton}>
          <Feather name="bell" style={styles.bellIcon} />
        </TouchableOpacity> */}
      </View>
      {isNotBaltimore || !arePromotions ? (
        <View style={{ flex: 1 }}>
          <View style={styles.noPromotions}>
            <Text>There aren't any local announcements in your area.</Text>
          </View>
          {isNotBaltimore ? (
            <TouchableOpacity
              style={[
                styles.voteButton,
                styles.shadow,
                {
                  backgroundColor: didVoteForPromotions
                    ? GREEN.turquoise
                    : PURPLE.eletricViolet,
                },
              ]}
              disabled={didVoteForPromotions}
              onPress={_handleVoteForPromotion}>
              <Text style={styles.voteButtonText}>
                {didVoteForPromotions
                  ? 'Thank you for voting'
                  : 'Bring Promotions To Your Location'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <FlatList
          data={coupons}
          renderItem={({ item, index }) => (
            <PromotionItem coupon={item} onPress={_handlePressItem} />
          )}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
        />
      )}
    </SafeAreaView>
  );
};

PromotionsScreen.defaultProps = {
  globalState: {
    location: baltimoreLocation,
  },
};

export default compose(
  connectAuth(),
  connectGlobal(),
  connectPromotions(),
  connectChatrooms(),
)(PromotionsScreen);
