import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}> Categories </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: '5%',
    paddingTop: '5%',

  },

  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded'
  },
});