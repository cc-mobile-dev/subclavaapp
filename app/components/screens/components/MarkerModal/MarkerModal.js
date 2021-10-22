import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './MarkerModal.style';
import { ClavaModal } from '../ClavaModal';
import { mapLogoIcon } from '../../../../utilities';

const MarkerModal = props => {
  const { data, onJoin, onBackdropPress } = props;
  return (
    <ClavaModal {...props}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackdropPress}>
          <View style={styles.headerLine} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Image style={styles.avatar} source={{ uri: data.imageUrl || mapLogoIcon }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} >{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onJoin} style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </ClavaModal>
  );
};

export default MarkerModal;
