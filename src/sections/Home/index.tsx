import { Button, useTheme } from '@mui/material'
import { darkMode } from '../../theme/options/dark-mode'

export const Home = () => {
  const theme = useTheme()

  return (
    <div>
      <h1>Home</h1>

      {/* toogle theme */}
      <Button onClick={() => darkMode('light')}>Toggle Theme</Button>
    </div>
  )
}
