import axios from 'axios';
import config from '../app-config.json';

export const API_PATH = `https://${config.api.host}:${config.api.port}${config.api.prefix}`;

export const ConfigureApi = () => {
  axios.defaults.baseURL = API_PATH;
  axios.defaults.withCredentials = true;
};
