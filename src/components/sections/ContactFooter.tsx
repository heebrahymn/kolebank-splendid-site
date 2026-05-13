import { useState, useEffect, useRef } from 'react'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

const CONTACT_EMAIL = 'ayodeleheebrahymn@outlook.com'

type Status = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = {
  name?: string
  project_type?: string
  message?: string
}

export function ContactFooter() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    project_type: '',
    message: '',
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

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

  const validateField = (name: string, value: string): string => {
    if (name === 'name') {
      if (!value.trim()) return 'Full name is required'
      if (value.trim().length < 2) return 'Name must be at least 2 characters'
      if (value.trim().length > 100) return 'Name must not exceed 100 characters'
    }
    if (name === 'project_type') {
      if (!value) return 'Project type is required'
    }
    if (name === 'message') {
      if (!value.trim()) return 'Project details are required'
      if (value.trim().length < 10) return 'Details must be at least 10 characters'
      if (value.trim().length > 2000) return 'Details must not exceed 2000 characters'
    }
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setFieldErrors((prev) => ({ ...prev, [name]: error || undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setFieldErrors((prev) => ({ ...prev, [name]: error || undefined }))
  }

  const validateForm = (): boolean => {
    const errors: FieldErrors = {}

    const nameError = validateField('name', form.name)
    if (nameError) errors.name = nameError

    const projectError = validateField('project_type', form.project_type)
    if (projectError) errors.project_type = projectError

    const messageError = validateField('message', form.message)
    if (messageError) errors.message = messageError

    setFieldErrors(errors)
    setTouched({ name: true, project_type: true, message: true })
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: form.name,
          Company: form.company || 'Not Provided',
          'Project Type': form.project_type,
          Message: form.message,
          _subject: `New Kolebank Splendid Bid Request: ${form.name}`,
          _honey: '' // Anti-spam honeypot field
        })
      })

      if (!response.ok) {
        throw new Error('Submission failed. Server did not respond correctly.')
      }

      setStatus('success')
      setForm({ name: '', company: '', project_type: '', message: '' })
      setFieldErrors({})
      setTouched({})
      setShowToast(true)
      setTimeout(() => setShowToast(false), 6000)
    } catch (error: any) {
      setStatus('error')
      setErrorMsg(error.message || 'Failed to send your request. Please try again.')
    }
  }

  // Auto-hide error message after 5 seconds
  useEffect(() => {
    if (status === 'error') {
      const timer = setTimeout(() => setStatus('idle'), 5000)
      return () => clearTimeout(timer)
    }
  }, [status])

  return (
    <>
      {/* Success Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.4)',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            maxWidth: '380px',
            animation: 'slide-in-right 0.3s ease forwards',
          }}
        >
          <CheckCircle size={20} color="#22c55e" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#22c55e', marginBottom: '2px' }}>
              Request Submitted!
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'rgba(34,197,94,0.8)', margin: 0 }}>
              Our team will respond with a detailed proposal within 24 hours.
            </p>
          </div>
        </div>
      )}
      <section
        ref={sectionRef}
        id="contact"
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #060c1c 0%, #030712 100%)' }}
      >
        {/* Interactive Cursor Radial Glow */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-70 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(5,48,160,0.18), transparent 80%)'
          }}
        />

      {/* Background accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(5,48,160,0.12) 0%, transparent 70%)', bottom: 0 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#C89027' }}>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Get In Touch
            </span>
            <div style={{ width: '32px', height: '1px', background: '#C89027', opacity: 0.6 }} />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Start Your Project Today
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
            Fill out the form and our engineering team will respond with a detailed proposal within 24 hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          {/* Contact form */}
          <div className="flex-1 glass-card p-8 lg:p-10">
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: '28px' }}>
              Request a Bid
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: fieldErrors.name ? '#ef4444' : 'rgba(255,255,255,0.6)', marginBottom: '8px', letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                    Full Name * {fieldErrors.name && <span style={{ color: '#ef4444' }}>({fieldErrors.name})</span>}
                  </label>
                  <input
                    className="dark-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Adeyemi"
                    style={{
                      borderColor: fieldErrors.name ? 'rgba(239,68,68,0.6)' : undefined,
                      boxShadow: fieldErrors.name ? '0 0 0 3px rgba(239,68,68,0.1)' : undefined,
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                    Company
                  </label>
                  <input
                    className="dark-input"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Construction Ltd"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: fieldErrors.project_type ? '#ef4444' : 'rgba(255,255,255,0.6)', marginBottom: '8px', letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                  Project Type * {fieldErrors.project_type && <span style={{ color: '#ef4444' }}>({fieldErrors.project_type})</span>}
                </label>
                <select
                  className="dark-input"
                  name="project_type"
                  value={form.project_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ cursor: 'pointer', borderColor: fieldErrors.project_type ? 'rgba(239,68,68,0.6)' : undefined, boxShadow: fieldErrors.project_type ? '0 0 0 3px rgba(239,68,68,0.1)' : undefined }}
                >
                  <option value="" disabled style={{ background: '#1a1d22' }}>Select project type...</option>
                  <option value="Residential" style={{ background: '#1a1d22' }}>Residential</option>
                  <option value="Commercial" style={{ background: '#1a1d22' }}>Commercial</option>
                  <option value="Industrial" style={{ background: '#1a1d22' }}>Industrial</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: fieldErrors.message ? '#ef4444' : 'rgba(255,255,255,0.6)', marginBottom: '8px', letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                  Project Details * {fieldErrors.message && <span style={{ color: '#ef4444' }}>({fieldErrors.message})</span>}
                </label>
                <textarea
                  className="dark-input"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe your project — scope, dimensions, timeline, and any special requirements..."
                  rows={5}
                  style={{ resize: 'vertical', minHeight: '120px', borderColor: fieldErrors.message ? 'rgba(239,68,68,0.6)' : undefined, boxShadow: fieldErrors.message ? '0 0 0 3px rgba(239,68,68,0.1)' : undefined }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-bronze"
                disabled={status === 'loading'}
                style={{ marginTop: '4px', width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
                    Send Request
                  </>
                )}
              </button>

              {/* Error message inline */}
              {status === 'error' && (
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px', animation: 'fade-in 0.3s ease forwards',
                  }}
                >
                  <AlertCircle size={18} color="#ef4444" />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', color: '#ef4444' }}>
                    {errorMsg || 'Something went wrong. Please try again.'}
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Contact details */}
          <div className="lg:w-80 flex flex-col gap-5">
            {/* Contact info card */}
            <div className="glass-card p-7">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#C89027', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Contact Details
              </div>
              <div className="flex flex-col gap-5">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(5,48,160,0.2)', border: '1px solid rgba(5,48,160,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0530A0" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '4px', fontWeight: 500 }}>Phone</div>
                    <a href="tel:+2348000000000" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                      +234 800 000 0000
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(200,144,39,0.15)', border: '1px solid rgba(200,144,39,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C89027" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '4px', fontWeight: 500 }}>Email</div>
                    <a href="mailto:ayodeleheebrahymn@outlook.com" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', color: '#fff', textDecoration: 'none', fontWeight: 600, wordBreak: 'break-all', display: 'inline-block' }}>
                      ayodeleheebrahymn@outlook.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(5,48,160,0.2)', border: '1px solid rgba(5,48,160,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0530A0" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '4px', fontWeight: 500 }}>Location</div>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>
                      Lagos, Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="glass-card p-6">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#C89027', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Business Hours
              </div>
              {[
                { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
                { day: 'Sunday', hours: 'By Appointment' },
              ].map((item) => (
                <div key={item.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(200,144,39,0.08)' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{item.day}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{item.hours}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2348000000000?text=Hello%2C%20I%27d%20like%20to%20request%20a%20bid."
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{
                display: 'flex', alignItems: 'center', gap: '14px', padding: '18px',
                textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s',
                borderColor: 'rgba(37,211,102,0.3)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#25D366' }}>
                  Chat on WhatsApp
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  Quick response guaranteed
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer bar */}
        <div
          className="mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(200,144,39,0.12)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <img 
                src="/kolebank_logo.png" 
                alt="Kolebank Splendid Aluminium Glazing" 
                style={{ height: '68px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              © 2026 Kolebank Splendid Aluminium Glazing. All rights reserved. Built with ❤️ by <a href="https://wa.me/2347033446142" target="_blank" rel="noopener noreferrer" style={{ color: '#C89027' }}>Ayodele Bankole</a> .
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Services', 'Drafting', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C89027')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
