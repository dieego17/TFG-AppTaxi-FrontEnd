/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout'
import QuienesSomos from './components/QuienesSomos'
import Login from './components/Login/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/quienes-somos' element={<QuienesSomos />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  </BrowserRouter>
)
