import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { editCardReducer } from './editCardReducer';
import { boardMangerReducer } from './boardMangerReducer';
import { editLaneReducer } from './editLaneReducer';
import { boardErrorReducer } from './boardErrorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  editCard: editCardReducer,
  editLane: editLaneReducer,
  boardError: boardErrorReducer,
  boardManager: boardMangerReducer
});

export default rootReducer;
