// import { ReactNode } from 'react'
import useAuthStore from '@/stores/authStore'
import { Navigate } from 'react-router-dom'
// import useAuthStore from '../stores/authStore'

const ProtectedRoute = ({ children }: { children: any }) => {
  const { token } = useAuthStore()
  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute