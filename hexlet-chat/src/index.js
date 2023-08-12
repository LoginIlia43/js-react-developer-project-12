import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './components/App';

const rollbarConfig = {
  accessToken: 'd11e4e6f650f412381eeee81e299e420',
  environment: 'testenv',
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(await init());
