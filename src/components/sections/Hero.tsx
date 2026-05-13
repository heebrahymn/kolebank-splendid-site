import { useRef, useEffect } from 'react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const spotlight = spotlightRef.current
    const parallax = parallaxRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (spotlight) {
        spotlight.style.setProperty('--mouse-x', `${x}px`)
        spotlight.style.setProperty('--mouse-y', `${y}px`)
      }

      if (parallax) {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        // Smooth mouse coordinate offset relative to center
        const moveX = ((x - centerX) / centerX) * 22
        const moveY = ((y - centerY) / centerY) * 15
        parallax.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    const handleMouseLeave = () => {
      if (parallax) {
        parallax.style.transform = 'translate(0px, 0px)'
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ background: '#060c1c' }}
    >
      {/* Interactive Cursor Radial Glow */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-80 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(5,48,160,0.18), transparent 80%)'
        }}
      />
      {/* CAD grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="cad-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0530A0" strokeWidth="0.5" opacity="0.15" />
            </pattern>
            <pattern id="cad-grid-major" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#0530A0" strokeWidth="1" opacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cad-grid)" />
          <rect width="100%" height="100%" fill="url(#cad-grid-major)" />
        </svg>
      </div>

      {/* Curtain wall wireframe SVG — draws itself on load with interactive Parallax & continuous Float */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden transition-transform duration-700 ease-out"
      >
        <div className="w-full h-full flex items-center justify-center animate-float-structural">
          <svg
            viewBox="0 0 900 700"
            className="w-full h-full"
            style={{ maxWidth: '900px', opacity: 0.28, position: 'absolute' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          {/* Outer frame */}
          <rect x="80" y="60" width="740" height="580" stroke="#0530A0" strokeWidth="2" className="animate-draw-a" />
          {/* Vertical mullions */}
          <line x1="228" y1="60" x2="228" y2="640" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-200" />
          <line x1="376" y1="60" x2="376" y2="640" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-300" />
          <line x1="524" y1="60" x2="524" y2="640" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-400" />
          <line x1="672" y1="60" x2="672" y2="640" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-500" />
          {/* Horizontal transoms */}
          <line x1="80" y1="205" x2="820" y2="205" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-300" />
          <line x1="80" y1="350" x2="820" y2="350" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-400" />
          <line x1="80" y1="495" x2="820" y2="495" stroke="#0530A0" strokeWidth="1.5" className="animate-draw-b delay-500" />
          {/* Glass panel hatching (selected panels) */}
          <line x1="84" y1="64" x2="224" y2="201" stroke="#C89027" strokeWidth="0.5" opacity="0.5" className="animate-draw-c delay-800" />
          <line x1="84" y1="201" x2="224" y2="64" stroke="#C89027" strokeWidth="0.5" opacity="0.5" className="animate-draw-c delay-800" />
          <line x1="380" y1="354" x2="520" y2="491" stroke="#C89027" strokeWidth="0.5" opacity="0.5" className="animate-draw-c delay-1000" />
          <line x1="380" y1="491" x2="520" y2="354" stroke="#C89027" strokeWidth="0.5" opacity="0.5" className="animate-draw-c delay-1000" />
          <line x1="528" y1="64" x2="668" y2="201" stroke="#C89027" strokeWidth="0.5" opacity="0.5" className="animate-draw-c delay-1200" />
          <line x1="528" y1="201" x2="668" y2="64" stroke="#C89027" strokeWidth="0.5" opacity="0.5" className="animate-draw-c delay-1200" />
          {/* Dimension lines */}
          <line x1="80" y1="35" x2="820" y2="35" stroke="#C89027" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" className="animate-draw-c delay-1500" />
          <line x1="50" y1="60" x2="50" y2="640" stroke="#C89027" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" className="animate-draw-c delay-1500" />
          {/* Coordinate labels */}
          <text x="80" y="26" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">A1</text>
          <text x="228" y="26" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">B1</text>
          <text x="376" y="26" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">C1</text>
          <text x="524" y="26" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">D1</text>
          <text x="672" y="26" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">E1</text>
          <text x="34" y="205" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">R2</text>
          <text x="34" y="350" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">R3</text>
          <text x="34" y="495" fill="#C89027" fontSize="10" opacity="0.6" fontFamily="monospace">R4</text>
          </svg>
        </div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(5,48,160,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-0" style={{ background: 'linear-gradient(to top, #060c1c, transparent)' }} />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 pt-50 pb-34 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div
          className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: 'rgba(5,48,160,0.15)',
            border: '1px solid rgba(5,48,160,0.4)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C89027', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#C89027', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Aluminum Fabrication & Glass Installation
          </span>
        </div>

        <h1
          className="animate-fade-up delay-200"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.08,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          Engineering Precision.
          <br />
          <span className="text-bronze-gradient">Finished to Perfection.</span>
        </h1>

        <p
          className="animate-fade-up delay-400"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.65,
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            fontWeight: 400,
          }}
        >
          Kolebank Splendid delivers precision aluminum fabrication, professional glass installation,
          and full-scale contracting solutions for residential, commercial, and industrial projects.
        </p>

        <div className="animate-fade-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="btn-sapphire">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 12h6M12 9l3 3-3 3" />
            </svg>
            Request a Bid
          </a>
          <a href="#services" className="btn-bronze-ghost">
            View Our Work
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="animate-fade-up delay-800 mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: 15, suffix: '+', label: 'Years Experience' },
            { value: 500, suffix: '+', label: 'Projects Completed' },
            { value: 100, suffix: '%', label: 'Quality Guaranteed' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card px-4 py-5 text-center">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: '#C89027', lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in delay-1500"
        style={{ opacity: 0 }}
      >
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif" }}>
          Scroll
        </span>
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(200,144,39,0.6), transparent)' }} />
      </div>
    </section>
  )
}
