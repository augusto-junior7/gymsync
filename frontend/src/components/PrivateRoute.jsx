import { Navigate, Outlet } from 'react-router-dom'
import { isTokenValid } from '@/lib/auth'

export default function ProtectedRoute() {
  const token = localStorage.getItem('gymsync_token')
  const isAuthenticated = token && isTokenValid(token)
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
