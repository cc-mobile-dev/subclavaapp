// @flow

import { CREATE_GIVEAWAY, CREATE_GIVEAWAY_FAILED, CREATE_GIVEAWAY_SUCCESS, DELETE_GIVEAWAY, DELETE_GIVEAWAY_FAILED, DELETE_GIVEAWAY_SUCCESS, GET_GIVEAWAYS, GET_GIVEAWAYS_FAILED, GET_GIVEAWAYS_SUCCESS, UPDATE_GIVEAWAY, UPDATE_GIVEAWAY_FAILED, UPDATE_GIVEAWAY_SUCCESS, GET_GIVEAWAY, GET_GIVEAWAY_FAILED, GET_GIVEAWAY_SUCCESS, SET_SELECTED_GIVEAWAY, UNSET_SELECTED_GIVEAWAY, ON_GIVEAWAY_UPDATED, MODIFY_GIVEAWAYS_SUBSCRIPTION, MODIFY_GIVEAWAYS_SUBSCRIPTION_FAIL, MODIFY_GIVEAWAYS_SUBSCRIPTION_SUCCESS, GET_LATEST_GIVEAWAY, GET_LATEST_GIVEAWAY_SUCCESS, GET_LATEST_GIVEAWAY_FAILED } from './actions';
import { defaultReducers } from '../defaultReducers';
import update from 'immutability-helper'

const DEFAULT = defaultReducers.giveawaysState;

export default function giveawaysState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_GIVEAWAYS:
    case UPDATE_GIVEAWAY:
    case GET_GIVEAWAY:
    case DELETE_GIVEAWAY:
    case GET_LATEST_GIVEAWAY:
    case CREATE_GIVEAWAY: {
      return {
        ...state,
        isFetching: true
      }
    }
    case CREATE_GIVEAWAY_SUCCESS: {
      return update(state, {
        all: { $push: [payload] },
        isFetching: { $set: false }
      })
    }
    case GET_GIVEAWAY_FAILED:
    case UPDATE_GIVEAWAY_FAILED:
    case DELETE_GIVEAWAY_FAILED:
    case GET_GIVEAWAYS_FAILED:
    case GET_LATEST_GIVEAWAY_FAILED:
    case MODIFY_GIVEAWAYS_SUBSCRIPTION_FAIL:
    case CREATE_GIVEAWAY_FAILED: {
      return {
        ...state,
        isFetching: false
      }
    }
    case MODIFY_GIVEAWAYS_SUBSCRIPTION: {
      if (payload.giveawayId) {
        return {
          ...state,
          memberships: {
            ...state.memberships,
            [payload.giveawayId]: !payload.giveawayId in state.memberships
              ? { id: null, active: true }
              : {
                ...state.memberships[payload.giveawayId],
                active: !state.memberships[payload.giveawayId]?.active
              }
          }
        }
      } else {
        return {
          ...state
        }
      }
    }
    case MODIFY_GIVEAWAYS_SUBSCRIPTION_SUCCESS: {
      let temp = state.memberships
      payload.forEach(p => {
        temp[p.id] = p.value
      });
      return {
        ...state,
        memberships: temp
      }
    }
    case GET_GIVEAWAYS_SUCCESS:
      return {
        ...state,
        all: payload,
        isFetching: false
      };
    case GET_GIVEAWAY_SUCCESS: {
      let indexOf = state.all.findIndex(c => c.objectId === payload.objectId)
      if (indexOf > -1) {
        return update(state, {
          all: {
            [indexOf]: { $set: payload },
          },
          isFetching: { $set: false }
        })
      } else {
        return update(state, {
          all: {
            $push: [payload]
          },
          isFetching: { $set: false }
        });
      }
    }
    case UPDATE_GIVEAWAY_SUCCESS: {
      let indexOf = state.all.findIndex(c => c.objectId === payload.objectId)
      return update(state, {
        all: {
          [indexOf]: { $set: payload }
        },
        isFetching: { $set: false }
      })
    }
    case DELETE_GIVEAWAY_SUCCESS: {
      let giveawayId = payload
      let index = state.all.findIndex(c => c.objectId === giveawayId)
      return update(state, {
        all: { $splice: [[index, 1]] },
        isFetching: { $set: false }
      })
    }
    case SET_SELECTED_GIVEAWAY: {
      return {
        ...state,
        selectedGiveaway: payload
      }
    }
    case UNSET_SELECTED_GIVEAWAY: {
      return {
        ...state,
        selectedGiveaway: null
      }
    }
    case ON_GIVEAWAY_UPDATED: {
      if (!payload) {
        return { ...state }
      }
      let indexOf = state.all.findIndex(c => c && c.objectId === payload.objectId)
      let giveaway = {
        ...state.all[indexOf],
        ...payload
      }

      if (indexOf > -1) {
        return update(state, {
          all: {
            [indexOf]: { $set: giveaway }
          },
          isFetching: { $set: false }
        })
      } else {
        return update(state, {
          all: { $push: [payload] },
          isFetching: { $set: false }
        })
      }
    }
    case GET_LATEST_GIVEAWAY_SUCCESS: {
      return {
        ...state,
        latestGiveaway: payload,
        isFetching: false
      }
    }
    default:
      return state;
  }
}
