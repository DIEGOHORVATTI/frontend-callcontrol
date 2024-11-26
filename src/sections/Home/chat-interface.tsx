import { useEffect, useState } from 'react'

import { useSocket } from '@/hooks/use-socket'
import { useAuth } from '@/contexts/auth-provider'

import {
  Box,
  Button,
  Card,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

import { CallDetails } from './call-details'

import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'

import type { Call } from '@/types/Call'

export const ChatInterface = () => {
  const { logout, user } = useAuth()
  const { socket, disconnect } = useSocket()

  const [calls, setCalls] = useState<Array<Call>>([])
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  useEffect(() => {
    if (!socket) return

    socket.on('NEW_CALL', (call: Call) => {
      setCalls((prev) => [...prev, call])
      socket.emit('NEW_CALL_ANSWERED', { callId: call.callId })
      enqueueSnackbar('Nova chamada recebida', { variant: 'info' })
    })

    socket.on('CALL_ENDED', ({ callId }) => {
      setCalls((prev) => prev.filter((call) => call.callId !== callId))
      setSelectedCall((prev) => (prev?.callId === callId ? null : prev))
      enqueueSnackbar('Chamada encerrada', { variant: 'info' })
    })

    socket.on('END_CALL_ERROR', ({ error }) => {
      enqueueSnackbar(error, { variant: 'error' })
    })

    return () => {
      socket.off('NEW_CALL')
      socket.off('CALL_ENDED')
      socket.off('END_CALL_ERROR')
    }
  }, [socket])

  const handleEndCall = (callId: string) => {
    if (socket) {
      socket.emit('END_CALL', { callId })
    }
  }

  const noCallSelected = (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Selecione uma chamada para ver detalhes
      </Typography>
    </Box>
  )

  return (
    <Card sx={{ height: '90vh', display: 'flex' }}>
      <Stack sx={{ width: 300, borderRight: '1px solid', borderColor: 'divider' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Typography variant="h6">{user?.username}</Typography>

          <Button variant="outlined" color="error" onClick={handleDisconnectSocket}>
            Desconectar
          </Button>
        </Stack>

        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {calls.map((call) => (
            <ListItemButton
              key={call.callId}
              selected={selectedCall?.callId === call.callId}
              onClick={() => setSelectedCall(call)}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                width={1}
              >
                <ListItemText
                  primary={call.caller}
                  secondary={`Service: ${call.service}`}
                  primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
                  secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                />

                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {dayjs().diff(dayjs(call.startDate), 'minute')} min
                </Typography>
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Stack>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedCall && <CallDetails call={selectedCall} onEndCall={handleEndCall} />}

        {!selectedCall && noCallSelected}
      </Box>
    </Card>
  )

  function handleDisconnectSocket() {
    disconnect()
    logout()
  }
}
