import React from 'react'
import "./index.css"
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/Signin'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
  </Routes>
</BrowserRouter>
    </div>
  )
}
