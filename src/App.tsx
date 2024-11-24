import 'react-lazy-load-image-component/src/effects/blur.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider } from './theme'

import ProgressBar from './components/progress-bar'
import { MotionLazy } from './components/animate/motion-lazy'
import SnackbarProvider from './contexts/snackbar/snackbar-provider'

import { Home } from '@/sections/Home'

export const App = () => (
  <ThemeProvider
    settings={{
      themeMode: 'dark',
      themeDirection: 'ltr',
      themeContrast: 'default',
      themeLayout: 'vertical',
      themeColorPresets: 'default',
      themeStretch: false,
    }}
  >
    <MotionLazy>
      <SnackbarProvider>
        <ProgressBar />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </MotionLazy>
  </ThemeProvider>
)
