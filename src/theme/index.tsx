import { useMemo } from 'react'

import { useSettings } from '@/hooks/use-settings'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'
import { customShadows } from './custom-shadows'
import { componentsOverrides } from './overrides'

import { presets } from './options/presets'
import { darkMode } from './options/dark-mode'
import { contrast } from './options/contrast'

import merge from 'lodash/merge'
import NextAppDirEmotionCacheProvider from './next-emotion-cache'

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const settings = useSettings()

  const darkModeOption = darkMode(settings.themeMode)

  const presetsOption = presets(settings.themeColorPresets)

  const contrastOption = contrast(settings.themeContrast === 'bold', settings.themeMode)

  const baseOption = useMemo(
    () => ({
      palette,
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  )

  const memoizedValue = useMemo(
    () => merge(baseOption, darkModeOption, presetsOption, contrastOption.theme),
    [baseOption, darkModeOption, presetsOption, contrastOption.theme]
  )

  const theme = createTheme(memoizedValue as ThemeOptions)

  theme.components = merge(componentsOverrides(theme), contrastOption.components)

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <LocalizationProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          {children}
        </MuiThemeProvider>
      </LocalizationProvider>
    </NextAppDirEmotionCacheProvider>
  )
}

const LocalizationProvider = ({ children }: React.PropsWithChildren) => (
  <MuiLocalizationProvider dateAdapter={AdapterDayjs}>{children}</MuiLocalizationProvider>
)
