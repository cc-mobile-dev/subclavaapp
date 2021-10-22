// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */
export const JOINED_CHATROOMS_ATTEMPT = 'joinedChatrooms/JOINED_CHATROOMS_ATTEMPT';
export const JOINED_CHATROOMS_SUCCESS = 'joinedChatrooms/JOINED_CHATROOMS_SUCCESS';
export const JOINED_CHATROOMS_FAILED = 'joinedChatrooms/JOINED_CHATROOMS_FAILED';
export const JOIN_CHATROOM = 'joinedChatrooms/JOIN_CHATROOM';
export const JOIN_CHATROOM_SUCCESS = 'joinedChatrooms/JOIN_CHATROOM_SUCCESS';
export const JOIN_CHATROOM_FAILED = 'joinedChatrooms/JOIN_CHATROOM_FAILED';
export const LEAVE_CHATROOM = 'joinedChatrooms/LEAVE_CHATROOM';
export const LEAVE_CHATROOM_SUCCESS = 'joinedChatrooms/LEAVE_CHATROOM_SUCCESS';
export const LEAVE_CHATROOM_FAILED = 'joinedChatrooms/LEAVE_CHATROOM_FAILED';
export const JOIN_CHATROOM_FAIL = 'joinedChatrooms/JOIN_CHATROOM_FAIL';
export const SELECT_CHATROOM = 'joinedChatrooms/SELECT_CHATROOM';
export const UNSELECT_CHATROOM = 'joinedChatrooms/UNSELECT_CHATROOM';
export const INIT_CHAT = 'joinedChatrooms/INIT_CHAT';
export const RELEASE_CHAT = 'joinedChatrooms/RELEASE_CHAT';

// export const CHECK_SUBSCRIPTIONS_STATUS = 'joinedChatrooms/CHECK_SUBSCRIPTIONS_STATUS'
// export const CHECK_SUBSCRIPTIONS_STATUS_SUCCESS = 'joinedChatrooms/CHECK_SUBSCRIPTIONS_STATUS_SUCCESS'
// export const CHECK_SUBSCRIPTIONS_STATUS_FAIL = 'joinedChatrooms/CHECK_SUBSCRIPTIONS_STATUS_FAIL'

/**
 * Action Creators
 */
export const joinedChatroomsActionCreators = {
  selectChatroom: createAction(SELECT_CHATROOM),
  unselectChatroom: createAction(UNSELECT_CHATROOM),
  joinedChatrooms: createPromiseAction(JOINED_CHATROOMS_ATTEMPT),
  joinedChatroomsSuccess: createAction(JOINED_CHATROOMS_SUCCESS),
  joinedChatroomsFailed: createAction(JOINED_CHATROOMS_FAILED),
  joinChatroom: createPromiseAction(JOIN_CHATROOM),
  joinChatroomSuccess: createAction(JOIN_CHATROOM_SUCCESS),
  joinChatroomFailed: createAction(JOIN_CHATROOM_FAILED),
  leaveChatroom: createAction(LEAVE_CHATROOM),
  leaveChatroomSuccess: createAction(LEAVE_CHATROOM_SUCCESS),
  leaveChatroomFailed: createAction(LEAVE_CHATROOM_FAILED),
  joinChatroomFail: createAction(JOIN_CHATROOM_FAIL),
  initChat: createAction(INIT_CHAT),
  releaseChat: createAction(RELEASE_CHAT)
  // checkSubscriptions: createAction(CHECK_SUBSCRIPTIONS_STATUS),
  // checkSubscriptionsSuccess: createAction(CHECK_SUBSCRIPTIONS_STATUS_SUCCESS),
  // checkSubscriptionsFail: createAction(CHECK_SUBSCRIPTIONS_STATUS_FAIL)
};
