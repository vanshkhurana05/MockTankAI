import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import SignIn from './components/Signin/Signin'
import SignUp from './components/Signup/Signup'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Simulation from './components/Simulation/Simulation'
import Navbar from './components/Navbar/Navbar'
import CameraPreview from './components/CameraPreview/CameraPreview'
import FeedbackForm from './components/FeedbackForm/FeedbackForm'
import { useContext } from 'react'
import startChatContext from './context/startChatContext'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    async function startChat() {
      try {
        const response = await fetch('https://mocktankbackend-i0js.onrender.com/start_chat') ;      
        const data = await response.json()
        console.log("Chat started:", data);
      }catch (error) {
        console.error("Error starting chat:", error);
      }
    }
    startChat();
  }, []);
  return (
    <startChatContext.Provider value={{startChat:true}}>
    <Router>
    <Routes>
      <Route path='/navbar' element={<Navbar/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/simulation' element={<Simulation/>}/>
      <Route path='/feedback' element={<FeedbackForm/>}/>
    </Routes>
    </Router>
    </startChatContext.Provider>
  )
}

export default App
