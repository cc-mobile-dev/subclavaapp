// @flow

import { filter, findIndex } from 'lodash';
import { VOTE_FOR_PROMOTIONS_SUCCESS, ADD_COUPONS } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.promotionsState;

export default function promotionsState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case VOTE_FOR_PROMOTIONS_SUCCESS:
      return {
        ...state,
        didVoteForPromotions: true,
      };
    case ADD_COUPONS:
      return updateCoupons(state, payload);
    default:
      return state;
  }
}

const updateCoupons = (state, newCoupons) => {
  const coupons = state.coupons.slice();

  // filter unexpired coupons
  const validCoupons = filter(coupons, coupon => {
    const dateExpire = new Date(coupon.date_expire);
    const nowDate = new Date();
    return dateExpire > nowDate;
  });

  // remove duplicate coupons
  for (let i = 0; i < newCoupons.length; i += 1) {
    const newCoupon = newCoupons[i];
    const index = findIndex(validCoupons, { _id: newCoupon._id });

    if (index >= 0) {
      validCoupons.splice(index, 1);
    }
    validCoupons.push(newCoupon);
  }

  return {
    ...state,
    coupons: validCoupons,
  };
};
