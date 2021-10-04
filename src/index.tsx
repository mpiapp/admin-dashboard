import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import AppRoute from './routes';
import './assets/scss/root.scss'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoute />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

