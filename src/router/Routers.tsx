import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';

const About = lazy(() => import('../pages/About'));
const Index = lazy(() => import('../pages/Index'));
const Render = lazy(() => import('../pages/Render'));

function Routers() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/about' element={<About />} />
        <Route path='/render/:id' element={<Render />} />
      </Routes>
    </Suspense>
  )
}

export default Routers