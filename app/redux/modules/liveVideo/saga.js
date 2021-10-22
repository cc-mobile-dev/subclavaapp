// // @flow

import { take, takeEvery, put, call, fork, all, takeLatest, delay, select, race } from 'redux-saga/effects';
import { GET_LIVE_TOKEN, liveVideoActionCreators, START_VIDEO, START_COUNTDOWN, STOP_COUNTDOWN, STOP_VIDEO, NEW_VIEW_CREATED, LIVE_COUNT_UPDATE, USER_JOINED, USER_LEFT } from './actions';
import { initSocket } from '../../../utilities/socket'
import { accountActionCreators } from '../account';
import { toast } from '../../../utilities/toast';
import { dismiss } from '../../../utilities/navigation';
import * as StoreReview from 'react-native-store-review'

const Parse = require('parse/react-native')

function* _startVideo({ payload }) {
    yield put(liveVideoActionCreators.getLiveToken(payload))
}

function* _getLiveToken({ payload }) {
    try {
        let result = yield Parse.Cloud.run('token', payload)
        yield put(liveVideoActionCreators.getLiveTokenSuccess({
            ...result,
            giveawayId: payload.giveawayId
        }))
    } catch (e) {
        yield put(liveVideoActionCreators.getLiveTokenFailed())
        console.log(e.message)
    }
}

function* _startCountdown(action) {
    let liveToken = yield select(state => state.authState.liveToken)
    const socket = yield call(initSocket, liveToken)
    yield take(NEW_VIEW_CREATED)
    let currentView = yield select(state => state.liveVideoState.currentView)
    let seconds = 0;

    while (true) {
        try {
            socket.emit('update-user-balance', {
                currentViewId: currentView.objectId,
                lastViewDate: Date.now()
            })
            let balance = yield select(state => state.accountState.balance)
            console.log(balance)
            if (balance > 0) {
                console.log(seconds, seconds === 60)
                if (seconds === 60) {
                    // if (balance - 1) {
                    // toast('You are going to be kicked out in 1 minute', 3000)
                    // }
                    yield put(accountActionCreators.updateLocalBalance(balance - 1));
                    seconds = 0;
                }
                yield delay(30000)
                seconds += 30
            } else {
                console.log('out of minutes')
                dismiss()
                toast('You are out of minutes', 3000)
                //TODO: add a pop for buying more minutes
                let currentView = yield select(state => state.liveVideoState.currentView)
                yield put(liveVideoActionCreators.stopCountdown({
                    currentView
                }))
                yield put(liveVideoActionCreators.stopVideo())
                throw Error('Out of minutes')
            }
        } catch (err) {
            console.log(err)
        }
    }
}

function* _stopCountdown({ payload }) {
    let currentView = payload.currentView

    if (currentView) {
        try {
            let View = Parse.Object.extend('View')

            let view = new View()
            view.id = currentView.objectId
            //create chatroom first
            yield view.save({
                startedAt: currentView.startedAt,
                endedAt: Date.now()
            })

            let percentage = yield Parse.Config.get('reviewPercentage') || 30

            yield delay(2000)

            if (StoreReview.isAvailable) {
                if (Math.random() < percentage / 100) {
                    StoreReview.requestReview();
                }
            }

        } catch (e) {
            console.log(e)

        }
    }
    yield put(liveVideoActionCreators.stopVideo())
}

function* liveVideoWatcher() {
    while (true) {
        yield take(START_COUNTDOWN);
        yield race([
            call(_startCountdown),
            take(STOP_COUNTDOWN)
        ]);
    }

}

function* _createView({ payload }) {
    console.log(payload)
    try {
        let View = Parse.Object.extend('View')
        let user = yield Parse.User.currentAsync()

        let Giveaway = Parse.Object.extend('Giveaway')
        let giveaway = new Giveaway()
        giveaway.id = payload.giveaway.objectId

        let acl = new Parse.ACL()
        acl.setPublicReadAccess(true)
        acl.setPublicWriteAccess(false)
        acl.setWriteAccess(user.id, true)

        let view = new View()
        view.setACL(acl)
        //create chatroom first
        yield view.save({
            user,
            startedAt: Date.now(),
            giveaway
        })

        yield put(liveVideoActionCreators.newViewCreated(view.toJSON()))
    } catch (e) {
        console.log(e)
    }
}

export default function* () {
    yield all([
        yield takeLatest(START_VIDEO, _startVideo),
        yield takeLatest(GET_LIVE_TOKEN, _getLiveToken),
        yield takeLatest(START_COUNTDOWN, _createView),
        yield takeLatest(STOP_COUNTDOWN, _stopCountdown),
        fork(liveVideoWatcher)
    ]);
}