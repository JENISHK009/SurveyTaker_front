/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../apis/templates';
import * as actions from '../actions/templates';
import * as appActions from '../actions/app';

function* fetchTemplateSaga() {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchTemplates);

    success
      ? yield put(actions.templatesSuccess(data))
      : yield put(actions.templatesFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    // yield put(
    //   appActions.appReceiveAlert({
    //     message: 'Failed to fetch the status of broadcasting!',
    //   }),
    // );
    yield put(actions.templatesFailed(error.response.message));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* watchConfigSaga() {
  yield takeLatest(actions.TEMPLATES_REQUEST, fetchTemplateSaga);
}

export default watchConfigSaga;
