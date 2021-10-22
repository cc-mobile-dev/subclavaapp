import React from 'react';
import { View, TouchableOpacity, Image, Dimensions, AppState, Platform, StatusBar, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
// import { StreamChat } from 'stream-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import Geolocation from 'react-native-geolocation-service';
import { round } from 'lodash';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';
import Toast, { DURATION } from 'react-native-easy-toast';
// import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';
import NavBar from '../components/NavBar/NavBar';
import ChatroomMarker from './components/ChatroomMarker';
import styles from './MapScreen.style';
import { mapStyle, initialCamera, getDistanceInMeters } from './constants';
import {
  promisify,
  connectChatrooms,
  connectGlobal,
  connectFavoriteChatrooms,
  connectAuth,
  connectNotification,
  connectPromotions,
  connectSendBird,
  connectChatroom,
} from '../../../redux';
import { MarkerModal } from '../components/MarkerModal';
import locateIcon from '../../../assets/images/locate-icon.png';
import announcementIcon from '../../../assets/images/announcement.png';
import { ActionButton } from '../components/ActionButton';
import { PURPLE, BLUE, BASE, GREEN } from '../../../config/style';
import { checkActiveCoupons } from '../../../utilities/zonetap';
import { sbRegisterPushToken } from '../../../redux/modules/sendbird/sendbirdActions';
import { chatroomDataByLocation } from '../../../redux/modules/chatrooms/selector';
import { fetchConstants } from '../../../utilities/api';

const DECIMAL_PRECISION = 3;
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: initialCamera.center,
      currentRegion: null,
      currentChatroom: null,
      user: null,
      chatToken: null,
      mapLoaded: false,
      locationReceived: false
    };
  }

  componentDidMount() {
    // this._getLocationAsync();
    // this._fetchConstants();
    // this._getChatrooms();
    // this._setChatClient();
    // this._getFavoriteChatrooms(this.state.chatGoneLive);

    const { currentUser } = this.props.authState;
    // this._setNotificationListening();
    // console.log(this.props.navigation.getParam('blockedUser'));

    this._unsubscribeFocusListener = this.props.navigation.addListener('didFocus', () => {
      if (this.props.navigation.getParam('newChatroomCreated') === true) {
        this.props.navigation.setParams({ newChatroomCreated: undefined });
        this.refs.toastRef.show(
          'Your chatroom was successfully created. Join it by tapping it on the map or go to your created chatrooms page.',
          3000
        );
      }
    });

    AppState.addEventListener('change', this._handleAppStateChange);


  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    // this._unsubscribeFocusListener;
    // this.props.navigation.setParams({ newChatroomCreated: undefined });
  }

  // componentDidUpdate() {
  //   if (this.props.navigation.getParam('liveChatChanged') === true) {
  //     console.log('get chats again')
  //     this._getChatrooms()
  //     this.props.navigation.setParams({ liveChatChanged: false });
  //   }
  // }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this._getLocationAsync();
    }
  };

  _fetchConstants = () => {
    fetchConstants()
      .then((res) => {
        console.log('Fetched constants successfully: ', res);
        this.props.setConstants(res)
      })
      .catch(err => {
        console.log('Fetch constatns error', err);
      });
  }

  _getChatrooms = () => {
    promisify(this.props.getChatrooms, {})
      .then(response => {
        console.log("ALL CHATROOMS PRINTED HERE: ", response)
      })
      .catch(err => {
        console.log('get chatrooms response', err);
      });
  };

  _getLocationAsync = async () => {
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== 'granted') {
    //   return;
    // }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Clava Location Permission",
          message:
            "Clava needs access to your location " +
            "so you can create chatrooms and see other chatrooms around you",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
      }
    }

    let location = await new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          this.refs.toastRef.close();
          resolve(position)
        },
        error => {
          console.log(error)
          this.refs.toastRef.show(
            'Access to your location is disabled. Please enable your location in phone settings to full experience Clava',
            DURATION.FOREVER
          );
          this.setState({ location: { latitude: 0, longitude: 0 }, locationReceived: true });
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 }
      );
    })

    // let location = await Location.getCurrentPositionAsync({});
    const { latitude = 0, longitude = 0 } = location.coords;

    let coupons = await checkActiveCoupons(latitude, longitude)
    console.log('COUPONS PRINTED FROM THIS: ', coupons)
    if (coupons) {
      this.props.addCoupons(coupons);
    }



    // this.props.addCoupons([{
    //   "_id": "5dfbb57d7571c74b4b5e9e94",
    //   "company_id": "5c6d960af464440da0e42cc9",
    //   "date_active": "2019-12-19T05:00:00.251Z",
    //   "date_expire": "2020-01-01T04:59:59.194Z",
    //   "details": "50% off all fruitcakes between now and New Years",
    //   "name": "Atwater's Catonsville",
    //   "title": "Fruitcake on sale",
    // }]);

    this.props.setLocation({ latitude, longitude });
    this.setState({ location: { latitude, longitude }, locationReceived: true });

    this.mapView.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });

    this.props.chatroomsByLocationAttempt({
      lat: latitude,
      long: longitude,
      distance: 5000,
      units: 'm'
    })
  };

  _getFavoriteChatrooms = () => {
    promisify(this.props.favoriteChatrooms, {})
      .then(response => {
      })
      .catch(err => {
        console.log('get favorite chatrooms response', err);
      });
  };

  _setNotificationListening = async () => {
    const { currentUser } = this.props.authState;

    // state { userSubscriptionEnabled: pushToken: userId: hasPrompted: notificationsEnabled: subscriptionEnabled:
    let payload = await new Promise(resolve =>
      OneSignal.getPermissionSubscriptionState(state => {
        resolve(state)
      }));

    if (!payload.notificationsEnabled && Platform.OS === 'ios') {
      OneSignal.registerForPushNotifications()
    }

    // if enabled set external user id
    OneSignal.setExternalUserId(currentUser.id);

  };

  _handleGoToNotifications = () => {
    this.props.navigation.navigate('Notifications', {
      chatClient: this.chatClient,
    });
  };

  _handleGoToProfile = () => {
    this.props.navigation.navigate('Profile', {
      chatClient: this.chatClient,
    });
  };

  _handleCreateChatroom = () => {
    if (!this.props.globalState.location) {
      alert('Please enable location services in settings in order to create a chatroom.');
      return;
    }

    this.props.navigation.navigate('CreateChatroom', { chatClient: this.chatClient });
  };

  _handlePressMarker = chatroom => {
    this.setState({ currentChatroom: chatroom });
  };

  _handlePressLocationButton = async () => {
    const { location } = this.state;

    this.mapView.animateCamera({
      ...initialCamera,
      center: location,
    });
  };

  _handleSelectPlaceItem = item => {
    const { lat, lng } = item.location;
    setTimeout(() => {
      this.mapView.animateCamera({
        ...initialCamera,
        center: { latitude: lat, longitude: lng },
      });
    }, 200);
  };

  _handlePressSearchButton = () => {
    // const channel = this.chatClient.channel('messaging', this.state.currentChatroom.id);

    this.props.navigation.navigate('Search', {
      onSelectPlace: this._handleSelectPlaceItem,
      chatClient: this.chatClient,
    });
  };

  _handlePressPromotionsButton = () => {
    this.props.navigation.navigate('Promotions', { chatClient: this.chatClient });
  };

  _handleChangeRegionComplete = region => {
    this.setState({ currentRegion: region });
    this.props.chatroomsByLocationAttempt({
      lat: region.latitude,
      long: region.longitude,
      distance: getDistanceInMeters(region),
      units: 'm'
    })
  };

  _handleJoinChatroom = () => {
    // this.setState({ currentChatroom: null });

    const currentChatroom = Object.assign({}, this.state.currentChatroom);

    this.setState({ currentChatroom: null });

    this.props.onJoinGroupChannel(currentChatroom.id, currentChatroom.isPublic)

    // const channel = this.chatClient.channel('messaging', currentChatroom.id);

    this.props.navigation.navigate('ChatroomScreen', {
      toastRef: this.refs.toastRef,
      chatroom: currentChatroom,
    });
  };

  _renderMarker = (chatroom, index) => {
    if (chatroom) {
      const { latitude, longitude, imageUrl, isLive, id } = chatroom;
      return <ChatroomMarker
        name={chatroom.name}
        key={id}
        zIndex={index + 1}
        coordinate={{ latitude, longitude }}
        imageUrl={imageUrl}
        isLive={isLive}
        onPress={() => this._handlePressMarker(chatroom)}
      />
    }
  };

  _setChatClient = async () => {
    const chatToken = await AsyncStorage.getItem('@clava:chatToken');
    this.setState({ chatToken: chatToken ? chatToken : '' });

    const { currentUser } = this.props.authState;

    setTimeout(() => {
      this.props.sendbirdLogin({
        userId: currentUser.id,
        nickname: currentUser.username,
        token: chatToken
      });
      this._setNotificationListening();
    }, 1500)

    this.props.initBlockUser();
    // this.props.setChatClient(this.chatClient);
  };

  render() {
    const {
      chatroomsByLocation,
      authState: { currentUser },
      navigation: { navigate }
    } = this.props;
    const { currentChatroom, location, currentRegion, locationReceived } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this.mapView = map)}
          style={styles.mapView}
          initialCamera={initialCamera}
          provider={'google'}
          showsCompass={false}
          customMapStyle={mapStyle}
          onRegionChangeComplete={this._handleChangeRegionComplete}
          loadingEnabled={true}
        >
          {chatroomsByLocation.map((chatroom, index) => this._renderMarker(chatroom, index))}
        </MapView>
        {/* {locationReceived && <TouchableOpacity
          style={[styles.button, styles.announcementButton]}
          onPress={this._handlePressPromotionsButton}>
          <Image source={announcementIcon} style={styles.mapIconImage} />
        </TouchableOpacity>} */}
        <TouchableOpacity
          style={[styles.button, styles.searchButton]}
          onPress={this._handlePressSearchButton}>
          <Feather name={'search'} style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* <ActionButton
          buttonColor={PURPLE.eletricViolet}
          size={40}
          offsetY={40}
          renderIcon={() => <Feather name={'home'} style={styles.buttonIcon} />}>
          <ActionButton.Item buttonColor={BLUE.dark} onPress={this._handleGoToNotifications}>
            <Feather name="bell" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={BLUE.dark} onPress={this._handleCreateChatroom}>
            <Feather name="plus" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={BLUE.dark} onPress={this._handleGoToProfile}>
            {currentUser && currentUser.avatarUrl ? (
              <Image source={{ uri: currentUser.avatarUrl }} style={styles.actionButtonImage} />
            ) : (
                <Feather name="user" style={styles.actionButtonIcon} />
              )}
          </ActionButton.Item>
        </ActionButton> */}
        {location &&
          currentRegion &&
          (round(location.latitude - currentRegion.latitude, DECIMAL_PRECISION) !== 0.0 ||
            round(location.longitude - currentRegion.longitude, DECIMAL_PRECISION) !== 0.0) && (
            <TouchableOpacity
              style={[styles.button, styles.locationButton]}
              onPress={this._handlePressLocationButton}>
              <Image source={locateIcon} style={styles.mapIconImage} />
            </TouchableOpacity>
          )}
        {!!currentChatroom && (
          <MarkerModal
            isVisible={!!currentChatroom}
            data={currentChatroom}
            onJoin={this._handleJoinChatroom}
            onBackdropPress={() => this.setState({ currentChatroom: null })}
          />
        )}
        <Toast
          ref="toastRef"
          style={{
            backgroundColor: GREEN.turquoise,
            borderColor: GREEN.turquoise,
            maxWidth: screenWidth * 0.8,
          }}
          position="top"
          positionValue={screenHeight * 0.15}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={1}
          textStyle={{
            color: BASE.light,
            fontWeight: 'bold',
          }}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {
  chatroomsState: PropTypes.shape({
    allChatrooms: PropTypes.array,
  }),
  globalState: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default compose(
  // only bring the chatrooms in the current view by using the selector 
  // All chatrooms are still loaded but it will only refresh the props with
  // the chatrooms in current view keeping it light and reducing lag
  connectChatrooms(state => ({
    chatroomsByLocation: chatroomDataByLocation(state)
  })),
  connectAuth(),
  connectGlobal(),
  connectFavoriteChatrooms(),
  connectNotification(),
  connectPromotions(),
  connectSendBird()
)(MapScreen);
