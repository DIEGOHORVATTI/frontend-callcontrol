import { useCallback, useEffect, useRef, useState } from 'react'

import { io, Socket } from 'socket.io-client'
import { enqueueSnackbar } from 'notistack'

import { useAuth } from '@/contexts/auth-provider'
import { endpoints, HOST_API } from '@/constants/config'

import type { Call } from '@/types/Call'

export const useSocket = () => {
  const { user } = useAuth()

  const socketRef = useRef<Socket | null>(null)

  const [calls, setCalls] = useState<Array<Call>>([])

  const connect = useCallback(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(HOST_API, {
        reconnectionDelayMax: 10_000,
        path: endpoints.callcontrol,
      })

      socketRef.current.on('USER_CONNECTED', () => {
        enqueueSnackbar(`Conectado como ${user.username}`, { variant: 'success' })
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

      socketRef.current.on('NEW_CALL', (call: Call) => {
        socketRef.current?.emit('NEW_CALL_ANSWERED', { callId: call.callId })
        setCalls((prev) => [...prev, call])

        enqueueSnackbar('Nova chamada recebida', { variant: 'info' })
      })

      socketRef.current.on('CALL_ENDED', ({ callId }) => {
        setCalls((prev) => prev.filter((call) => call.callId !== callId))

        enqueueSnackbar('Chamada encerrada', { variant: 'info' })
      })

      socketRef.current.on('END_CALL_ERROR', ({ error }) => {
        enqueueSnackbar(error, { variant: 'error' })
      })

      socketRef.current.on('CALLS_LIST', (callsList: Call[]) => {
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
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [user, connect])

  return { calls, disconnect, endCall }
}
