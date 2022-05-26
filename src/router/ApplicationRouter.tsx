import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from '../page/Index';
function ApplicationRouter() {
  return (
    <Routes>
      <Route path='/' element={<Index />}></Route>
      <Route path='/public/index' element={<Index />}></Route>
    </Routes>
  )
}

export default ApplicationRouter