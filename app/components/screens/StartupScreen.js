import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const StartupScreen = props => {

  return (
    <View style={{ backgroundColor: '#421290', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default StartupScreen;
