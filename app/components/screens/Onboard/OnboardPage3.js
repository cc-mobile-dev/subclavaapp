// packages
import React from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// animations
import { LiveEvents, Events } from '../../atoms';

// styles
import onboard from './Onboard.style';

// images
import snazzyMaps from '../../../assets/images/snazzyMaps.png';
import shoesPicture from '../../../assets/images/shoesPicture.png';
import appleLogo from '../../../assets/images/appleLogo.png';
import coffeePicture from '../../../assets/images/coffeePicture.png';
import CBS from '../../../assets/images/CBS.png';
import ajsPicture from '../../../assets/images/ajsPicture.png';
import onboardThreeDot from '../../../assets/images/onboard3-dot.png';

const OnboardScreen3 = props => {
  const {
    navigation: { navigate },
  } = props;
  return (
    <View style={onboard.container}>
      {/* Snazzy map background */}
      <View style={onboard.mapView}>
        <ImageBackground source={snazzyMaps} style={onboard.snazzyMap}>
          <LiveEvents
            source={shoesPicture}
            style={{ position: 'absolute', left: 94.5, top: 91.5 }}
          />
          <LiveEvents
            source={appleLogo}
            style={{ position: 'absolute', left: 232.5, top: 269.5 }}
          />
          <Events source={coffeePicture} style={{ position: 'absolute', left: 260, top: 102 }} />
          <Events source={CBS} style={{ position: 'absolute', left: 75.5, top: 354.5 }} />
          <Events source={ajsPicture} style={{ position: 'absolute', left: 112.5, top: 219.5 }} />
        </ImageBackground>
      </View>

      {/* Collect Alerts */}
      <View style={onboard.rectangle}>
        <Text style={onboard.heading}>Chatrooms</Text>
        <Text style={onboard.text}>
          Create a chatroom and start connecting with people around you or join chatrooms located
          all over the world.
        </Text>
        {/* Skip */}
        <View style={onboard.navTab3}>
          <TouchableOpacity onPress={() => navigate('Onboard2')}>
            <Ionicons name="md-arrow-round-back" size={30} color="#6039fe" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Auth', { screen: 'Home' })}>
            <Ionicons name="ios-checkmark-circle" size={30} color="#3EE8B5" />
          </TouchableOpacity>
        </View>
        <View style={onboard.navDot}>
          <Image source={onboardThreeDot} />
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen3;
