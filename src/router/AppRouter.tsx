import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Index from '../pages/Index';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Index />}></Route>
      <Route path='/about' element={<About />} />
    </Routes>
  )
}

export default AppRouter