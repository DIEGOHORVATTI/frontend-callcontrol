import { alpha } from '@mui/material/styles'

import { COMMON } from '@/theme/palette'

export function presets(presetsColor: string) {
  const primary = primaryPresets.find((i) => i.name === presetsColor)

  const theme = {
    palette: { primary },
    customShadows: { primary: `0 8px 16px 0 ${alpha(`${primary?.main}`, 0.24)}` },
  }

  return theme
}

export const primaryPresets: Array<{
  name: keyof typeof COMMON
  lighter?: string
  light?: string
  main: string
  dark?: string
  darker?: string
  contrastText?: string
}> = [
  {
    name: 'cyan',
    ...COMMON['cyan'],
  },
  {
    name: 'pink',
    ...COMMON['pink'],
  },
  {
    name: 'success',
    ...COMMON['success'],
  },
  {
    name: 'greenLemon',
    ...COMMON['greenLemon'],
  },
  {
    name: 'purple',
    ...COMMON['purple'],
  },
  {
    name: 'error',
    ...COMMON['error'],
  },
  {
    name: 'warning',
    ...COMMON['warning'],
  },
]
