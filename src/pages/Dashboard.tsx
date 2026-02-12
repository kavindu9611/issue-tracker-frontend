import { Button } from '@/components/ui/button'
import useAuthStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1>Welcome, {user?.fullName}</h1>
      <p>This is the protected dashboard where issues would be shown (user-specific via user.id: {user?.id}).</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Dashboard