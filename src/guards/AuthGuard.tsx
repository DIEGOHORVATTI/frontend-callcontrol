import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth-provider'

export const AuthGuard = ({ children }: React.PropsWithChildren) => {
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

    navigate('/auth')

    return
  }

  return <>{children}</>
}
