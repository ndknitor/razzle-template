import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBroswerContext } from 'use-sse';

import App from './App';
const BroswerDataContext = createBroswerContext();

hydrate(
  <BrowserRouter>
    <BroswerDataContext>
      <App />
    </BroswerDataContext>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
