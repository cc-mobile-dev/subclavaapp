import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { compose } from 'recompose';

import { ActionButton } from '../components/ActionButton';
import { connectAuth, connectGlobal } from '../../../redux';
import styles from './ProfileScreen.style';
import { PURPLE, BLUE } from '../../../config/style';

const ProfileScreen = props => {
  const {
    navigation: { navigate, getParam },
    globalState: { location },
    authState: { currentUser },
  } = props;
  // const chatClient = getParam('chatClient');

  const _handleCreateChatroom = () => {
    if (!location) {
      alert(
        'Please enable location services in settings in order to create a chatroom.',
      );
      return;
    }

    navigate('CreateChatroom', {
      // chatClient,
    });
  };

  const _handleGoToNotifications = () => {
    navigate('Notifications', {
      // chatClient,
    });
  };

  const _handlePressButton = () => {
    navigate('Notifications');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.body}>
        {(currentUser && currentUser.accountType === 'influencer') && <TouchableOpacity
          style={[styles.button, { marginTop: 60 }]}
          onPress={() =>
            navigate('CreatedList', {
              // chatClient,
            })
          }>
          <LinearGradient
            colors={['#6039FE', '#6039FF']}
            style={styles.graidentButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.1056, 1]}>
            <Text style={styles.buttonText}>Created Chatrooms</Text>
          </LinearGradient>
        </TouchableOpacity>}
        <TouchableOpacity
          style={[styles.button, { marginTop: 35 }]}
          onPress={() =>
            navigate('FavoriteChatrooms', {
              // chatClient,
            })
          }>
          <LinearGradient
            colors={['#6039FE', '#6039FF']}
            // start={[0, 0]}
            // end={[0.018, 1]}
            locations={[0, 0.99, 1]}
            style={styles.graidentButton}>
            <Text style={styles.buttonText}>Subscribed Chatrooms</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* <ActionButton
        buttonColor={PURPLE.eletricViolet}
        size={40}
        offsetY={40}
        renderIcon={() =>
          currentUser.avatarUrl ? (
            <Image
              source={{ uri: currentUser.avatarUrl }}
              style={styles.actionButtonImage}
            />
          ) : (
              <Feather name={'user'} style={styles.buttonIcon} />
            )
        }>
        <ActionButton.Item
          buttonColor={BLUE.dark}
          onPress={() => navigate('Home')}>
          <Feather name="home" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={BLUE.dark}
          onPress={_handleCreateChatroom}>
          <Feather name="plus" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={BLUE.dark}
          onPress={_handleGoToNotifications}>
          <Feather name="bell" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton> */}
    </SafeAreaView>
  );
};

export default compose(
  connectAuth(),
  connectGlobal(),
)(ProfileScreen);
