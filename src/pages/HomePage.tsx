import { Navigation } from '@/components/sections/Navigation'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutUs } from '@/components/sections/AboutUs'
import { DraftingBlock } from '@/components/sections/DraftingBlock'
import { Portfolio } from '@/components/sections/Portfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactFooter } from '@/components/sections/ContactFooter'
import { WhatsAppButton } from '@/components/sections/WhatsAppButton'

export function HomePage() {
  return (
    <div style={{ background: '#060c1c', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <ServicesGrid />
      <AboutUs />
      <DraftingBlock />
      <Portfolio />
      <Testimonials />
      <ContactFooter />
      <WhatsAppButton />
    </div>
  )
}
