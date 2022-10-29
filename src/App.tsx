import React from 'react';
import Routers from './Routers';
import { AxiosInterceptor } from './shared/component/AxiosInterceptor';
import Layout from './shared/component/Layout';
import Provider from './shared/context/Provider';
import './style.css';
console.warn = () => {};
export default function App() {
  return (
    <Provider>
      <AxiosInterceptor>
        <Layout>
          <Routers />
        </Layout>
      </AxiosInterceptor>
    </Provider>
  );
}