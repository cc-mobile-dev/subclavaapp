// @flow

import { OPEN_SIGNUP, CLOSE_SIGNUP } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.animationState;

export default function animationState(state = DEFAULT, action = {}) {
  const { type } = action;

  switch (type) {
    case OPEN_SIGNUP:
      return {
        ...state,
        action: 'openSignUp',
      };
    case CLOSE_SIGNUP:
      return {
        ...state,
        action: 'closeSignUp',
      };
    default:
      return state;
  }
}
