import { useState, ReactNode, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

export default function AuthGuard({ children }: Props) {
  const pathname = window.location.pathname
  const navigate = useNavigate()

  const { isAuthenticated, isInitialized } = useAuth()

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      navigate(requestedLocation)
    }
  }, [pathname, navigate, requestedLocation])

  if (!isInitialized) {
    return navigate('/login')
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }

    return navigate('/login')
  }

  return <>{children}</>
}
