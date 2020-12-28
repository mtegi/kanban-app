import { SET_BOARDS, SET_MANAGER_ERROR, SET_MANAGER_LOADING, SET_SEARCH_INPUT } from './types';
import BoardApi from '../../../api/BoardApi';

const setBoards = (boards) => ({ type: SET_BOARDS, payload: boards });
const setLoading = (loading) => ({ type: SET_MANAGER_LOADING, payload: loading });
const setError = (error) => ({ type: SET_MANAGER_ERROR, payload: error });

export const setSearchInput = (value) => ({ type: SET_SEARCH_INPUT, payload: value });
export const fetchBoards = (name) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await BoardApi.getBoardsForManager(name);
    dispatch(setBoards(data));
  } catch (e) {
    dispatch(setError(e));
  } finally {
    dispatch(setLoading(false));
  }
};
