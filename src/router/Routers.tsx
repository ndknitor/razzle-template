import React from 'react'
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Index from '../pages/Index';
import Render from '../pages/Render';

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/about' element={<About />} />
      <Route path='/render/:id' element={<Render/>}/>
    </Routes>
  )
}

export default Routers