// @flow

import { take, takeEvery, put, call, fork, all } from 'redux-saga/effects';

import { notificationActionCreators, GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILED } from './actions';

import { getNotifications as fetchNotifications } from '../../../utilities/api';
const Parse = require('parse/react-native')

function* getNotifications(action) {
    let Notification = Parse.Object.extend('Notification')
    let q = new Parse.Query(Notification)
    let q2 = new Parse.Query(Notification)

    let user = yield Parse.User.currentAsync()
    try {
        q.equalTo('type', 'live')
        q.includeAll()
        q.limit(20)

        let results = yield q.findAll()
        let r = results.sort((a, b) => new Date(b.get('createdAt')).getTime() - new Date(a.get('createdAt')).getTime()).map(r => r.toJSON())
        yield put(notificationActionCreators.getNotificationsSuccess(r))
    } catch (e) {
        console.tron.log(e)
        yield put(notificationActionCreators.getNotificationsFailed())
    }
}

export default function* () {
    yield all([
        yield takeEvery(GET_NOTIFICATIONS, getNotifications)
    ]);
}
