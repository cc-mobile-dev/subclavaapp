// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const INIT_LIVE_CHAT = 'chat/INIT_LIVE_CHAT';
export const NEW_MESSAGE = 'chat/NEW_MESSAGE';
export const SEND_MESSAGE = 'chat/SEND_MESSAGE';
export const EXIT_CHAT = 'chat/EXIT_CHAT';
export const LOGGED_IN = 'chat/LOGGED_IN';
export const USER_JOINED = 'chat/USER_JOINED';
export const USER_LEFT = 'chat/USER_LEFT';
export const SENT_MESSAGE = 'chat/SENT_MESSAGE'

/**
 * Action Creators
 */
export const chatActionCreators = {
    newMessage: createAction(NEW_MESSAGE),
    sendMessage: createAction(SEND_MESSAGE),
    exitChat: createAction(EXIT_CHAT),
    initLiveChat: createAction(INIT_LIVE_CHAT),
    loggedIn: createAction(LOGGED_IN),
    userJoined: createAction(USER_JOINED),
    userLeft: createAction(USER_LEFT),
    sentMessage: createAction(SENT_MESSAGE)
};
