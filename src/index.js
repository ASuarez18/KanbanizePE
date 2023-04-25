import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n';
import App from './App';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </I18nextProvider>,
  document.getElementById('root')
);



