import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SnackbarProvider from '@/contexts/snackbar/snackbar-provider'
import { SettingsProvider } from '@/contexts/settings'
import { AuthProvider } from '@/contexts/auth-provider'

import { Home } from '@/sections/Home'
import { Auth } from '@/sections/Auth'

import { ThemeProvider } from '@/theme'
import { AuthGuard } from './guards/AuthGuard'

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
            <AuthGuard>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />

                <Route path="*" element={<Home />} />
              </Routes>
            </AuthGuard>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </SettingsProvider>
)
