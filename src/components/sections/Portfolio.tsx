import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      spotlight.style.setProperty('--mouse-x', `${x}px`)
      spotlight.style.setProperty('--mouse-y', `${y}px`)
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const featuredProjects = [
    {
      title: 'The Horizon Tower',
      category: 'Commercial Glazing',
      desc: 'Custom unitized curtain wall system with integrated bronze thermal-break framing.',
      image: '/tower.png',
      specs: '24,000 SQFT'
    },
    {
      title: 'Pacific Residence',
      category: 'Residential',
      desc: 'Large-scale sliding glass facade system with ultra-slim insulated profiles.',
      image: '/villa.png',
      specs: '18-Foot Panels'
    },
    {
      title: 'Meridian Canopy',
      category: 'Structural Glass',
      desc: 'Precision suspended glass canopy utilizing high-tensile steel and brushed brackets.',
      image: '/canopy.png',
      specs: 'BS EN 1991 Approved'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-28 px-4 overflow-hidden"
      style={{ background: '#060c1c' }}
    >
      {/* Interactive Cursor Radial Glow */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-70 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(5,48,160,0.18), transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
              <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Featured Works
              </span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 3rem)', lineHeight: 1.15, color: '#fff', letterSpacing: '-0.02em' }}>
              Precision In <br />
              <span className="text-bronze-gradient">Realized Architecture</span>
            </h2>
          </div>
          <p style={{ maxWidth: '420px', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore our benchmark installations, featuring custom aluminum profiles, architectural curtain walls, and heavy-duty structural glass assemblies.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((proj, idx) => (
            <div 
              key={idx} 
              className="glass-card group relative rounded-xl overflow-hidden transition-all duration-500 hover:translate-y-[-8px]"
              style={{ height: '480px', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Image Backdrop */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.85] group-hover:brightness-[0.65]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Project Content Overlays */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                {/* Top bar */}
                <div className="flex items-start justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-[#C89027] group-hover:text-[#030712]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom details */}
                <div>
                  <div className="text-[11px] font-bold text-[#C89027] mb-2 tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.specs}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.title}
                  </h3>
                  <p className="text-sm text-white/60 line-clamp-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link CTA Footer */}
        <div className="text-center">
          <Link 
            to="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-[#0530A0] to-[#031e66] border border-white/10 text-white font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(5,48,160,0.2)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(5,48,160,0.4)] hover:translate-y-[-2px] hover:border-[#C89027]/40 group"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            View Complete Architectural Portfolio
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#C89027]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
