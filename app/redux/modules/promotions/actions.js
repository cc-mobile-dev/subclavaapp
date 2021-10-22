// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const VOTE_FOR_PROMOTIONS_REQUEST = 'promotions/VOTE_FOR_PROMOTIONS_REQUEST';
export const VOTE_FOR_PROMOTIONS_SUCCESS = 'promitions/VOTE_FOR_PROMOTIONS_SUCCESS';
export const ADD_COUPONS = 'promotions/ADD_COUPONS';

/**
 * Action Creators
 */
export const promotionsActionCreators = {
  voteForPromotions: createPromiseAction(VOTE_FOR_PROMOTIONS_REQUEST),
  voteForPromotionsSuccess: createAction(VOTE_FOR_PROMOTIONS_SUCCESS),
  addCoupons: createAction(ADD_COUPONS),
};
