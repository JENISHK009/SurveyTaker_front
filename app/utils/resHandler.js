/* eslint-disable consistent-return */
export default (res, isErr) => {
  try {
    if (!isErr) {
      return {
        data: { ...res, success: true },
      };
    }
    // res && res.response && res.response.data ? ...res.response.data : ...res
    const responseData = { ...res.response };
    console.log('responseData', responseData);

    if (responseData.status === 403) {
      console.log('called');
      sessionStorage.removeItem('userToken');
      window.location.replace('/login');
    } else {
      return {
        data: { ...res.response.data, success: false },
      };
    }
  } catch (error) {
    return {
      data: { message: error.message || error, success: false },
    };
  }
};
