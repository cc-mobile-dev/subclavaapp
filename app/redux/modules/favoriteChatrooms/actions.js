// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */
export const FAVORITE_CHATROOMS_ATTEMPT = 'favoriteChatrooms/FAVORITE_CHATROOMS_ATTEMPT';
export const FAVORITE_CHATROOMS_SUCCESS = 'favoriteChatrooms/FAVORITE_CHATROOMS_SUCCESS';
export const FAVORITE_CHATROOM = 'favoriteChatrooms/FAVORITE_CHATROOM';
export const FAVORITE_CHATROOM_SUCCESS = 'favoriteChatrooms/FAVORITE_CHATROOM_SUCCESS';
export const UNFAVORITE_CHATROOM = 'favoriteChatrooms/UNFAVORITE_CHATROOM';
export const UNFAVORITE_CHATROOM_SUCCESS = 'favoriteChatrooms/UNFAVORITE_CHATROOM_SUCCESS';
export const FAVORITE_CHATROOM_FAIL = 'favoriteChatrooms/FAVORITE_CHATROOM_FAIL';

/**
 * Action Creators
 */
export const favoriteChatroomsActionCreators = {
  favoriteChatrooms: createPromiseAction(FAVORITE_CHATROOMS_ATTEMPT),
  favoriteChatroomsSuccess: createAction(FAVORITE_CHATROOMS_SUCCESS),
  favoriteChatroom: createAction(FAVORITE_CHATROOM),
  favoriteChatroomSuccess: createAction(FAVORITE_CHATROOM_SUCCESS),
  unfavoriteChatroom: createAction(UNFAVORITE_CHATROOM),
  unfavoriteChatroomSuccess: createAction(UNFAVORITE_CHATROOM_SUCCESS),
  favoriteChatroomFail: createAction(FAVORITE_CHATROOM_FAIL)
};
