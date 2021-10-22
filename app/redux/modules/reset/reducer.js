// @flow
import AsyncStorage from '@react-native-community/async-storage';

import { LOGOUT } from '../sharedActions';

import { defaultReducers } from '../defaultReducers';

export default function resetReducer(state, action) {
  switch (action.type) {
    case LOGOUT: {
      // Remove access token from AsyncStorage
      // Reset redux-store
      AsyncStorage.clear();
      return {
        ...state,
        ...defaultReducers,
        promotionsState: {
          ...state.promotionsState,
          didVoteForPromotions: state.promotionsState.didVoteForPromotions,
        },
      };
    }
    default:
      return state;
  }
}
