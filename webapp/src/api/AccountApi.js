import axios from 'axios';
import handleError from './errorHandler';
import store from '../redux/store';

const AccountApi = {
  register: async (values) => {
    let response;
    const body = { ...values };
    delete body.repeatPassword;
    if (body.lastName === '') {
      delete body.lastName;
    }
    if (body.firstName === '') {
      delete body.firstName;
    }
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

  getOwnAccountDetails: async () => {
    let response;
    try {
      const { Authorization } = store.store.getState().auth;
      response = await axios.get(`${axios.defaults.baseURL}/users/me`, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
    return response.data;
  },

  updateOwnAccountDetails: async (values) => {
    let response;
    const body = { ...values };
    if (body.lastName === '') {
      delete body.lastName;
    }
    if (body.firstName === '') {
      delete body.firstName;
    }
    try {
      const { Authorization } = store.store.getState().auth;
      response = await axios.put(`${axios.defaults.baseURL}/users/me`, body, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
    return response;
  },
};

export default AccountApi;
