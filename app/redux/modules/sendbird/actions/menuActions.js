import { INIT_MENU, DISCONNECT_SUCCESS, SET_APP_STATE } from './types';
import { sbDisconnect, sbSetAppState } from '../sendbirdActions';

export const initMenu = () => {
  return { type: INIT_MENU };
};

export const sendbirdLogout = () => {
  return dispatch => {
    return sbDisconnect().then(() => dispatch({ type: DISCONNECT_SUCCESS }));
  };
};

export const setAppState = (state) => {
  return dispatch => {
    sbSetAppState(state)
    dispatch({ type: SET_APP_STATE })
  }
}