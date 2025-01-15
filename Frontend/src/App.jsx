import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Signup from './components/Signup'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Addwork from './components/Addwork';

function App() {
  

  return (
    <>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/work' element={<Addwork/>}/>

    </Routes>
    <Toaster />
    </>
  )
} 
export default App
