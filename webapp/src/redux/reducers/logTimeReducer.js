import { SET_LOG_TIME, SET_LOG_TIME_DETAILS, SET_LOG_TIME_OPEN } from './actions/types';

const initState = {
  open: false,
  cardId: null,
  details: [{ from: null, to: null, title: '' }],
};

export const logTimeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOG_TIME:
      return {
        ...state,
        open: action.payload.open,
        cardId: action.payload.cardId,
      };
    case SET_LOG_TIME_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case SET_LOG_TIME_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};
