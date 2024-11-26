import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth-provider'

export const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    navigate('/auth')
  }

  if (isAuthenticated) {
    navigate('/')
  }

  return <>{children}</>
}
