// packages
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';

const Pulse = ({ backgroundColor = '#3EE8B5', scale = 1 }) => (
  <Animated.View
    style={[
      {
        width: 50,
        height: 50,
        backgroundColor,
        transform: [{ scale }],
        borderRadius: 25,
        position: 'absolute',
        top: -7.5,
        left: -7.5,
        right: 0,
        bottom: 0,
      },
    ]}
  />
);

const usePulse = (startDelay = 500) => {
  const scale = useRef(new Animated.Value(1)).current;
  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1 }),
      Animated.timing(scale, { toValue: .8 }),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return scale;
};

const LiveEvents = props => {
  const { style, source, imageStyle } = props;
  const scale = usePulse();

  return (
    <View style={style ? style : {}}>
      <Pulse scale={scale} />
      <Image source={source} style={imageStyle ? imageStyle : { width: 35, height: 35 }} />
    </View>
  );
};

LiveEvents.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      })
    ),
  ]).isRequired,
  style: PropTypes.object,
};

export default LiveEvents;
