import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader/root'
import { renderRoutes } from 'react-router-config'
import i18n from 'lib/i18n';
import InternalPage from 'lib/internal-page';
import { Toasts } from 'lib/toasts';
import { GlobalStyle, GlobalTransition } from 'lib/global-style'
import { defaultTheme } from 'lib/themes'
import { AuthProvider } from 'lib/auth-context';
import { commonRoutes } from 'features/common'
import RouterEnhancer from 'lib/router-enhancer'
import { ConnectedModalSystem } from './lib/modal-system';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider routes={commonRoutes}>
        {({ isHeaderVisible }) => (
          <ThemeProvider theme={defaultTheme}>
            <InternalPage isHeaderVisible={isHeaderVisible}>
              <ConnectedModalSystem />
              <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  duration: 5000,
                  success: {
                    duration: 3000,
                    theme: {
                      primary: 'green',
                      secondary: 'black',
                    },
                  },
                }}
              />
              <Toasts />
              <GlobalStyle />
              <GlobalTransition />

              <RouterEnhancer routes={commonRoutes}>
                {renderRoutes(commonRoutes)}
              </RouterEnhancer>
            </InternalPage>
          </ThemeProvider>
        )}
      </AuthProvider>
    </I18nextProvider>
  );
}

export default hot(App);
