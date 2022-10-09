import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createBroswerContext } from 'use-sse';

import App from './App';
const BroswerDataContext = createBroswerContext();
createRoot(document.getElementById('root') as HTMLElement)
.render(
  <BrowserRouter>
    <BroswerDataContext>
      <App />
    </BroswerDataContext >
  </BrowserRouter>
);

if (module.hot) {
  module.hot.accept();
}
