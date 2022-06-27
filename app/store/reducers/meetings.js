import * as actions from '../actions/meetings';

const initialState = {
  meetings: {
    meetingData: {},
    fetching: false,
  },
  templates: [],
  language: [],
  meetingAccess: [],
  meetingAudioConfig: [],
  postMeeting: {
    postMeeting: {},
    fetching: false,
    success: false,
  },
  postEmail: {
    email: {},
    success: false,
  },
  getEmaildata: {
    getEmail: {},
    emailfetching: false,
  },
  deleteEmail: {
    success: false,
    fetching: false,
  },
  deleteMeeting: {
    deleteMeetingData: {},
    fetching: null,
    success: false,
  },
  fetching: false,
  error: '',
  participants: {
    participantData: {},
    fetching: false,
  },
  addParticipant: {},
  removeParticipants: {},
  apiSuccess: false,
  apiMessage: '',
  templateFetch: false,
  languageFetch: false,
  accessFetch: false,
  meetingFolder: {
    meetingFolderData: {},
    fetching: null,
  },
  meetingsFolder: {
    meetingsFolderList: {},
    fetching: null,
  },
  moveMeeting: {
    success: false,
    fetching: false,
  },
  meetingReport: {
    success: false,
    fetching: false,
  },

  removeTemplate: {
    fetching: false,
    success: false,
  },
  sessionReport: {
    fetching: false,
    success: false,
    sessionReportData: {},
  },
};
const meetings = (state = initialState, action) => {
  switch (action.type) {
    case actions.MEETINGS_LIST_REQUEST:
      return { ...state, meetings: { fetching: true } };
    case actions.MEETINGS_LIST_SUCCESS:
      return {
        ...state,
        meetings: { meetingData: action.payload, fetching: false },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.MEETINGS_LIST_FAILED:
      return {
        ...state,
        meetings: { fetching: false, error: action.payload, meetingData: {} },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.TEMPLATE_REQUEST:
      return { ...state, fetching: true, templateFetch: true };
    case actions.TEMPLATE_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        fetching: false,
        templateFetch: false,
      };
    case actions.TEMPLATE_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        templates: [],
        templateFetch: false,
      };

    // participants
    case actions.PARTICIPANTS_REQUEST:
      return {
        ...state,
        participantData: { fetching: true },
      };
    case actions.PARTICIPANTS_SUCCESS:
      return {
        ...state,
        participantData: { participants: action.payload, fetching: false },
      };
    case actions.PARTICIPANTS_FAILED:
      return {
        ...state,
        participantData: {
          fetching: false,
          error: action.payload,
          participants: {},
        },
      };
    case actions.LANGUAGE_REQUEST:
      return { ...state, fetching: true, languageFetch: true };
    case actions.LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.payload,
        fetching: false,
        languageFetch: false,
      };
    case actions.LANGUAGE_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        language: [],
        languageFetch: false,
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.MEETING_ACCESS_REQUEST:
      return { ...state, fetching: true, accessFetch: true };
    case actions.MEETING_ACCESS_SUCCESS:
      return {
        ...state,
        meetingAccess: action.payload,
        fetching: false,
        accessFetch: false,
      };
    case actions.MEETING_ACCESS_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        meetingAccess: [],
        accessFetch: false,
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.MEETING_AUDIO_CONFIG_REQUEST:
      return { ...state, fetching: true };
    case actions.MEETING_AUDIO_CONFIG_SUCCESS:
      return { ...state, meetingAudioConfig: action.payload, fetching: false };
    case actions.MEETING_AUDIO_CONFIG_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        meetingAudioConfig: [],
      };
    case actions.CREATE_MEETING_REQUEST:
      return { ...state, postMeeting: { fetching: true, success: false } };
    case actions.CREATE_MEETING_SUCCESS:
      return {
        ...state,
        postMeeting: {
          ...state.postMeeting,
          postMeeting: action.payload,
          fetching: false,
          success: true,
        },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.CREATE_MEETING_FAILED:
      return {
        ...state,
        postMeeting: {
          fetching: false,
          postMeeting: {},
          error: action.payload,
          success: false,
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };

    case actions.PARTICIPANTS_ADD_REQUEST:
      return { ...state, fetching: true, addParticipant: { fetching: true } };

    case actions.PARTICIPANTS_ADD_SUCCESS:
      return {
        ...state,
        addParticipant: { participants: action.payload, fetching: false },
        fetching: false,
      };

    case actions.PARTICIPANTS_ADD_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        addParticipant: { fetching: false },
      };

    case actions.PARTICIPANTS_REMOVE_REQUEST:
      return { ...state, fetching: true };
    case actions.PARTICIPANTS_REMOVE_SUCCESS:
      return { ...state, removeParticipants: action.payload, fetching: false };
    case actions.PARTICIPANTS_REMOVE_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        removeParticipants: {},
      };
    case actions.POST_EMAIL_REQUEST:
      return { ...state, postEmail: { fetching: true, success: false } };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        postEmail: {
          ...state.postEmail,
          email: action.payload,
          fetching: false,
          success: true,
        },
      };
    case actions.POST_EMAIL_FAILED:
      return {
        ...state,
        postEmail: { fetching: false, success: false },
      };
    case actions.GET_EMAIL_REQUEST:
      return {
        ...state,
        getEmaildata: { emailfetching: true },
      };
    case actions.GET_EMAIL_SUCCESS:
      return {
        ...state,
        getEmaildata: { getEmail: action.payload, emailfetching: false },
      };
    case actions.GET_EMAIL_FAILED:
      return {
        ...state,
        getEmaildata: { emailfetching: false, error: action.payload },
      };
    case actions.DELETE_EMAIL_REQUEST:
      return {
        ...state,
        deleteEmail: { fetching: true, success: false },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.DELETE_EMAIL_SUCCESS:
      return {
        ...state,
        deleteEmail: { ...action.payload, fetching: false, success: true },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.DELETE_EMAIL_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
        deleteEmail: { fetching: false, success: false },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };

    case actions.RESET_API:
      return {
        ...state,
        postMeeting: { success: false },
        postEmail: { success: false },
        deleteMeeting: { success: false },
        moveMeeting: { success: false },
        removeTemplate: { success: false },
        apiSuccess: false,
        apiMessage: '',
      };
    case actions.DELETE_MEETING_REQUEST:
      return { ...state, deleteMeeting: { fetching: true, success: false } };
    case actions.DELETE_MEETING_SUCCESS:
      return {
        ...state,
        deleteMeeting: {
          deleteMeetingData: action.payload,
          fetching: false,
          success: true,
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.DELETE_MEETING_FAILED:
      return {
        ...state,
        deleteMeeting: {
          fetching: null,
          error: action.payload,
          deleteMeetingData: {},
          success: false,
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.CREATE_METTING_FOLDER:
      return { ...state, meetingFolder: { fetching: true } };
    case actions.MEETING_FOLDER_SUCCESS:
      return {
        ...state,
        meetingFolder: { meeetingFolderData: action.payload, fetching: false },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.MEETING_FOLDER_FAILED:
      return {
        ...state,
        meetingFolder: {
          fetching: null,
          error: action.payload,
          meetingFolderData: {},
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.GET_ALL_MEETINGS_FOLDER_REQUEST:
      return { ...state, meetingsFolder: { fetching: true } };
    case actions.GET_ALL_MEETINGS_FOLDER_SUCCESS:
      return {
        ...state,
        meetingsFolder: {
          meetingsFolderList: action.payload,
          fetching: false,
        },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.GET_ALL_MEETINGS_FOLDER_FAILED:
      return {
        ...state,
        meetingsFolder: {
          fetching: null,
          error: action.payload,
          meetingsFolderList: {},
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.MOVE_MEETING_FOLDER_REQUEST:
      return { ...state, moveMeeting: { fetching: true } };
    case actions.MOVE_MEETING_FOLDER_SUCCESS:
      return {
        ...state,
        moveMeeting: {
          success: true,
          fetching: false,
        },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.MOVE_MEETING_FOLDER_FAILED:
      return {
        ...state,
        moveMeeting: {
          fetching: false,
          error: action.payload,
          success: false,
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };
    case actions.GET_REPORT_FOR_MEETING_REQUEST:
      return { ...state, meetingReport: { fetching: true } };
    case actions.GET_REPORT_FOR_MEETING_SUCCESS:
      return {
        ...state,
        meetingReport: {
          success: true,
          fetching: false,
          meetingReportList: action.payload,
        },
        apiSuccess: true,
        apiMessage: action.payload.message,
      };
    case actions.GET_REPORT_FOR_MEETING_FAILED:
      return {
        ...state,
        meetingReport: {
          fetching: false,
          error: action.payload,
          success: false,
          meetingReportList: {},
        },
        apiSuccess: false,
        apiMessage: action.payload.message,
      };

    case actions.DELETE_TEMPLATE_REQUEST:
      return { ...state, removeTemplate: { fetching: true, success: false } };
    case actions.DELETE_TEMPLATE_SUCCESS:
      return {
        ...state,
        removeTemplate: {
          success: true,
          fetching: false,
        },
        apiSuccess: true,
        apiMessage: action.payload,
      };
    case actions.DELETE_TEMPLATE_FAILED:
      return {
        ...state,
        removeTemplate: {
          fetching: false,
          error: action.payload,
          success: false,
        },
        apiSuccess: false,
        apiMessage: action.payload,
      };

    case actions.GET_SESSION_REPORT_REQUEST:
      return { ...state, sessionReport: { fetching: true, success: false } };
    case actions.GET_SESSION_REPORT_SUCCESS:
      return {
        ...state,
        sessionReport: {
          success: true,
          fetching: false,
          sessionReportData: action.payload,
        },
        apiSuccess: true,
        apiMessage: action.payload,
      };
    case actions.GET_SESSION_REPORT_FAILED:
      return {
        ...state,
        sessionStorage: {
          fetching: false,
          error: action.payload,
          success: false,
          sessionReportData: {},
        },
        apiSuccess: false,
        apiMessage: action.payload,
      };
    default:
      return state;
  }
};

export default meetings;

export const getIsMeetingFetching = state => state.fetching;
export const getMeetings = state => state.meetings;
export const getTemplates = state => state.templates;
export const getLanguages = state => state.language;
export const getMeetingAccess = state => state.meetingAccess;
export const getMeetingAudioConfig = state => state.meetingAudioConfig;
export const getPostMeeting = state => state.postMeeting;
export const getParticipants = state => state.participantData;
export const addParticipants = state => state.addParticipant;
export const removeParticipants = state => state.removeParticipants;
export const getPostEmail = state => state.postEmail;
export const getEmails = state => state.getEmaildata;
export const deleteEmail = state => state.deleteEmail;
export const apiSuccess = state => state.apiSuccess;
export const apiMessage = state => state.apiMessage;
export const deleteMeeting = state => state.deleteMeeting;
export const templateFetch = state => state.templateFetch;
export const languageFetch = state => state.languageFetch;
export const accessFetch = state => state.accessFetch;
export const meetingFolder = state => state.meetingFolder;
export const meetingsFolder = state => state.meetingsFolder;
export const moveMeetingFolder = state => state.moveMeeting;
export const meetingReport = state => state.meetingReport;
export const removeTemplate = state => state.removeTemplate;
export const sessionReport = state => state.sessionReport;
