import { CLEAR_AUTH, SET_TOKEN } from './actions/types';

const initState = {
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
        token: action.payload,
        isLogged: true,
      };
    case CLEAR_AUTH:
      return initState;
    default:
      return state;
  }
};
