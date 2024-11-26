import { useSettings } from '@/hooks/use-settings'

import { IconButton, Stack, ButtonBase } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { Iconify } from '@/components'

import { primaryPresets } from '@/theme/options/presets'

export const SettingMode = () => {
  const { onToggleMode, themeMode } = useSettings()

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

      <PresetsOptions />
    </Stack>
  )
}

const PresetsOptions = () => {
  const { themeColorPresets, onPresetsChange } = useSettings()

  const options = primaryPresets.map(({ name, main }) => ({ name, main }))

  return (
    <Stack direction="row" spacing={1} sx={{ overflow: 'auto' }}>
      {options.map(({ name, main }) => {
        const selected = themeColorPresets === name

        return (
          <ButtonBase
            key={name}
            onClick={() => onPresetsChange(name)}
            sx={{
              height: 30,
              width: 30,
              borderRadius: 1,
              bgcolor: alpha(main, 0.9),
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
              padding: 1,
              transition: (theme) =>
                theme.transitions.create(['transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(selected && {
                border: (theme) => `solid 1px ${theme.palette.primary.light}`,
              }),
            }}
          />
        )
      })}
    </Stack>
  )
}
