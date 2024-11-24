import { useForm } from 'react-hook-form'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { FormProvider, RHFTextField } from '@/components/hook-form'

type FormValues = {
  username: string
  maxCalls: number
}

type Props = {
  onConnect: (username: string, maxCalls: number) => void
}

export const LoginForm = ({ onConnect }: Props) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      username: '',
      maxCalls: 1,
    },
  })

  const { handleSubmit } = methods

  const onSubmit = (data: FormValues) => {
    onConnect(data.username, data.maxCalls)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Call Control Login
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField name="username" label="Username" />

            <RHFTextField
              name="maxCalls"
              label="Max Simultaneous Calls"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />

            <Button size="large" type="submit" variant="contained">
              Connect
            </Button>
          </Stack>
        </FormProvider>
      </Card>
    </Box>
  )
}
