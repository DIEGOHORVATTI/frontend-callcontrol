import { useState } from 'react'
import useSWR from 'swr'
import { Call } from '@/hooks/use-socket'
import { useSocket } from '@/hooks/use-socket'
import { enqueueSnackbar } from 'notistack'

export const useCallsData = () => {
  const { socket } = useSocket()
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  const { data: calls = [], mutate } = useSWR<Call[]>('calls', null, {
    fallbackData: [],
    refreshInterval: 0,
  })

  if (socket) {
    socket.off('NEW_CALL').on('NEW_CALL', (call: Call) => {
      mutate([...calls, call])
      socket.emit('NEW_CALL_ANSWERED', { callId: call.callId })
      enqueueSnackbar('Nova chamada recebida', { variant: 'info' })
    })

    socket.off('CALL_ENDED').on('CALL_ENDED', ({ callId }) => {
      mutate(calls.filter((call) => call.callId !== callId))
      setSelectedCall((prev) => (prev?.callId === callId ? null : prev))
      enqueueSnackbar('Chamada encerrada', { variant: 'info' })
    })

    socket.off('END_CALL_ERROR').on('END_CALL_ERROR', ({ error }) => {
      enqueueSnackbar(error, { variant: 'error' })
    })
  }

  const handleEndCall = (callId: string) => {
    if (socket) {
      socket.emit('END_CALL', { callId })
    }
  }

  return {
    calls,
    selectedCall,
    setSelectedCall,
    handleEndCall,
  }
}
