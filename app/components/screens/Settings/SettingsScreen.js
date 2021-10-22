import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import OneSignal from 'react-native-onesignal';
const version = require('../../../../package.json').version;

import { connectSharedAction, connectSendBird, connectAuth } from '../../../redux';
import styles from './SettingsScreen.style';
import { compose } from 'recompose';
import { GREEN, PURPLE } from '../../../config/style';
import { ScrollView } from 'react-native';
import NavigationService from '../../../utilities/navigation';

const MenuItem = props => {
  const { data, onPress } = props;
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => onPress(data)}>
      <Text style={styles.menuItemText}>{data.title}</Text>
    </TouchableOpacity>
  );
};

// const NotificationItem = props => {
//   const [notificationsEnabled, setNotificationEnabled] = useState(false);

//   useEffect(() => {
//     OneSignal.addSubscriptionObserver(state => {
//       setNotificationEnabled(!state.isPushDisabled && state.isSubscribed);
//     });
//   });

//   const onPress = () => {
//     if (!notificationsEnabled) {
//       OneSignal.disablePush(!notificationsEnabled);
//     }
//     setNotificationEnabled(!notificationsEnabled);
//   };

//   return (
//     <TouchableOpacity style={styles.notifItem} onPress={() => onPress()}>
//       <Text style={styles.menuItemText}>
//         {`Notifications  `}
//         <Feather
//           name={notificationsEnabled ? 'toggle-right' : 'toggle-left'}
//           color={notificationsEnabled ? GREEN.turquoise : '#FC3434'}
//           size={24}
//         />
//       </Text>
//     </TouchableOpacity>
//   );
// };

const SettingsScreen = props => {
  const {
    navigation: { navigate, goBack },
  } = props;
  // const chatClient = getParam('chatClient');

  const [menuItems] = useState([
    { title: 'Edit Account' },
    { title: 'Blocked Users' },
    { title: 'Privacy Policy' },
    // { title: 'Notifications' },
    { title: 'Contact Us' }
  ]);

  const _handleLogout = () => {
    props.userLogout();
    props.sendbirdLogout();
  };

  const _handlePressMenuItem = async item => {
    switch (item.title) {
      case 'Privacy Policy':
        navigate('PrivacyPolicy');
        break;
      case 'Edit Account':
        navigate('EditAccount');
        break;
      case 'Notifications':
        break;
      case 'Contact Us':
        const email = 'mailto:team@clavaapp.com';
        Linking.openURL(email);
        break;
      case 'Talent Application':
        navigate('TalentForm');
        break;
      case 'Blocked Users':
        navigate('BlockedUsers');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.safeContainer}>
      {menuItems.map((item, index) =>
        <MenuItem data={item} onPress={_handlePressMenuItem} key={index} />
      )}
      {props.authState.currentUser && props.authState.currentUser.isInfluencer
        && <MenuItem data={{ title: 'Talent Application' }} onPress={_handlePressMenuItem} />}

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.logOutButton} onPress={_handleLogout}>
          <Text style={styles.logOutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ position: 'absolute', bottom: 0, right: 20, color: '#ddd', padding: 10 }}>
        v{version}
      </Text>
    </View>
  );
};

export default compose(
  connectAuth(),
  connectSharedAction(),
  connectSendBird(),
)(SettingsScreen);
