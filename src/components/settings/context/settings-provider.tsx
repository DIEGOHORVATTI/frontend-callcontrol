import { useMemo } from 'react'

import { useLocalStorage } from 'src/hooks/use-local-storage'

import { SettingsValueProps } from '../types'
import { SettingsContext } from './settings-context'

const STORAGE_KEY = 'settings'

type Props = {
  children: React.ReactNode
  defaultSettings: SettingsValueProps
}

export const SettingsProvider = ({ children, defaultSettings }: Props) => {
  const { state, update } = useLocalStorage(STORAGE_KEY, defaultSettings)

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
    }),
    [update, state]
  )

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>
}
