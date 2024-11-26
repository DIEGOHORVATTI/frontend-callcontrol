import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

export const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')

      return
    }

    navigate('/')
  }, [isAuthenticated, navigate])

  return children
}
