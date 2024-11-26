import { useForm } from 'react-hook-form'

import { useAuth } from '@/hooks/use-auth'

import { Box, Button, Card, Stack, Typography } from '@mui/material'

import { FormProvider, RHFTextField, RHFNumberField, SettingMode } from '@/components'

import { generateJwt } from '@/shared/generate-jwt'

type FormValues = {
  username: string
  maxCalls: number
}

export const AuthForm = () => {
  const { login } = useAuth()

  const methods = useForm<FormValues>({ defaultValues: { username: '', maxCalls: 10 } })

  const { handleSubmit } = methods

  const handle = ({ username, maxCalls }: FormValues) => {
    const token = generateJwt({ username, maxCalls })

    login(token)
  }

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

        <FormProvider methods={methods} onSubmit={handleSubmit(handle)}>
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
