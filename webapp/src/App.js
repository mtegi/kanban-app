import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import i18n from './i18n';
import MainController from './components/MainController';
import { ConfigureApi } from './api/config';

const App = () => {
  useEffect(() => {
    ConfigureApi();
  });
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <BrowserRouter>
          <MainController />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
