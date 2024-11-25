import { useForm } from 'react-hook-form'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { FormProvider, RHFTextField } from '@/components/hook-form'
import { RHFNumberField } from '../../components/hook-form/rhf-number-field'

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

  const onSubmit = ({ username, maxCalls }: FormValues) => onConnect(username, maxCalls)

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
          Login
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField required name="username" label="Usuário" />

            <RHFNumberField
              required
              name="maxCalls"
              label="Máximo de chamadas"
              rules={{
                min: { value: 1, message: 'Mínimo de 1 chamada' },
              }}
            />

            <Button size="large" type="submit" variant="contained">
              Conectar
            </Button>
          </Stack>
        </FormProvider>
      </Card>
    </Box>
  )
}
