import { SET_EDIT_CARD, SET_EDIT_CARD_OPEN } from './types';

export const setEditCard = (open, cardId) => ({
  type: SET_EDIT_CARD,
  payload: { open, cardId },
});

export const setEditOpen = (open) => ({
  type: SET_EDIT_CARD_OPEN,
  payload: open,
});
