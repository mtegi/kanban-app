import axios from 'axios';
import handleError from './errorHandler';

const AccountApi = {
  register: async (values) => {
    let response;
    const body = { ...values };
    delete body.repeatPassword;
    try {
      response = await axios.post(
        `${axios.defaults.baseURL}/users/register`,
        body
      );
    } catch (e) {
      handleError(e);
    }
    return response;
  },
};

export default AccountApi;
