import { SET_BOARD_ERROR, SET_BOARD_ERROR_OPEN } from './actions/types';

const initState = {
  open: false,
  message: ''
};

export const boardErrorReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BOARD_ERROR:
      return action.payload;
    case SET_BOARD_ERROR_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};
