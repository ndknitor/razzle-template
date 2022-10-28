import React from 'react';
import Routers from './router/Routers';
import { AxiosInterceptor } from './shared/component/AxiosInterceptor';
import Layout from './shared/component/Layout';
import useInit from './shared/context/hook/useInit';
import Provider from './shared/context/Provider';
import './style.css';
console.warn = () => {};
export default function App() {
  useInit();
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