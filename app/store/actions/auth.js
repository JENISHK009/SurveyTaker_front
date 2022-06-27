export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const RESET_API = 'RESET_API';

export const signUpRequest = payload => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signUpSuccess = payload => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const signUpFailed = error => ({
  type: SIGNUP_FAILED,
  payload: error,
});

export const loginRequest = payload => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const resetApi = payload => ({
  type: RESET_API,
  payload,
});
