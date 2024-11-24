import { Button } from '@mui/material'

import { useSettingsContext } from '@/components/settings'

export const Home = () => {
  const settings = useSettingsContext()

  return (
    <div>
      <h1>Home</h1>

      <Button onClick={settings.onToggle}>mode</Button>
    </div>
  )
}
