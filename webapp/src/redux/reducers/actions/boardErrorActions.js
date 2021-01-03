import { SET_BOARD_ERROR, SET_BOARD_ERROR_OPEN } from './types';

export const setBoardError = (open, message) => ({
  type: SET_BOARD_ERROR,
  payload: { open, message },
});

export const setBoardErrorOpen = (open) => ({
  type: SET_BOARD_ERROR_OPEN,
  payload: open,
});
