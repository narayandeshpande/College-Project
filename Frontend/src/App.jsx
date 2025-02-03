import { Toaster } from 'react-hot-toast';
import './App.css'
import SignupUser from './components/SignupUser'
import { Routes, Route } from 'react-router-dom'
import LoginUser from './components/LoginUser'
import Home from './components/Home'
import Addwork from './components/Addwork';
import About from './components/About';
import Profile from './components/Profile';
import HRY from './components/HRY';
import SignupBramhin from './components/SignupBramhin';
import LoginBramhin from './components/LoginBramhin';
import { useLocation } from 'react-router-dom';
function App() {
  
  // const { protocol, hostname, pathname } = window.location;
  // console.log(protocol); // e.g., "http:"
  // console.log(hostname); // e.g., "example.com"
  // console.log(pathname); // e.g., "/page"
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');
  console.log(role);


  return (
    <>
    <Routes>
    <Route path='/login' element={role==='user'?<LoginUser/>:<LoginBramhin/>}/>
    <Route path='/' element={<HRY/>}/>
    <Route path='/signup' element={role==='user'?<SignupUser/>:<SignupBramhin/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/work' element={<Addwork/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/profile' element={<Profile/>}/>
    </Routes>
    <Toaster />
    </>
  )
} 
export default App
