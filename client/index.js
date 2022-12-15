/* The entry point of the application. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { ThemeConfig } from './assets/theme';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<h1>Loading....</h1>}>
      <ThemeConfig>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeConfig>
    </PersistGate>
  </Provider>
);
