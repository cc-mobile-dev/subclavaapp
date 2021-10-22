// @flow

import { take, put, call, fork, all } from 'redux-saga/effects';

import { promotionsActionCreators, VOTE_FOR_PROMOTIONS_REQUEST } from './actions';

import { voteForPromotions } from '../../../utilities/api';

export function* asyncVoteForPromotionsAttempt({ payload, resolve, reject }) {
  try {
    const response = yield call(voteForPromotions, payload);
    // console.log('vote for promotion response', response);
    if (response.status === 'error') {
      if (reject) reject(response);
    } else {
      yield put(promotionsActionCreators.voteForPromotionsSuccess(response.data));
      if (resolve) resolve(response.data);
    }
  } catch (error) {
    if (reject) reject(error);
  }
}

export function* watchVoteForPromotionsAttempt() {
  while (true) {
    const action = yield take(VOTE_FOR_PROMOTIONS_REQUEST);
    yield* asyncVoteForPromotionsAttempt(action);
  }
}

export default function*() {
  yield all([fork(watchVoteForPromotionsAttempt)]);
}
