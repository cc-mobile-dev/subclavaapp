import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function Box(props) {
  const { navigate } = props;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} onPress={() => navigate('CategoryChatrooms', { category: 'Food' })}>
          <Image
            source={require('../../../assets/images/Hamburger.png')}
            style={styles.emoji}
          />
          <Text style={styles.category}> Food </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} onPress={() => navigate('CategoryChatrooms', { category: 'Travel' })}>
          <Image
            source={require('../../../assets/images/Travel.png')}
            style={styles.emoji}
          />
          <Text style={styles.category}> Travel </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} onPress={() => navigate('CategoryChatrooms', { category: 'Shoes' })}>
          <Image source={require('../../../assets/images/Shoes.png')} style={styles.emoji} />
          <Text style={styles.category}> Shoes </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} onPress={() => navigate('CategoryChatrooms', { category: 'Music' })}>
          <Image source={require('../../../assets/images/Music.png')} style={styles.emoji} />
          <Text style={styles.category}> Music </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} onPress={() => navigate('CategoryChatrooms', { category: 'Fashion' })}>
          <Image
            source={require('../../../assets/images/Fashion.png')}
            style={styles.emoji}
          />
          <Text style={styles.category}> Fashion </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <TouchableOpacity style={styles.inner} onPress={() => navigate('CategoryChatrooms', { category: 'Beauty' })}>
          <Image
            source={require('../../../assets/images/Beauty.png')}
            style={styles.emoji}
          />
          <Text style={styles.category}> Beauty </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: '45%',
    height: '55%',
    paddingVertical: '1.5%',
    paddingHorizontal: '2%',
  },

  inner: {
    flex: 1,
    backgroundColor: '#7025E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#843EDE',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },

  category: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 25,
    color: '#fff',
  },
});
