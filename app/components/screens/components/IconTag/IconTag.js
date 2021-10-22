import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { compose } from 'redux';
import { connectAccount } from '../../../../redux';
import styles from './IconTag.style';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, Text } from 'react-native';
import { PURPLE } from '../../../../config/style';
import { ActivityIndicator } from 'react-native';

const IconTag = props => {

  const {
    icon,
    text,
    inverted = false,
    size = 'small',
    loading = false,
    style
  } = props;
  const actualSize = size === 'small' ? 16 : 20;
  return (
    <TouchableOpacity style={{
      ...styles.tag(inverted),
      ...style
    }} onPress={() => { }}>
      <Feather
        name={icon}
        size={actualSize - 3}
        color={inverted ? PURPLE.eletricViolet : '#fff'}
      />
      {loading ? (
        <ActivityIndicator size="small" color={inverted ? '#000' : '#fff'} />
      ) : (
          <Text style={styles.title(inverted, actualSize)}>{text}</Text>
        )}
    </TouchableOpacity>
  );
};

export default IconTag;
