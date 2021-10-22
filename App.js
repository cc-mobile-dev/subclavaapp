// packages
// if (__DEV__) {
//   import Reactotron from './reactotron.config';
//   Reactotron()
// }
import React, { useState, useEffect } from 'react'
import { Platform, ProgressBarAndroid, StatusBar, View, AppState } from 'react-native'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
// import { AppLoading } from 'expo'
// import { Asset } from 'expo-asset'
// import * as Font from 'expo-font'
// import * as Icon from 'react-native-vector-icons'
import { enableScreens } from 'react-native-screens';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';
import AsyncStorage from '@react-native-community/async-storage';

import { navigationRef } from './app/utilities/navigation';
import { toastRef } from './app/utilities/toast'

// navigation
import AppNavigator from './app/components/Navigator'
// styles
import { BASE, helpers } from './app/config/style'

import createStore from './app/redux/store';
import Purchases from 'react-native-purchases';
import { PaidJoinModal } from './app/components/screens/components/PaidJoinModal';
import branch from 'react-native-branch'
import Toast from 'react-native-easy-toast';
import { color } from './app/utilities';
import { globalActionCreators, chatroomsActionCreators, giveawaysActionCreators, joinedChatroomsActionCreators } from './app/redux';
import { SERVER_URL, APP_ID, ONESIGNAL_APP_ID, REVENUE_CAT_ID } from '@env'
import agora from './app/utilities/agora';
const Parse = require('parse/react-native.js');

const { store, persistor } = createStore();

const App = () => {

  useEffect(() => {

    Parse.setAsyncStorage(AsyncStorage);

    Parse.initialize('POSENNQKNRFMD')
    Parse.serverURL = 'http://192.168.1.45:1337/parse'

    // Parse.initialize(APP_ID)
    // Parse.serverURL = SERVER_URL

    // persistor.purge()

    enableScreens();

    initBranch();

    OneSignal.setAppId(ONESIGNAL_APP_ID)

    // OneSignal.setLogLevel(6, 0);

    OneSignal.setNotificationOpenedHandler(notification => {
      onOpened(notification)
    });

    Purchases.setDebugLogsEnabled(true);
    Purchases.setup(REVENUE_CAT_ID);

    AppState.addEventListener('change', _handleAppStateChange);

    setParseSubscriptions()

    initAgoraChat()

  }, [])

  const initAgoraChat = () => {
    agora.connect()
  }

  const initBranch = () => {

    branch.subscribe((data) => {
      store.dispatch(globalActionCreators.setDeepLinkData(data))
    })
  }

  const setParseSubscriptions = async () => {
  }

  const _handleAppStateChange = () => {
    store.dispatch(globalActionCreators.appStateChanged())
  }

  const onOpened = (openResult) => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);

    let data = openResult.notification.additionalData;

    if (data && data.action === 'live') {
      store.dispatch(joinedChatroomsActionCreators.selectChatroom({ chatroomId: data.value }))
    }
  }

  const onIds = (device) => {
    console.log('Device info: ', device);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <AppNavigator ref={navigationRef} />
          <PaidJoinModal />
          <Toast
            ref={toastRef}
            style={{
              backgroundColor: color.INFO.backgroundColor,
              borderColor: color.INFO.borderColor
            }}
            position="top"
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={1}
            textStyle={{ color: color.INFO.color }}
          />
        </View>
      </PersistGate>
    </Provider>
  )
}

export default process.env.NODE_ENV === 'development' ? App : codePush(App);
//export default App
