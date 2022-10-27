import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { createBroswerContext } from 'use-sse';
import App from './App';
const BroswerDataContext = createBroswerContext();

const element =
  <HelmetProvider>
    <BrowserRouter>
      <BroswerDataContext>
        <App />
      </BroswerDataContext >
    </BrowserRouter>
  </HelmetProvider>;
const root = document.getElementById('root');
if (window) {
  createRoot(root).render(element);
}
else {
  hydrateRoot(root, element);
}


if (module.hot) {
  module.hot.accept();
}
