import {
  SET_BOARDS,
  SET_MANAGER_ERROR,
  SET_MANAGER_LOADING,
  SET_SEARCH_INPUT,
} from './actions/types';

const initState = {
  boards: [],
  searchInput: null,
  loading: false,
  error: null,
};

export const boardMangerReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case SET_MANAGER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MANAGER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
