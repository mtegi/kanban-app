import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import './i18n';
import MainController from './components/MainController';
import { ConfigureApi } from './api/config';
import theme from './theme';

const App = () => {
  useEffect(() => {
    ConfigureApi();
  });
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <MainController />
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
