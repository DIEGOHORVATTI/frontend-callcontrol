import { useMemo } from 'react'

import { useLocalStorage } from '@/hooks/use-local-storage'

import { SettingsContext } from './settings-context'

import { STORAGE_KEYS } from '@/constants/config'

import { SettingsContextProps, SettingsValueProps } from './types'

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

  const onPresetsChange = (themeColorPresets: SettingsValueProps['themeColorPresets']) =>
    update({ ...state, themeColorPresets })

  const memoizedValue = useMemo<SettingsContextProps>(
    () => ({
      ...state,
      onToggleMode,
      onPresetsChange,
      onUpdate: update,
    }),
    [update, state]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
