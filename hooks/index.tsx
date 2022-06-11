import { useEffect } from 'react'

export const useOutside = (ref: any, callback: () => void) => {
  useEffect(() => {
    document.addEventListener("mousedown", callback)
    return () => {
      document.removeEventListener("mousedown", callback)
    }
  }, [ref])
}