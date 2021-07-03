import axios from 'axios';
import handleError from './errorHandler';
import store from '../redux/store';

const prefix = 'boards';

const get = async (url) => {
  let response;
  try {
    const { Authorization } = store.store.getState().auth;
    response = await axios.get(url, {
      headers: {
        Authorization,
      },
    });
  } catch (e) {
    handleError(e);
  }
  return response.data;
};

const BoardApi = {
  getBoardsForManager: async (value) => {
    let response;
    const name = value || null;
    const body = { name };

    try {
      const { Authorization } = store.store.getState().auth;
      response = await axios.post(`${axios.defaults.baseURL}/${prefix}/manager`, body, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
    return response.data;
  },

  createBoardFromTemplate: async (values) => {
    try {
      const { Authorization } = store.store.getState().auth;
      const body = { ...values, template: values.template.toUpperCase() };
      await axios.post(`${axios.defaults.baseURL}/${prefix}`, body, {
        headers: {
          Authorization,
        },
      });
    } catch (e) {
      handleError(e);
    }
  },

  getBoardDetails: async (id) => get(`${axios.defaults.baseURL}/${prefix}/${id}`),

  getCardDetails: async (id) => get(`${axios.defaults.baseURL}/cards/${id}`),

  getLaneDetails: async (id) => get(`${axios.defaults.baseURL}/lanes/${id}`),

  getReportDetails: async (id) => get(`${axios.defaults.baseURL}/reports/${id}`),

  joinBoard: async (search) => {
    try {
      const { Authorization } = store.store.getState().auth;
      await axios.post(
        `${axios.defaults.baseURL}/${prefix}/join${search}`,
        {},
        {
          headers: {
            Authorization,
          },
        }
      );
    } catch (e) {
      handleError(e);
    }
  },
};

export default BoardApi;
