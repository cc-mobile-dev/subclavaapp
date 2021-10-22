import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { compose } from 'redux';
import { connectChatrooms, connectGiveaways, connectAuth } from '../../../../redux';
import styles from './LiveCard.style';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { PURPLE } from '../../../../config/style';
import { ActivityIndicator } from 'react-native';
import ToggleIcon from '../ToggleIcon'
import { mapLogoIcon } from '../../../../utilities/constants';
import { CountdownTimer } from '../CountdownTimer';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment'

const LiveCard = props => {
  const {
    data,
    onPress,
    giveawaysState: {
      memberships
    },
    authState: {
      currentUser
    }
  } = props;

  let isActive = data && data?.isActive;
  const isAdmin = data?.user?.objectId === currentUser?.objectId
  const isSubbed = memberships[data.objectId]
  // const actualSize = size === 'small' ? 16 : 20;

  const isLater = data.expires > Date.now()
  const profileImage = data?.user?.imageUrl?.url || mapLogoIcon
  const imageUrl = data.imageUrl?.url || 'https://clava.s3.us-east-2.amazonaws.com/template.jpg'

  const date = new Date(data.expires)
  let m = moment(date)
  const liveTime = m.format('hh:mm')
  const amPm = m.format('A')

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        { ...isActive && styles.liveCard },
        { backgroundColor: props.color },
        { shadowColor: props.shadow },
      ]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.backImage}
      />
      <View style={styles.topBar}>
        <View style={{ flex: 1, flexDirection: 'row' }}>

        </View>
      </View>
      <View style={styles.timeContainer}>
        {isLater
          ? <View style={styles.timeView}>
            <Text style={styles.subtitle}>
              {liveTime}
              <Text style={styles.subtitleSml}>{amPm}</Text>
            </Text>
          </View>
          : (data && data.isActive && <CountdownTimer giveaway={data} />)
        }
      </View>
      <View style={styles.bellContainer}>
        {isLater && !isAdmin && <ToggleIcon
          activeIcon="notifications-circle"
          inactiveIcon="notifications-circle"
          inactiveIconColor='#fff'
          activeIconColor='#888'
          inactiveColor='#fff'
          activeColor='#379D4D'
          switchColor
          initialValue={isSubbed}
          size={16}
          iconType='ionicons'
          style={{
            paddingVertical: 3,
            paddingLeft: 4,
            paddingRight: 3.3,
            borderRadius: 8
          }}
        />}
        {/* {isLater ?
          (!isAdmin
            ? <ToggleIcon
              activeIcon="notifications"
              inactiveIcon="notifications"
              inactiveIconColor='#fff'
              activeIconColor='#bbb'
              inactiveColor='#ddd'
              activeColor='#379D4D'
              switchColor
              initialValue={isSubbed}
              size={14}
              iconType='ionicons'
              style={{
                paddingVertical: 3,
                paddingHorizontal: 4
              }}
            />
            : <ToggleIcon
              initialValue={true}
              activeIcon="user"
              activeColor='#fff'
              canToggle={false}
              onToggle={toggled => { }}
              size={12}
              iconType='font-awesome-5'
            />
          )

          : (data && data.isActive && <CountdownTimer giveaway={data} />)
        } */}
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.infoSection}>
          {isLater && <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          </View>}
          <View style={styles.titleContainer}>
            <Text style={isActive ? styles.liveTitle : styles.title}>{data.title}</Text>
            <View style={styles.infoSection}>
              {!isLater && isActive && <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: profileImage }}
                  style={styles.liveProfileImage}
                />
              </View>}
              <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'center' }}>
                <Text style={isActive ? styles.liveSubtitle : styles.subtitle}>@{data?.user?.username}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default compose(connectChatrooms(), connectGiveaways(), connectAuth())(LiveCard);
