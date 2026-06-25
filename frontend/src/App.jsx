import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicRoutes from './components/routes/PublicRoute'
import PrivateRoutes from './components/routes/PrivateRoute'

/* Importação das Páginas */
import Home from './pages/Home'
import Login from './pages/Login'
import EsqueciSenha from './pages/EsqueciSenha'
import Registrar from './pages/Registrar'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import PrivateRoutesLayout from './components/layouts/PrivateRoutesLayout'
import Explorar from './pages/Explorar'
import Treinos from './pages/Treinos'
import Exercicios from './pages/Exercicios'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública - Acessível a todos, independentemente do estado de autenticação. */}
        <Route path="/" element={<Home />} />

        {/* Rotas Públicas - Apenas usuários não autenticados podem acessar. Se um usuário estiver autenticado, será redirecionado para o dashboard. */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/recuperação-senha" element={<EsqueciSenha />} />
        </Route>

        {/* Rotas Privadas - Apenas usuários autenticados podem acessar. */}
        <Route element={<PrivateRoutes />}>
          <Route element={<PrivateRoutesLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/treinos" element={<Treinos />} />
            <Route path="/exercicios" element={<Exercicios />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
