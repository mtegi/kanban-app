import { CLEAR_AUTH, SET_NAME, SET_TOKEN } from './actions/types';

const initState = {
  Authorization: '',
  token: {
    authorities: [],
    client_id: '',
    email: '',
    exp: 0,
    jti: '',
    scope: [],
    user_name: '',
    name: '',
  },
  isLogged: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        Authorization: action.payload.Authorization,
        token: action.payload.token,
        isLogged: true,
      };
    case SET_NAME:
      return {
        ...state,
        token: {
          ...state.token,
          name: action.payload,
        },
      };
    case CLEAR_AUTH:
      return initState;
    default:
      return state;
  }
};
