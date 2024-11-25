import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider } from './theme'

import SnackbarProvider from './contexts/snackbar/snackbar-provider'

import { Home } from '@/sections/Home'

import { SettingsProvider } from './contexts/settings'

export const App = () => (
  <SettingsProvider
    defaultSettings={{
      themeMode: 'dark',
      themeContrast: 'default',
      themeLayout: 'vertical',
      themeColorPresets: 'pink',
      themeStretch: false,
    }}
  >
    <ThemeProvider>
      <SnackbarProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </SettingsProvider>
)
