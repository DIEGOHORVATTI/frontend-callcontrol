import { useMemo } from 'react'
import merge from 'lodash/merge'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles'

import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'
import { customShadows } from './custom-shadows'
import { componentsOverrides } from './overrides'

import { presets } from './options/presets'
import { darkMode } from './options/dark-mode'
import { contrast } from './options/contrast'
import RTL, { direction } from './options/right-to-left'
import NextAppDirEmotionCacheProvider from './next-emotion-cache'

import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type SettingsValueProps = {
  themeStretch: boolean
  themeMode: 'light' | 'dark'
  themeDirection: 'rtl' | 'ltr'
  themeContrast: 'default' | 'bold'
  themeLayout: 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
}

type Props = {
  children: React.ReactNode
  settings: SettingsValueProps
}

export default function ThemeProvider({ children, settings }: Props) {
  const darkModeOption = darkMode(settings.themeMode)

  const presetsOption = presets(settings.themeColorPresets)

  const contrastOption = contrast(settings.themeContrast === 'bold', settings.themeMode)

  const directionOption = direction(settings.themeDirection)

  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  )

  const memoizedValue = useMemo(
    () => merge(baseOption, directionOption, darkModeOption, presetsOption, contrastOption.theme),
    [baseOption, directionOption, darkModeOption, presetsOption, contrastOption.theme]
  )

  const theme = createTheme(memoizedValue as ThemeOptions)

  theme.components = merge(componentsOverrides(theme), contrastOption.components)

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiLocalizationProvider dateAdapter={AdapterDateFns}>
          <MuiThemeProvider theme={theme}>
            <RTL themeDirection={settings.themeDirection}>
              <CssBaseline />

              {children}
            </RTL>
          </MuiThemeProvider>
        </MuiLocalizationProvider>
      </LocalizationProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
