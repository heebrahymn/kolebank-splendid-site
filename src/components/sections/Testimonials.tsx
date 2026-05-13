import { useRef, useEffect } from 'react'
import { Quote, Star, CheckCircle2 } from 'lucide-react'

export function Testimonials() {
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

  const reviews = [
    {
      quote: "The technical drawing integration from Kolebank Splendid made all the difference. Their structural CNC milling tolerances were exact, saving us weeks of costly on-site field adjustments.",
      author: "Marcus Vance",
      role: "Principal Architect",
      company: "Lumina Studios",
      project: "Commercial High-Rise Facade",
      initials: "MV"
    },
    {
      quote: "Their structural curtain wall fabrication is absolutely elite. Full compliance documentation for severe wind-load zones was supplied upfront, delivering complete peace of mind.",
      author: "Sarah Chen",
      role: "Project Director",
      company: "Vertex Developments",
      project: "Tech Park Complex",
      initials: "SC"
    },
    {
      quote: "Flawless craftsmanship from initial CAD drafting through to heavy-duty ACM cladding. Kolebank Splendid remains our go-to structural envelope partner for complex, high-budget builds.",
      author: "David Kalu",
      role: "Chief Operating Officer",
      company: "Horizon Builders Group",
      project: "Luxury Retail Center",
      initials: "DK"
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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

      {/* Abstract Vector Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%">
          <pattern id="tst-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0530A0" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tst-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Industry Partnerships
            </span>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Trusted by Top <span className="text-bronze-gradient">Architects & Builders</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.5)', fontSize: '1rem', fontFamily: "'Space Grotesk', sans-serif" }}>
            We deliver precision structural engineering and premium glass solutions that exceed client expectations on every timeline.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="glass-card glass-card-hover p-8 relative flex flex-col justify-between group overflow-hidden"
              style={{ minHeight: '320px' }}
            >
              {/* Giant background quote mark */}
              <Quote 
                className="absolute right-6 top-6 w-24 h-24 text-white/[0.02] pointer-events-none select-none transition-all duration-500 group-hover:text-[#C89027]/[0.04] group-hover:rotate-[8deg]" 
              />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C89027] text-[#C89027]" />
                  ))}
                </div>

                {/* Quote content */}
                <blockquote 
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 400, fontStyle: 'italic' }}
                  className="mb-8 relative z-10"
                >
                  "{rev.quote}"
                </blockquote>
              </div>

              {/* Client Info Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                {/* Custom Avatar */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0530A0, #031e66)', border: '1.5px solid rgba(200,144,39,0.3)', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {rev.initials}
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold text-[0.95rem] truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {rev.author}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C89027] flex-shrink-0" />
                  </div>
                  <div className="text-xs text-white/50 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {rev.role}, <span className="text-[#C89027]/90">{rev.company}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/30 mt-1 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {rev.project}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
