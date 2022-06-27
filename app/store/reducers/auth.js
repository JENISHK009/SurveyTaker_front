import * as actions from '../actions/auth';

const initialState = {
  signup: {
    fetching: false,
    success: false,
  },
  login: {
    fetching: false,
    success: false,
  },
  apiSuccess: false,
  apiMessage: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNUP_REQUEST:
      return { ...state, signup: { fetching: true, success: false } };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        signup: { fetching: false, success: true },
        apiSuccess: true,
        apiMessage: action.payload,
      };
    case actions.SIGNUP_FAILED:
      return {
        ...state,
        signup: { fetching: false, error: action.payload, success: false },
        apiSuccess: false,
        apiMessage: action.payload.includes(
          'Cannot read properties of undefined',
        )
          ? 'Something Went Wrong'
          : action.payload,
      };

    case actions.LOGIN_REQUEST:
      return { ...state, login: { fetching: true, success: false } };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        login: { fetching: false, success: true },
        apiSuccess: true,
        apiMessage: action.payload,
      };
    case actions.LOGIN_FAILED:
      return {
        ...state,
        login: { fetching: false, error: action.payload, success: false },
        apiSuccess: false,
        apiMessage: action.payload.includes(
          'Cannot read properties of undefined',
        )
          ? 'Something Went Wrong'
          : action.payload,
      };

    case actions.RESET_API:
      return {
        ...state,
        apiSuccess: false,
        apiMessage: '',
      };

    default:
      return state;
  }
};

export default auth;

export const apiMessage = state => state.apiMessage;
export const apiSuccess = state => state.apiSuccess;
export const signup = state => state.signup;
export const login = state => state.login;
