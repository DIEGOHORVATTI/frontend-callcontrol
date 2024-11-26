import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar/snackbar-provider'
import { SettingsProvider } from '@/contexts/settings'
import { AuthProvider } from '@/contexts/auth-provider'

import { Home } from '@/sections/Home'
import { Login } from '@/sections/Login'

import { ThemeProvider } from '@/theme'

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
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </SettingsProvider>
)
