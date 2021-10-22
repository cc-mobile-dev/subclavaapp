// @flow

import { GET_CHATROOMS_SUCCESS, SET_NEW_CHATROOM_DATA, GOT_CHATROOM, GET_CHATROOM_FAILED, UPDATED_CHATROOM, UPDATED_CHATROOM_FAILED, UPDATE_CHATROOM, GET_CHATROOM, CHATROOMS_BY_LOCATION_ATTEMPT, CHATROOMS_BY_LOCATION_SUCCESS, CHATROOMS_BY_LOCATION_FAILED, CREATE_CHATROOM, CREATE_CHATROOM_SUCCESS, CREATE_CHATROOM_FAILED, DELETE_CHATROOM, DELETE_CHATROOM_FAILED, DELETE_CHATROOM_SUCCESS, TOGGLE_CHATROOM_LIVE } from './actions';
import { defaultReducers } from '../defaultReducers';
import update from 'immutability-helper';

const DEFAULT = defaultReducers.chatroomsState;

export default function chatroomsState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case DELETE_CHATROOM:
    case UPDATE_CHATROOM:
    case GET_CHATROOM:
    case CREATE_CHATROOM: {
      return {
        ...state,
        isFetching: true
      }
    }
    case CREATE_CHATROOM_SUCCESS: {
      return update(state, {
        allChatrooms: { $push: [payload] },
        isFetching: { $set: false }
      })
    }
    case GET_CHATROOM_FAILED:
    case UPDATED_CHATROOM_FAILED:
    case DELETE_CHATROOM_FAILED:
    case CREATE_CHATROOM_FAILED: {
      return {
        ...state,
        isFetching: false
      }
    }
    case GET_CHATROOMS_SUCCESS:
      // const createdChatrooms = payload.chatrooms.filter(chatroom => chatroom.admin.objectId === payload.user.objectId);
      return {
        ...state,
        allChatrooms: payload.chatrooms,
        createdChatrooms: [],
        isFetching: false
      };
    case GOT_CHATROOM: {
      let allChatrooms = state.allChatrooms;
      let indexOf = allChatrooms.findIndex(c => c.objectId === payload.chatroom.objectId)
      if (indexOf > -1) {
        return update(state, {
          allChatrooms: {
            [indexOf]: { $set: payload.chatroom },
          },
          isFetching: { $set: false }
        })
      } else {
        return update(state, {
          allChatrooms: {
            $push: [payload.chatroom]
          },
          isFetching: { $set: false }
        });
      }
    }
    case UPDATED_CHATROOM: {
      let allChatrooms = state.allChatrooms;
      let indexOf = allChatrooms.findIndex(c => c.objectId === payload.chatroom.objectId)
      return update(state, {
        allChatrooms: {
          [indexOf]: { $set: payload.chatroom }
        },
        isFetching: { $set: false }
      })
    }
    case DELETE_CHATROOM_SUCCESS: {
      let chatroomId = payload
      let index = state.allChatrooms.findIndex(c => c.objectId === chatroomId)
      return update(state, {
        allChatrooms: { $splice: [[index, 1]] },
        isFetching: { $set: false }
      })
    }
    case TOGGLE_CHATROOM_LIVE: {
      let index = state.allChatrooms.findIndex(c => c.objectId === payload.chatroomId)
      let chatroom = {
        ...state.allChatrooms[index],
        isLive: payload.isLive
      }
      return update(state, {
        allChatrooms: {
          [index]: { $set: chatroom }
        }
      })
    }
    default:
      return state;
  }
}
