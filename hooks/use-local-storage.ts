"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar valor desde localStorage al montar el componente
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const parsedItem = JSON.parse(item)
        // Si hay fechas, las convertimos de string a Date
        if (Array.isArray(parsedItem)) {
          const processedItems = parsedItem.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          }))
          setStoredValue(processedItems)
        } else {
          setStoredValue(parsedItem)
        }
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    } finally {
      setIsLoaded(true)
    }
  }, [key])

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue, isLoaded] as const
}
