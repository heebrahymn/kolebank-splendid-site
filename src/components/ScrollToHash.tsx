import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Clean the # and search for the element
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      
      if (element) {
        // Small timeout to allow React Router DOM rendering to settle
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return () => clearTimeout(timer)
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
