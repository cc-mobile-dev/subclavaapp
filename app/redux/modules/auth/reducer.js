// @flow

import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, UPDATE_USER_SUCCESS, SIGNUP_ATTEMPT, SIGNUP_FAILED, SIGNUP_SUCCESS, SET_USER, UNSET_USER, SET_ONBOARDED, UPDATE_TALENT_FORM_SUCCESS, UPDATE_TALENT_FORM, UPDATE_TALENT_FORM_FAILED, SET_TOKEN } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.authState;

export default function authState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER: {
      return {
        ...state,
        currentUser: payload
      }
    }
    case UNSET_USER: {
      return {
        ...state,
        currentUser: null,
        liveToken: ''
      }
    }
    case LOGIN_ATTEMPT: {
      return {
        ...state,
        isFetching: false
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isFetching: false
      }
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isFetching: false
      };
    case SIGNUP_ATTEMPT: {
      return {
        ...state,
        isFetching: false
      }
    }
    case SIGNUP_FAILED: {
      return {
        ...state,
        isFetching: false
      }
    }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isFetching: false
      };
    case UPDATE_TALENT_FORM: {
      return {
        ...state,
        isFetching: true
      }
    }
    case UPDATE_TALENT_FORM_FAILED: {
      return {
        ...state,
        isFetching: false
      }
    }
    case UPDATE_TALENT_FORM_SUCCESS: {
      return {
        ...state,
        appliedAsTalent: payload,
        isFetching: false
      }
    }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };
    case SET_ONBOARDED: {
      return {
        ...state,
        onboarded: true
      }
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: payload.token
      }
    }
    default:
      return state;
  }
}
