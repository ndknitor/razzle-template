import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createBroswerContext } from 'use-sse';

import App from './App';
const BroswerDataContext = createBroswerContext();
hydrateRoot(document.getElementById('root'),
  <BrowserRouter>
    <BroswerDataContext>
      <App />
    </BroswerDataContext >
  </BrowserRouter>
  );

if (module.hot) {
  module.hot.accept();
}
