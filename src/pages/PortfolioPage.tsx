import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Filter, Maximize2 } from 'lucide-react'

export function PortfolioPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const categories = ['All', 'Commercial', 'Residential', 'Structural']

  const allProjects = [
    {
      title: 'The Horizon Tower',
      category: 'Commercial',
      desc: 'Custom unitized curtain wall system with integrated thermal-break framing.',
      image: '/tower.png',
      specs: '24,000 SQFT',
      client: 'Lumina Studios'
    },
    {
      title: 'Pacific Residence',
      category: 'Residential',
      desc: 'Large-scale sliding glass facade system with ultra-slim insulated profiles.',
      image: '/villa.png',
      specs: '18-Foot Panels',
      client: 'Private Executive'
    },
    {
      title: 'Meridian Canopy',
      category: 'Structural',
      desc: 'Precision suspended glass canopy utilizing high-tensile steel and custom brackets.',
      image: '/canopy.png',
      specs: 'BS EN 1991 Approved',
      client: 'Horizon Builders'
    },
    {
      title: 'Victoria Island Atrium Dome',
      category: 'Structural',
      desc: 'High-performance geodesic structural glass dome situated in Victoria Island, Lagos. Custom solar-gain mitigation engineered specifically for West African climates.',
      image: '/lagos_atrium.png',
      specs: '120FT DIAMETER',
      client: 'Lagos Plaza Development'
    },
    {
      title: 'Coastal View Villa',
      category: 'Residential',
      desc: 'Heavy-gauge structural aluminum windows and oversized sliding systems rated for extreme marine weather. Custom-engineered for high-end coastal builds in Banana Island, Lagos.',
      image: '/coastal_villa.png',
      specs: 'Wind Load Rated',
      client: 'Banana Island Holdings'
    },
    {
      title: 'Victoria Plaza Curtain Wall',
      category: 'Commercial',
      desc: 'Massive point-supported spider glass atrium featuring monolithic ultra-clear low-iron glass panels, custom-designed for thermal efficiency in Victoria Island, Lagos.',
      image: '/spider_wall.png',
      specs: '18,500 SQFT',
      client: 'Apex Capital Group'
    }
  ]

  const filteredProjects = activeFilter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter)

  return (
    <main 
      ref={sectionRef}
      className="min-h-screen relative pb-24 overflow-hidden"
      style={{ background: '#060c1c' }}
    >
      {/* Interactive Cursor Radial Glow */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-70 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(5,48,160,0.15), transparent 80%)'
        }}
      />

      {/* Top Navigation bar specific to standalone Page */}
      <nav className="sticky top-0 left-0 right-0 z-50 glass-nav px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-30 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="group">
              <img 
                src="/kolebank_logo.png" 
                alt="Kolebank Splendid Aluminium Glazing" 
                style={{ height: '68px', width: 'auto', objectFit: 'contain' }} 
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          <Link to="/" className="flex items-center gap-2 group text-white no-underline">
            <ArrowLeft className="w-4 h-4 text-[#C89027] transition-transform group-hover:-translate-x-1" />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '0.9rem' }}>
              Back to Home
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
          <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Project Gallery
          </span>
        </div>
        
        <h1 
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-0.03em' }}
          className="mb-6"
        >
          Engineering <br />
          <span className="text-bronze-gradient">Showcase</span>
        </h1>
        
        <p 
          style={{ maxWidth: '600px', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.7, fontFamily: "'Space Grotesk', sans-serif" }}
          className="mb-12"
        >
          A comprehensive audit of our landmark structural glazing, heavy-gauge aluminum builds, and architectural envelope systems executed to absolute perfection.
        </p>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/10 mb-16">
          <div className="flex items-center gap-2 text-white/40 mr-2 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Filter className="w-4 h-4" />
            <span>Filter Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 ${
                activeFilter === cat 
                ? 'bg-[#C89027] text-[#030712] border-[#C89027] shadow-[0_0_20px_rgba(200,144,39,0.3)]' 
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Extensive Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredProjects.map((proj, idx) => (
            <div 
              key={idx} 
              className="glass-card group relative rounded-xl overflow-hidden transition-all duration-500 hover:translate-y-[-4px] animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms`, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Visual Aspect Ratio Box */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Context specs below image inside card */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#C89027] tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {proj.specs}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#0530A0]/30 border border-[#0530A0]/50 text-blue-300 text-[9px] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {proj.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.title}
                  </h3>
                  
                  <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.desc}
                  </p>
                </div>

                {/* Metadata footer row */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase text-white/30 tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Partner/Client
                    </div>
                    <div className="text-xs font-semibold text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {proj.client}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#C89027] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Blank State if none */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 bg-white/5 border border-dashed border-white/10 rounded-xl">
            <div className="text-white/40 mb-4">No projects found in this category yet.</div>
          </div>
        )}
      </div>

      {/* Back Link Footer */}
      <div className="max-w-7xl mx-auto px-4 mt-24 relative z-10">
        <div className="glass-card p-8 rounded-xl border border-white/10 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0530A0]/10 to-[#C89027]/5 z-0" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to Build Your Masterpiece?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Bring our engineering precision and certified installation teams to your next development.
            </p>
            <Link 
              to="/#contact" 
              className="btn-bronze"
              style={{ textDecoration: 'none' }}
            >
              Request Structural Bid
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
