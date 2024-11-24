import { useMemo } from 'react'

import { useLocalStorage } from '@/hooks/use-local-storage'

import { SettingsContext } from './settings-context'

import { SettingsValueProps } from './types'
import { STORAGE_KEYS } from '../../constants/config'

type Props = {
  children: React.ReactNode
  defaultSettings: SettingsValueProps
}

export const SettingsProvider = ({ children, defaultSettings }: Props) => {
  const { state, update: onUpdate } = useLocalStorage(STORAGE_KEYS.SETTINGS, defaultSettings)

  const onToggleMode = () => {
    onUpdate('mode', state.mode === 'light' ? 'dark' : 'light')
  }

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onToggleMode,
      onUpdate,
    }),
    [onUpdate, state]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
