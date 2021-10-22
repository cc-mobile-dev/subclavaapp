import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Cards from './Cards';

export default function Home() {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignContent: 'flex-start',
          width: '100%',
          height: 100,
          justifyContent: 'center',
          marginTop: 40,
        }}>
        <Text style={styles.homeHeader}> Popular Chatrooms </Text>
      </View>

      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={styles.scrollStyle}
        horizontal={true}>
        <Cards />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeHeader: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },

  scrollStyle: {
    flex: 1,
  },
});
