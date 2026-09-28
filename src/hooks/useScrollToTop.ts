import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll window to top when the route path changes (not on hash-only updates). */
export function useScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
}
