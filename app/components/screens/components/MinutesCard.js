import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Image, Text, TouchableOpacity, color } from 'react-native';
import styles from '../Minutes/MinutesScreen.style';

const MinutesCard = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.card,
        { backgroundColor: props.color },
        { shadowColor: props.shadow },
      ]}>
      <Text style={styles.price}>{props.price}</Text>
      {props.isLoading
        ? <ActivityIndicator size="small" color="#fff" />
        : <Text style={[styles.time, { color: props.textColor }]}>
          {props.pass}
        </Text>
      }
      <View style={[styles.purchase, { backgroundColor: props.btnColor }]}>
        <Text style={styles.purchaseTxt}>{props.btnText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MinutesCard;
// compose(
//     connectAuth(),
//     connectChatrooms(),
//     connectJoinedChatrooms(),
//     connectSubscriptions(),
//     connectGiveaways(),
//   )()
