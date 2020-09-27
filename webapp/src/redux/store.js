import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import localforage from 'localforage';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: localforage,
  /* blacklist: ['auth', 'currentAccessLevel'], */
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export default { store, persistor };
