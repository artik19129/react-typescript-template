import React from 'react';
import loadable from '@loadable/component';
import reducerRegistry from 'store/reducer-registry';

const landingRoutes = [
  {
    path: '/',
    component: loadable(() => import('./pages/landing')),
    exact: true,
    preloadData({ dispatch }) {
      return import('./store').then(store => {
        reducerRegistry.register('landing', store.default);

        return true;
      });
    },
  },
];

export { landingRoutes };
