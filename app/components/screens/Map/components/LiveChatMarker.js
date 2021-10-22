import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PURPLE } from '../../../../config/style';

const styles = StyleSheet.create({
  marker: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 8,
    alignSelf: 'center',
    borderColor: PURPLE.governorBay,
    zIndex: 8
  },
  liveMarker: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 8,
    alignSelf: 'center',
    borderColor: '#3EE8B5',
    zIndex: 8
  },
  liveBackground: {
    width: 75,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseStyle: {
    width: 70,
    height: 70,
    backgroundColor: '#3EE8B5',
    borderRadius: 32.5,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8
  },
  noPulseStyle: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
    borderRadius: 32.5,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8
  }
});

const Pulse = ({ backgroundColor = '#3EE8B5', scale = 1, children, isLive }) => (
  <Animated.View
    style={isLive ?
      [{ ...styles.pulseStyle, transform: [{ scale }] }]
      : [styles.noPulseStyle]
    }
  >
    {children}
  </Animated.View>
);

const usePulse = (startDelay = 1000) => {
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
  const { source, isLive } = props;
  const scale = usePulse(1000);
  return (
    // <View style={styles.liveBackground}>
    <Pulse scale={scale} isLive={isLive}>
      <FastImage source={{ uri: source }} style={isLive ? styles.liveMarker : styles.marker} />
    </Pulse>
    // </View>
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
