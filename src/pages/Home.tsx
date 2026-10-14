import About from '@/components/About'
import ContactForm from '@/components/ContactForm'
import Education from '@/components/Education'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'

/**
 * Single-page home layout — every section lives in one scrolling flow.
 * Order: Hero → About → Skills → Projects → Education → Contact.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <ContactForm />
    </main>
  )
}
