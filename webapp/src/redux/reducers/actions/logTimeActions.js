import { SET_LOG_TIME, SET_LOG_TIME_DETAILS, SET_LOG_TIME_OPEN } from "./types";
import TimeEntryApi from "../../../api/TimeEntryApi";

export const setLogTime = (open, cardId) => ({
  type: SET_LOG_TIME,
  payload: { open, cardId },
});

export const setLogTimeOpen = (open) => ({
  type: SET_LOG_TIME_OPEN,
  payload: open,
});

export const setLogTimeDetails = (data) => ({
  type: SET_LOG_TIME_DETAILS,
  payload: data,
});

export const deleteLogTimeDetails = (id) => async (dispatch) => {
  try {
    await TimeEntryApi.delete(id);
    const data = await TimeEntryApi.getList();
    dispatch(setLogTimeDetails(data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const fetchLogTimeDetails = () => async (dispatch) => {
  try {
    const data = await TimeEntryApi.getList();
    dispatch(setLogTimeDetails(data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
