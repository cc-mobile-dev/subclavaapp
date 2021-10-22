import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { compose } from 'redux';
import { connectChatrooms, connectGiveaways, connectAuth } from '../../../../redux';
import styles from './GoLiveBanner.style';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { mapLogoIcon } from '../../../../utilities/constants';
import { CountdownTimer } from '../CountdownTimer';

const GoLiveBanner = props => {
  const {
    giveawaysState: {
      latestGiveaway
    },
    authState: {
      currentUser
    }
  } = props;

  let data = latestGiveaway
  // const actualSize = size === 'small' ? 16 : 20;

  const isLater = data?.expires < Date.now()
  const profileImage = data?.user?.profileImage?.url || mapLogoIcon

  useEffect(() => {
    props.getLatestGiveaway()
  }, [])

  const timeDifference = (current, previous) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerMonth * 12

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return 'in ' + Math.round(elapsed / 1000) + ' s';
    }
    else if (elapsed < msPerHour) {
      let mins = Math.round(elapsed / msPerMinute)
      return `in ${mins} ${mins === 1 ? 'min' : 'mins'}`;
    }
    else if (elapsed < msPerDay) {
      let hrs = Math.round(elapsed / msPerHour)
      return `in ${hrs} ${hrs === 1 ? 'hr' : 'hrs'}`;
    }
    else if (elapsed < msPerMonth) {
      let d = Math.round(elapsed / msPerDay)
      return `in ${d} d`;
    }
    else if (elapsed < msPerYear) {
      let d = Math.round(elapsed / msPerMonth)
      return `in ${d} mth`;
    }
  }


  return data ? (
    <TouchableOpacity onPress={() => props.selectGiveaway({ giveawayId: data.objectId })}>
      <View
        style={{
          ...styles.listItem,
        }}>
        <View style={styles.listItemImageWrapper}>
          <Image
            source={{ uri: profileImage }}
            style={styles.listItemImage}
          />
        </View>
        <View style={styles.listItemInfo}>
          <Text style={styles.listItemName}>{data.title}</Text>
          <Text style={styles.listItemSubtitle}>
            {/* <Feather name={data.isLive ? "users" : "users"} style={styles.userIcon} /> */}
            {`Start your scheduled live`}
          </Text>
        </View>
        <View
          style={{
            ...styles.right,
            flex: 3,
          }}>
          <View style={styles.rightElements}>
            <View style={styles.chevronButton}>
              <Text style={styles.actionButtonTitle}>{isLater ? 'GO LIVE' : `${timeDifference(data.expires, Date.now())}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : <View />;
};

export default compose(connectGiveaways(), connectAuth())(GoLiveBanner);
