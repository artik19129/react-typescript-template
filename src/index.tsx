import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import 'lib/i18n';
import 'numeral/locales/ru';
import { isDevelopment } from 'lib/helpers';
import App from './app';
import { configureStore } from './store';
import * as staticReducers from './store/modules';

if (isDevelopment) {
  const consoleError = console.error.bind(console);

  console.error = (...args) => {
    const excludedErrors = [/React does not recognize/, /Received `.+` for/];

    if (!args.some(item => excludedErrors.some(item2 => item2.test(item)))) {
      consoleError(...args);
    }
  };
}

const history = createBrowserHistory();
const store = configureStore(history, staticReducers);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
