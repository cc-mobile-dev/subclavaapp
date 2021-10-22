// @flow

import { take, takeEvery, put, call, fork, all, takeLatest, select } from 'redux-saga/effects';


import { GET_CHATROOM_PRODUCT, subscriptionsActionCreators, GET_SUBSCRIPTIONS, GET_USER_SUBSCRIPTIONS, SUBSCRIBE_TO_CHATROOM, PURCHASE_PRODUCT_FAIL, PURCHASE_PRODUCT, GET_PRODUCTS, GET_GIVEAWAYS_SUBSCRIPTION } from './actions';

import Purchases from 'react-native-purchases';
import { accountActionCreators } from '../account';

const Parse = require('parse/react-native')

// export function* getProductForChatroom(action) {
//   let { product } = action.payload;
//   try {
//     const offerings = yield Purchases.getOfferings();
//     if (offerings.current !== null && offerings.plans.availablePackages.length !== 0) {
//       // Display packages for sale
//       console.log(offerings)
//       offerings.plans.availablePackages.forEach(p => p.product)
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }

// export function* getUserSubscriptions(action) {
//   try {
//     const userInfo = yield Purchases.getPurchaserInfo();
//     yield put(subscriptionsActionCreators.getUserSubscriptionsSuccess(userInfo))
//   } catch (e) {
//     console.log(e)
//     yield put(subscriptionsActionCreators.getUserSubscriptionsFail(e))
//   }
// }

/*
* Get all the passes available
*/
export function* _getProducts(action) {
  try {
    const offerings = yield Purchases.getOfferings();
    if (offerings.current && offerings.current.availablePackages.length !== 0) {
      // Display packages for sale
      let products = offerings.current.availablePackages.map(p => p.product).sort((a, b) => a.price - b.price)
      yield put(subscriptionsActionCreators.getProductsSuccess(products))
    } else {
      yield put(subscriptionsActionCreators.getProductsSuccess([]))
    }
  } catch (e) {
    yield put(subscriptionsActionCreators.getProductsFail())
  }
}

/*
* Buy the product using revenue cat api
*/
export function* _purchaseProduct(action) {
  const product = action.payload

  let user = yield Parse.User.currentAsync()
  try {
    const { activeSubscriptions } = yield Purchases.getPurchaserInfo()
    if (activeSubscriptions.length === 0) {
      let { purchaserInfo } = yield Purchases.purchaseProduct(product.identifier)
      let Transaction = Parse.Object.extend('Transaction')
      let trans = new Transaction()
      yield trans.save({
        amount: product.price,
        product: product.identifier,
        meta: {
          // purchaserInfo,
          product
        },
        user
      })
      yield put(subscriptionsActionCreators.purchaseProductSuccess({ purchaserInfo, product }))
      yield put(accountActionCreators.getBalance())
      // yield put(joinedChatroomsActionCreators.joinedChatrooms())
    }
  } catch (e) {
    console.log(e)
    yield put(subscriptionsActionCreators.purchaseProductFail())
  }
}


export default function* () {
  yield all([
    yield takeLatest(GET_PRODUCTS, _getProducts),
    // yield takeEvery(GET_USER_SUBSCRIPTIONS, getUserSubscriptions),
    // yield takeEvery(SUBSCRIBE_TO_CHATROOM, subscribe)
    yield takeLatest(PURCHASE_PRODUCT, _purchaseProduct)
  ]);
}
