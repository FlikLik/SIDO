import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify'
import Login from './Components/Login.jsx'
import Homepage from './Components/Homepage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
      <ToastContainer transition={Flip} />
    </BrowserRouter>
  )
}

export default App
