// @flow

import { SET_LOCATION, SET_CONSTANTS, SET_DEEP_LINK_DATA } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.globalState;

export default function globalState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOCATION:
      return {
        ...state,
        location: payload,
      };
    case SET_CONSTANTS:
      return {
        ...state,
        constants: payload
      }
    case SET_DEEP_LINK_DATA: {
      return {
        ...state,
        branchData: payload
      }
    }
    default:
      return state;
  }
}
