import { useMemo } from 'react'

import { useLocalStorage } from '@/hooks/use-local-storage'

import { SettingsContext } from './settings-context'

import { SettingsContextProps, SettingsValueProps } from './types'
import { STORAGE_KEYS } from '../../constants/config'

type Props = {
  children: React.ReactNode
  defaultSettings: SettingsValueProps
}

export const SettingsProvider = ({ children, defaultSettings }: Props) => {
  const { state, update } = useLocalStorage<SettingsValueProps>(
    STORAGE_KEYS.SETTINGS,
    defaultSettings
  )

  const onToggleMode = () =>
    update({ ...state, themeMode: state.themeMode === 'light' ? 'dark' : 'light' })

  const memoizedValue = useMemo<SettingsContextProps>(
    () => ({
      ...state,
      onToggleMode,
      onUpdate: update,
    }),
    [update, state]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
