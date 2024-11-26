import { useState, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth-provider'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const pathname = window.location.pathname
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      navigate(requestedLocation)
    }
  }, [pathname, navigate, requestedLocation])

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }

    return navigate('/auth')
  }

  return <>{children}</>
}
