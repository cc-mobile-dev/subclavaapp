// @flow

import { take, all, takeLatest, select, call, put } from 'redux-saga/effects';
import { accountActionCreators, GET_BALANCE } from './actions';

const Parse = require('parse/react-native')

function* _getBalance() {
    let user = yield Parse.User.currentAsync()
    try {
        let q = new Parse.Query('Account')
        q.equalTo('user', user)
        q.descending('createdAt')
        let account = yield q.first()
        yield put(accountActionCreators.getBalanceSuccess(account.toJSON()))
    } catch (e) {
        yield put(accountActionCreators.getBalanceFailed())
        console.log(e)
    }
}

// export function* onModelChange(data) {
//     let actionMap = {
//         'giveaway': {
//             'update': giveawaysActionCreators.updateGiveawaySuccess,
//             'create': giveawaysActionCreators.createGiveawaySuccess
//         },
//         'chatroom': {
//             'update': chatroomsActionCreators.updateChatroomData
//         }
//     }
//     yield put(actionMap[data.model][data.event](data.payload))
// }

export default function* () {
    yield all([
        yield takeLatest(GET_BALANCE, _getBalance),
    ]);
}
