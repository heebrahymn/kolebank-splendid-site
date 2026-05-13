import { useRef, useEffect } from 'react'
import { Shield, Target, Cpu } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export function AboutUs() {
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

  const features = [
    {
      icon: <Target className="w-6 h-6 text-[#C89027]" />,
      title: 'Absolute Precision',
      desc: 'Every profile, bracket, and glass panel is CNC-machined to sub-millimeter tolerances, ensuring perfect fitment and zero-defect construction.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#C89027]" />,
      title: 'Advanced Technology',
      desc: 'Leveraging CAD/CAM integration and modern thermal-break technology to optimize structural performance and sustainable energy efficiency.'
    },
    {
      icon: <Shield className="w-6 h-6 text-[#C89027]" />,
      title: 'Certified Compliance',
      desc: 'Engineered to surpass BS, EN, and ASTM international safety standards, guaranteeing unmatched wind-load resistance and seismic durability.'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
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

      {/* Technical overlay grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#0530A0" />
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0530A0" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
                <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Our Heritage & Mission
                </span>
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', lineHeight: 1.15, color: '#fff', letterSpacing: '-0.02em' }}>
                Engineering the <br />
                <span className="text-bronze-gradient">Future of Facades</span>
              </h2>
            </div>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontFamily: "'Space Grotesk', sans-serif" }}>
              For over 15 years, Kolebank Splendid has redefined architectural limits through elite aluminum fabrication and structural glass installations. What started as a specialized workshop has grown into an industry leader in high-rise curtain walls, heavy-duty cladding, and bespoke architectural glazing.
            </p>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontFamily: "'Space Grotesk', sans-serif" }}>
              We don’t just install panels; we partner with architects and developers to execute complex structural visions with integrity, absolute transparency, and unmatched technical mastery.
            </p>

            <div className="pt-4 flex flex-wrap gap-8 items-center">
              <div>
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedCounter target={15} suffix="+" />
                </div>
                <div className="text-xs uppercase tracking-wider text-white/40 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Years of Mastery
                </div>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedCounter target={500} suffix="+" />
                </div>
                <div className="text-xs uppercase tracking-wider text-white/40 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Projects Completed
                </div>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="text-xs uppercase tracking-wider text-white/40 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Safety Track Record
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Graphic / Features Pillar Column */}
          <div className="space-y-6">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="glass-card glass-card-hover p-6 flex gap-5 relative overflow-hidden group"
                style={{ borderLeft: '3px solid rgba(200,144,39,0.3)' }}
              >
                <div className="flex-shrink-0 p-3 bg-white/5 rounded-lg border border-white/10 h-fit transition-colors group-hover:bg-[#C89027]/10">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 transition-colors group-hover:text-[#C89027]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {feat.desc}
                  </p>
                </div>
                
                {/* Subtle decorative background number */}
                <div className="absolute right-4 bottom-[-20px] text-7xl font-bold text-white/[0.02] select-none transition-all duration-500 group-hover:text-white/[0.04] group-hover:translate-y-[-8px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
