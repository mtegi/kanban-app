import axios from 'axios';
import handleError from './errorHandler';
import config from '../app-config.json';
import { setAxiosToken } from './config';
import store from '../redux/store';
import { setToken } from '../redux/reducers/actions/authActions';

const AuthApi = {
  login: async (username, password) => {
    let response;
    const form = new URLSearchParams();
    form.append('grant_type', 'password');
    form.append('username', username);
    form.append('password', password);
    const params = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: config.api.oauth.client,
        password: config.api.oauth.secret,
      },
    };
    try {
      response = await axios.post(
        `${axios.defaults.baseURL}/oauth/token`,
        form,
        params
      );
      const { data } = response;
      setAxiosToken(data.token_type, data.access_token);
      const token = JSON.parse(window.atob(data.access_token.split('.')[1]));
      store.store.dispatch(setToken(token));
    } catch (e) {
      if (e.response !== undefined && e.response.status === 401) {
        throw new Error('error');
      } else {
        console.log(e);
        handleError(e);
      }
    }
    return response;
  },
};

export default AuthApi;
