import React, { useEffect, useRef } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify';
import { showToast } from './utils/toastUtils';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  const hasWelcomed = useRef(false);
  const listenerAttached =  useRef(false);

  useEffect(() => {
    if (listenerAttached.current) return;
    listenerAttached.current = true;
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        if (!hasWelcomed.current) {
          showToast("info", "Welcome back!");
          hasWelcomed.current = true;
        }
        navigate('/');
      } else {
        console.log("Logged Out");
        navigate('/login');
        hasWelcomed.current = false;
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player/:id' element={<Player/>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      
    </div>
  )
}

export default App

