import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './BaseBottomModal.styles';

function BaseBottomModal(props) {
  return (
    <Modal {...props} transparent animationType={'fade'} onRequestClose={props.onPressOverlay}>
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps={'always'}
        innerRef={props.scrollRef}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={props.onPressOverlay}>
          <View style={styles.touchableView} />
        </TouchableWithoutFeedback>
        <View style={styles.contentContainer}>{props.children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

BaseBottomModal.propTypes = {
  onPressOverlay: PropTypes.func.isRequired,
};

BaseBottomModal.defaultProps = {};

export default BaseBottomModal;
