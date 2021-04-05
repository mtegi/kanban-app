import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import localforage from 'localforage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: localforage,
  blacklist: ['editCard', 'editLane', 'boardError'],
};

const middlewares = [thunk, logger];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export default { store, persistor };
