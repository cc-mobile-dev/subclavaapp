import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { compose } from 'redux';
import { connectAccount } from '../../../../redux';
import styles from './BalanceTag.style';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, Text } from 'react-native';
import { PURPLE } from '../../../../config/style';
import { ActivityIndicator } from 'react-native';

const BalanceTag = props => {
  useEffect(() => {
    props.getBalance();
  }, []);

  const {
    accountState: { balance, isFetching },
    inverted = false,
    size = 'small',
  } = props;
  const actualSize = size === 'small' ? 16 : 20;
  return (
    <TouchableOpacity style={styles.tag(inverted)} onPress={() => { }}>
      <Feather
        name="clock"
        size={actualSize - 3}
        color={inverted ? PURPLE.eletricViolet : '#fff'}
      />
      {isFetching ? (
        <ActivityIndicator size="small" color={inverted ? '#000' : '#fff'} />
      ) : (
        <Text style={styles.title(inverted, actualSize)}>{balance}</Text>
      )}
    </TouchableOpacity>
  );
};

export default compose(connectAccount())(BalanceTag);
