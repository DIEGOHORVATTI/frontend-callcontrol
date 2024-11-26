import { useState, useRef } from 'react'
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

import type { Call } from '@/types/Call'

export const ChatInterface = () => {
  const { user, logout } = useAuth()
  const { calls, disconnect, endCall } = useSocket()

  const [selectedCall, setSelectedCall] = useState<Call | null>(null)

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: calls.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  })

  const noCallsMessage = (
    <Stack sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Iconify icon="line-md:phone-call-loop" size={10} sx={{ color: 'text.secondary' }} />

      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Selecione uma chamada para ver detalhes
      </Typography>
    </Stack>
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

        <Box
          ref={parentRef}
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            height: '100%',
            position: 'relative',
          }}
        >
          <List
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const call = calls[virtualRow.index]
              if (!call) return null

              const callDetail = (
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
              )

              return (
                <ListItemButton
                  key={call.callId}
                  selected={selectedCall?.callId === call.callId}
                  onClick={() => setSelectedCall(call)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {callDetail}
                </ListItemButton>
              )
            })}
          </List>
        </Box>
      </Stack>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedCall ? <CallDetails call={selectedCall} onEndCall={onEndCall} /> : noCallsMessage}
      </Box>
    </Card>
  )

  function onEndCall() {
    if (selectedCall?.callId) endCall(selectedCall.callId)

    setSelectedCall(null)
  }

  function handleDisconnectSocket() {
    disconnect()
    logout()
  }
}
