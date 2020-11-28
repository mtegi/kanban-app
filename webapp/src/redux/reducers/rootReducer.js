import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { editCardReducer } from './editCardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  editCard: editCardReducer,
});

export default rootReducer;
