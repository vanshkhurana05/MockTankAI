import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import SignIn from './components/Signin/Signin'
import SignUp from './components/Signup/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
