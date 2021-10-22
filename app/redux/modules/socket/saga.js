// @flow

import { take, all, takeLatest, select, call, put } from 'redux-saga/effects';
import { eventChannel } from '@redux-saga/core';
import { initSocket, clearSocket } from '../../../utilities/socket';
import { giveawaysActionCreators } from '../giveaways';
import { chatroomsActionCreators } from '../chatrooms';
import { LOGOUT } from '../sharedActions';
import { GET_LIVE_TOKEN_SUCCESS, liveVideoActionCreators } from '../liveVideo/actions';
import { SET_TOKEN, UPDATE_USER_SUCCESS } from '../auth/actions';

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {

        const onEvent = (data, name) => {
            emit({ data, action: name })
        }

        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason))
        }

        // setup the subscription
        // socket.on('chatroom-live', data => onEvent(data, 'chatroom-live'))
        socket.on('live-status', data => onEvent(data, 'live-status'))
        socket.on('error', errorHandler)
        socket.on('disconnect', () => unsubscribe())

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            // socket.off('chatroom-live', onEvent)
            socket.off('live-status', onEvent)
        }

        return unsubscribe
    })
}

export function* initSocketSaga() {
    let token = yield select(state => state.authState.token)
    const socket = yield call(initSocket, token)
    const socketChannel = yield call(createSocketChannel, socket)
    while (true) {
        try {
            const payload = yield take(socketChannel)
            console.tron.log(payload)

            switch (payload.action) {
                // case 'chatroom-live':
                //     yield put(chatroomsActionCreators.toggleChatroomLive(payload.data))
                //     break;
                case 'live-status':
                    // update the chatroom status as well
                    // yield put(chatroomsActionCreators.toggleChatroomLive({
                    //     isLive: payload.data.isLive,
                    //     chatroomId: payload.data.chatroomId
                    // }))
                    //update the giveaway state
                    yield put(giveawaysActionCreators.onGiveawayUpdated(payload.data))


                    // if (!payload.data.isActive) {
                    //     let currentView = yield select(state => state.liveVideoState.currentView)
                    //     yield put(liveVideoActionCreators.stopCountdown({
                    //         currentView
                    //     }))
                    // }
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    }
}

function* closeSocket() {
    const socket = yield call(initSocket)
    yield socket.disconnect();
    yield call(clearSocket);
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
        yield takeLatest(SET_TOKEN, initSocketSaga),
        yield takeLatest(LOGOUT, closeSocket)
    ]);
}
