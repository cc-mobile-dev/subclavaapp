// @flow

import { JOINED_CHATROOMS_SUCCESS, JOIN_CHATROOM, JOIN_CHATROOM_SUCCESS, LEAVE_CHATROOM, LEAVE_CHATROOM_SUCCESS, JOIN_CHATROOM_FAIL, CHECK_SUBSCRIPTIONS_STATUS, SELECT_CHATROOM, UNSELECT_CHATROOM, JOINED_CHATROOMS_ATTEMPT, JOINED_CHATROOMS_FAILED, INIT_CHAT, RELEASE_CHAT } from './actions';
import { defaultReducers } from '../defaultReducers';
import { update } from 'lodash';

const DEFAULT = defaultReducers.joinedChatroomsState;

export default function joinedChatroomsState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_CHATROOM:
      return {
        ...state,
        tryingToJoin: payload
      }
    case UNSELECT_CHATROOM:
      return {
        ...state,
        tryingToJoin: null
      }
    case JOINED_CHATROOMS_SUCCESS: {
      return {
        ...state,
        memberships: payload,
        subbed: payload.map(p => p.chatroom),
        isFetching: false
      }
    }
    case JOIN_CHATROOM:
    case LEAVE_CHATROOM:
    case JOINED_CHATROOMS_ATTEMPT:
      return {
        ...state,
        isLeaving: true,
        isFetching: true
      };
    case JOIN_CHATROOM_SUCCESS: {
      if (payload) {
        return update(state, {
          memberships: { $push: [payload] },
          subbed: { $push: [payload.chatroom] },
          isFetching: { $set: false }
        })
      } else {
        return {
          ...state,
          isFetching: false
        }
      }
    }
    case JOIN_CHATROOM_FAIL:
      return {
        ...state,
        isLeaving: false,
        isFetching: false
      }
    case JOINED_CHATROOMS_FAILED:
      return {
        ...state,
        isFetching: false
      }
    case INIT_CHAT: {
      return {
        ...state,
        currentChannel: payload.objectId //chatroom id for later
      }
    }
    case RELEASE_CHAT: {
      return {
        ...state,
        currentChannel: null
      }
    }
    default:
      return state;
  }
}
