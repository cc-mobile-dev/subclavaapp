// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const SET_NOTIFICATION = 'notification/SET_NOTIFICATION';
export const GET_NOTIFICATIONS = 'notification/GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_SUCCESS = 'notification/GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILED = 'notifications/GET_NOTIFICATIONS_FAIL';


/**
 * Action Creators
 */
export const notificationActionCreators = {
  setNotification: createAction(SET_NOTIFICATION),
  getNotifications: createAction(GET_NOTIFICATIONS),
  getNotificationsSuccess: createAction(GET_NOTIFICATIONS_SUCCESS),
  getNotificationsFailed: createAction(GET_NOTIFICATIONS_FAILED)
};
