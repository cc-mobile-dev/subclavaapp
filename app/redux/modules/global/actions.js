// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const SET_LOCATION = 'global/SET_LOCATION';
export const SET_CONSTANTS = 'global/SET_CONSTANTS';
export const SET_DEEP_LINK_DATA = 'global/SET_DEEP_LINK_DATA'
export const APP_STATE_CHANGED = 'global/APP_STATE_CHANGED';

/**
 * Action Creators
 */
export const globalActionCreators = {
  setLocation: createAction(SET_LOCATION),
  setConstants: createAction(SET_CONSTANTS),
  setDeepLinkData: createAction(SET_DEEP_LINK_DATA),
  appStateChanged: createAction(APP_STATE_CHANGED)
};
