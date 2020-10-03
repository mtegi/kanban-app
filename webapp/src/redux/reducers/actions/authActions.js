import { SET_TOKEN, CLEAR_AUTH } from './types';
import store from '../../store';

export const setToken = (token) => ({ type: SET_TOKEN, payload: token });

export const logout = () => {
  store.store.dispatch({ type: CLEAR_AUTH });
  return store.persistor.purge();
};
