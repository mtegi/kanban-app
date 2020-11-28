import { SET_EDIT_CARD, SET_EDIT_CARD_OPEN } from './actions/types';

const initState = {
  open: false,
  cardId: null,
};

export const editCardReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EDIT_CARD:
      return action.payload;
    case SET_EDIT_CARD_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};
