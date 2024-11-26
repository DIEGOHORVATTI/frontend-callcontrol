import { useContext } from 'react'

import { SettingsContext, type ISettings } from '@/contexts/settings-provider'

export const useSettings = (): ISettings => {
  const context = useContext(SettingsContext)

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider')

  return context
}
