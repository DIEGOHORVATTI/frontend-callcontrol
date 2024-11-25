import React from 'react'
import { Button, ButtonGroup, Stack } from '@mui/material'

import { useFormContext } from 'react-hook-form'
import { RHFTextField } from './rhf-text-field'

import { Iconify } from '../iconify'

export const RHFNumberField = (props: React.ComponentProps<typeof RHFTextField>) => {
  const { setValue, watch } = useFormContext()

  const [value] = watch([props.name])

  const handleIncrement = () => setValue(props.name, +value + 1)
  const handleDecrement = () => setValue(props.name, Math.max(0, +value - 1))

  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="center">
      <RHFTextField
        fullWidth
        {...props}
        type="number"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      />

      <ButtonGroup color="inherit" sx={{ height: 52 }}>
        <Button sx={{ borderRadius: 0 }} onClick={handleDecrement}>
          <Iconify icon="mdi:minus" />
        </Button>

        <Button
          sx={{ borderRadius: 0, borderStartEndRadius: 10, borderEndEndRadius: 10 }}
          onClick={handleIncrement}
        >
          <Iconify icon="mdi:plus" />
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
