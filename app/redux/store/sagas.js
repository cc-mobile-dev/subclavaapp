// @flow

import { fork, all } from 'redux-saga/effects';
import { chatSaga, chatroomsSaga, authSaga, promotionsSaga, notificationSaga, joinedChatroomsSaga, subscriptionsSaga, giveawaysSaga, liveVideoSaga, socketSaga, accountSaga } from '../modules';

export default function* rootSaga() {
  yield all([
    fork(chatSaga),
    fork(liveVideoSaga),
    fork(authSaga),
    fork(chatroomsSaga),
    fork(promotionsSaga),
    fork(notificationSaga),
    fork(joinedChatroomsSaga),
    fork(subscriptionsSaga),
    fork(giveawaysSaga),
    fork(socketSaga),
    fork(accountSaga)
  ])
}
