import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FetchLoader = props => {
  const { loading } = props;

  return loading ? (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
      }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  ) : (
    props.children
  );
};

export default FetchLoader;
