import { useState, useRef, useEffect } from 'react'

type TooltipId = 'curtain-wall' | 'mullion' | 'transom' | 'glazing' | 'sill' | 'head' | null

const tooltipData: Record<NonNullable<TooltipId>, { title: string; specs: string[] }> = {
  'curtain-wall': {
    title: 'Curtain Wall System',
    specs: [
      'System depth: 150mm – 200mm',
      'Max panel: 1500 × 4500mm',
      'Thermal break: PA66 GF25',
      'Wind load: ±3.0 kPa',
    ],
  },
  mullion: {
    title: 'Vertical Mullion Profile',
    specs: [
      'Section: 65 × 150mm',
      'Wall thickness: 2.5mm',
      'Alloy: AA6063-T5',
      'Modular pitch: 600 – 1200mm',
    ],
  },
  transom: {
    title: 'Horizontal Transom',
    specs: [
      'Section: 65 × 100mm',
      'Structural depth: 100mm',
      'Deflection: L/300',
      'Drainage: Two-stage',
    ],
  },
  glazing: {
    title: 'Glazing Infill Panel',
    specs: [
      'Configuration: 6+12+6 IGU',
      'U-Value: 1.6 W/m²K',
      'SHGC: 0.28',
      'Light transmission: 68%',
    ],
  },
  sill: {
    title: 'Sill Detail',
    specs: [
      'Sill profile: 80 × 60mm',
      'Drainage channel: continuous',
      'EPDM weatherseal',
      'Flash clearance: 15mm min',
    ],
  },
  head: {
    title: 'Head Detail',
    specs: [
      'Head receiver: 100 × 50mm',
      'Structural anchor: M12 bolt',
      'Movement allowance: ±10mm',
      'Fire stop: Mineral wool',
    ],
  },
}

const hotspots: Array<{ id: NonNullable<TooltipId>; cx: number; cy: number; label: string }> = [
  { id: 'curtain-wall', cx: 370, cy: 80, label: 'CW-01' },
  { id: 'mullion', cx: 155, cy: 270, label: 'MU-03' },
  { id: 'transom', cx: 370, cy: 210, label: 'TR-02' },
  { id: 'glazing', cx: 260, cy: 330, label: 'GL-04' },
  { id: 'sill', cx: 370, cy: 480, label: 'SL-05' },
  { id: 'head', cx: 580, cy: 130, label: 'HD-06' },
]

export function DraftingBlock() {
  const [activeTooltip, setActiveTooltip] = useState<TooltipId>(null)

  const toggle = (id: NonNullable<TooltipId>) => {
    setActiveTooltip((prev) => (prev === id ? null : id))
  }

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

  return (
    <section
      ref={sectionRef}
      id="drafting"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030712 0%, #060c1c 100%)' }}
    >
      {/* Interactive Cursor Radial Glow */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-70 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(5,48,160,0.18), transparent 80%)'
        }}
      />

      {/* Blueprint background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" style={{ opacity: 0.08 }}>
          <defs>
            <pattern id="bp-grid-sm" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0530A0" strokeWidth="0.4" />
            </pattern>
            <pattern id="bp-grid-lg" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#0530A0" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-grid-sm)" />
          <rect width="100%" height="100%" fill="url(#bp-grid-lg)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Engineering Documentation
            </span>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Drafting & Contract Services
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.55)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.65 }}>
            Every project starts with precision engineering drawings. Click the highlighted regions
            on the structural blueprint to explore component specifications.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Blueprint drawing panel */}
          <div
            className="glass-card flex-1"
            style={{ padding: '24px', minHeight: '540px', position: 'relative', overflow: 'hidden' }}
          >
            {/* CAD title block */}
            <div
              style={{
                position: 'absolute', top: '16px', left: '16px',
                fontFamily: 'monospace', fontSize: '10px', color: 'rgba(200,144,39,0.5)',
                lineHeight: 1.6, userSelect: 'none',
              }}
            >
              <div>DRAWING: ATP-CW-001</div>
              <div>SCALE: 1:50</div>
              <div>REV: 03</div>
            </div>
            {/* Scale indicator */}
            <div
              style={{
                position: 'absolute', bottom: '16px', right: '16px',
                fontFamily: 'monospace', fontSize: '9px', color: 'rgba(200,144,39,0.4)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px',
              }}
            >
              <div>KOLEBANK SPLENDID GLAZING</div>
              <div>CURTAIN WALL ELEVATION — SECTION A-A</div>
            </div>

            {/* SVG blueprint */}
            <svg
              viewBox="0 0 740 540"
              style={{ width: '100%', height: '100%', minHeight: '460px' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Axis labels */}
              {['1','2','3','4','5'].map((n, i) => (
                <text key={n} x={155 + i * 107} y="30" fill="#C89027" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.7">{n}</text>
              ))}
              {['A','B','C','D'].map((n, i) => (
                <text key={n} x="28" y={90 + i * 105} fill="#C89027" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.7">{n}</text>
              ))}
              {/* Axis lines */}
              {[155,262,369,476,583,690].map((x) => (
                <line key={x} x1={x} y1="40" x2={x} y2="500" stroke="#0530A0" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.25" />
              ))}
              {[85,192,299,406,500].map((y) => (
                <line key={y} x1="40" y1={y} x2="700" y2={y} stroke="#0530A0" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.25" />
              ))}

              {/* Main building outline */}
              <rect x="100" y="55" width="540" height="450" stroke="#0530A0" strokeWidth="2" opacity="0.6" />

              {/* Mullion verticals */}
              {[207,314,421,528,635].map((x) => (
                <line key={x} x1={x} y1="55" x2={x} y2="505" stroke="#4a7af0" strokeWidth="1.5" opacity="0.5" />
              ))}

              {/* Transom horizontals */}
              {[160,265,370,455].map((y) => (
                <line key={y} x1="100" y1={y} x2="640" y2={y} stroke="#4a7af0" strokeWidth="1.5" opacity="0.5" />
              ))}

              {/* Glass panels (blue filled) */}
              {[
                [101,56,106,104],[208,56,106,104],[315,56,106,104],[422,56,106,104],[529,56,106,104],
                [101,161,106,104],[208,161,106,104],[315,161,106,104],[422,161,106,104],[529,161,106,104],
                [101,266,106,104],[208,266,106,104],[315,266,106,104],[422,266,106,104],[529,266,106,104],
                [101,371,106,84],[208,371,106,84],[315,371,106,84],[422,371,106,84],[529,371,106,84],
              ].map(([x,y,w,h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} fill="#0530A0" opacity="0.06" />
              ))}

              {/* Dimension lines */}
              <line x1="100" y1="520" x2="640" y2="520" stroke="#C89027" strokeWidth="0.8" strokeDasharray="none" opacity="0.4" />
              <line x1="100" y1="515" x2="100" y2="525" stroke="#C89027" strokeWidth="0.8" opacity="0.4" />
              <line x1="640" y1="515" x2="640" y2="525" stroke="#C89027" strokeWidth="0.8" opacity="0.4" />
              <text x="370" y="534" fill="#C89027" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.5">5400mm OVERALL WIDTH</text>

              <line x1="68" y1="55" x2="68" y2="505" stroke="#C89027" strokeWidth="0.8" opacity="0.4" />
              <line x1="63" y1="55" x2="73" y2="55" stroke="#C89027" strokeWidth="0.8" opacity="0.4" />
              <line x1="63" y1="505" x2="73" y2="505" stroke="#C89027" strokeWidth="0.8" opacity="0.4" />
              <text x="54" y="280" fill="#C89027" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.5" transform="rotate(-90 54 280)">4500mm HEIGHT</text>

              {/* Hotspot circles */}
              {hotspots.map((hs) => (
                <g key={hs.id} onClick={() => toggle(hs.id)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={hs.cx} cy={hs.cy} r="18"
                    fill={activeTooltip === hs.id ? 'rgba(200,144,39,0.25)' : 'rgba(200,144,39,0.1)'}
                    stroke="#C89027"
                    strokeWidth={activeTooltip === hs.id ? '2' : '1.2'}
                    style={{ transition: 'all 0.2s' }}
                  />
                  <circle cx={hs.cx} cy={hs.cy} r="5" fill="#C89027" opacity="0.8" />
                  <text
                    x={hs.cx} y={hs.cy - 24}
                    fill="#C89027" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7"
                  >
                    {hs.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Specs panel */}
          <div className="lg:w-80 w-full flex flex-col gap-4">
            {/* Instructions */}
            <div
              className="glass-card p-5"
              style={{ border: '1px solid rgba(200,144,39,0.2)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C89027', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: '#C89027', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Interactive Blueprint
                </span>
              </div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                Click any highlighted circle on the drawing to reveal component specifications and engineering details.
              </p>
            </div>

            {/* Active spec card */}
            {activeTooltip ? (
              <div className="glass-card p-5 animate-tooltip-pop" style={{ border: '1px solid rgba(200,144,39,0.4)' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#C89027', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {hotspots.find(h => h.id === activeTooltip)?.label} — Detail
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '12px' }}>
                  {tooltipData[activeTooltip].title}
                </div>
                <div className="flex flex-col gap-2">
                  {tooltipData[activeTooltip].specs.map((spec) => (
                    <div
                      key={spec}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(200,144,39,0.08)',
                      }}
                    >
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C89027', marginTop: '7px', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-card p-5 text-center" style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', opacity: 0.5 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89027" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
                  Select a hotspot to view specs
                </span>
              </div>
            )}

            {/* Drafting services list */}
            <div className="glass-card p-5">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#C89027', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Contract Services
              </div>
              {['Shop Drawing Production', 'Structural Calculations', 'BOQ & Cost Estimation', 'Site Survey & Measurement', 'Project Management'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(200,144,39,0.08)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89027" strokeWidth="2.5">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
