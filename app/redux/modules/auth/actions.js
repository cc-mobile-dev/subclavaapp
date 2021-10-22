// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const SET_USER = 'auth/SET_USER';
export const UNSET_USER = 'auth/UNSET_USER';
export const LOGIN_ATTEMPT = 'auth/LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'auth/LOGIN_FAILED';
export const SIGNUP_ATTEMPT = 'auth/SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'auth/SIGNUP_FAILED';
export const UPDATE_USER_ATTEMPT = 'auth/UPDATE_USER_ATTEMPT';
export const UPDATE_USER_SUCCESS = 'auth/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'auth/UPDATE_USER_FAILED';
export const DELETE_USER_ATTEMPT = 'auth/DELETE_USER_ATTEMPT';
export const DELETE_USER_SUCCESS = 'auth/DELETE_USER_SUCCESS';
export const GET_TOKEN = 'auth/GET_TOKEN'
export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
export const GET_ME = 'auth/GET_ME'
export const UPDATE_TALENT_FORM = 'auth/UDPATE_TALENT_FORM'
export const UPDATE_TALENT_FORM_SUCCESS = 'auth/UPDATE_TALENT_FORM_SUCCESS'
export const UPDATE_TALENT_FORM_FAILED = 'auth/UPDATE_TALENT_FORM_FAILED'
export const GET_TALENT_FORM = 'auth/GET_TALENT_FORM'
export const GET_TALENT_FORM_SUCCESS = 'auth/GET_TALENT_FORM_SUCCESS'
export const GET_TALENT_FORM_FAILED = 'auth/GET_TALENT_FORM_SUCCESS'
export const SET_ONBOARDED = 'auth/SET_ONBOARDED'
export const SET_TOKEN = 'auth/SET_TOKEN'

/**
 * Action Creators
 */
export const authActionCreators = {
  setUser: createAction(SET_USER),
  unsetUser: createAction(UNSET_USER),
  login: createAction(LOGIN_ATTEMPT),
  loginSuccess: createAction(LOGIN_SUCCESS),
  loginFailed: createAction(LOGIN_FAILED),
  signup: createAction(SIGNUP_ATTEMPT),
  signupSuccess: createAction(SIGNUP_SUCCESS),
  signupFailed: createAction(SIGNUP_FAILED),
  updateUser: createAction(UPDATE_USER_ATTEMPT),
  updateUserSuccess: createAction(UPDATE_USER_SUCCESS),
  updateUserFailed: createAction(UPDATE_USER_FAILED),
  getTalentForm: createAction(GET_TALENT_FORM),
  getTalentFormSuccess: createAction(GET_TALENT_FORM_SUCCESS),
  getTalentFormFailed: createAction(GET_TALENT_FORM_FAILED),
  updateTalentForm: createAction(UPDATE_TALENT_FORM),
  updateTalentFormSuccess: createAction(UPDATE_TALENT_FORM_SUCCESS),
  updateTalentFormFailed: createAction(UPDATE_TALENT_FORM_FAILED),
  deleteUser: createAction(DELETE_USER_ATTEMPT),
  deleteUserSuccess: createAction(DELETE_USER_SUCCESS),
  getToken: createAction(GET_TOKEN),
  forgotPassword: createAction(FORGOT_PASSWORD),
  setOnboarded: createAction(SET_ONBOARDED),
  getMe: createAction(GET_ME),
  setToken: createAction(SET_TOKEN)
};
