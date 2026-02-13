import { createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'


const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  }
])

export default router