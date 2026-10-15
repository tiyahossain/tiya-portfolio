import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

import ThemeToggle from './ThemeToggle'
import { springSoft } from './motion'
import { scrollToSection } from './scroll'

type NavLink = {
  id: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/** Keeps the right nav item highlighted while the page is scrolled. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (mostVisible?.target.id) setActive(mostVisible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.id), [])
  const active = useActiveSection(sectionIds)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const goTo = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollToSection(id)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress — flat electric bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="h-1.5 origin-left bg-sky"
      />

      <div
        className={`mx-auto w-full max-w-6xl px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? 'pt-2' : 'pt-3 sm:pt-5'
        }`}
      >
        <nav
          aria-label="Primary"
          className={[
            'relative flex items-center justify-between gap-3 px-3 transition-all duration-300',
            scrolled
              ? 'border-2 border-ink bg-card py-2.5 shadow-brutal sm:px-4'
              : 'border-2 border-transparent bg-transparent py-2.5 sm:px-4',
          ].join(' ')}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(event) => goTo(event, 'home')}
            className="group flex shrink-0 items-center gap-2.5 rounded-none"
          >
            <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-navy font-display text-sm text-ink-solid shadow-brutal-sm transition-transform duration-200 group-hover:-rotate-3">
              &lt;/&gt;
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm uppercase tracking-wide text-ink">
                tiya hossain
              </span>
              <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                full-stack · react &amp; node
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => goTo(event, link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={[
                      'relative block px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-150',
                      isActive
                        ? 'text-paper'
                        : 'text-ink hover:bg-navy hover:text-ink-solid',
                    ].join(' ')}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={springSoft}
                        className="absolute inset-0 border-2 border-ink bg-ink"
                      />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(event) => goTo(event, 'contact')}
              className="btn-brutal hidden bg-navy px-4 py-2.5 text-xs uppercase tracking-wide text-ink-solid md:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              Let&apos;s talk
            </a>

            {/* Burger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative grid h-10 w-10 place-items-center border-2 border-ink bg-card text-ink shadow-brutal-sm transition-colors xl:hidden"
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 block h-0.5 w-5 bg-ink"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[7px] block h-0.5 w-5 bg-ink"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-[14px] block h-0.5 w-5 bg-ink"
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="mt-2 border-2 border-ink bg-card p-2 shadow-brutal xl:hidden"
            >
              <ul className="flex flex-col border-2 border-ink">
                {NAV_LINKS.map((link, index) => {
                  const isActive = active === link.id
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + index * 0.04, duration: 0.25 }}
                      className={index > 0 ? 'border-t-2 border-ink' : ''}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(event) => goTo(event, link.id)}
                        className={[
                          'flex items-center justify-between gap-3 px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-colors',
                          isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-navy hover:text-ink-solid',
                        ].join(' ')}
                      >
                        {link.label}
                        <span className="font-mono text-[11px]">{`0${index + 1}`}</span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <a
                href="#contact"
                onClick={(event) => goTo(event, 'contact')}
                className="btn-brutal mt-2 flex w-full bg-navy px-4 py-3 text-sm uppercase tracking-wide text-ink-solid"
              >
                <Mail className="h-4 w-4" />
                Start a project
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Tap-away backdrop for the drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.button
            key="mobile-backdrop"
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 -z-10 cursor-default bg-ink/30 xl:hidden"
          />
        ) : null}
      </AnimatePresence>
    </header>
  )
}