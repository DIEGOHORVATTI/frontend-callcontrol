import { useCallback, useEffect, useRef, useState } from 'react'

import { io, Socket } from 'socket.io-client'
import { enqueueSnackbar } from 'notistack'

import { useAuth } from '@/hooks/use-auth'
import { endpoints, HOST_API } from '@/constants/config'

import type { ICall } from '@/types/ICall'

export const useSocket = () => {
  const { user } = useAuth()

  const socketRef = useRef<Socket | null>(null)

  const [calls, setCalls] = useState<Array<ICall>>([])

  const connect = useCallback(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(HOST_API, {
        reconnectionDelayMax: 10_000,
        path: endpoints.callcontrol,
        forceNew: true,
      })

      socketRef.current.on('connect', () => {
        enqueueSnackbar(`Conectado como ${user.username}`, { variant: 'success' })

        socketRef.current?.emit('GET_CALLS')
      })

      socketRef.current.on('disconnect', () => {
        enqueueSnackbar('Socket desconectado', { variant: 'warning' })
      })

      socketRef.current.on('USER_CONNECTED', () => {})

      socketRef.current.on('USER_CONNECTION_ERROR', (data) => {
        console.error('USER_CONNECTION_ERROR:', data.error)
        enqueueSnackbar(data.error, { variant: 'error' })
      })

      socketRef.current.on('NEW_CALL', (call: ICall) => {
        socketRef.current?.emit('NEW_CALL_ANSWERED', { callId: call.callId })
        setCalls((prev) => {
          const updatedCalls = [...prev, call]

          return updatedCalls
        })
        enqueueSnackbar('Nova chamada recebida', { variant: 'info' })
      })

      socketRef.current.on('CALL_ENDED', ({ callId }) => {
        setCalls((prev) => {
          const updatedCalls = prev.filter((call) => call.callId !== callId)

          return updatedCalls
        })
        enqueueSnackbar('Chamada encerrada', { variant: 'info' })
      })

      socketRef.current.on('END_CALL_ERROR', ({ error }) => {
        console.error('END_CALL_ERROR:', error)
        enqueueSnackbar(error, { variant: 'error' })
      })

      socketRef.current.on('CALLS_LIST', (callsList: ICall[]) => {
        setCalls(callsList)
      })

      socketRef.current.emit('USER_CONNECT', { username: user.username, maxCalls: user.maxCalls })
      socketRef.current.emit('GET_CALLS')
    }
  }, [user])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('USER_DISCONNECT')
      socketRef.current.disconnect()
      socketRef.current = null

      setCalls([])
    }
  }, [])

  const endCall = useCallback((callId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('END_CALL', { callId })
      socketRef.current.emit('GET_CALLS')
    }
  }, [])

  useEffect(() => {
    if (user) connect()

    return () => {
      if (socketRef.current) {
        disconnect()
      }
    }
  }, [user, connect])

  return { calls, disconnect, endCall }
}
