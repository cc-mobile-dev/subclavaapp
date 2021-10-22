// @flow

import { FAVORITE_CHATROOMS_SUCCESS, FAVORITE_CHATROOM, FAVORITE_CHATROOM_SUCCESS, UNFAVORITE_CHATROOM, UNFAVORITE_CHATROOM_SUCCESS, FAVORITE_CHATROOM_FAIL } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.favoriteChatroomsState;

export default function favoriteChatroomsState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case FAVORITE_CHATROOMS_SUCCESS:
      return {
        ...state,
        favoriteChatrooms: payload,
      };
    case FAVORITE_CHATROOM:
    case UNFAVORITE_CHATROOM:
      return {
        ...state,
        isFavoriting: true
      };
    case FAVORITE_CHATROOM_SUCCESS:
    case UNFAVORITE_CHATROOM_SUCCESS:
    case FAVORITE_CHATROOM_FAIL:
      return {
        ...state,
        isFavoriting: false
      }
    default:
      return state;
  }
}
