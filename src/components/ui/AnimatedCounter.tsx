import { useState, useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ target, duration = 2000, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          startAnimation()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)

    const startAnimation = () => {
      let startTime: number | null = null

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)
        
        // High-fidelity cubic ease-out animation
        const easeOutCubic = 1 - Math.pow(1 - percentage, 3)
        
        setCount(Math.floor(easeOutCubic * target))

        if (progress < duration) {
          requestAnimationFrame(step)
        } else {
          setCount(target)
        }
      }

      requestAnimationFrame(step)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  )
}
