import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registrar() {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const token = localStorage.getItem('gymsync_token')
      import('@/lib/auth').then(({ isTokenValid }) => {
        if (isTokenValid(token)) navigate('/perfil')
      })
    } catch {
      // ignore
    }
  }, [navigate])

  return (
    <div>
      <h1>Página de Registro</h1>
    </div>
  )
}
