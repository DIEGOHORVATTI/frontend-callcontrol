import { Stack, Typography, Button, Divider } from '@mui/material'
import dayjs from 'dayjs'

import type { ICall } from '@/types/ICall'

type Props = {
  call: ICall
  onEndCall: (callId: string) => void
}

export const CallDetails = ({ call, onEndCall }: Props) => (
  <Stack spacing={3}>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h6">{call.caller}</Typography>

      <Button variant="contained" color="error" onClick={() => onEndCall(call.callId)}>
        Finalizar
      </Button>
    </Stack>

    <Divider />

    <Stack spacing={2}>
      <Typography variant="body2">
        <strong>Call ID:</strong> {call.callId}
      </Typography>

      <Typography variant="body2">
        <strong>Mídia:</strong> {call.media}
      </Typography>

      <Typography variant="body2">
        <strong>Data Inicial</strong> {dayjs(call.startDate).format('DD/MM/YYYY HH:mm')}
      </Typography>

      <Typography variant="body2">
        <strong>Service:</strong> {call.service}
      </Typography>
    </Stack>
  </Stack>
)
