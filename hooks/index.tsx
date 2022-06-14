import { MutableRefObject, useEffect } from 'react'

export const useOutside = (ref: MutableRefObject<HTMLElement | null>, callback: () => void) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current?.contains(e.target as Node)) return
    callback()
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}
