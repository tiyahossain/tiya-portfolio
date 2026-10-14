import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import Home from '@/pages/Home'

export default function App() {
  return (
    <ThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-2 focus:border-ink focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-on-navy focus:shadow-brutal"
      >
        Skip to content
      </a>

      <Navbar />
      <Home />
      <Footer />
      <BackToTop />
    </ThemeProvider>
  )
}
