import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Erro ao acessar o localStorage', error)

      return initialValue
    }
  })

  const update = (value: T) => {
    try {
      setStoredValue(value)

      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Erro ao atualizar o localStorage', error)

      return null
    }
  }

  return { state, update }
}
