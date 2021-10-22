// @flow

import { take, takeEvery, put, call, fork, all, takeLatest, select, delay } from 'redux-saga/effects';
import { createGiveaway, getGiveaways, updateGiveaway, deleteGiveaway } from '../../../utilities/api';

import { CREATE_GIVEAWAY, DELETE_GIVEAWAY, GET_GIVEAWAYS, giveawaysActionCreators, UPDATE_GIVEAWAY, SELECT_GIVEAWAY, ON_GIVEAWAY_EVENT, JOIN_GIVEAWAY, GET_LATEST_GIVEAWAY, GET_GIVEAWAYS_SUCCESS, UPDATE_GIVEAWAY_SUCCESS, CREATE_GIVEAWAY_SUCCESS, MODIFY_GIVEAWAYS_SUBSCRIPTION, LEAVE_GIVEAWAY } from './actions';
import NavigationService, { navigate } from '../../../utilities/navigation'
import { toast } from '../../../utilities/toast';
import { SELECT_CHATROOM, UNSELECT_CHATROOM } from '../joinedChatrooms/actions';
const Parse = require('parse/react-native')

function* _getGiveaways(action) {
  // yield Parse.Cloud.run('freeMinutes', {})
  // let user = yield Parse.User.currentAsync()
  try {
    let Giveaway = Parse.Object.extend('Giveaway')
    let q = new Parse.Query(Giveaway)
    q.include('user')
    q.equalTo('isActive', true)
    q.descending('createdAt')

    let q2 = new Parse.Query(Giveaway)
    q2.include('user')
    //less than a minute
    q2.greaterThanOrEqualTo('expires', Date.now() - (60 * 1000))
    q2.descending('createdAt')

    // let giveaways = yield Parse.Query.or(q, q2).find()
    let q1Result = yield q.find()
    let q2Result = yield q2.find()

    let result = [
      ...q1Result.map(q => ({ ...q.toJSON(), id: q.id })),
      ...q2Result.map(q => ({ ...q.toJSON(), id: q.id }))
    ].sort((a, b) => a.expires - b.expires)

    // console.tron.log(giveaways[0].get('user').get('username'))

    // let user = yield select(state => state.authState.currentUser)
    yield put(giveawaysActionCreators.getGiveawaysSuccess(result))
  } catch (error) {
    toast(error)
    yield put(giveawaysActionCreators.getGiveawaysFailure())
  }
}

function* _createGiveaway({ payload }) {
  let Giveaway = Parse.Object.extend('Giveaway')
  let user = yield Parse.User.currentAsync()

  let acl = new Parse.ACL()
  acl.setPublicReadAccess(true)
  acl.setPublicWriteAccess(false)
  acl.setWriteAccess(user.id, true)
  try {
    let giveaway = new Giveaway()
    giveaway.setACL(acl)
    //create chatroom first
    yield giveaway.save({
      description: payload.description,
      expires: payload.expires,
      user,
      isActive: payload.expires === 0,
      title: payload.title,
      ...payload.imageUrl && { imageUrl: payload.imageUrl }
    })

    giveaway = {
      ...giveaway.toJSON(),
      id: giveaway.id
    }

    //create sendbird channel later
    yield put(giveawaysActionCreators.createGiveawaySuccess(giveaway))
    // yield put(onJoinGroupChannel(chatroom.id))
    if (payload.expires === 0) {
      navigate('LiveVideo', {
        giveaway,
        isAdmin: user.id === giveaway.user.objectId
      })
    } else {
      toast(
        'Your live has been successfully scheduled'
      )
    }

  } catch (e) {
    console.log(e)
    toast(e.message)
    yield put(giveawaysActionCreators.createGiveawayFailure())
  }
}

function* _updateGiveaway(action) {
  try {
    let Giveaway = Parse.Object.extend('Giveaway')
    let giveaway = new Giveaway()
    yield giveaway.save({
      ...action.payload
    })

    yield delay(2000)
    yield put(giveawaysActionCreators.updateGiveawaySuccess(giveaway.toJSON()))
  } catch (error) {
    toast(error.message)
    yield put(giveawaysActionCreators.updateGiveawayFailure())
  }
}

function* _leaveGiveaway({ payload }) {
  try {
    let Giveaway = Parse.Object.extend('Giveaway')
    let giveaway = new Giveaway()
    giveaway.id = payload.giveawayId
    yield giveaway.save({
      isActive: false,
      endedAt: Date.now()
    })
    yield put(giveawaysActionCreators.leaveGiveawaySuccess(payload.giveawayId))
    navigate('Home');
  } catch (error) {
    toast(error.message)
    yield put(giveawaysActionCreators.leaveGiveawaySuccess())
  }
}

function* _deleteGiveaway({ payload }) {
  try {
    let Giveaway = Parse.Object.extend('Giveaway')
    let giveaway = new Giveaway()
    giveaway.id = payload.giveawayId
    yield giveaway.destroy()
    yield put(giveawaysActionCreators.deleteGiveawaySuccess(payload.giveawayId))
    navigate('Home')
  } catch (error) {
    toast(error.message)
    yield put(giveawaysActionCreators.deleteGiveawayFailure())
  }
}

function* _selectGiveaway({ payload }) {
  const { giveawayId } = payload;
  let currentUser = yield select(state => state.authState.currentUser)

  //3 cases on selecting a giveaway
  //1. a user select a giveaway that is schuled for later - gets notified
  //2. a user joins a giveaway - join a giveaway
  //3. the creator edits the giveaway - edit the giveaway

  try {
    let all = yield select(state => state.giveawaysState.all)
    let giveaway = all.find(g => g.objectId === giveawayId)

    let latestGiveaway = yield select(state => state.giveawaysState.latestGiveaway)

    if (latestGiveaway && latestGiveaway.objectId === giveawayId) {
      giveaway = latestGiveaway
    }

    //admin scenario where no modal pop ups and they can edit
    //or go live if they dimissed the live modal
    if (currentUser.objectId === giveaway.user.objectId) {

      if (giveaway.expires > Date.now()) {
        navigate('EditGiveaway', {
          ...giveaway
        })
      } else {
        // active for scheduled lives
        if (!giveaway.isActive) {
          yield put(giveawaysActionCreators.updateGiveaway({
            id: giveaway.objectId,
            isActive: true
          }))
        }
        navigate('LiveVideo', {
          giveaway,
          isAdmin: giveaway.user.objectId === currentUser.objectId,
        });
      }
    } else {
      yield put(giveawaysActionCreators.setSelectedGiveaway(giveaway))
    }
  } catch (error) {
    console.tron.log(error)
    // toast(error.message)
    // yield put(chatroomsActionCreators.getChatroomFailed())
  }
}

function* _unsetGiveaway() {
  yield put(giveawaysActionCreators.unsetSelectedGiveaway())
}

function* _onGiveawayEvent({ payload }) {
  let giveaway = {
    ...payload.giveaway.toJSON(),
    id: payload.giveaway.id
  }

  switch (payload.event) {
    case 'create':
      yield put(giveawaysActionCreators.getGiveawaySuccess(giveaway))
      break;
    case 'update':
      yield put(giveawaysActionCreators.updateGiveawaySuccess(giveaway))
      break;
    case 'delete':
      yield put(giveawaysActionCreators.deleteGiveawaySuccess(giveaway))
      break;
  }
}

function* _joinGiveaway({ payload }) {
  try {
    let currentUser = yield select(state => state.authState.currentUser);
    let balance = yield select(state => state.accountState.balance)

    let giveaway = yield select(state => state.giveawaysState.selectedGiveaway)

    //check for balance before joining
    if (balance <= 0) {
      navigate('Minute')
      yield put(giveawaysActionCreators.unsetSelectedGiveaway());
      throw Error('Buy More Time');
    }

    // let Giveaway = Parse.Object.extend('Giveaway');
    // let giveaway = new Giveaway();
    // giveaway.id = payload.giveawayId;

    // let membership = memberships.find(
    //   s => s.chatroom.objectId === payload.chatroomId,
    // );
    // let sub;

    // if (!membership) {
    //   let Membership = Parse.Object.extend('Membership');
    //   let membership = new Membership();

    //   let user = new Parse.User();
    //   user.id = currentUser.objectId;

    //   sub = yield membership.save({
    //     user,
    //     chatroom,
    //     pricePaid: 0,
    //     expires: 0,
    //     giveaway: giveaway,
    //     isActive: true,
    //   });

    //   sub = {
    //     ...sub.toJSON(),
    //     id: sub.id,
    //   };
    // }

    yield put(giveawaysActionCreators.unsetSelectedGiveaway());

    navigate('LiveVideo', {
      giveaway,
      isAdmin: giveaway.objectId === currentUser.objectId,
    });
  } catch (error) {
    toast(error.message);
    // yield put(joinedChatroomsActionCreators.joinChatroomFail());
  }
}

function* _getLatestGiveaway() {
  let user = yield Parse.User.currentAsync()
  try {
    let Giveaway = Parse.Object.extend('Giveaway')
    let q = new Parse.Query(Giveaway)
    q.equalTo('user', user)
    q.equalTo('isActive', false)
    q.includeAll()
    q.descending('createdAt')

    let giveaway = yield q.first()
    giveaway = giveaway ? giveaway.toJSON() : null

    //show only for 10 mins
    // live has to be within 6 days of the scheduled date and 10 mins after
    if (giveaway?.endedAt
      || Date.now() < giveaway?.expires - (518000 * 1000)
      || Date.now() > giveaway?.expires + (600 * 1000)) {
      giveaway = null
    }
    // let user = yield select(state => state.authState.currentUser)
    yield put(giveawaysActionCreators.getLatestGiveawaySuccess(giveaway))
  } catch (error) {
    toast('Whoops')
    console.tron.log(error)
    yield put(giveawaysActionCreators.getLatestGiveawayFailed())
  }
}

function* _modifyGiveawaySubscription(action) {
  const { giveawayId } = action.payload

  let obj = yield select(state => state.giveawaysState.memberships)
  let membership = obj[giveawayId]

  let Membership = Parse.Object.extend('Membership')
  let Giveaway = Parse.Object.extend('Giveaway')
  let m = new Membership()
  let result
  try {
    if (membership.id) {
      result = yield m.save({
        id: membership.id,
        isActive: membership.active
      })
    } else {
      const user = yield Parse.User.currentAsync()
      let giveaway = new Giveaway()
      giveaway.id = giveawayId
      result = yield m.save({
        isActive: true,
        giveaway,
        user
      })
    }
  } catch (e) {
    console.log(e)
    yield put(giveawaysActionCreators.modifyGiveawaysSubscriptionsFail())
  }

  yield put(giveawaysActionCreators.modifyGiveawaysSubscriptionsSuccess([{
    id: giveawayId,
    value: {
      id: result.id,
      active: result.get('isActive')
    }
  }]))
}

export default function* () {
  yield all([
    yield takeLatest(GET_GIVEAWAYS, _getGiveaways),
    yield takeLatest(ON_GIVEAWAY_EVENT, _onGiveawayEvent),
    yield takeLatest(SELECT_GIVEAWAY, _selectGiveaway),
    yield takeLatest(UNSELECT_CHATROOM, _unsetGiveaway),
    yield takeLatest(CREATE_GIVEAWAY, _createGiveaway),
    yield takeLatest(UPDATE_GIVEAWAY, _updateGiveaway),
    yield takeLatest(DELETE_GIVEAWAY, _deleteGiveaway),
    yield takeLatest(JOIN_GIVEAWAY, _joinGiveaway),
    yield takeLatest(LEAVE_GIVEAWAY, _leaveGiveaway),
    yield takeLatest(MODIFY_GIVEAWAYS_SUBSCRIPTION, _modifyGiveawaySubscription),
    yield takeLatest([
      GET_LATEST_GIVEAWAY,
      GET_GIVEAWAYS_SUCCESS,
      UPDATE_GIVEAWAY_SUCCESS,
      CREATE_GIVEAWAY_SUCCESS
    ], _getLatestGiveaway),
  ]);
}