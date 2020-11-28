import axios from 'axios';
import handleError from './errorHandler';
import store from '../redux/store';

const prefix = 'boards';

const BoardApi = {
  getBoardsForManager: async () => {
    let response;
    try {
      const { Authorization } = store.store.getState().auth;
      response = await axios.get(
        `${axios.defaults.baseURL}/${prefix}/manager`,
        {
          headers: {
            Authorization,
          },
        }
      );
    } catch (e) {
      handleError(e);
    }
    return response.data;
  },

  createBoardFromTemplate: async (values) => {
    try {
      const { Authorization } = store.store.getState().auth;
      const body = { ...values };
      await axios.post(`${axios.defaults.baseURL}/${prefix}`, body, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
  },

  getBoardDetails: async (id) => {
    let response;
    try {
      const { Authorization } = store.store.getState().auth;
      response = await axios.get(`${axios.defaults.baseURL}/${prefix}/${id}`, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
    return response.data;
  },

  getCardDetails: async (id) => {
    let response;
    try {
      const { Authorization } = store.store.getState().auth;
      response = await axios.get(`${axios.defaults.baseURL}/cards/${id}`, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
    return response.data;
  },
};

export default BoardApi;
