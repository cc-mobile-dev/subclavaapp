// @flow
import { defaultReducers } from '../defaultReducers'
import { GET_BALANCE, GET_BALANCE_FAILED, GET_BALANCE_SUCCESS, UPDATE_LOCAL_BALANCE } from './actions';

export default function accountState(state = defaultReducers.accountState, action) {
  const { payload } = action
  switch (action.type) {
    case GET_BALANCE: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_BALANCE_SUCCESS: {
      return {
        ...state,
        balance: payload ? Math.floor(payload.balance) : 0,
        isFetching: false,
        lastTransaction: payload
      }
    }
    case GET_BALANCE_FAILED: {
      return {
        ...state,
        isFetching: false
      }
    }
    case UPDATE_LOCAL_BALANCE: {
      return {
        ...state,
        balance: payload
      }
    }
    default:
      return state;
  }
}
