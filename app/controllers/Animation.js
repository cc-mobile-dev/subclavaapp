/**
 * Animation controller.
 *
 * @class Animation
 * @author Jacob Metzinger <jacob.adam.metzinger@gmail.com>
 */

// packages
import { Animated } from 'react-native';

// Class for elements that will have animation effects
export default class Animation {
  // Animations where CSS property is altered ex: fading, resizing
  changeAppearance(element, value, duration) {
    Animated.timing(element, {
      toValue: value,
      duration,
    }).start();
  }

  // Animations where element moves to a new place on screen
  translate(element, x, y, duration) {
    Animated.timing(element, {
      toValue: { x, y },
      duration,
    }).start();
  }
}
