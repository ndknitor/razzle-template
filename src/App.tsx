import React from 'react';
import Routers from './router/Routers';
import { AxiosInterceptor } from './shared/boiler/AxiosInterceptor';
import Layout from './shared/component/Layout';
import Provider from './shared/context/Provider';
import './style.css';

const App = () => (
  <Provider>
    <AxiosInterceptor>
      <Layout>
        <Routers />
      </Layout>
    </AxiosInterceptor>
  </Provider>
);
export default App;
