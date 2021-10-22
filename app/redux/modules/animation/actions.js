// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const OPEN_SIGNUP = 'animation/OPEN_SIGNUP';
export const CLOSE_SIGNUP = 'animation/CLOSE_SIGNUP';

/**
 * Action Creators
 */
export const animationActionCreators = {
  openSignUp: createAction(OPEN_SIGNUP),
  closeSignUp: createAction(CLOSE_SIGNUP),
};
