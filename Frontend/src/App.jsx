import { Toaster } from 'react-hot-toast';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignupUser from './components/SignupUser'
import LoginUser from './components/LoginUser'
import Home from './components/Home'
import Addwork from './components/Addwork';
import Profile from './components/Profile';
import WRY from './components/WRY';
import SignupBramhin from './components/SignupBramhin';
import LoginBramhin from './components/LoginBramhin';
import EditProfileBramhin from './components/EditProfileBramhin';
import { useLocation } from 'react-router-dom';
import EditProfileUser from './components/EditProfileUser';
import AboutUser from './components/AboutUser';
import AboutBramhin from './components/AboutBramhin';
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
    <Route path='/' element={<WRY/>}/>
    <Route path='/signup' element={role==='user'?<SignupUser/>:<SignupBramhin/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/work' element={<Addwork/>}/>
    <Route path='/about' element={role==='user'? <AboutUser/>:<AboutBramhin/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='edit-profile' element={role==='user'?<EditProfileUser/>:<EditProfileBramhin/>}/>
    </Routes>
    <Toaster />
    </>
  )
} 
export default App
