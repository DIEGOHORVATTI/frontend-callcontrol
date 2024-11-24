import { Button } from '@mui/material'

import { useSettingsContext } from '../../contexts/settings'

export const Home = () => {
  const settings = useSettingsContext()

  return (
    <div>
      <h1>{`${settings.themeMode} mode!`}</h1>

      <Button onClick={settings.onToggleMode}>mode</Button>
    </div>
  )
}
