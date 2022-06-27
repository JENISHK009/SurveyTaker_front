/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../apis/auth';
import * as actions from '../actions/auth';
import * as appActions from '../actions/app';

function* signupSaga(action) {
  console.log('action.payload', action.payload);
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.signupAPI, action.payload);
    console.log('data in signup', data);
    if (success) {
      yield put(actions.signUpSuccess(data));
      //   sessionStorage.setItem('userToken', data.token);
    } else {
      yield put(actions.signUpFailed(message));
    }
  } catch (error) {
    console.log(`error::`, error);
    yield put(actions.signUpFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* loginSaga(action) {
  console.log('action.payload', action.payload);
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.loginApi, action.payload);
    console.log('data in login', data);
    if (success) {
      yield put(actions.loginSuccess(data));
      window.location.replace('/admin');
      sessionStorage.setItem('userToken', data.token);
    } else {
      yield put(actions.loginFailed(message));
    }
  } catch (error) {
    console.log(`error::`, error);
    yield put(actions.loginFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* watchConfigSaga() {
  yield takeLatest(actions.SIGNUP_REQUEST, signupSaga);
  yield takeLatest(actions.LOGIN_REQUEST, loginSaga);
}

export default watchConfigSaga;
