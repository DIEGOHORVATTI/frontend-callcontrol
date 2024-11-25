import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

import { Call } from '@/hooks/use-socket'

import dayjs from 'dayjs'
import { Socket } from 'socket.io-client'
import { enqueueSnackbar } from 'notistack'
import { CallDetails } from './call-details'

type Props = {
  socket: Socket | null
  onDisconnect: () => void
}

export const ChatInterface = ({ socket, onDisconnect }: Props) => {
  const [calls, setCalls] = useState<Call[]>([])
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
        <Stack sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6">{'Diego'}</Typography>

          <Button fullWidth variant="outlined" color="error" onClick={onDisconnect}>
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
              <ListItemText
                primary={call.caller}
                secondary={`Service: ${call.service}`}
                primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
                secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
              />
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
}
