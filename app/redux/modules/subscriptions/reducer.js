// @flow

import { GET_SUBSCRIPTIONS_SUCCESS, GET_USER_SUBSCRIPTIONS_SUCCESS, SUBSCRIBE_TO_CHATROOM, SUBSCRIBE_TO_CHATROOM_SUCCESS, SUBSCRIBE_TO_CHATROOM_FAIL, GET_PRODUCTS_SUCCESS } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.subscriptionsState;

export default function subscriptionsState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload,
      }
    case GET_USER_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        latestPurchasedDate: null,
        latestTransactionDate: null,
        latestPurchasedProduct: null
      }
    }
    case SUBSCRIBE_TO_CHATROOM: {
      return {
        ...state,
        isSubscribing: true,
        latestTransactionDate: Date.now() / 1000
      }
    }
    case SUBSCRIBE_TO_CHATROOM_SUCCESS: {
      let { product, purchaserInfo } = payload;
      let productPurchaseDate = purchaserInfo.allPurchaseDatesMillis[product.identifier]
      return {
        ...state,
        isSubscribing: false,
        latestPurchasedDate: productPurchaseDate,
        latestPurchasedProduct: product
      }
    }
    case SUBSCRIBE_TO_CHATROOM_FAIL: {
      return {
        ...state,
        isSubscribing: false
      }
    }
    default:
      return state;
  }
}
