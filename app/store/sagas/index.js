import meetingSaga from './meetings';
import registrationFormSaga from './registrationForm';
import getInjectors from '../../utils/sagaInjectors';
import authSaga from './auth';

export function injectGlobalSagas(store) {
  const injectors = getInjectors(store);
  let key = 'meetings';
  injectors.injectSaga(key, { saga: meetingSaga });

  key = 'registrationForm';
  injectors.injectSaga(key, { saga: registrationFormSaga });

  key = 'auth';
  injectors.injectSaga(key, { saga: authSaga });
}
