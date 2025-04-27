import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify'
import ProtectedRoute from './Backend/AuthControl/ProtectedRoute.jsx'
import Login from './Components/Login.jsx'
import Homepage from './Components/Homepage.jsx'
import Survey from './Components/Survey.jsx'

function App() {

  const isAuth = localStorage.getItem('isAuth') === 'true'

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/home" element={<ProtectedRoute> <Homepage /> </ProtectedRoute>} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
      <ToastContainer transition={Flip} />
    </BrowserRouter>
  )
}

export default App
