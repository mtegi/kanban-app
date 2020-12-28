import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { editCardReducer } from './editCardReducer';
import { boardMangerReducer } from './boardMangerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  editCard: editCardReducer,
  boardManager: boardMangerReducer
});

export default rootReducer;
