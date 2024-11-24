import 'react-lazy-load-image-component/src/effects/blur.css'

import ThemeProvider from './theme'

import ProgressBar from './components/progress-bar'
import { MotionLazy } from './components/animate/motion-lazy'
import SnackbarProvider from './contexts/snackbar/snackbar-provider'

export const App = () => (
  <ThemeProvider
    settings={{
      themeMode: 'light',
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

        <h3>teste</h3>
      </SnackbarProvider>
    </MotionLazy>
  </ThemeProvider>
)
