import React from 'react';
import Provider from './shared/context/Provider';
import AppRouter from './router/AppRouter';
import './style.css';

const App = () => (
  <Provider>
    <AppRouter/>
  </Provider>
);
export default App;
