// @flow

import { SET_NOTIFICATION, GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILED } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.notificationState;

export default function notificationState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SET_NOTIFICATION:
      return { ...state, payload };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        isFetching: true
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        items: payload,
        isFetching: false
      }
    case GET_NOTIFICATIONS_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
}
