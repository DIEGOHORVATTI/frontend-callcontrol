import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import dayjs from 'dayjs'
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
import { Call } from '../../hooks/use-socket'
import { enqueueSnackbar } from 'notistack'

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
      enqueueSnackbar('New call received', { variant: 'info' })
    })

    socket.on('CALL_ENDED', ({ callId }) => {
      setCalls((prev) => prev.filter((call) => call.callId !== callId))
      setSelectedCall((prev) => (prev?.callId === callId ? null : prev))
      enqueueSnackbar('Call ended', { variant: 'info' })
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

  return (
    <Card sx={{ height: '80vh', display: 'flex' }}>
      <Stack sx={{ width: 300, borderRight: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Button fullWidth variant="outlined" color="error" onClick={onDisconnect}>
            Disconnect
          </Button>
        </Box>

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
        {selectedCall ? (
          <Stack spacing={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Typography variant="h6">{selectedCall.caller}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleEndCall(selectedCall.callId)}
              >
                End Call
              </Button>
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Typography variant="body2">
                <strong>Call ID:</strong> {selectedCall.callId}
              </Typography>
              <Typography variant="body2">
                <strong>Service:</strong> {selectedCall.service}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {dayjs(selectedCall.startDate).format('HH:mm A')}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Select a call to view details
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  )
}
