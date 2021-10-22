// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */
export const GET_GIVEAWAYS = 'giveaways/GET_GIVEAWAYS';
export const GET_GIVEAWAYS_FAILED = 'giveaways/GET_GIVEAWAYS_FAILED';
export const GET_GIVEAWAYS_SUCCESS = 'giveaways/GET_GIVEAWAYS_SUCCESS';

export const GET_GIVEAWAY = 'giveaways/GET_GIVEAWAY';
export const GET_GIVEAWAY_SUCCESS = 'giveaways/GET_GIVEAWAY_SUCCESS';
export const GET_GIVEAWAY_FAILED = 'giveaways/GET_GIVEAWAY_FAILED';

export const UPDATE_GIVEAWAY = 'giveaways/UPDATE_GIVEAWAY';
export const UPDATE_GIVEAWAY_SUCCESS = 'giveaways/UPDATE_GIVEAWAY_SUCCESS';
export const UPDATE_GIVEAWAY_FAILED = 'giveaways/UPDATE_GIVEAWAY_FAILED';

export const CREATE_GIVEAWAY = 'giveaways/CREATE_GIVEAWAY';
export const CREATE_GIVEAWAY_SUCCESS = 'giveaways/CREATE_GIVEAWAY_SUCCESS';
export const CREATE_GIVEAWAY_FAILED = 'giveaways/CREATE_GIVEAWAY_FAILED';

export const DELETE_GIVEAWAY = 'giveaways/DELETE_GIVEAWAY';
export const DELETE_GIVEAWAY_SUCCESS = 'giveaways/DELETE_GIVEAWAY_SUCCESS';
export const DELETE_GIVEAWAY_FAILED = 'giveaways/DELETE_GIVEAWAY_FAILED';

export const GET_LATEST_GIVEAWAY = 'giveaways/GET_LATEST_GIVEAWAY';
export const GET_LATEST_GIVEAWAY_SUCCESS = 'giveaways/GET_LATEST_GIVEAWAY_SUCCESS';
export const GET_LATEST_GIVEAWAY_FAILED = 'giveaways/GET_LATEST_GIVEAWAY_FAILED';

export const SELECT_GIVEAWAY = 'giveaways/SELECT_GIVEAWAY'
export const SET_SELECTED_GIVEAWAY = 'giveaways/SET_SELECTED_GIVEAWAY'
export const UNSET_SELECTED_GIVEAWAY = 'giveaways/UNSET_SELECTED_GIVEAWAY'

export const ON_GIVEAWAY_EVENT = 'giveaways/ON_GIVEAWAY_EVENT'
export const ON_GIVEAWAY_UPDATED = 'giveaways/ON_GIVEAWAY_UPDATED';

export const MODIFY_GIVEAWAYS_SUBSCRIPTION = 'giveaways/MODIFY_GIVEAWAYS_SUSBCRIPTIONS'
export const MODIFY_GIVEAWAYS_SUBSCRIPTION_SUCCESS = 'giveaways/MODIFY_GIVEAWAYS_SUSBCRIPTIONS_SUCCESS'
export const MODIFY_GIVEAWAYS_SUBSCRIPTION_FAIL = 'giveawaysMODIFY_GIVEAWAYS_SUSBCRIPTIONS_FAIL'

export const JOIN_GIVEAWAY = 'giveaways/JOIN_GIVEAWAY'
export const LEAVE_GIVEAWAY = 'giveawayas/LEAVE_GIVEAWAY'
export const LEAVE_GIVEAWAY_SUCCESS = 'giveawayas/LEAVE_GIVEAWAY_SUCCESS'
export const LEAVE_GIVEAWAY_FAILED = 'giveawayas/LEAVE_GIVEAWAY_FAILED'

/**
 * Action Creators
 */
export const giveawaysActionCreators = {
  getGiveaways: createAction(GET_GIVEAWAYS),
  getGiveawaysSuccess: createAction(GET_GIVEAWAYS_SUCCESS),
  getGiveawaysFailure: createAction(GET_GIVEAWAYS_FAILED),
  getGiveaway: createAction(GET_GIVEAWAY),
  getGiveawaySuccess: createAction(GET_GIVEAWAY_SUCCESS),
  getGiveawayFailure: createAction(GET_GIVEAWAY_FAILED),
  updateGiveaway: createAction(UPDATE_GIVEAWAY),
  updateGiveawaySuccess: createAction(UPDATE_GIVEAWAY_SUCCESS),
  updateGiveawayFailure: createAction(UPDATE_GIVEAWAY_FAILED),
  createGiveaway: createAction(CREATE_GIVEAWAY),
  createGiveawaySuccess: createAction(CREATE_GIVEAWAY_SUCCESS),
  createGiveawayFailure: createAction(CREATE_GIVEAWAY_FAILED),
  deleteGiveaway: createAction(DELETE_GIVEAWAY),
  deleteGiveawaySuccess: createAction(DELETE_GIVEAWAY_SUCCESS),
  deleteGiveawayFailure: createAction(DELETE_GIVEAWAY_FAILED),
  setSelectedGiveaway: createAction(SET_SELECTED_GIVEAWAY),
  unsetSelectedGiveaway: createAction(UNSET_SELECTED_GIVEAWAY),
  selectGiveaway: createAction(SELECT_GIVEAWAY),
  onGiveawayEvent: createAction(ON_GIVEAWAY_EVENT),
  onGiveawayUpdated: createAction(ON_GIVEAWAY_UPDATED),
  modifyGiveawaysSubscriptions: createAction(MODIFY_GIVEAWAYS_SUBSCRIPTION),
  modifyGiveawaysSubscriptionsSuccess: createAction(MODIFY_GIVEAWAYS_SUBSCRIPTION_SUCCESS),
  modifyGiveawaysSubscriptionsFail: createAction(MODIFY_GIVEAWAYS_SUBSCRIPTION_FAIL),
  joinGiveaway: createAction(JOIN_GIVEAWAY),
  leaveGiveaway: createAction(LEAVE_GIVEAWAY),
  leaveGiveawaySuccess: createAction(LEAVE_GIVEAWAY_SUCCESS),
  leaveGiveawayFailure: createAction(LEAVE_GIVEAWAY_FAILED),
  getLatestGiveaway: createAction(GET_LATEST_GIVEAWAY),
  getLatestGiveawaySuccess: createAction(GET_LATEST_GIVEAWAY_SUCCESS),
  getLatestGiveawayFailed: createAction(GET_LATEST_GIVEAWAY_FAILED)
};
