import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { fadeUp, staggerContainer, viewportOnce } from './motion'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

/** Semantic, consistently spaced page section with a centred container. */
export function Section({ id, children, className = '', containerClassName = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-24 lg:py-28 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  )
}

type SectionHeadingProps = {
  /** Label text, e.g. "About me". */
  eyebrow: string
  /** Two-digit ordinal, e.g. "01". */
  index: string
  title: ReactNode
  description?: ReactNode
  id?: string
  align?: 'left' | 'center'
  className?: string
}

/** Numbered brutalist section header: [01] block + chunky display title. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  id,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
        <span className="border-2 border-ink bg-navy px-2.5 py-1 font-mono text-xs font-bold text-on-navy shadow-brutal-sm">
          /{index}
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-ink">
          {eyebrow}
        </span>
        <span
          aria-hidden="true"
          className="hidden h-0.5 w-12 border-b-2 border-dashed border-ink sm:block"
        />
      </motion.div>

      <motion.h2
        id={id ? `${id}-heading` : undefined}
        variants={fadeUp}
        className={`mt-6 max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}

export default Section