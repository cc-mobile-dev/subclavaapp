import React from 'react';
import Modal from 'react-native-modal';
import styles from './ClavaModal.style';

const ClavaModal = props => {
  return (
    <Modal
      {...props}
      style={styles.container}
      onBackButtonPress={props.onBackdropPress}
      swipeDirection="down"
      onSwipeComplete={props.onBackdropPress}
      onBackdropPress={props.onBackdropPress}
    >
      {props.children}
    </Modal>
  );
};

export default ClavaModal;
