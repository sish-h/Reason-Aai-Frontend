import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { TrustedBy } from '@/components/landing/trusted-by'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'
import { Navigation } from '@/components/navigation/navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <TrustedBy />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
