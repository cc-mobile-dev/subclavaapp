// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */
// export const GET_CHATROOM_PRODUCT = 'subscriptions/GET_CHATROOM_PRODUCT'
// export const GET_CHATROOM_PRODUCT_SUCCESS = 'subscriptions/GET_CHATROOM_PRODUCT_SUCCESS'
// export const GET_CHATROOM_PRODUCT_FAIL = 'subscriptions/GET_CHATROOM_PRODUCT_FAIL'

// export const GET_SUBSCRIPTIONS = 'subscriptions/GET_SUBSCRIPTIONS'
// export const GET_SUBSCRIPTIONS_SUCCESS = 'subscriptions/GET_SUBSCRIPTIONS_SUCCESS'
// export const GET_SUBSCRIPTIONS_FAIL = 'subscriptions/GET_SUBSCRIPTIONS_FAIL'

// export const GET_USER_SUBSCRIPTIONS = 'subscriptions/GET_USER_SUBSCRIPTIONS'
// export const GET_USER_SUBSCRIPTIONS_SUCCESS = 'subscriptions/GOT_USER_SUBCRIPTIONS_SUCCESS'
// export const GET_USER_SUBSCRIPTIONS_FAIL = 'subscriptions/GOT_USER_SUBCRIPTIONS_FAIL'

// export const SUBSCRIBE_TO_CHATROOM = 'subscriptions/SUBSCRIBE_TO_CHATROOM'
// export const SUBSCRIBE_TO_CHATROOM_SUCCESS = 'subscriptions/SUBSCRIBE_TO_CHATROOM_SUCCESS'
// export const SUBSCRIBE_TO_CHATROOM_FAIL = 'subscriptions/SUBSCRIBE_TO_CHATROOM_FAIL'

export const PURCHASE_PRODUCT = 'subscriptions/PURCHASE_PRODUCT'
export const PURCHASE_PRODUCT_SUCCESS = 'subscriptions/PURCHASE_PRODUCT_SUCCESS'
export const PURCHASE_PRODUCT_FAIL = 'subscriptions/PURCHASE_PRODUCT_FAIL'

export const GET_PRODUCTS = 'subscriptions/GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESS = 'subscriptions/GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAIL = 'subscriptons/GET_PRODUCTS_FAIL'

/**
 * Action Creators
 */
export const subscriptionsActionCreators = {
  purchaseProduct: createAction(PURCHASE_PRODUCT),
  purchaseProductSuccess: createAction(PURCHASE_PRODUCT_SUCCESS),
  purchaseProductFail: createAction(PURCHASE_PRODUCT_FAIL),
  getProducts: createAction(GET_PRODUCTS),
  getProductsSuccess: createAction(GET_PRODUCTS_SUCCESS),
  getProductsFail: createAction(GET_PRODUCTS_FAIL)
  // getSubscriptions: createAction(GET_SUBSCRIPTIONS),
  // getSubscriptionsSuccess: createAction(GET_SUBSCRIPTIONS_SUCCESS),
  // getSubscriptionsFail: createAction(GET_SUBSCRIPTIONS_FAIL),
  // getUserSubscriptions: createAction(GET_USER_SUBSCRIPTIONS),
  // getUserSubscriptionsSuccess: createAction(GET_USER_SUBSCRIPTIONS_SUCCESS),
  // subscribeToChatroom: createPromiseAction(SUBSCRIBE_TO_CHATROOM),
  // subscribeToChatroomSuccess: createAction(SUBSCRIBE_TO_CHATROOM_SUCCESS),
  // subscribeToChatroomFail: createAction(SUBSCRIBE_TO_CHATROOM_FAIL)
};
