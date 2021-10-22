// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const TOGGLE_CONNECTION = 'socket/TOGGLE_CONNECTION';

/**
 * Action Creators
 */
export const socketActionCreators = {
    toggleConnection: createAction(TOGGLE_CONNECTION),
};
