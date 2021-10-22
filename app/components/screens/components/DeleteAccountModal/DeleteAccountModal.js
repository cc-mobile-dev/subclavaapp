import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './DeleteAccountModal.style';
import { ClavaModal } from '../ClavaModal';

const DeleteAccountModal = props => {
  const { onConfirm, onCancel, onBackdropPress } = props;
  return (
    <ClavaModal {...props}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackdropPress}>
          <View style={styles.headerLine} />
        </TouchableOpacity>
        <Text style={styles.description}>{`Are you sure you want to delete your account?`}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.yesButton]}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ClavaModal>
  );
};

export default DeleteAccountModal;
