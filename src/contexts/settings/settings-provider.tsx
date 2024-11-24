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
  const { state, update } = useLocalStorage(STORAGE_KEYS.SETTINGS, defaultSettings)

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
    }),
    [update, state]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
