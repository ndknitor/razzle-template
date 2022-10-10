import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { createBroswerContext } from 'use-sse';

import App from './App';
const BroswerDataContext = createBroswerContext();
hydrateRoot(document.getElementById('root'),
  <HelmetProvider>
    <BrowserRouter>
      <BroswerDataContext>
        <App />
      </BroswerDataContext >
    </BrowserRouter>
  </HelmetProvider>

);

if (module.hot) {
  module.hot.accept();
}
