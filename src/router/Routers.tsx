import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';

const Index = Loadable({ loader: () => import('../pages/Index'), loading: () => <></> });
const About = Loadable({ loader: () => import('../pages/About'), loading: () => <></> });
const Render = Loadable({ loader: () => import('../pages/Render'), loading: () => <></> });


// const About = lazy(() => import('../pages/About'));
// const Index = lazy(() => import('../pages/Index'));
// const Render = lazy(() => import('../pages/Render'));

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/about' element={<About />} />
      <Route path='/render/:id' element={<Render />} />
    </Routes>
  )
}

export default Routers