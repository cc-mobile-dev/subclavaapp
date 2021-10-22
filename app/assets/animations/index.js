import { Animated } from 'react-native';

/**
 * @file Often Used Animations.
 * @author Jacob Metzinger <jacob.adam.metzinger@gmail.com>
 */

// moving element from one spot to a new one
const translate = (element, x, y, duration) => {
  Animated.timing(element, {
    toValue: { x, y },
    duration,
  }).start();
};

// animation altering appearance ex: fading, resizing
const changeAppearance = (element, value, duration) => {
  Animated.timing(element, {
    toValue: value,
    duration,
  }).start();
};

module.exports = {
  translate,
  changeAppearance,
};
