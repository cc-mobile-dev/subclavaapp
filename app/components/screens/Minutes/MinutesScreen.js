import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './MinutesScreen.style';
import { compose } from 'recompose';
import { connectAccount, connectAuth, connectSubscriptions } from '../../../redux';
import MinutesCard from '../components/MinutesCard';

const MinutesScreen = props => {
  const {
    accountState: { balance, isFetching }
  } = props;
  //   const {
  //     joinedChatroomsState: { tryingToJoin },
  //     giveawaysState: { selectedGiveaway },
  //     unselectChatroom,
  //   } = props;

  //   const [visibile, setVisible] = useState(false);

  //   useEffect(() => {
  //     if (!selectedGiveaway) {
  //       setTimeout(() => setVisible(false), 500);
  //     } else {
  //       setVisible(selectedGiveaway);
  //     }
  //   }, [selectedGiveaway]);

  //   const onBackdropPress = () => {
  //     setVisible(false);
  //     unselectChatroom();
  //   };

  //   const data = (tryingToJoin &&
  //     props.chatroomsState.allChatrooms.find(
  //       c => c.objectId === tryingToJoin.chatroomId,
  //     )) || { imageUrl: '' };
  //   const productData = (props.subscriptionsState &&
  //     props.subscriptionsState.subscriptions) || [
  //     {
  //       title: '15 Minute Pass',
  //       description: 'This is a description',
  //       price_string: '$0.99',
  //     },
  //   ];

  //   const onSelect = product => {
  //     props.subscribeToChatroom(product);
  //   };

  useEffect(() => {
    props.getProducts();
    props.getBalance();
  }, []);

  const onSelect = product => {
    props.purchaseProduct(product);
  };

  const productData = (props.subscriptionsState &&
    props.subscriptionsState.subscriptions) || [
      {
        title: '15 Minutes',
        description: 'This is a description',
        identifier: 'com.chadtech.clava.daily',
        price_string: '$0.99',
        price: 0.99,
      },
      {
        title: '30 Minutes',
        description: 'This is a description',
        price_string: '$1.99',
        identifier: 'com.chadtech.clava.monthly',
        price: 1.99,
      },
      {
        title: '60 Minutes',
        description: 'This is a description',
        identifier: 'com.chadtech.clava.weekly',
        price_string: '$2.99',
        price: 2.99,
      },
    ];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <MinutesCard
              isLoading={isFetching}
              pass={`${balance} Minutes`}
              btnText="Account Balance"
              textColor="#F6F0FF"
              color="#379D4D"
              shadow="#00691D"
              textColor="#E5FFE0"
            />
            {productData.map(p => (
              <MinutesCard
                onPress={() => onSelect(p)}
                pass={p.title}
                price={p.price_string}
                btnText="Add Time"
                textColor="#F6F0FF"
                color="#421290"
                btnColor="#6822DA"
                shadow="#8D45FF"
              />
            ))}
          </View>
          <Text style={styles.header}>
            Purchase a Time Pass to add Minutes to your account. Use these
            Minutes to get access to exclusive Lives.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default compose(
  connectAccount(),
  connectSubscriptions(),
)(MinutesScreen);
