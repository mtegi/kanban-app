import { SET_EDIT_LANE, SET_EDIT_LANE_OPEN } from './types';

export const setEditLane = (open, laneId, cardCount) => ({
  type: SET_EDIT_LANE,
  payload: { open, laneId, cardCount },
});

export const setEditLaneOpen = (open) => ({
  type: SET_EDIT_LANE_OPEN,
  payload: open,
});
