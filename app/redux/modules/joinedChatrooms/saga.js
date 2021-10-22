// @flow

import {
  take,
  put,
  call,
  all,
  select,
} from 'redux-saga/effects';

import { addJoinedChatroom, deleteJoinedChatroom } from '../../../utilities';
import NavigationService, { navigate } from '../../../utilities/navigation';
import { giveawaysActionCreators } from '../giveaways';
import { toast } from '../../../utilities/toast';

const Parse = require('parse/react-native');

export function* _joinChatroom({ payload }) {

}

export function* _leaveChatroom(action) {
  let response = yield call(deleteJoinedChatroom, action.payload);
  if (!response.error) {
    yield put(joinedChatroomsActionCreators.leaveChatroomSuccess());
    yield* asyncJoinedChatroomsAttempt({});
  } else {
    yield put(leaveChatroomsActionCreators.leaveChatroomFail());
  }
}

// export function* checkSubscriptionStatus() {
//   let body = yield Purchases.getPurchaserInfo()
//   let response = yield call(checkSubscriptions, body);
//   console.log(response)
//   if (!response.error) {
//     yield put(joinedChatroomsActionCreators.checkSubscriptionsSuccess(response))
//   } else {
//     yield put(joinedChatroomsActionCreators.checkSubscriptionsFail())
//   }
// }

export function* _afterSelectChatroom(action) {
  const {
    payload: { chatroomId },
  } = action;

  let currentUser = yield select(state => state.authState.currentUser);
  // yield put(giveawaysActionCreators.getGiveaway())
  yield put(chatroomsActionCreators.getChatroom({ chatroomId }));

  yield take([GOT_CHATROOM, GET_CHATROOM_FAILED]);

  let chatrooms = yield select(state => state.chatroomsState.allChatrooms);
  let chatroom = chatrooms.find(c => c.objectId === chatroomId);

  let passed = false;

  if (chatroom) {
    // yield put(onJoinGroupChannel(chatroom.id))
    // console.tron.log(NavigationService)
    // NavigationService.navigate('ChatroomScreen', { chatroom })
    let isAdmin = chatroom.admin.objectId === currentUser.objectId;
    if (isAdmin) {
      NavigationService.navigate('LiveVideo', { chatroom, isAdmin });
      // yield put(joinedChatroomsActionCreators.initChat(chatroom));
    } else {
      //NavigationService.navigate('ChatroomScreen', { chatroom })
      yield put(giveawaysActionCreators.selectGiveaway({ chatroomId }));
    }

    // if (!chatroom.isLive) {
    //   // NavigationService.navigate('ChatroomScreen', { chatroom });
    //   // yield put(joinedChatroomsActionCreators.initChat(chatroom));
    //   // passed = true
    // } else {
    //   //

    // }
  }
}

export default function* () {
  yield all([
    // yield takeLatest(JOIN_CHATROOM, _joinChatroom),
    // yield takeEvery(LEAVE_CHATROOM, _leaveChatroom),
    // yield takeLatest(INIT_CHAT, _initSendbirdChat),
    // yield takeLatest(RELEASE_CHAT, _releaseChat),
    // yield takeEvery(CHECK_SUBSCRIPTIONS_STATUS, checkSubscriptionStatus),
    // yield takeLatest(SELECT_CHATROOM, _afterSelectChatroom),
    // yield takeLatest(JOINED_CHATROOMS_ATTEMPT, _getJoinedChatrooms),
  ]);
}
