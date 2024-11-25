import { Box, IconButton, Stack, ButtonBase } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { Iconify } from '@/components'
import { useSettingsContext } from '@/contexts/settings'

import { primaryPresets } from '@/theme/options/presets'
import { SettingsContextProps } from '../contexts/settings/types'

export const SettingMode = () => {
  const { onToggleMode, themeMode, onPresetsChange } = useSettingsContext()

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
      <IconButton
        onClick={onToggleMode}
        color="inherit"
        size="large"
        sx={{ bgcolor: (theme) => theme.palette.background.paper, width: 40, height: 40 }}
      >
        <Iconify icon={themeMode === 'light' ? 'ph:moon-duotone' : 'ph:sun-duotone'} />
      </IconButton>

      <PresetsOptions value={themeMode} onPresetsChange={onPresetsChange} />
    </Stack>
  )
}

type PresetsOptionsProps = Pick<SettingsContextProps, 'onPresetsChange'> & {
  value: string
}

const PresetsOptions = ({ value, onPresetsChange }: PresetsOptionsProps) => {
  const options = primaryPresets.map((color) => ({
    name: color.name,
    value: color.main,
  }))

  return (
    <Stack direction="row" spacing={1}>
      {options.map((option) => {
        const selected = value === option.name

        return (
          <ButtonBase
            key={option.name}
            onClick={() => onPresetsChange(option.name)}
            sx={{
              height: 30,
              width: 30,
              borderRadius: 1,
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
              ...(selected && {
                borderColor: 'transparent',
                bgcolor: alpha(option.value, 0.08),
              }),
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: option.value,
                transition: (theme) =>
                  theme.transitions.create(['transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                ...(selected && {
                  transform: 'scale(2)',
                }),
              }}
            />
          </ButtonBase>
        )
      })}
    </Stack>
  )
}
