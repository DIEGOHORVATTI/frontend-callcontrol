import { useForm } from 'react-hook-form'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { FormProvider, RHFTextField } from '@/components/hook-form'

import { RHFNumberField } from '@/components/hook-form/rhf-number-field'
import { SettingMode } from '@/components/SettingMode'

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
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      <Card component={Stack} spacing={2} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Login
        </Typography>

        <Card
          component={Stack}
          spacing={2}
          sx={{ p: 1, width: '100%', bgcolor: 'background.neutral' }}
        >
          <SettingMode />
        </Card>

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
