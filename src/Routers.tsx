import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './shared/component/Loading';
import useInit from './shared/context/hook/useInit';

const Index = Loadable({ loader: () => import('./pages/Index'), loading: Loading });
const About = Loadable({ loader: () => import('./pages/About'), loading: Loading });
const Render = Loadable({ loader: () => import('./pages/Render'), loading: Loading });
const Unauthoriized = Loadable({ loader: () => import('./pages/Unauthoriized'), loading: Loading });
const Forbidden = Loadable({ loader: () => import('./pages/Forbidden'), loading: Loading });

function Routers() {
  useInit();
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/about' element={<About />} />
      <Route path='/render/:id' element={<Render />} />

      <Route path='/unauthorized' element={<Unauthoriized />} />
      <Route path='/forbidden' element={<Forbidden />} />
    </Routes>
  )
}

export default Routers