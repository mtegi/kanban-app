import axios from 'axios';
import { getI18n } from 'react-i18next';
import handleError from './errorHandler';
import store from '../redux/store';
import { setName } from '../redux/reducers/actions/authActions';

const prefix = 'users';

const AccountApi = {
  register: async (values) => {
    let response;
    const body = { ...values, locale: getI18n().language };
    delete body.repeatPassword;
    if (body.lastName === '') {
      delete body.lastName;
    }
    if (body.firstName === '') {
      delete body.firstName;
    }
    try {
      response = await axios.post(
        `${axios.defaults.baseURL}/${prefix}/register`,
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
      response = await axios.get(`${axios.defaults.baseURL}/${prefix}/me`, {
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
      response = await axios.put(
        `${axios.defaults.baseURL}/${prefix}/me`,
        body,
        {
          headers: {
            Authorization,
          },
        }
      );
      store.store.dispatch(setName(response.data));
    } catch (e) {
      handleError(e);
    }
    return response.data;
  },

  activateAccount: async (username, token) => {
    try {
      await axios.post(`${axios.defaults.baseURL}/${prefix}/activate`, {
        username,
        token,
        locale: getI18n().language,
      });
    } catch (e) {
      handleError(e);
    }
  },
};

export default AccountApi;
