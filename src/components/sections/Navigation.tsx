import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Drafting', href: '/#drafting' },
  { label: 'Reviews', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`glass-nav fixed top-0 left-0 right-0 z-50 ${scrolled ? 'glass-nav-opaque' : ''}`}
        style={{ transition: 'background 0.3s, border-color 0.3s' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-30">
            {/* Logo */}
            <Link to="/#hero" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
              <img 
                src="/kolebank_logo.png" 
                alt="Kolebank Splendid Aluminium Glazing" 
                style={{ height: '78px', width: 'auto', objectFit: 'contain', padding: '6px 0' }} 
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C89027')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/#contact" className="btn-bronze" style={{ padding: '8px 20px', fontSize: '0.875rem', borderRadius: '6px' }}>
                Get a Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: '4px' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />
          <div
            className="absolute top-20 left-0 right-0 glass-drawer animate-slide-in-right"
            style={{ borderLeft: 'none', borderTop: '1px solid rgba(200,144,39,0.3)', borderRight: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(200,144,39,0.1)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/#contact" className="btn-bronze" onClick={() => setMenuOpen(false)} style={{ marginTop: '8px', textAlign: 'center' }}>
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
