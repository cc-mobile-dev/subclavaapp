// @flow

import { take, all, takeLatest, select, call, put } from 'redux-saga/effects';
import { eventChannel, channel } from '@redux-saga/core';
import { initChatSocket, clearChatSocket } from '../../../utilities/socket';
import { LOGOUT } from '../sharedActions';
import { JOIN_CHATROOM, JOIN_CHATROOM_SUCCESS } from '../joinedChatrooms/actions';
import { chatActionCreators, SEND_MESSAGE } from './actions';
import { GET_LIVE_TOKEN_SUCCESS, STOP_VIDEO } from '../liveVideo/actions';
import agoraChat from '../../../utilities/agora'

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

        let events = ['MemberJoined', 'MemberLeft']

        socket.on('ChannelMessage', (message, memberId) => onEvent({ message, memberId }, 'ChannelMessage'))

        // setup the subscription
        // socket.on('chatroom-live', data => onEvent(data, 'chatroom-live'))
        events.forEach(e => socket.on(e, data => onEvent(data, e)))
        // socket.on('error', errorHandler)
        // socket.on('disconnect', () => unsubscribe())

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            // socket.off('chatroom-live', onEvent)
            events.forEach(e => socket.off(e, onEvent))
            socket.off('ChannelMessage')
        }

        return unsubscribe
    })
}

export function* initSocketSaga(action) {
    const { payload } = action
    // const socket = yield call(initChatSocket, payload.chatToken)

    let currentUser = yield select(state => state.authState.currentUser)
    let chat = agoraChat.instance()

    yield chat.login(
        payload.chatToken,
        currentUser
    )

    yield chat.joinChannel(payload.giveawayId)

    let channel = chat.getChannel()

    let totalUsers = yield chat.getChannelMemberCount(payload.giveawayId)

    //clear chat and set total number of users
    yield put(chatActionCreators.initLiveChat({ numUsers: totalUsers }))

    const socketChannel = yield call(createSocketChannel, channel)

    while (true) {
        try {
            const payload = yield take(socketChannel)
            switch (payload.action) {
                case 'ChannelMessage': {
                    // update the chatroom status as well
                    let member = yield chat.getUserDetails(payload.data.memberId)
                    yield put(chatActionCreators.newMessage({
                        ...payload.data,
                        member
                    }))
                    break;
                }
                case 'MemberJoined': {
                    let member = yield chat.getUserDetails(payload.data)
                    yield put(chatActionCreators.userJoined({
                        ...payload.data,
                        member
                    }))
                    break;
                }
                case 'MemberLeft':
                    yield put(chatActionCreators.userLeft(payload.data))
                case 'login':
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export function* _initChat({ payload }) {
    // let currentUser = yield select(state => state.authState.currentUser)
    // await agoraChat.login({
    //     uid: currentUser.objectId,
    //     token: payload.chatToken
    // })

    // yield put(chatActionCreators.loggedIn())
}

function* closeSocket() {
    let chat = agoraChat.instance()
    yield chat.leaveChannel()
    // const socket = yield call(initChatSocket)
    // socket.emit('exit');
    // console.tron.log('exittinggg')
    // yield socket.disconnect()
    // yield call(clearChatSocket)
}

export function* _sendMessage(action) {
    const { payload: { message, room } } = action;
    let currentUser = yield select(state => state.authState.currentUser)
    let chat = agoraChat.instance()
    yield chat.sendMessage({ message })
    yield put(chatActionCreators.sentMessage({
        message,
        id: Date.now(),
        user: currentUser
    }))
    // const socket = yield call(initChatSocket)
    // socket.emit('new message', {
    //     ...payload
    // })

}

export default function* () {
    yield all([
        yield takeLatest(GET_LIVE_TOKEN_SUCCESS, initSocketSaga),
        yield takeLatest(SEND_MESSAGE, _sendMessage),
        yield takeLatest(STOP_VIDEO, closeSocket)
    ]);
}
