import 'react-lazy-load-image-component/src/effects/blur.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider } from './theme'

import ProgressBar from './components/progress-bar'
import { MotionLazy } from './components/animate/motion-lazy'
import SnackbarProvider from './contexts/snackbar/snackbar-provider'

import { Home } from '@/sections/Home'

import { SettingsProvider } from './contexts/settings'

export const App = () => (
  <SettingsProvider
    defaultSettings={{
      themeMode: 'dark',
      themeContrast: 'default',
      themeLayout: 'vertical',
      themeColorPresets: 'default',
      themeStretch: false,
    }}
  >
    <ThemeProvider>
      <MotionLazy>
        <SnackbarProvider>
          <ProgressBar />

          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </MotionLazy>
    </ThemeProvider>
  </SettingsProvider>
)
