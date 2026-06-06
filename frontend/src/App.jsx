import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import Perfil from './pages/Perfil'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

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
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
