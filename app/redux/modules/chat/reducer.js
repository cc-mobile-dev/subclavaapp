// @flow
import { chatState as initial } from '../defaultReducers';
import { INIT_LIVE_CHAT, NEW_MESSAGE, USER_JOINED, USER_LEFT, SENT_MESSAGE } from './actions';
import update from 'immutability-helper'

export default function chatState(state = initial, action) {
  const payload = action.payload
  switch (action.type) {
    case INIT_LIVE_CHAT: {
      return {
        ...state,
        connected: true,
        messages: [],
        numUsers: payload.numUsers
      }
    }
    case NEW_MESSAGE: {
      return update(state, {
        messages: {
          $unshift: [{
            _id: Date.now(),
            text: payload.message.text,
            user: {
              _id: payload.memberId,
              name: payload.member.username,
              avatar: payload.member.imageUrl,
            }
          }]
        }
      })
    }
    case SENT_MESSAGE: {
      return update(state, {
        messages: {
          $unshift: [{
            _id: payload.id,
            text: payload.message,
            user: {
              _id: payload.user.objectId,
              name: payload.user.username,
              avatar: payload.user.imageUrl.url
            }
          }]
        }
      })
    }
    case USER_JOINED: {
      return update(state, {
        messages: {
          $unshift: [{
            _id: Date.now(),
            text: 'Joined',
            user: {
              name: payload.member.username,
              avatar: payload.member.imageUrl
            }
          }]
        },
        numUsers: { $set: state.numUsers + 1 }
      })
    }
    case USER_LEFT: {
      return {
        ...state,
        numUsers: state.numUsers === 0 ? 0 : state.numUsers - 1
      }
    }
    default:
      return { ...state };
  }
}
