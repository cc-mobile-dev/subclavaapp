// packages
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { compose } from 'redux';
import { connectAuth } from '../../../redux';

// USER ONBOARDING

// styles
// import screen from '../base/Screen.style';
import onboard from './Onboard.style';

const slides = talent => [
  {
    key: 1,
    title: `Clava Lives`,
    text: 'Host a Live in Clava and start making earning per minute off of each viewer in your Live.',
    imageMain: require('../../../assets/images/camera-main.png'),
    imageLeft: require('../../../assets/images/heart-fade-topRight.png'),
    imageRight: require('../../../assets/images/ClockSignUp.png'),
    backgroundColor: '#7823FF',
  },
  {
    key: 2,
    title: 'Clava Minutes',
    text: 'Join a Live in Clava by purchasing Clava Minutes.',
    imageMain: require('../../../assets/images/Clock.png'),
    imageLeft: require('../../../assets/images/heart-fade-topRight.png'),
    imageRight: require('../../../assets/images/camera-fade-topLeft.png'),
    backgroundColor: '#7823FF',
  },
  {
    key: 3,
    title: 'Support Clava Creators',
    text: 'Support Creators by using your Clava Minutes on watching their Lives.',
    imageMain: require('../../../assets/images/heart-main.png'),
    imageLeft: require('../../../assets/images/camera-fade-topLeft.png'),
    imageRight: require('../../../assets/images/ThumbsUpSmall.png'),
    backgroundColor: '#379D4D',
  },
];

const Onboard = props => {
  const _onDone = () => {
    props.setOnboarded();
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, backgroundColor: item.backgroundColor }}>
        <View style={onboard.headerWrapper}>
          <TouchableOpacity
            style={
              item.key === 3 ? onboard.completeWrapper : onboard.skipWrapper
            }
            onPress={() => _onDone()}>
            <Text
              style={item.key === 3 ? onboard.completeText : onboard.skipText}>
              {item.key === 3 ? 'Complete' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={onboard.imageWrapper}>
          <Image style={onboard.mainImage} source={item.imageMain} />
          <Image style={onboard.fadedLeft} source={item.imageLeft} />
          <Image style={onboard.fadedRight} source={item.imageRight} />
        </View>
        {/* Influencer */}
        <View style={onboard.rectangle}>
          <Text style={onboard.heading}>{item.title}</Text>
          <Text style={onboard.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <AppIntroSlider
      activeDotStyle={{ backgroundColor: '#49D868' }}
      dotStyle={{ backgroundColor: '#421290' }}
      showNextButton={false}
      showDoneButton={false}
      renderItem={_renderItem}
      data={slides(props.authState && props.authState.currentUser.isInfluencer)}
      onDone={_onDone}
    />
  );
};

export default compose(connectAuth())(Onboard);
