// packages
import React from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// animations
import { LiveEvents } from '../../atoms';

// styles
import onboard from './Onboard.style';

// images
import snazzyMaps from '../../../assets/images/snazzyMaps.png';
import shoesPicture from '../../../assets/images/shoesPicture.png';
import onboardTwoDot from '../../../assets/images/onboard2-dot.png';

const OnboardScreen2 = props => {
  const {
    navigation: { navigate },
  } = props;

  return (
    <View style={onboard.container}>
      {/* Snazzy map background */}
      <View style={onboard.mapView}>
        <ImageBackground source={snazzyMaps} style={onboard.snazzyMap}>
          <LiveEvents source={shoesPicture} />
        </ImageBackground>
      </View>

      {/* Collect Alerts */}
      <View style={onboard.rectangle}>
        <Text style={onboard.heading}>Live Events</Text>
        <Text style={onboard.text}>
          Chatrooms that are pulsing on the map will indicate a “Live Event” around you.
        </Text>
        {/* Skip */}
        <View style={onboard.navTab}>
          <TouchableOpacity onPress={() => navigate('Onboard')}>
            <Ionicons name="md-arrow-round-back" size={30} color="#6039fe" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Auth', { screen: 'Home' })}>
            <Text style={onboard.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Onboard3')}>
            <Ionicons name="md-arrow-round-forward" size={30} color="#6039fe" />
          </TouchableOpacity>
        </View>
        <View style={onboard.navDot}>
          <Image source={onboardTwoDot} />
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen2;
