// @flow

import { take, takeEvery, takeLatest, put, call, fork, all, select, takeMaybe } from 'redux-saga/effects';

import { chatroomsActionCreators, GET_CHATROOMS_ATTEMPT, UPDATE_CHATROOM, GET_CHATROOM, CHATROOMS_BY_LOCATION_ATTEMPT, GET_GIVEAWAYS, CREATE_CHATROOM, DELETE_CHATROOM, UPDATE_CHATROOM_DATA } from './actions';

import { toast } from '../../../utilities/toast';
import { navigate } from '../../../utilities/navigation';
import { SET_DEEP_LINK_DATA, APP_STATE_CHANGED } from '../global/actions';
import { NavigationActions } from 'react-navigation';
import { TabActions } from '@react-navigation/native';
import { afterSelectChatroom } from '../joinedChatrooms/saga';
import { joinedChatroomsActionCreators } from '../joinedChatrooms';
import { LOGIN_SUCCESS } from '../sendbird/actions/types';
import { LOGIN_FAILED } from '../auth/actions';
import { giveawaysActionCreators } from '../giveaways';


const Parse = require('parse/react-native')

export function* _getChatrooms({ payload }) {
  try {
    let Chatroom = Parse.Object.extend('Chatroom')
    let q = new Parse.Query(Chatroom)
    q.includeAll()
    let chatrooms = yield q.findAll()

    let user = yield select(state => state.authState.currentUser)
    yield put(chatroomsActionCreators.getChatroomsSuccess({ chatrooms: chatrooms.map(c => c.toJSON()), user }))
  } catch (error) {
    toast(error.message)
    yield put(chatroomsActionCreators.getChatroomsFailed())
  }
}

function* _updateChatroom(action) {

  try {
    let Chatroom = Parse.Object.extend('Chatroom')
    let chatroom = new Chatroom()
    yield chatroom.save({
      ...action.payload
    })
    yield put(chatroomsActionCreators.updatedChatroom({
      chatroom: chatroom.toJSON(),
      id: chatroom.id
    }))
  } catch (error) {
    // toast(error.message)
    yield put(chatroomsActionCreators.updateChatroomFailed())
  }
}

export function* _getChatroom(action) {
  try {
    let Chatroom = Parse.Object.extend('Chatroom')
    let q = new Parse.Query(Chatroom)
    q.includeAll()
    let chatroom = yield q.get(action.payload.chatroomId)
    yield put(chatroomsActionCreators.gotChatroom({
      chatroom: chatroom.toJSON()
    }))
  } catch (error) {
    toast(error.message)
    yield put(chatroomsActionCreators.getChatroomFailed())
  }
}

function* _createChatroom({ payload }) {
  let Chatroom = Parse.Object.extend('Chatroom')
  let user = yield Parse.User.currentAsync()

  let chatrooms = yield select(state => state.chatroomsState.allChatrooms);
  let alreadyChatroom = chatrooms.find(c => c.admin.objectId === user.id)

  try {
    let chatroom;
    if (!alreadyChatroom) {
      chatroom = new Chatroom()
      let acl = new Parse.ACL()
      acl.setPublicReadAccess(true)
      acl.setPublicWriteAccess(false)
      acl.setWriteAccess(user.id, true)

      chatroom.setACL(acl)

      //create chatroom first
      yield chatroom.save({
        admin: user,
        description: payload.description,
        name: `${user.get('username')}'s live`,
        // imageUrl: payload.imageUrl || 'https://clava.s3.us-east-2.amazonaws.com/map-logo.png',
        publicLink: '-'
      })

    } else {
      let q = new Parse.Query('Chatroom');
      chatroom = yield q.get(alreadyChatroom.objectId);
    }
    chatroom = chatroom.toJSON()
    //create sendbird channel later
    yield put(chatroomsActionCreators.createChatroomSuccess(chatroom))

    yield put(giveawaysActionCreators.createGiveaway({
      name: payload.title,
      description: payload.description,
      chatroomId: chatroom.objectId,
      limit: 1000,
      expires: payload.expires,
      imageUrl: payload.imageUrl
    }))
    // yield put(onJoinGroupChannel(chatroom.id))
    // navigate('ChatroomScreen', {
    //   chatroom: {
    //     ...chatroom.toJSON(),
    //     id: chatroom.id
    //   }
    // })
  } catch (e) {
    toast(e.message)
    yield put(chatroomsActionCreators.createChatroomFailed())
  }
}

export function* _deleteChatroom(action) {
  try {
    let Chatroom = Parse.Object.extend('Chatroom')
    let q = new Parse.Query(Chatroom)
    let chatroom = yield q.get(action.payload.chatroomId)
    yield chatroom.destroy()
    yield put(chatroomsActionCreators.deleteChatroomSuccess(action.payload.chatroomId))
    navigate('Home')
  } catch (error) {
    toast(error.message)
    yield put(chatroomsActionCreators.deleteChatroomFailed())
  }
}


export function* _onDeepLinkData(action) {
  yield take([LOGIN_SUCCESS, APP_STATE_CHANGED, LOGIN_FAILED])
  const { error, params, uri } = action.payload
  if (!error) {
    if (params['+clicked_branch_link']) {
      let item = params['$canonicalIdentifier'].split('/')
      switch (item[0]) {
        case 'giveaways':
          yield put(giveawaysActionCreators.selectGiveaway({
            giveawayId: item[1]
          }))
          break;
        default:
          break;
      }
    }
  } else {
    toast('Link not valid', 3000)
    console.log(err)
  }
}

function* _updateChatroomData({ payload }) {
  // let chatroom = yield select(state => state.chatroomsState.)
  if (payload) {
    yield put(chatroomsActionCreators.updatedChatroom({
      chatroom: payload,
      id: payload.objectId
    }))
  }
}



export default function* () {
  yield all([
    yield takeEvery(GET_CHATROOM, _getChatroom),
    yield takeLatest(UPDATE_CHATROOM_DATA, _updateChatroomData),
    yield takeLatest(CREATE_CHATROOM, _createChatroom),
    yield takeLatest(DELETE_CHATROOM, _deleteChatroom),
    yield takeLatest(UPDATE_CHATROOM, _updateChatroom),
    yield takeLatest(GET_CHATROOMS_ATTEMPT, _getChatrooms),
    yield takeLatest(SET_DEEP_LINK_DATA, _onDeepLinkData)
  ]);
}
