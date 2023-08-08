import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

import store from './slices/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(await init());
