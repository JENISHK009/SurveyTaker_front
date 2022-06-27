export const MEETINGS_LIST_REQUEST = 'MEETINGS_LIST_REQUEST';
export const MEETINGS_LIST_SUCCESS = 'MEETINGS_LIST_SUCCESS';
export const MEETINGS_LIST_FAILED = 'MEETINGS_LIST_FAILED';
export const CREATE_MEETING_REQUEST = 'CREATE_MEETING_REQUEST';
export const CREATE_MEETING_SUCCESS = 'CREATE_MEETING_SUCCESS';
export const CREATE_MEETING_FAILED = 'CREATE_MEETING_FAILED';
export const TEMPLATE_REQUEST = 'TEMPLATE_REQUEST';
export const TEMPLATE_SUCCESS = 'TEMPLATE_SUCCESS';
export const TEMPLATE_FAILED = 'TEMPLATE_FAILED';
export const LANGUAGE_REQUEST = 'LANGUAGE_REQUEST';
export const LANGUAGE_SUCCESS = 'LANGUAGE_SUCCESS';
export const LANGUAGE_FAILED = 'LANGUAGE_FAILED';
export const MEETING_ACCESS_REQUEST = 'MEETING_ACCESS_REQUEST';
export const MEETING_ACCESS_SUCCESS = 'MEETING_ACCESS_SUCCESS';
export const MEETING_ACCESS_FAILED = 'MEETING_ACCESS_FAILED';
export const MEETING_AUDIO_CONFIG_REQUEST = 'MEETING_AUDIO_CONFIG_REQUEST';
export const MEETING_AUDIO_CONFIG_SUCCESS = 'MEETING_AUDIO_CONFIG_SUCCESS';
export const MEETING_AUDIO_CONFIG_FAILED = 'MEETING_AUDIO_CONFIG_FAILED';
export const POST_EMAIL_REQUEST = 'POST_EMAIL_REQUEST';
export const POST_EMAIL_SUCCESS = 'POST_EMAIL_SUCCESS';
export const POST_EMAIL_FAILED = 'POST_EMAIL_FAILED';
export const GET_EMAIL_REQUEST = 'GET_EMAIL_REQUEST';
export const GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS';
export const GET_EMAIL_FAILED = 'GET_EMAIL_FAILED';
export const DELETE_EMAIL_REQUEST = 'DELETE_EMAIL_REQUEST';
export const DELETE_EMAIL_SUCCESS = 'DELETE_EMAIL_SUCCESS';
export const DELETE_EMAIL_FAILED = 'DELETE_EMAIL_FAILED';

export const DELETE_MEETING_REQUEST = 'DELETE_MEETING_REQUEST';
export const DELETE_MEETING_SUCCESS = 'DELETE_MEETING_SUCCESS';
export const DELETE_MEETING_FAILED = 'DELETE_MEETING_FAILED';

// participants
export const PARTICIPANTS_REQUEST = 'PARTICIPANTS_REQUEST';
export const PARTICIPANTS_SUCCESS = 'PARTICIPANTS_SUCCESS';
export const PARTICIPANTS_FAILED = 'PARTICIPANTS_FAILED';

export const PARTICIPANTS_ADD_REQUEST = 'PARTICIPANTS_ADD_REQUEST';
export const PARTICIPANTS_ADD_SUCCESS = 'PARTICIPANTS_ADD_SUCCESS';
export const PARTICIPANTS_ADD_FAILED = 'PARTICIPANTS_ADD_FAILED';

export const PARTICIPANTS_REMOVE_REQUEST = 'PARTICIPANTS_REMOVE_REQUEST';
export const PARTICIPANTS_REMOVE_SUCCESS = 'PARTICIPANTS_REMOVE_SUCCESS';
export const PARTICIPANTS_REMOVE_FAILED = 'PARTICIPANTS_REMOVE_FAILED';

export const CREATE_METTING_FOLDER = 'CREATE_METTING_FOLDER';
export const MEETING_FOLDER_SUCCESS = 'MEETING_FOLDER_SUCCESS';
export const MEETING_FOLDER_FAILED = 'MEETING_FOLDER_FAILED';

export const GET_ALL_MEETINGS_FOLDER_REQUEST =
  'GET_ALL_MEETINGS_FOLDER_REQUEST';
export const GET_ALL_MEETINGS_FOLDER_SUCCESS =
  'GET_ALL_MEETINGS_FOLDER_SUCCESS';
export const GET_ALL_MEETINGS_FOLDER_FAILED = 'GET_ALL_MEETINGS_FOLDER_FAILED';

export const MOVE_MEETING_FOLDER_REQUEST = 'MOVE_MEETING_FOLDER_REQUEST';
export const MOVE_MEETING_FOLDER_SUCCESS = 'MOVE_MEETING_FOLDER_SUCCESS';
export const MOVE_MEETING_FOLDER_FAILED = 'MOVE_MEETING_FOLDER_FAILED';

export const GET_REPORT_FOR_MEETING_REQUEST = 'GET_REPORT_FOR_MEETING_REQUEST';
export const GET_REPORT_FOR_MEETING_SUCCESS = 'GET_REPORT_FOR_MEETING_SUCCESS';
export const GET_REPORT_FOR_MEETING_FAILED = 'GET_REPORT_FOR_MEETING_FAILED';

export const DELETE_TEMPLATE_REQUEST = 'DELETE_TEMPLATE_REQUEST';
export const DELETE_TEMPLATE_SUCCESS = 'DELETE_TEMPLATE_SUCCESS';
export const DELETE_TEMPLATE_FAILED = 'DELETE_TEMPLATE_FAILED';

export const RESET_API = 'RESET_API';

export const GET_SESSION_REPORT_REQUEST = 'GET_SESSION_REPORT_REQUEST';
export const GET_SESSION_REPORT_SUCCESS = 'GET_SESSION_REPORT_SUCCESS';
export const GET_SESSION_REPORT_FAILED = 'GET_SESSION_REPORT_FAILED';

export const meetingsRequest = payload => ({
  type: MEETINGS_LIST_REQUEST,
  payload,
});

export const meetingsSuccess = payload => ({
  type: MEETINGS_LIST_SUCCESS,
  payload,
});

export const meetingsFailed = error => ({
  type: MEETINGS_LIST_FAILED,
  payload: error,
});

export const requestCreateMeeting = payload => ({
  type: CREATE_MEETING_REQUEST,
  payload,
});

export const createMeetingSuccess = payload => ({
  type: CREATE_MEETING_SUCCESS,
  payload,
});

export const createMeetingFailed = error => ({
  type: CREATE_MEETING_FAILED,
  payload: error,
});

export const templateRequest = payload => ({
  type: TEMPLATE_REQUEST,
  payload,
});

export const templateSuccess = payload => ({
  type: TEMPLATE_SUCCESS,
  payload,
});

export const templateFailed = error => ({
  type: TEMPLATE_FAILED,
  payload: error,
});

export const languageRequest = payload => ({
  type: LANGUAGE_REQUEST,
  payload,
});

export const languageSuccess = payload => ({
  type: LANGUAGE_SUCCESS,
  payload,
});

export const languageFailed = error => ({
  type: LANGUAGE_FAILED,
  payload: error,
});

export const meetingAccessRequest = payload => ({
  type: MEETING_ACCESS_REQUEST,
  payload,
});

export const meetingAccessSuccess = payload => ({
  type: MEETING_ACCESS_SUCCESS,
  payload,
});

export const meetingAccessFailed = error => ({
  type: MEETING_ACCESS_FAILED,
  payload: error,
});

export const meetingAudioConfigRequest = payload => ({
  type: MEETING_AUDIO_CONFIG_REQUEST,
  payload,
});

export const meetingAudioConfigSuccess = payload => ({
  type: MEETING_AUDIO_CONFIG_SUCCESS,
  payload,
});

export const meetingAudioConfigFailed = error => ({
  type: MEETING_AUDIO_CONFIG_FAILED,
  payload: error,
});
// participants
export const participantsRequest = payload => ({
  type: PARTICIPANTS_REQUEST,
  payload,
});

export const participantsSuccess = payload => ({
  type: PARTICIPANTS_SUCCESS,
  payload,
});

export const participantsFailed = error => ({
  type: PARTICIPANTS_FAILED,
  payload: error,
});

export const participantsAddRequest = payload => ({
  type: PARTICIPANTS_ADD_REQUEST,
  payload,
});

export const participantsAddSuccess = payload => ({
  type: PARTICIPANTS_ADD_SUCCESS,
  payload,
});

export const participantsAddFailed = error => ({
  type: PARTICIPANTS_ADD_FAILED,
  payload: error,
});

export const participantsRemoveRequest = payload => ({
  type: PARTICIPANTS_REMOVE_REQUEST,
  payload,
});

export const participantsRemoveSuccess = payload => ({
  type: PARTICIPANTS_REMOVE_SUCCESS,
  payload,
});

export const participantsRemoveFailed = error => ({
  type: PARTICIPANTS_REMOVE_FAILED,
  payload: error,
});

// email
export const requestPostEmail = payload => ({
  type: POST_EMAIL_REQUEST,
  payload,
});

export const postEmailSuccess = payload => ({
  type: POST_EMAIL_SUCCESS,
  payload,
});

export const postEmailFailed = error => ({
  type: POST_EMAIL_FAILED,
  payload: error,
});

export const requestGetEmail = payload => ({
  type: GET_EMAIL_REQUEST,
  payload,
});

export const getEmailSuccess = payload => ({
  type: GET_EMAIL_SUCCESS,
  payload,
});

export const getEmailFailed = error => ({
  type: GET_EMAIL_FAILED,
  payload: error,
});

export const requestDeleteEmail = payload => ({
  type: DELETE_EMAIL_REQUEST,
  payload,
});

export const deleteEmailSuccess = payload => ({
  type: DELETE_EMAIL_SUCCESS,
  payload,
});

export const deleteEmailFailed = error => ({
  type: DELETE_EMAIL_FAILED,
  payload: error,
});

export const resetApi = payload => ({
  type: RESET_API,
  payload,
});
export const requestDeleteMeeting = payload => ({
  type: DELETE_MEETING_REQUEST,
  payload,
});

export const deleteMeetingSuccess = payload => ({
  type: DELETE_MEETING_SUCCESS,
  payload,
});

export const deleteMeetingFailed = error => ({
  type: DELETE_MEETING_FAILED,
  payload: error,
});
export const requestCreateMeetingFolder = payload => ({
  type: CREATE_METTING_FOLDER,
  payload,
});

export const createMeetingFolderSuccess = payload => ({
  type: MEETING_FOLDER_SUCCESS,
  payload,
});

export const createMeetingFolderFailed = error => ({
  type: MEETING_FOLDER_FAILED,
  payload: error,
});

export const requestGetAllMeetingsFolder = payload => ({
  type: GET_ALL_MEETINGS_FOLDER_REQUEST,
  payload,
});

export const getAllMeetingsFolderSuccess = payload => ({
  type: GET_ALL_MEETINGS_FOLDER_SUCCESS,
  payload,
});

export const getAllMeetingsFolderFailed = error => ({
  type: GET_ALL_MEETINGS_FOLDER_FAILED,
  payload: error,
});

export const requestMoveMeetingFolder = payload => ({
  type: MOVE_MEETING_FOLDER_REQUEST,
  payload,
});

export const moveMeetingFolderSuccess = payload => ({
  type: MOVE_MEETING_FOLDER_SUCCESS,
  payload,
});

export const moveMeetingFolderFailed = error => ({
  type: MOVE_MEETING_FOLDER_FAILED,
  payload: error,
});

export const requestGetReportForMeeting = payload => ({
  type: GET_REPORT_FOR_MEETING_REQUEST,
  payload,
});

export const getReportForMeetingSuccess = payload => ({
  type: GET_REPORT_FOR_MEETING_SUCCESS,
  payload,
});

export const getReportForMeetingFailed = error => ({
  type: GET_REPORT_FOR_MEETING_FAILED,
  payload: error,
});

export const requestDeleteTemplate = payload => ({
  type: DELETE_TEMPLATE_REQUEST,
  payload,
});

export const deleteTemplateSuccess = payload => ({
  type: DELETE_TEMPLATE_SUCCESS,
  payload,
});

export const deleteTemplateFailed = error => ({
  type: DELETE_TEMPLATE_FAILED,
  payload: error,
});

export const requestSessionReport = payload => ({
  type: GET_SESSION_REPORT_REQUEST,
  payload,
});

export const sessionReportSuccess = payload => ({
  type: GET_SESSION_REPORT_SUCCESS,
  payload,
});

export const sessionReportFailed = error => ({
  type: GET_SESSION_REPORT_FAILED,
  payload: error,
});
