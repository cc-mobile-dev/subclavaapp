// @flow

import { GET_LIVE_TOKEN, GET_LIVE_TOKEN_FAILED, GET_LIVE_TOKEN_SUCCESS, LIVE_COUNT_UPDATE, NEW_VIEW_CREATED, START_VIDEO, STOP_COUNTDOWN, STOP_VIDEO } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.liveVideoState;

export default function liveVideoState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIVE_TOKEN:
      return {
        ...state,
        isFetching: true
      };
    case GET_LIVE_TOKEN_SUCCESS: {
      return {
        ...state,
        token: payload.token,
        chatToken: payload.chatToken,
        isFetching: false
      };
    }
    case STOP_VIDEO: {
      return {
        ...state,
        token: null,
        expiresIn: 0,
        channel: '',
        uid: null,
        isFetching: false,
      }
    }
    case STOP_COUNTDOWN: {
      return {
        ...state,
        currentView: null
      }
    }
    case GET_LIVE_TOKEN_FAILED: {
      return {
        ...state,
        isFetching: false
      };
    }
    case NEW_VIEW_CREATED: {
      return {
        ...state,
        currentView: payload
      }
    }
    case LIVE_COUNT_UPDATE: {
      return {
        ...state,
        totalViewers: payload.data.totalCount
      }
    }
    default:
      return { ...state };
  }
}
