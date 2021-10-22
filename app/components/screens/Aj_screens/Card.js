import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Cards() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            marginTop: '20%',
            marginBottom: '15%',
            shadowColor: '#000',
            shadowOffset: { width: 5, height: 20 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
          }}>
          <Image
            source={require('../assets/AJFinal.jpg')}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
            }}
          />
        </View>
        <Text style={styles.cardHeader}> Chatroom Title </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.greenDot} />
          <Text style={styles.population}>1.2k</Text>
        </View>
        <Text style={styles.cardSubHeader}>
          This is the chatroom description. This is the chatroom description.
          This is the chatroom description. This is the chatroom description.
          This is the chatroom description.
        </Text>
        <View style={styles.symbolsWrapper}>
          <TouchableOpacity style={styles.heartWrapper}>
            <Ionicons name="ios-heart-empty" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.enterWrapper}>
            <Text style={{ fontSize: 19, color: 'white' }}> Join </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  background: {
    width: 345,
    height: 600,
    backgroundColor: '#5D32D3',
    alignSelf: 'center',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#843EDE',
    shadowOffset: { width: 5, height: 30 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },

  greenDot: {
    width: 8,
    height: 8,
    backgroundColor: '#3EE8B5',
    borderRadius: 4,
  },

  cardHeader: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },

  cardSubHeader: {
    fontSize: 19,
    color: '#fff',
    paddingHorizontal: 25,
    textAlign: 'center',
    marginTop: '4.7%',
  },

  population: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },

  symbolsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 345,
    zIndex: 5,
    marginTop: 60,
  },

  heartWrapper: {
    width: 72,
    height: 72,
    backgroundColor: '#3EE8B5',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 35,
  },
  enterWrapper: {
    width: 72,
    height: 72,
    backgroundColor: '#843EDE',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 35,
  },
});
