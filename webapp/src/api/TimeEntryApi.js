import axios from 'axios';
import store from '../redux/store';
import handleError from './errorHandler';

const prefix = 'time-entries';

const TimeEntryApi = {
  create: async (data) => {
    try {
      const { Authorization } = store.store.getState().auth;
      await axios.post(`${axios.defaults.baseURL}/${prefix}`, data, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
  },
  delete: async (id) => {
    try {
      const { Authorization } = store.store.getState().auth;
      await axios.delete(`${axios.defaults.baseURL}/${prefix}/${id}`, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
  },
  getList: async () => {
    try {
      const { Authorization } = store.store.getState().auth;
      const { data } = await axios.get(`${axios.defaults.baseURL}/${prefix}`, {
        headers: {
          Authorization,
        },
      });
      return data;
    } catch (e) {
      handleError(e);
    }
    return null;
  },
};

export default TimeEntryApi;
