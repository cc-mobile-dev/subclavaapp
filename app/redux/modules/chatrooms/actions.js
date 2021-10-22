// @flow

import { createAction } from 'redux-actions';
import { DELETE_USER_SUCCESS } from '../auth/actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_CHATROOMS_ATTEMPT = 'chatrooms/GET_CHATROOMS_ATTEMPT';
export const GET_CHATROOMS_SUCCESS = 'chatrooms/GET_CHATROOMS_SUCCESS';
export const GET_CHATROOMS_FAILED = 'chatrooms/GET_CHATROOMS_FAILED';
export const GET_CHATROOM = 'chatrooms/GET_CHATROOM';
export const GOT_CHATROOM = 'chatrooms/GOT_CHATROOM';
export const GET_CHATROOM_FAILED = 'chatrooms/GET_CHATROOM_FAILED';
export const CREATE_CHATROOM = 'chatrooms/CREATE_CHATROOM'
export const CREATE_CHATROOM_SUCCESS = 'chatrooms/CREATE_CHATROOM_SUCCESS'
export const CREATE_CHATROOM_FAILED = 'chatrooms/CREATE_CHATROOM_FAILED'
export const CHATROOMS_BY_LOCATION_ATTEMPT = 'chatrooms/CHATROOMS_BY_LOCATION_ATTEMPT';
export const CHATROOMS_BY_LOCATION_SUCCESS = 'chatrooms/CHATROOMS_BY_LOCATION_SUCCESS'
export const CHATROOMS_BY_LOCATION_FAILED = 'chatrooms/CHATROOMS_BY_LOCATION_FAILED'
export const SET_NEW_CHATROOM_DATA = 'chatrooms/SET_NEW_CHATROOM_DATA';
export const UPDATE_CHATROOM = 'chatrooms/UDPATE_CHATROOM';
export const UPDATED_CHATROOM = 'chatrooms/UPDATED_CHATROOM';
export const UPDATED_CHATROOM_FAILED = 'chatrooms/UPDATED_CHATROOM_FAILED';
export const DELETE_CHATROOM = 'chatrooms/DELETE_CHATROOM'
export const DELETE_CHATROOM_SUCCESS = 'chatrooms/DELETE_CHATROOM_SUCCESS'
export const DELETE_CHATROOM_FAILED = 'chatrooms/DELETE_CHATROOM_FAILED'
export const UPDATE_CHATROOM_DATA = 'chatrooms/UPDATE_CHATROOM_DATA'
export const TOGGLE_CHATROOM_LIVE = 'chatrooms/TOGGLE_CHATROOM_LIVE'

/**
 * Action Creators
 */
export const chatroomsActionCreators = {
  getChatrooms: createPromiseAction(GET_CHATROOMS_ATTEMPT),
  getChatroomsSuccess: createAction(GET_CHATROOMS_SUCCESS),
  getChatroomsFailed: createAction(GET_CHATROOMS_FAILED),
  setNewChatroomData: createAction(SET_NEW_CHATROOM_DATA),
  updateChatroom: createAction(UPDATE_CHATROOM),
  updatedChatroom: createAction(UPDATED_CHATROOM),
  updateChatroomFailed: createAction(UPDATED_CHATROOM_FAILED),
  deleteChatroom: createAction(DELETE_CHATROOM),
  deleteChatroomSuccess: createAction(DELETE_CHATROOM_SUCCESS),
  deleteChatroomFailed: createAction(DELETE_CHATROOM_FAILED),
  createChatroom: createAction(CREATE_CHATROOM),
  createChatroomSuccess: createAction(CREATE_CHATROOM_SUCCESS),
  createChatroomFailed: createAction(CREATE_CHATROOM_FAILED),
  getChatroom: createAction(GET_CHATROOM),
  gotChatroom: createAction(GOT_CHATROOM),
  getChatroomFailed: createAction(GET_CHATROOM_FAILED),
  chatroomsByLocationAttempt: createAction(CHATROOMS_BY_LOCATION_ATTEMPT),
  chatroomsByLocationSuccess: createAction(CHATROOMS_BY_LOCATION_SUCCESS),
  chatroomsByLocationFailed: createAction(CHATROOMS_BY_LOCATION_FAILED),
  updateChatroomData: createAction(UPDATE_CHATROOM_DATA),
  toggleChatroomLive: createAction(TOGGLE_CHATROOM_LIVE)
};
