export const APP_START_FETCHING = 'APP_START_FETCHING';
export const APP_STOP_FETCHING = 'APP_STOP_FETCHING';

export const appStartFetching = () => ({
  type: APP_START_FETCHING,
});

export const appStopFetching = () => ({
  type: APP_STOP_FETCHING,
});
