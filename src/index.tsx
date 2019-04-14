import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'src/store';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';
import App from './pages/App';
import { PersistGate } from 'redux-persist/integration/react';

const configStore = store;

ReactDOM.render(
  <CookiesProvider>
    <Provider store={configStore().store}>
      <PersistGate loading={null} persistor={configStore().persistor}>
        <App />
      </PersistGate>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
