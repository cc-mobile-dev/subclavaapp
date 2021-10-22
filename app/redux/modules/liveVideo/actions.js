// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const START_VIDEO = 'liveVideo/START_VIDEO';
export const STOP_VIDEO = 'liveVideo/STOP_VIDEO';

export const GET_LIVE_TOKEN = 'liveVideo/GET_LIVE_TOKEN'
export const GET_LIVE_TOKEN_SUCCESS = 'liveVideo/GET_LIVE_TOKEN_SUCCESS'
export const GET_LIVE_TOKEN_FAILED = 'liveVideo/GET_LIVE_TOKEN_FAILED'

export const START_COUNTDOWN = 'liveVideo/START_COUNTDOWN'
export const UPDATE_USER_BALANCE = 'liveVideo/UPDATE_USER_BALANCE';
export const STOP_COUNTDOWN = 'liveVideo/STOP_COUNTDOWN'

export const NEW_VIEW_CREATED = 'liveVideo/NEW_VIEW_CREATED';
export const LIVE_COUNT_UPDATE = 'liveVideo/LIVE_COUNT_UPDATED';
export const USER_JOINED = 'liveVideo/USER_JOINED'
export const USER_LEFT = 'liveVideo/USER_LEFT';

/**
 * Action Creators
 */
export const liveVideoActionCreators = {
  startVideo: createAction(START_VIDEO),
  stopVideo: createAction(STOP_VIDEO),
  getLiveToken: createAction(GET_LIVE_TOKEN),
  getLiveTokenSuccess: createAction(GET_LIVE_TOKEN_SUCCESS),
  getLiveTokenFailed: createAction(GET_LIVE_TOKEN_FAILED),
  startCountdown: createAction(START_COUNTDOWN),
  updateUserBalance: createAction(UPDATE_USER_BALANCE),
  stopCountdown: createAction(STOP_COUNTDOWN),
  newViewCreated: createAction(NEW_VIEW_CREATED),
  liveCountUpdate: createAction(LIVE_COUNT_UPDATE),
  userJoined: createAction(USER_JOINED),
  userLeft: createAction(USER_LEFT)
};
