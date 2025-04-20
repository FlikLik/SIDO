import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify'
import Login from './Components/Login.jsx'
import Homepage from './Components/Homepage.jsx'
import Survey from './Components/Survey.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
      <ToastContainer transition={Flip} />
    </BrowserRouter>
  )
}

export default App
