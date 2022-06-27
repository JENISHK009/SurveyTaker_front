import restApiClient from './index';
import resHandler from '../../utils/resHandler';

export const signupAPI = async data => {
  try {
    const datas = await restApiClient.post(`/admin/signUp`, data);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};

export const loginApi = async data => {
  try {
    const datas = await restApiClient.post(`/user/login`, data);
    return resHandler(datas, null);
  } catch (error) {
    return resHandler(error, true);
  }
};
