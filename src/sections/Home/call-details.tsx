import { Stack, Typography, Button, Divider } from '@mui/material'
import dayjs from 'dayjs'
import { Call } from '@/hooks/use-socket'

type Props = {
  call: Call
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
        <strong>Service:</strong> {call.service}
      </Typography>

      <Typography variant="body2">
        <strong>Duration:</strong> {dayjs(call.startDate).format('HH:mm A')}
      </Typography>
    </Stack>
  </Stack>
)
