// @flow

import { take, put, call, fork, all, takeEvery, takeLatest, select } from 'redux-saga/effects';

import {
  authActionCreators,
  LOGIN_ATTEMPT,
  UPDATE_USER_ATTEMPT,
  DELETE_USER_ATTEMPT,
  SIGNUP_ATTEMPT,
  GET_TOKEN,
  SET_USER,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  FORGOT_PASSWORD,
  GET_ME,
  UPDATE_TALENT_FORM,
  SET_ONBOARDED,
  GET_TALENT_FORM,
  UPDATE_USER_SUCCESS,
} from './actions';
import { navigate } from '../../../utilities/navigation'
const Parse = require('parse/react-native')

import { signIn, updateUser, updatePassword, deleteUser, updateNotifications } from '../../../utilities/api';
import { LOGOUT } from '../sharedActions';
import { toast } from '../../../utilities/toast';
import { sendbirdLogin } from '../sendbird/actions';
import { PURCHASE_PRODUCT_SUCCESS } from '../subscriptions/actions';
import { back } from '../../../utilities/navigation'
import agora from '../../../utilities/agora';

export function* logIn({ payload }) {
  try {
    const user = yield Parse.User.logIn(payload.username, payload.password)
    let newUser = yield Parse.User.currentAsync()
    yield put(authActionCreators.loginSuccess(newUser.toJSON()))
    yield put(authActionCreators.setOnboarded())
  } catch (error) {
    toast(error.message, 2000)
    yield put(authActionCreators.loginFailed())
  }
}

export function* signUp({ payload }) {
  try {
    const user = new Parse.User();
    user.set("username", payload.username);
    user.set("password", payload.password);
    user.set("email", payload.email);
    user.set('firstName', payload.firstName)
    user.set('lastName', payload.lastName)
    user.set('imageUrl', payload.avatarUrl)
    user.set('isInfluencer', payload.isInfluencer)

    yield user.signUp()

    yield Parse.Cloud.run('freeMinutes', {})

    let newUser = yield Parse.User.currentAsync()
    yield put(authActionCreators.signupSuccess(newUser.toJSON()))

    navigate('Onboard')

  } catch (error) {
    toast(error.message, 2000)
    yield put(authActionCreators.signupFailed())
  }
}

export function* updateUserData({ payload }) {
  try {
    // const response = yield call(updateUser, payload);
    let user = yield Parse.User.currentAsync()
    Object.keys(payload).forEach(k => {
      user.set(k, payload[k])
    })

    yield user.save()

    let newUser = yield Parse.User.currentAsync()

    yield put(authActionCreators.updateUserSuccess(newUser.toJSON()))
    toast('Updated Successfully', 2000)


  } catch (error) {
    toast(error.message, 3000)
    yield put(authActionCreators.updateUserFailed())
    // if (reject) reject(error);
  }
}

export function* deleteUserData({ payload, resolve, reject }) {
  try {
    const response = yield call(deleteUser, payload);
    if (response.status === 'ok') {
      if (resolve) resolve(response);
    } else {
      if (reject) reject(new Error(response.message || 'Network error'));
    }
  } catch (error) {
    if (reject) reject(error);
  }
}

export function* logOut({ payload }) {
  try {
    yield Parse.User.logOut()
    yield agora.instance().logout()
    yield put(authActionCreators.unsetUser())
  } catch (e) {
    console.log(e)
  }
}

export function* getToken() {
  let currentUser = yield select(state => state.authState.currentUser)
  try {
    let result = yield Parse.Cloud.run('authToken')
    yield put(authActionCreators.setToken(result))
  } catch (e) {
    console.log(e)
  }
}

export function* forgotPassword({ payload }) {
  const email = payload
  if (email.length === 0) {
    toast('Please enter email!', 1000);
    return;
  }

  try {
    yield Parse.User.requestPasswordReset(email)
    toast(
      'Please check your email for password reset instructions!',
      1000,
    );
  } catch (e) {
    toast(e.message, 2000);
  }
}

export function* getMe() {
  let currentUser = yield select(state => state.authState.currentUser)
  try {
    const query = new Parse.Query(Parse.User);
    const user = yield query.get(currentUser.objectId);
    yield put(authActionCreators.updateUserSuccess(user.toJSON()))
  } catch (e) {
    console.log(e)
  }
}

export function* getTalentForm() {
  let user = yield Parse.User.currentAsync();
  let formId = yield select(state => state.authState.appliedAsTalent)
  try {
    let q = new Parse.Query('TalentForm')
    q.equalTo('user', user)
    let form = yield q.first()
    if (form) {
      yield put(authActionCreators.updateTalentFormSuccess(form.id))
    } else {
      // setTimeout(() => {
      //   console.log(user)
      //   if (user.get('isInfluencer') && !formId) {
      //     navigate('TalentForm')
      //   }
      // }, 2000)
    }
  } catch (e) {
    console.log(e)
  }

}

export function* updateTalentForm({ payload }) {
  let appliedAsTalent = yield select(state => state.authState.appliedAsTalent)
  let user = yield Parse.User.currentAsync();
  try {
    // const response = yield call(updateUser, payload);
    let form;
    if (appliedAsTalent) {
      let q = Parse.Query('TalentForm')
      form = yield q.get(appliedAsTalent)
    } else {
      let TalentForm = Parse.Object.extend('TalentForm')
      form = new TalentForm();
      let acl = new Parse.ACL()
      acl.setPublicReadAccess(false)
      acl.setPublicWriteAccess(false)
      acl.setWriteAccess(user.id, true)
      acl.setReadAccess(user.id, true)
      form.setACL(acl)
    }

    yield form.save({
      ...payload,
      user
    })

    yield put(authActionCreators.updateTalentFormSuccess(form.id))
    toast('Updated Successfully', 2000)
    back();
  } catch (error) {
    toast(error.message, 3000)
    yield put(authActionCreators.updateTalentFormFailed())
    // if (reject) reject(error);
  }
}

export default function* () {
  yield all([
    yield takeLatest(LOGIN_ATTEMPT, logIn),
    yield takeLatest(SIGNUP_ATTEMPT, signUp),
    yield takeLatest(UPDATE_USER_ATTEMPT, updateUserData),
    yield takeLatest(DELETE_USER_ATTEMPT, deleteUserData),
    yield takeLatest(DELETE_USER_ATTEMPT, deleteUserData),
    yield takeLatest(FORGOT_PASSWORD, forgotPassword),
    yield takeLatest(GET_TALENT_FORM, getTalentForm),
    yield takeLatest(UPDATE_TALENT_FORM, updateTalentForm),
    yield takeLatest([
      UPDATE_USER_SUCCESS
    ], getToken),
    // after product success fetch balance

    yield takeLatest(GET_ME, getMe),
    yield takeLatest(LOGOUT, logOut)
  ]);
}
