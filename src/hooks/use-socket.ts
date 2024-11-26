import { useCallback, useEffect, useRef } from 'react'

import { io, Socket } from 'socket.io-client'

import { useAuth } from '@/contexts/auth-provider'

import { enqueueSnackbar } from 'notistack'
import { endpoints, HOST_API } from '@/constants/config'

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)
  const { user } = useAuth()

  console.log(user)

  const connect = useCallback(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(HOST_API, {
        reconnectionDelayMax: 10000,
        path: endpoints.callcontrol,
      })

      socketRef.current.on('USER_CONNECTED', (data) => {
        enqueueSnackbar(`Conectado como ${data.username}`, { variant: 'success' })
      })

      socketRef.current.on('USER_CONNECTION_ERROR', (data) => {
        enqueueSnackbar(data.error, { variant: 'error' })
      })

      socketRef.current.on('USER_DISCONNECTED', () => {
        enqueueSnackbar('Desconectado com sucesso', { variant: 'info' })
      })

      socketRef.current.on('USER_DISCONNECTION_ERROR', (data) => {
        enqueueSnackbar(data.error, { variant: 'error' })
      })

      socketRef.current.emit('USER_CONNECT', { username: user.username, maxCalls: user.maxCalls })
    }
  }, [user])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('USER_DISCONNECT')
      socketRef.current.disconnect()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    if (user) {
      connect()
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [user, connect])

  return { socket: socketRef.current, connect, disconnect }
}
