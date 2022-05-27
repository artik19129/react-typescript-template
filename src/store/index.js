import thunk from 'redux-thunk';
import { loggers, types } from 'redux-act';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducerRegistry from 'store/reducer-registry';

const middlewares = [
  thunk,
];

if (process.env.NODE_ENV !== 'production') {
  types.disableChecking();
  const { createLogger } = require('redux-logger');

  const logger = createLogger({
    collapsed: true,
    ...loggers.reduxLogger,
  });

  middlewares.unshift(logger);
}

const createRootReducer = (history, reducers) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

  return (state, action) => {
    if (action.type === 'root/RESET_APP') {
      return rootReducer(undefined, action);
    }

    return rootReducer(state, action);
  };
};

function configureStore(history, staticReducers = {}) {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRELOADED_STATE__;

  if (preloadedState) {
    delete window.__PRELOADED_STATE__;
  }

  const store = createStore(
    createRootReducer(history, staticReducers),
    preloadedState,
    applyMiddleware(...middlewares, routerMiddleware(history)),
  );

  reducerRegistry.setChangeListener(dynamicReducers => {
    const nextReducer = createRootReducer(history, {
      ...staticReducers,
      ...dynamicReducers,
    });

    store.replaceReducer(nextReducer);
  });

  store.reducerRegistry = reducerRegistry;

  return store;
}

export { configureStore };

if (module.hot) {
  module.hot.accept();
}
