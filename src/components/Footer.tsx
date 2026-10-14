import { ArrowUp, Heart, Mail, MapPin } from 'lucide-react'
import type { MouseEvent as ReactMouseEvent } from 'react'

import SocialLinks from './SocialLinks'
import { scrollToSection } from './scroll'

const BUILT_WITH = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/** Captured once at module scope — the year doesn't change mid-render. */
const CURRENT_YEAR = new Date().getFullYear()

/** Permanent dark slab — explicit colours so it stays black in both themes. */
export default function Footer() {
  const handleNav = (id: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <footer className="relative z-10 overflow-hidden border-t-4 border-navy bg-[#141414] text-[#f5f1e4] dark:bg-[#050505]">
      {/* Giant watermark */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="px-5 font-display text-[7.5rem] uppercase leading-[0.85] tracking-tight text-[#f5f1e4]/[0.055] sm:text-[11rem]">
          hossain
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 pb-4 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={handleNav('home')}
              className="group inline-flex items-center gap-2.5"
            >
              <span className="grid h-10 w-10 place-items-center border-2 border-[#f5f1e4] bg-navy font-display text-xs text-[#f5f1e4] shadow-[3px_3px_0_0_#8aa4ee] transition-transform duration-200 group-hover:-rotate-3">
                &lt;/&gt;
              </span>
              <span className="font-display text-base uppercase tracking-tight text-[#f5f1e4]">
                tiya hossain
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#c9c2ad]">
              Full-stack web developer building scalable applications with React and Node.js — and clean UI/UX
              from the first commit.
            </p>

            <SocialLinks
              className="mt-5"
              itemClassName="border-[#f5f1e4] bg-[#161616] text-[#f5f1e4] hover:bg-navy hover:text-[#f5f1e4] hover:border-[#f5f1e4]"
            />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy-soft">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={handleNav(link.id)}
                    className="font-mono text-sm font-bold uppercase tracking-wide text-[#c9c2ad] transition-colors hover:bg-navy hover:text-[#f5f1e4]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy-soft">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@tiyahossain.dev"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#c9c2ad] transition-colors hover:text-navy-soft"
                >
                  <Mail className="h-4 w-4 text-navy-soft" />
                  hello@tiyahossain.dev
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm font-bold text-[#c9c2ad]">
                <MapPin className="h-4 w-4 text-navy-soft" />
                Dhaka, Bangladesh · Remote
              </li>
              <li className="inline-flex items-center gap-2 text-sm font-bold text-[#c9c2ad]">
                <span className="inline-block h-2 w-2 animate-pulse bg-leaf" />
                Available for new work
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t-2 border-[#f5f1e4]/20 py-6 sm:flex-row">
          <p className="text-center font-mono text-xs font-bold uppercase tracking-wider text-[#c9c2ad] sm:text-left">
            © {CURRENT_YEAR} Tiya Hossain. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <p className="inline-flex items-center gap-1.5 font-mono text-xs text-[#c9c2ad]">
              Built with
              <Heart className="h-3.5 w-3.5 text-jam" />
              &
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {BUILT_WITH.map((tech) => (
                <li
                  key={tech}
                  className="border-2 border-[#f5f1e4]/30 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[#c9c2ad]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="inline-flex items-center gap-1.5 border-2 border-[#f5f1e4] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#f5f1e4] shadow-[3px_3px_0_0_#8aa4ee] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-navy hover:text-[#f5f1e4]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}