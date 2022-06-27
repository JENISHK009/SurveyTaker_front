/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import * as actions from '../actions/app';

const app = (
  state = {
    fetching: false,
  },
  action,
) => {
  switch (action.type) {
    case actions.APP_START_FETCHING:
      return { ...state, fetching: true };
    case actions.APP_STOP_FETCHING:
      return { ...state, fetching: false };
    default:
      return state;
  }
};

export default app;

// APP fetching states
export const getIsFetching = state => state.fetching;
