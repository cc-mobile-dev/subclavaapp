// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const GET_BALANCE = 'account/GET_BALANCE';
export const GET_BALANCE_FAILED = 'account/GET_BALANCE_FAILED'
export const GET_BALANCE_SUCCESS = 'account/GET_BALANCE_SUCCESS'

export const UPDATE_LOCAL_BALANCE = 'account/UPDATE_LOCAL_BALANCE';

/**
 * Action Creators
 */
export const accountActionCreators = {
    getBalance: createAction(GET_BALANCE),
    getBalanceFailed: createAction(GET_BALANCE_FAILED),
    getBalanceSuccess: createAction(GET_BALANCE_SUCCESS),
    updateLocalBalance: createAction(UPDATE_LOCAL_BALANCE)
};
