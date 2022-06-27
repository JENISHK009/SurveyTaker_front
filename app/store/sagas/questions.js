/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { call, put, takeEvery } from 'redux-saga/effects';

import * as api from '../apis/questions';
import * as actions from '../actions/questions';
import * as appActions from '../actions/app';

function* addQuestion({ payload }) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { success, message },
    } = yield call(api.saveQuestion, payload);

    success
      ? yield put(actions.addQuestionSuccess(success))
      : yield put(actions.addQuestionFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    // yield put(
    //   appActions.appReceiveAlert({
    //     message: 'Failed to fetch the status of broadcasting!',
    //   }),
    // );
    yield put(actions.addQuestionFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* watchConfigSaga() {
  yield takeEvery(actions.ADD_QUESTION_REQUEST, addQuestion);
}

export default watchConfigSaga;
