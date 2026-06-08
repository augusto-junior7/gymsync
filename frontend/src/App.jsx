import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicRoute from './components/routes/PublicRoute'
import PrivateRoute from './components/routes/PrivateRoute'

/* Importação das Páginas */
import Home from './pages/Home'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
