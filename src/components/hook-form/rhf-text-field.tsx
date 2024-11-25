import { useFormContext, Controller } from 'react-hook-form'

import { TextField, TextFieldProps } from '@mui/material'

type Props = TextFieldProps &
  Pick<React.ComponentProps<typeof Controller>, 'rules'> & {
    name: string
    label?: string
  }

export const RHFTextField = ({ name, required, ...other }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && 'Campo obrigatório', ...other.rules }}
      render={({ field, fieldState: { error: { message } = { message: '' } } }) => {
        const error = errors[name]
        const isError = Boolean(error)

        const helperText = error?.message?.toString() || message

        return (
          <TextField
            {...field}
            fullWidth
            {...other}
            error={isError}
            helperText={helperText}
            onChange={(event) => {
              const value = event.target.value || ''
              field.onChange(value)
            }}
          />
        )
      }}
    />
  )
}
