import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Mail, MapPin } from 'lucide-react'
import type { MouseEvent as ReactMouseEvent } from 'react'

import Mascot from './Mascot'
import SocialLinks from './SocialLinks'
import { EASE, fadeUp, staggerContainer } from './motion'
import { scrollToSection } from './scroll'

const TECH_MARQUEE = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'REST & GraphQL',
  'Prisma',
  'Docker',
  'AWS',
  'Vitest',
  'Git & CI/CD',
  'Vite',
]

const STATS = [
  { index: '01', value: '3+', label: 'Years building the web' },
  { index: '02', value: '24+', label: 'Products & APIs shipped' },
  { index: '03', value: '100%', label: 'Responsive & accessible' },
]

export default function Hero() {
  const handleNav = (id: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-36">
      {/* Flat graphic backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-soft mask-fade-edges absolute inset-0" />
        <motion.div
          animate={{ rotate: [0, 8, 0], x: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-16 top-16 h-40 w-40 border-2 border-ink bg-navy shadow-brutal"
        />
        <motion.div
          animate={{ rotate: [6, -6, 6], y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-8 top-28 h-28 w-28 border-2 border-ink bg-sky shadow-brutal"
        />
        <motion.div
          animate={{ rotate: [-10, 4, -10] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-12 bottom-24 h-48 w-48 border-2 border-ink bg-jam shadow-brutal"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/4 h-20 w-20 border-2 border-ink bg-leaf shadow-brutal"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          {/* ── Copy ─────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer(0.11, 0.05)}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm"
            >
              <span className="h-2.5 w-2.5 animate-pulse bg-leaf" />
              Open for new projects — 2026
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-[2.6rem] font-black uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
            >
              Crafting
              <span className="mt-2 block">
                <span className="mark-navy">Digital Experiences</span>
              </span>
              <span className="mt-2 block">That Matter.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0"
            >
              I&apos;m <strong className="font-bold underline decoration-jam decoration-4 underline-offset-4">Tiya Hossain</strong> — a
              full-stack web developer specialising in{' '}
              <strong className="font-bold">React &amp; Node.js</strong>. I build scalable web
              applications where clean architecture meets a UI/UX that doesn&apos;t get in the way.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={handleNav('projects')}
                className="btn-brutal bg-ink px-7 py-3.5 text-sm uppercase tracking-wide text-paper"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                onClick={handleNav('contact')}
                className="btn-brutal bg-card px-7 py-3.5 text-sm uppercase tracking-wide text-ink"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
            >
              <SocialLinks />
              <span className="hidden h-8 w-0.5 bg-ink sm:block" />
              <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider">
                <MapPin className="h-4 w-4" />
                Dhaka · Remote
              </span>
            </motion.div>
          </motion.div>

          {/* ── Interactive 3D mascot (avatar slot) ──────────── */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[24rem] lg:max-w-none"
          >
            <Mascot />
          </motion.div>
        </div>

        {/* ── Stats ─────────────────────────────────────────── */}
        <motion.dl
          variants={staggerContainer(0.11, 0.55)}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {STATS.map((stat, index) => {
            const accents = ['bg-navy', 'bg-sky', 'bg-jam']
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex items-stretch gap-4 border-2 border-ink bg-card shadow-brutal"
              >
                <span className={`grid w-12 shrink-0 place-items-center border-r-2 border-ink font-mono text-xs font-bold ${accents[index]} ${index === 0 ? 'text-on-navy' : 'text-ink-solid'}`}>
                  {stat.index}
                </span>
                <div className="py-4 pr-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl leading-none">{stat.value}</dd>
                  <dd className="mt-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    {stat.label}
                  </dd>
                </div>
              </motion.div>
            )
          })}
        </motion.dl>
      </div>

      {/* ── Tech marquee — full-bleed strip ─────────────────── */}
      <div className="mt-14 w-full overflow-hidden border-y-2 border-ink bg-navy py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-8 hover:[animation-play-state:paused]">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest text-on-navy"
            >
              {tech}
              <span aria-hidden="true">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────── */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to the about section"
        className="mx-auto mt-10 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink"
      >
        <span className="animate-bounce-y grid h-10 w-10 place-items-center border-2 border-ink bg-card shadow-brutal-sm">
          <ArrowDown className="h-4 w-4" />
        </span>
        Scroll
      </motion.button>
    </section>
  )
}