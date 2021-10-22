// @flow

import { take, takeEvery, put, call, fork, all } from 'redux-saga/effects';

import { favoriteChatroomsActionCreators, FAVORITE_CHATROOMS_ATTEMPT, FAVORITE_CHATROOM, UNFAVORITE_CHATROOM, FAVORITE_CHATROOM_SUCCESS, UNFAVORITE_CHATROOM_SUCCESS } from './actions';

import { favoriteChatrooms } from './connections';
import { addFavoriteChatroom, deleteFavoriteChatroom } from '../../../utilities';

export function* asyncFavoriteChatroomsAttempt({ payload, resolve, reject }) {
  try {
    const response = yield call(favoriteChatrooms, payload);
    if (response.error) {
      if (reject) reject(response.err);
    } else {
      yield put(favoriteChatroomsActionCreators.favoriteChatroomsSuccess(response.data));
      if (resolve) resolve(response.data);
    }
  } catch (error) {
    if (reject) reject(error);
  }
}

export function* watchFavoriteChatroomsAttempt() {
  while (true) {
    const action = yield take(FAVORITE_CHATROOMS_ATTEMPT)
    yield* asyncFavoriteChatroomsAttempt(action);
  }
}

export function* favoriteChatroom(action) {
  let response = yield call(addFavoriteChatroom, action.payload);
  if (!response.error) {
    yield put(favoriteChatroomsActionCreators.favoriteChatroomSuccess())
    yield* asyncFavoriteChatroomsAttempt({})
  } else {
    yield put(favoriteChatroomsActionCreators.favoriteChatroomFail())
  }
}

export function* unfavoriteChatroom(action) {
  let response = yield call(deleteFavoriteChatroom, action.payload);
  if (!response.error) {
    yield put(favoriteChatroomsActionCreators.unfavoriteChatroomSuccess())
    yield* asyncFavoriteChatroomsAttempt({})
  } else {
    yield put(favoriteChatroomsActionCreators.favoriteChatroomFail())
  }
}

export default function* () {
  yield all([
    yield takeEvery(FAVORITE_CHATROOM, favoriteChatroom),
    yield takeEvery(UNFAVORITE_CHATROOM, unfavoriteChatroom),
    fork(watchFavoriteChatroomsAttempt)
  ]);
}
