import { useEffect, useState, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

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

import { Iconify } from '@/components'
import { CallDetails } from './call-details'

import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'

import type { Call } from '@/types/Call'

export const ChatInterface = () => {
  const { user, logout } = useAuth()
  const { socket, disconnect } = useSocket()

  const [calls, setCalls] = useState<Array<Call>>([])
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: calls.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  })

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

    socket.emit('GET_CALLS')
    socket.on('CALLS_LIST', (callsList: Call[]) => {
      setCalls(callsList)
    })

    return () => {
      socket.off('NEW_CALL')
      socket.off('CALL_ENDED')
      socket.off('END_CALL_ERROR')
      socket.off('CALLS_LIST')
    }
  }, [socket])

  const handleEndCall = (callId: string) => {
    if (socket) socket.emit('END_CALL', { callId })
  }

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

        <List
          component="div"
          ref={parentRef}
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            height: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const call = calls[virtualRow.index]

              return (
                <ListItemButton
                  key={call.callId}
                  selected={selectedCall?.callId === call.callId}
                  onClick={() => setSelectedCall(call)}
                  style={{
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
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
              )
            })}
          </div>
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

const noCallSelected = (
  <Stack sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Iconify icon="line-md:phone-call-loop" size={10} sx={{ color: 'text.secondary' }} />

    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
      Selecione uma chamada para ver detalhes
    </Typography>
  </Stack>
)
