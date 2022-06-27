/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../apis/meetings';
import * as actions from '../actions/meetings';
import * as appActions from '../actions/app';

function* fetchMeetingSaga(action) {
  const meetingParam = action.payload;
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(
      meetingParam !== 'future' ? api.fetchMeetings : api.fetchFutureMeetings,
      action.payload,
    );
    success
      ? yield put(actions.meetingsSuccess(data.data))
      : yield put(actions.meetingsFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    // yield put(
    //   appActions.appReceiveAlert({
    //     message: 'Failed to fetch the status of broadcasting!',
    //   }),
    // );
    // console.log('error.response.message', error.response.message);
    yield put(actions.meetingsFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchTemplateSaga() {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchTemplates);

    success
      ? yield put(actions.templateSuccess(data.data))
      : yield put(actions.templateFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    yield put(actions.templateFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchLanguageSaga() {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchLnaguages);

    success
      ? yield put(actions.languageSuccess(data.data))
      : yield put(actions.languageFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    yield put(actions.languageFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchMeetingAccessSaga() {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchMeetingAccess);

    success
      ? yield put(actions.meetingAccessSuccess(data.data))
      : yield put(actions.meetingAccessFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    yield put(actions.meetingAccessFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchMeetingAudioConfigSaga() {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchMeetingAudioConfig);

    success
      ? yield put(actions.meetingAudioConfigSuccess(data))
      : yield put(actions.meetingAudioConfigFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    yield put(actions.meetingAudioConfigFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* createMeetingSaga(action) {
  const meetingInfo = action.payload;
  try {
    yield put(appActions.appStartFetching());

    const {
      data: { data, success, message },
    } = yield call(api.createMeeting, meetingInfo);
    success
      ? yield put(actions.createMeetingSuccess(data))
      : yield put(actions.createMeetingFailed(message));
  } catch (error) {
    // if (error.response.status === 403)
    // yield put(userActions.userAuthorizationFailure(error))
    // else
    yield put(actions.createMeetingFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchParticipantsSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchParticipants, action.payload);

    success
      ? yield put(actions.participantsSuccess(data.data))
      : yield put(actions.participantsFailed(message));
  } catch (error) {
    console.log(`error:: from participants`, error);

    yield put(actions.participantsFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* createEmailSaga(action) {
  const emailInfo = action.payload;
  try {
    yield put(appActions.appStartFetching());

    const {
      data: { data, success, message },
    } = yield call(api.postEmail, emailInfo);

    success
      ? yield put(actions.postEmailSuccess(data.data))
      : yield put(actions.postEmailFailed(message));
  } catch (error) {
    // if (error.response.status === 403)
    // yield put(userActions.userAuthorizationFailure(error))
    // else
    yield put(actions.postEmailFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* addParticipantsSaga(action) {
  const addData = action.payload;
  try {
    yield put(appActions.appStartFetching());

    const {
      data: { data, success, message },
    } = yield call(api.addParticipants, addData);

    success
      ? yield put(actions.participantsAddSuccess(data))
      : yield put(actions.participantsAddFailed(message));
  } catch (error) {
    yield put(actions.participantsAddFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchEmailSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchEmails, action.payload);

    success
      ? yield put(actions.getEmailSuccess(data))
      : yield put(actions.getEmailFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    // yield put(
    //   appActions.appReceiveAlert({
    //     message: 'Failed to fetch the status of broadcasting!',
    //   }),
    // );
    // console.log('error.response.message', error.response.message);
    yield put(actions.getEmailFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* removeParticipantsSaga(action) {
  try {
    yield put(appActions.appStartFetching());

    const {
      data: { data, success, message },
    } = yield call(api.removeParticipants, action.payload);

    success
      ? yield put(actions.participantsRemoveSuccess(data))
      : yield put(actions.participantsRemoveFailed(message));
  } catch (error) {
    yield put(actions.participantsRemoveFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* deleteEmailSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.deleteEmail, action.payload);

    success
      ? yield put(actions.deleteEmailSuccess(data.data))
      : yield put(actions.deleteEmailFailed(message));
  } catch (error) {
    console.log(`error::`, error);
    // yield put(
    //   appActions.appReceiveAlert({
    //     message: 'Failed to fetch the status of broadcasting!',
    //   }),
    // );
    // console.log('error.response.message', error.response.message);
    yield put(actions.deleteEmailFailed('Something went wrong'));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* deleteMeetingSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { success, message },
    } = yield call(api.deleteMeeting, action.payload);
    success
      ? yield put(actions.deleteMeetingSuccess(message))
      : yield put(actions.deleteMeetingFailed(message));
  } catch (error) {
    yield put(actions.deleteMeetingFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}
function* createMeetingFolderSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.createMeetingFolder, action.payload);
    success
      ? yield put(actions.createMeetingFolderSuccess(data))
      : yield put(actions.createMeetingFolderFailed(message));
  } catch (error) {
    yield put(actions.createMeetingFolderFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}
function* fetchMeetingsFolderSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.fetchMeetingsFolder, action.payload);
    success
      ? yield put(actions.getAllMeetingsFolderSuccess(data))
      : yield put(actions.getAllMeetingsFolderFailed(message));
  } catch (error) {
    yield put(actions.createMeetingFolderFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* fetchMoveMeetingFolderSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.moveMeetingFolder, action.payload);
    success
      ? yield put(actions.moveMeetingFolderSuccess(data))
      : yield put(actions.getAllMeetingsFolderFailed(message));
  } catch (error) {
    yield put(actions.moveMeetingFolderFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* getReportsForMeetingSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { data, success, message },
    } = yield call(api.getReportsForMeeting, action.payload);
    success
      ? yield put(actions.getReportForMeetingSuccess(data.data))
      : yield put(actions.getReportForMeetingFailed(message));
  } catch (error) {
    yield put(actions.getReportForMeetingFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* removeTemplateSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { success, message },
    } = yield call(api.removeTemplate, action.payload);
    success
      ? yield put(actions.deleteTemplateSuccess(message))
      : yield put(actions.deleteTemplateFailed(message));
  } catch (error) {
    yield put(actions.deleteTemplateFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* sessionReportSaga(action) {
  try {
    yield put(appActions.appStartFetching());
    const {
      data: { success, message, data },
    } = yield call(api.getSessionReport, action.payload);
    success
      ? yield put(actions.sessionReportSuccess(data))
      : yield put(actions.sessionReportFailed(message));
  } catch (error) {
    yield put(actions.sessionReportFailed(error));
  } finally {
    yield put(appActions.appStopFetching());
  }
}

function* watchConfigSaga() {
  yield takeLatest(actions.MEETINGS_LIST_REQUEST, fetchMeetingSaga);
  yield takeLatest(actions.TEMPLATE_REQUEST, fetchTemplateSaga);
  yield takeLatest(actions.LANGUAGE_REQUEST, fetchLanguageSaga);
  yield takeLatest(actions.MEETING_ACCESS_REQUEST, fetchMeetingAccessSaga);
  yield takeLatest(
    actions.MEETING_AUDIO_CONFIG_REQUEST,
    fetchMeetingAudioConfigSaga,
  );
  yield takeLatest(actions.CREATE_MEETING_REQUEST, createMeetingSaga);
  yield takeLatest(actions.PARTICIPANTS_REQUEST, fetchParticipantsSaga);
  yield takeLatest(actions.PARTICIPANTS_ADD_REQUEST, addParticipantsSaga);
  yield takeLatest(actions.PARTICIPANTS_REMOVE_REQUEST, removeParticipantsSaga);
  yield takeLatest(actions.POST_EMAIL_REQUEST, createEmailSaga);
  yield takeLatest(actions.GET_EMAIL_REQUEST, fetchEmailSaga);
  yield takeLatest(actions.DELETE_EMAIL_REQUEST, deleteEmailSaga);
  yield takeLatest(actions.DELETE_MEETING_REQUEST, deleteMeetingSaga);
  yield takeLatest(actions.CREATE_METTING_FOLDER, createMeetingFolderSaga);
  yield takeLatest(
    actions.MOVE_MEETING_FOLDER_REQUEST,
    fetchMoveMeetingFolderSaga,
  );
  yield takeLatest(
    actions.GET_ALL_MEETINGS_FOLDER_REQUEST,
    fetchMeetingsFolderSaga,
  );
  yield takeLatest(
    actions.GET_REPORT_FOR_MEETING_REQUEST,
    getReportsForMeetingSaga,
  );
  yield takeLatest(actions.DELETE_TEMPLATE_REQUEST, removeTemplateSaga);
  yield takeLatest(actions.GET_SESSION_REPORT_REQUEST, sessionReportSaga);
}

export default watchConfigSaga;
