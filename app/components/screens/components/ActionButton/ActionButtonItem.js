import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import {
  shadowStyle,
  alignItemsMap,
  getTouchableComponent,
  isAndroid,
  touchableBackground,
  DEFAULT_ACTIVE_OPACITY,
} from './shared';

const SHADOW_SPACE = 10;

export default class ActionButtonItem extends Component {
  static get defaultProps() {
    return {
      active: true,
      spaceBetween: 15,
      useNativeFeedback: true,
      activeOpacity: DEFAULT_ACTIVE_OPACITY,
      fixNativeFeedbackRadius: false,
      nativeFeedbackRippleColor: 'rgba(255,255,255,0.75)',
    };
  }

  static get propTypes() {
    return {
      active: PropTypes.bool,
      useNativeFeedback: PropTypes.bool,
      fixNativeFeedbackRadius: PropTypes.bool,
      nativeFeedbackRippleColor: PropTypes.string,
      activeOpacity: PropTypes.number,
    };
  }

  render() {
    const { size, position, hideShadow, spacing, idx } = this.props;

    if (!this.props.active) return null;

    const animatedViewStyle = {
      marginBottom: -SHADOW_SPACE,
      alignItems: alignItemsMap[position],
      opacity: this.props.anim,
      transform: [
        {
          translateY: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [size * 1.5, idx === 1 ? 0 : size * 0.7],
          }),
        },
        {
          translateX: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [idx === 0 ? size : idx === 1 ? 0 : -size, 0],
          }),
        },
      ],
    };

    const buttonStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: this.props.buttonColor || this.props.btnColor,
    };

    if (position !== 'center') buttonStyle[position] = (this.props.parentSize - size) / 2;

    const Touchable = getTouchableComponent(this.props.useNativeFeedback);

    const parentStyle =
      isAndroid && this.props.fixNativeFeedbackRadius
        ? {
          height: size,
          marginBottom: spacing,
          right: this.props.offsetX,
          borderRadius: this.props.size / 2,
          backgroundColor: 'blue',
        }
        : {
          height: size + SHADOW_SPACE,
        };
    return (
      <Animated.View pointerEvents="box-none" style={[animatedViewStyle, parentStyle]}>
        <View>
          <Touchable
            testID={this.props.testID}
            accessibilityLabel={this.props.accessibilityLabel}
            background={touchableBackground(
              this.props.nativeFeedbackRippleColor,
              this.props.fixNativeFeedbackRadius
            )}
            activeOpacity={this.props.activeOpacity || DEFAULT_ACTIVE_OPACITY}
            onPress={this.props.onPress}>
            <View
              style={[
                buttonStyle,
                !hideShadow ? { ...shadowStyle, ...this.props.shadowStyle } : null,
              ]}>
              {this.props.children}
            </View>
          </Touchable>
        </View>
      </Animated.View>
    );
  }
}
