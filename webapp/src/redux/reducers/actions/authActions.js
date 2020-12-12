import { CLEAR_AUTH, SET_NAME, SET_TOKEN } from './types';
import store from '../../store';

export const setToken = (token) => ({ type: SET_TOKEN, payload: token });

export const setName = ({ firstName, lastName }) => (dispatch) => {
  if (firstName !== null && lastName !== null) {
    dispatch({ type: SET_NAME, payload: `${firstName} ${lastName}` });
  } else if (firstName !== null && lastName === null) {
    dispatch({ type: SET_NAME, payload: firstName });
  } else if (firstName === null && lastName !== null) {
    dispatch({ type: SET_NAME, payload: lastName });
  } else if (firstName === null && lastName === null) {
    dispatch({ type: SET_NAME, payload: null });
  }
};

export const logout = () => {
  store.store.dispatch({ type: CLEAR_AUTH });
  return store.persistor.purge();
};
