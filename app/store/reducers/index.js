/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../../utils/history';
import languageProviderReducer from '../../containers/LanguageProvider';
import meetingReducer from './meetings';
import hostUIReducer from './host-ui';
import appReducer from './app';
import registrationFormReducer from './registrationForm';
import authReducer from './auth';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    meetings: meetingReducer,
    hostUI: hostUIReducer,
    app: appReducer,
    registrationForm: registrationFormReducer,
    auth: authReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
