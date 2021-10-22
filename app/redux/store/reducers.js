// @flow

import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import { LOGOUT } from '../modules/sharedActions';

import {
  chatroomsState,
  promotionsState,
  searchState,
  animationState,
  globalState,
  resetReducer,
  authState,
  favoriteChatroomsState,
  joinedChatroomsState,
  notificationState,
  sendBirdState,
  subscriptionsState,
  giveawaysState,
  liveVideoState,
  socketState,
  accountState,
  chatState
} from '../modules';

const config = {
  version: 0,
  key: '@clava_redux_store',
  blacklist: ['sendBirdState'],
  storage: AsyncStorage,
};

const appReducer = persistCombineReducers(config, {
  animationState,
  chatroomsState,
  globalState,
  searchState,
  authState,
  notificationState,
  favoriteChatroomsState,
  joinedChatroomsState,
  promotionsState,
  sendBirdState,
  subscriptionsState,
  giveawaysState,
  liveVideoState,
  socketState,
  accountState,
  chatState
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);

  if (action.type === LOGOUT) {
    finalState = resetReducer(finalState, action);
  }

  return finalState;
}
