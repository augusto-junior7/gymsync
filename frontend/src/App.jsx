import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import Perfil from './pages/Perfil'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao GymSync</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  )
}

export default App
