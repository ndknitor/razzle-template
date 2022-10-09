import React from 'react';
import Routers from './router/Routers';
import Layout from './shared/component/Layout';
import Provider from './shared/context/Provider';
import './style.css';

const App = () => (
  <Provider>
    <Layout>
      <Routers />
    </Layout>
  </Provider>
);
export default App;
