import React from 'react';
import Provider from './context/Provider';
import ApplicationRouter from './router/ApplicationRouter';


import './style.css';

const App = () => (
  <Provider>
    <ApplicationRouter/>
  </Provider>
);
export default App;
