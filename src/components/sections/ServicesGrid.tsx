import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

const services = [
  {
    id: 'windows',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="2" stroke="#C89027" strokeWidth="1.8" />
        <line x1="14" y1="3" x2="14" y2="25" stroke="#C89027" strokeWidth="1.4" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#C89027" strokeWidth="1.4" />
        <rect x="5" y="5" width="7" height="7" fill="rgba(200,144,39,0.08)" />
      </svg>
    ),
    name: 'Casement & Sliding Windows',
    description: 'Precision-fabricated aluminum window systems for any facade.',
    specs: {
      materials: 'AA6063-T5, AA6061-T6 aluminum alloy',
      grades: 'Grade 1 architectural quality',
      thicknesses: '1.2mm – 3.0mm wall thickness',
      glass: '6mm tempered, 6+12+6 double-glazed IGU',
      finishes: 'Anodized, powder coat (RAL), PVDF coating',
      compliance: 'BS 6375, ASTM E330 wind load rated',
    },
    specsTable: [
      { grade: 'Standard Frame', material: 'AA6063-T5', thickness: '1.2mm – 1.5mm' },
      { grade: 'Heavy Duty Frame', material: 'AA6061-T6', thickness: '1.6mm – 2.0mm' },
      { grade: 'Structural Mullion', material: 'AA6061-T6', thickness: '2.5mm – 3.0mm' },
      { grade: 'Double Glazed IGU', material: 'Tempered Glass', thickness: '6mm + 12A + 6mm' },
    ]
  },
  {
    id: 'doors',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="2" width="18" height="24" rx="2" stroke="#C89027" strokeWidth="1.8" />
        <circle cx="19" cy="14" r="1.5" fill="#C89027" />
        <line x1="5" y1="8" x2="23" y2="8" stroke="#C89027" strokeWidth="1" opacity="0.5" />
        <rect x="7" y="10" width="14" height="8" fill="rgba(200,144,39,0.07)" />
      </svg>
    ),
    name: 'Automated Commercial Doors',
    description: 'High-traffic automatic sliding and swing door solutions.',
    specs: {
      materials: 'AA6063-T5 extruded aluminum profiles',
      grades: 'Commercial grade heavy-duty',
      thicknesses: '2.0mm – 4.0mm section wall',
      glass: '10mm tempered or laminated safety glass',
      automation: 'Dorma, FAAC, or Tormax drive systems',
      compliance: 'EN 16005 pedestrian safety certified',
    },
    specsTable: [
      { grade: 'Standard Commercial', material: 'AA6063-T5 Extrusion', thickness: '2.0mm – 2.5mm' },
      { grade: 'Heavy-Duty Entrance', material: 'AA6063-T6 Extrusion', thickness: '3.0mm – 4.0mm' },
      { grade: 'Door Leaf Profile', material: 'Impact Aluminum', thickness: '2.5mm' },
      { grade: 'Impact Glazing', material: 'Laminated Safety Glass', thickness: '10.38mm – 12.76mm' },
    ]
  },
  {
    id: 'cubicles',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="17" rx="1.5" stroke="#C89027" strokeWidth="1.8" fill="rgba(200,144,39,0.05)" />
        <line x1="3" y1="13" x2="25" y2="13" stroke="#C89027" strokeWidth="1" />
        <line x1="10" y1="8" x2="10" y2="25" stroke="#C89027" strokeWidth="1" />
        <path d="M10 4 L14 8 L18 4" stroke="#C89027" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    name: 'Frameless Cubicles & Shower Enclosures',
    description: 'Elegant frameless glass systems for bathrooms and offices.',
    specs: {
      materials: 'Stainless steel 304 hardware, minimal aluminum trim',
      grades: 'Architectural frameless',
      thicknesses: '8mm, 10mm, 12mm toughened glass',
      glass: 'Clear, frosted, or acid-etched tempered',
      hinges: 'Dorma, Bilco, or CRL patch fittings',
      compliance: 'BS 6206 safety glass standard',
    },
    specsTable: [
      { grade: 'Residential Enclosure', material: 'Clear Toughened Glass', thickness: '8mm' },
      { grade: 'Commercial Screen', material: 'Toughened Float Glass', thickness: '10mm' },
      { grade: 'High-Traffic Frameless', material: 'Toughened Laminated', thickness: '12mm' },
      { grade: 'Hardware Fittings', material: 'Grade 304 Stainless Steel', thickness: 'Solid Machined' },
    ]
  },
  {
    id: 'handrails',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="4" y1="8" x2="24" y2="8" stroke="#C89027" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="7" y1="8" x2="7" y2="22" stroke="#C89027" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="14" y1="8" x2="14" y2="22" stroke="#C89027" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="21" y1="8" x2="21" y2="22" stroke="#C89027" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="4" y1="22" x2="24" y2="22" stroke="#C89027" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    name: 'Stainless Steel Handrails',
    description: 'Structural and decorative railing systems to any specification.',
    specs: {
      materials: 'SS 304 / SS 316 (marine grade)',
      grades: '2B, No. 4, mirror polish finishes',
      thicknesses: '38.1mm, 42.4mm, 48.3mm tube OD',
      posts: '50mm square or 60mm round posts',
      mounting: 'Core drill, base plate, or side mount',
      compliance: 'BS 6180, EN 13374 Class A/B/C',
    },
    specsTable: [
      { grade: 'Interior Rails (38.1mm OD)', material: 'Grade 304 SS', thickness: '1.5mm wall' },
      { grade: 'Exterior Rails (42.4mm OD)', material: 'Grade 304/316 SS', thickness: '2.0mm wall' },
      { grade: 'Marine/Coastal (48.3mm OD)', material: 'Grade 316 Marine SS', thickness: '2.5mm wall' },
      { grade: 'Structural Base Plate', material: 'Structural SS Plate', thickness: '8.0mm – 12.0mm' },
    ]
  },
  {
    id: 'cladding',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="7" rx="1" stroke="#C89027" strokeWidth="1.6" fill="rgba(200,144,39,0.06)" />
        <rect x="3" y="12" width="22" height="7" rx="1" stroke="#C89027" strokeWidth="1.6" fill="rgba(200,144,39,0.06)" />
        <rect x="3" y="21" width="10" height="4" rx="1" stroke="#C89027" strokeWidth="1.3" fill="rgba(200,144,39,0.06)" />
        <line x1="14" y1="3" x2="14" y2="10" stroke="#C89027" strokeWidth="0.8" opacity="0.5" />
        <line x1="14" y1="12" x2="14" y2="19" stroke="#C89027" strokeWidth="0.8" opacity="0.5" />
      </svg>
    ),
    name: 'Aluminium Cladding',
    description: 'Weather-resistant facade cladding panels for commercial builds.',
    specs: {
      materials: 'ACM (Aluminium Composite Material), solid AA1100',
      grades: 'FR-core (fire resistant) and standard core',
      thicknesses: '3mm, 4mm, 6mm composite; 2mm–4mm solid',
      finishes: 'PVDF coating, anodized, brushed',
      systems: 'Cassette, rail-and-bracket, ACM panel',
      compliance: 'EN 13501-1 fire classification, BS 8414',
    },
    specsTable: [
      { grade: 'Interior Partition', material: 'Standard Core ACM', thickness: '3.0mm' },
      { grade: 'Low-Rise Exterior', material: 'FR-Core (Class B1) ACM', thickness: '4.0mm' },
      { grade: 'High-Rise Facade', material: 'Non-Combustible A2 ACM', thickness: '4.0mm – 6.0mm' },
      { grade: 'Solid Metal Sheet', material: 'Solid AA1100 / AA3003', thickness: '2.0mm – 4.0mm' },
    ]
  },
  {
    id: 'partitions',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="14" y1="3" x2="14" y2="25" stroke="#C89027" strokeWidth="2" strokeLinecap="round" />
        <rect x="3" y="5" width="9" height="14" rx="1" stroke="#C89027" strokeWidth="1.5" fill="rgba(200,144,39,0.07)" />
        <rect x="16" y="5" width="9" height="14" rx="1" stroke="#C89027" strokeWidth="1.5" fill="rgba(200,144,39,0.07)" />
        <line x1="3" y1="22" x2="25" y2="22" stroke="#C89027" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    name: 'Office Partitioning',
    description: 'Modular glazed office partition systems for open-plan spaces.',
    specs: {
      materials: 'AA6063 aluminum framing profiles',
      grades: 'Architectural aluminium T5 temper',
      thicknesses: '1.4mm frame wall; 6mm or 8mm glass infill',
      glass: 'Clear, frosted, manifestation options',
      systems: 'Single or double-glazed, demountable',
      compliance: 'Rw 32–42dB acoustic performance',
    },
    specsTable: [
      { grade: 'Standard Track System', material: 'AA6063-T5 Extrusion', thickness: '1.4mm wall' },
      { grade: 'Heavy Structural Frame', material: 'AA6063-T5 Extrusion', thickness: '1.8mm – 2.0mm' },
      { grade: 'Acoustic Glazing Infill', material: 'Clear Laminated Glass', thickness: '6mm – 8mm' },
      { grade: 'Security Partitioning', material: 'Toughened Safety Glass', thickness: '10mm – 12mm' },
    ]
  },
]

type SpecsKey = keyof typeof services[0]['specs']
const specLabels: Record<SpecsKey, string> = {
  materials: 'Materials',
  grades: 'Grade',
  thicknesses: 'Thickness',
  glass: 'Glass',
  finishes: 'Finishes',
  compliance: 'Compliance',
  automation: 'Automation',
  hinges: 'Hardware',
  posts: 'Posts / Balusters',
  mounting: 'Mounting',
  systems: 'System Type',
}

export function ServicesGrid() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const active = services.find((s) => s.id === activeService)

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
    <section ref={sectionRef} id="services" className="relative py-24 px-4" style={{ background: '#060c1c' }}>
      {/* Interactive Cursor Radial Glow */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-70 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(5,48,160,0.18), transparent 80%)'
        }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="svc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0530A0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Our Capabilities
            </span>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Services & Solutions
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.65 }}>
            From precision fabrication to installation, we cover every aspect of aluminum and glass construction.
            Click any service to view technical specifications.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => setActiveService(svc.id)}
              className={`glass-card glass-card-hover text-left p-7 animate-fade-up delay-${(i % 6 + 1) * 100}`}
              style={{
                cursor: 'pointer',
                background: 'none',
                width: '100%',
                border: activeService === svc.id ? '1px solid rgba(200,144,39,0.6)' : undefined,
              }}
            >
              <div className="mb-5" style={{ color: '#C89027' }}>
                {svc.icon}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                {svc.name}
              </h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>
                {svc.description}
              </p>
              <div className="mt-5 flex items-center gap-2" style={{ color: '#C89027', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                <span>View Specs</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Specs Drawer */}
      {active && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setActiveService(null)}
          />
          {/* Drawer panel */}
          <div
            className="glass-drawer fixed top-0 right-0 h-full z-50 animate-slide-in-right"
            style={{ width: 'min(480px, 95vw)', padding: '0' }}
          >
            <div className="flex flex-col h-full">
              {/* Drawer header */}
              <div className="flex items-start justify-between p-7 pb-5" style={{ borderBottom: '1px solid rgba(200,144,39,0.15)' }}>
                <div>
                  <div style={{ color: '#C89027', marginBottom: '12px' }}>{active.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: '#fff', lineHeight: 1.2 }}>
                    {active.name}
                  </h3>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                    {active.description}
                  </p>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#fff', flexShrink: 0, marginLeft: '16px' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Specs */}
              <div className="flex-1 overflow-y-auto p-7 pt-6">
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#C89027', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Technical Overview
                </div>
                <div className="flex flex-col gap-0" style={{ border: '1px solid rgba(200,144,39,0.15)', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
                  {Object.entries(active.specs).map(([key, value], i) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '12px 16px',
                        borderBottom: i < Object.entries(active.specs).length - 1 ? '1px solid rgba(200,144,39,0.1)' : 'none',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'rgba(200,144,39,0.8)', minWidth: '100px', flexShrink: 0 }}>
                        {specLabels[key as SpecsKey] || key}
                      </span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Structured Specs Table */}
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#C89027', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Material Grades & Thickness Matrix
                </div>
                <div style={{ border: '1px solid rgba(200,144,39,0.15)', borderRadius: '10px', overflow: 'hidden', background: 'rgba(0,0,0,0.25)' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: '380px', borderCollapse: 'collapse', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: 'rgba(200,144,39,0.08)', borderBottom: '1px solid rgba(200,144,39,0.15)' }}>
                          <th style={{ padding: '12px 16px', fontWeight: 600, color: '#C89027', whiteSpace: 'nowrap' }}>Grade / Component</th>
                          <th style={{ padding: '12px 16px', fontWeight: 600, color: '#C89027', whiteSpace: 'nowrap' }}>Material</th>
                          <th style={{ padding: '12px 16px', fontWeight: 600, color: '#C89027', whiteSpace: 'nowrap' }}>Thickness</th>
                        </tr>
                      </thead>
                      <tbody>
                        {active.specsTable.map((row, idx) => (
                          <tr
                            key={idx}
                            style={{
                              borderBottom: idx < active.specsTable.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                              background: idx % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent'
                            }}
                          >
                            <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 500 }}>{row.grade}</td>
                            <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.65)' }}>{row.material}</td>
                            <td style={{ padding: '12px 16px', color: 'rgba(200,144,39,0.9)', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.thickness}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="btn-sapphire"
                    onClick={() => setActiveService(null)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Request a Quote for This Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
