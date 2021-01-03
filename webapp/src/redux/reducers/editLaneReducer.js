import { SET_EDIT_LANE, SET_EDIT_LANE_OPEN } from './actions/types';

const initState = {
  open: false,
  laneId: null,
  cardCount: 0,
};

export const editLaneReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EDIT_LANE:
      return action.payload;
    case SET_EDIT_LANE_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};
