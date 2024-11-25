import { useCallback, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { enqueueSnackbar } from 'notistack'
import { endpoints, HOST_API } from '../constants/config'

export type Call = {
  callId: string
  media: string
  startDate: Date
  service: string
  caller: string
}

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)

  const connect = useCallback((username: string, maxCalls: number) => {
    if (!socketRef.current) {
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
    }

    socketRef.current.emit('USER_CONNECT', { username, maxCalls })
  }, [])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('USER_DISCONNECT')
      socketRef.current.disconnect()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  return {
    socket: socketRef.current,
    connect,
    disconnect,
  }
}
