import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Dimensions,
  AppState,
  SectionList,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { compose } from 'recompose';
import OneSignal from 'react-native-onesignal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  promisify,
  connectAuth,
  connectGlobal,
  connectNotification,
  connectSendBird,
  connectChatrooms,
  connectFavoriteChatrooms,
  connectJoinedChatrooms,
  connectSubscriptions,
  connectGiveaways,
} from '../../../redux';
import Header from './Header';
import { color } from '../../../utilities';
import { ChatroomItem } from '../components/ChatroomItem';
import { PaidJoinModal } from '../components/PaidJoinModal';
import { MarkerModal } from '../components/MarkerModal';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { PURPLE } from '../../../config/style';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native';
import { FetchLoader } from '../components/FetchLoader';
import { LiveCard } from '../components/LiveCard';
import { sortBy, result } from 'lodash'
import { GoLiveBanner } from '../components/GoLiveBanner';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const HomeScreen = props => {
  const {
    navigation: { navigate },
    authState: { currentUser, appliedAsTalent },
  } = props;
  const [chatToken, setToken] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const [chatrooms, setChatrooms] = useState([]);
  // const [subbedChatrooms, setSubbedChatrooms] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // props.getUserSubscriptions();
    props.getMe();
    // props.joinedChatrooms();
    props.getGiveaways();
    props.getTalentForm();

    AppState.addEventListener('change', _handleAppStateChange);

    setTimeout(() => {
      _setChatClient();
    }, 3000);

    return () => AppState.removeEventListener('change', _handleAppStateChange);
  }, []);

  const _setChatClient = async () => {
    _setNotificationListening();

    // props.initBlockUser();
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: params =>
        searching ? (
          <TextInput
            style={styles.searchBar}
            onChangeText={text => setSearchQuery(text)}
            placeholderTextColor="#fff"
            placeholder="Search Groupchats or Lives..."
          />
        ) : (
            <Text style={params.style}>{params.children}</Text>
          ),
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => setSearching(!searching)}>
      //     <Icon
      //       style={{ paddingTop: 20 }}
      //       color={'#333'}
      //       // color={'#E5FFE0'}
      //       size={25}
      //       name={!searching ? 'magnify' : 'close-circle-outline'}
      //     />
      //   </TouchableOpacity>
      // ),
      headerRightContainerStyle: {
        paddingRight: 25,
      },
    });
    if (!searching) {
      setSearchQuery('');
    }
  }, [searching, props.navigation]);

  // useEffect(() => {
  //   if (searchQuery) {
  //     setChatrooms(
  //       filter(props.chatroomsState.allChatrooms, obj =>
  //         includes(obj.name.toLowerCase(), searchQuery.toLowerCase()),
  //       ),
  //     );
  //   } else {
  //     setChatrooms(props.chatroomsState.allChatrooms);
  //   }
  // }, [searchQuery]);

  useEffect(() => {
    let giveaways = props.giveawaysState.all;

    let results = giveaways.filter(g => !g.isActive && !g.endedAt).reduce(groupByDay, {})

    let keys = Object.keys(results)

    let activeLives = giveaways.filter(g => g.isActive)

    let data = [
      ...activeLives.length > 0 ? [{
        title: 'Now',
        data: [activeLives],
      }] : [],
      ...keys.sort((a, b) => results[a].time - results[b].time).map(d => ({
        title: d,
        data: [sortBy(results[d].data, o => o.expires)]
      }))
    ];

    setSections(data);
  }, [
    props.giveawaysState.all
  ]);

  const groupByDay = (acc, curr) => {
    let expires = curr['expires']
    let d = new Date(curr['expires']);
    let key = d.toLocaleDateString()
    // get the first digits of the day from the epoch
    // d = Math.floor(d.getTime() / 864000000);
    // let key = d.toLocaleDateString()
    if (key in acc) {
      acc[key].data.push(curr)
    } else {
      acc[key] = {
        time: expires,
        data: [curr]
      }
    }
    return acc
  }

  const _setNotificationListening = async () => {
    const { currentUser } = props.authState;

    OneSignal.promptForPushNotificationsWithUserResponse((res) => {
      console.log(res)
      OneSignal.disablePush(false)
    })

    OneSignal.setEmail(currentUser.email);
  };

  const _handleAppStateChange = nextAppState => {
    // if (nextAppState === 'active') {
    //   _getLocationAsync();
    // }
  };

  const _handlePressItem = item => {
    props.selectGiveaway({ giveawayId: item.objectId });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GoLiveBanner />
      <SectionList
        style={styles.container}
        ListEmptyComponent={() => <Text style={{ paddingLeft: 30 }}>No lives happening right now</Text>}
        onRefresh={() => {
          props.getGiveaways();
        }}
        refreshing={props.giveawaysState.isFetching}
        sections={sections}
        // style={{ paddingTop: hp('1%') }}
        keyExtractor={(item, index) => (Math.random() * 10).toString()}
        renderSectionHeader={({ section: { title } }) =>
          title ? <View style={styles.section}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </View> : <View />
        }
        renderItem={({ item, index, section }) => item && section && <FlatList
          contentContainerStyle={{ paddingRight: 30, marginTop: 15 }}
          horizontal
          data={section.data[0]}
          renderItem={({ item: data }) => (
            data && <LiveCard data={data} onPress={() => _handlePressItem(data)} />
          )}
          style={{ paddingHorizontal: 26 }}
        />}
      />
    </View>
  );
  {
    /* </View> */
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeContainer: {
    flex: 1,
    // backgroundColor: '#222',
    // backgroundColor: '#421290',
    backgroundColor: '#fff',
  },
  keyboardAwareScrollViewContainer: {
    paddingHorizontal: 20,
  },
  searchBar: {
    color: '#FFF',
    backgroundColor: PURPLE.eletricViolet,
    fontSize: hp('1.8%'),
    fontFamily: 'SF Pro Rounded',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp('80%'),
    height: 44,
  },
  sectionHeader: {
    // bottom: hp('2%'),
    paddingLeft: wp('6.3%'),
    paddingBottom: hp('0.5%'),
    color: '#A1A1A1',
    fontSize: hp('1.8%'),
    fontFamily: 'System',
    fontWeight: 'bold',
    textTransform: 'uppercase'
    // backgroundColor: '#fff'
  },
  section: {
    paddingLeft: wp('1%'),
    backgroundColor: '#fff',
    paddingVertical: 4
    // paddingTop: 10,
  },
});

export default compose(
  connectAuth(),
  connectGlobal(),
  connectSendBird(),
  connectNotification(),
  connectChatrooms(),
  connectJoinedChatrooms(),
  connectSubscriptions(),
  connectGiveaways(),
)(HomeScreen);
