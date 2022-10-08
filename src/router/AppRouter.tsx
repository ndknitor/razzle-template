import React from 'react'
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Index from '../pages/Index';
import PrivateRoute from '../shared/boiler/PrivateRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Index />}></Route>
      <Route path='/about' element={<About />} />
      <PrivateRoute path='' element={<Index />}  />
    </Routes>
  )
}

export default AppRouter