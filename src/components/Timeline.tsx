import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { useRef } from 'react'
import type { ComponentType } from 'react'

import { EASE } from './motion'

export type TimelineTone = 'navy' | 'sky' | 'jam' | 'leaf' | 'tang' | 'grape'

export type TimelineEntry = {
  id: string
  kind: 'degree' | 'certification'
  title: string
  org: string
  period: string
  description: string
  highlights?: string[]
  icon: ComponentType<{ className?: string }>
  /** Accent colour used for the node marker and the kind chip. */
  tone: TimelineTone
  credentialUrl?: string
}

type TimelineProps = {
  entries: TimelineEntry[]
}

const TONES: Record<TimelineTone, string> = {
  navy: 'bg-navy',
  sky: 'bg-sky',
  jam: 'bg-jam',
  leaf: 'bg-leaf',
  tang: 'bg-tang',
  grape: 'bg-grape',
}

const KIND_LABEL: Record<TimelineEntry['kind'], string> = {
  degree: 'Degree',
  certification: 'Certification',
}

function TimelineNode({ entry }: { entry: TimelineEntry }) {
  const Icon = entry.icon

  return (
    <span className="relative z-10 grid place-items-center">
      <span
        className={`grid h-11 w-11 place-items-center border-2 border-ink ${TONES[entry.tone]} shadow-brutal-sm`}
      >
        <Icon className="h-4.5 w-4.5 text-ink-solid" />
      </span>
    </span>
  )
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="card-brutal bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={`chip-brutal px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${TONES[entry.tone]} text-ink-solid`}
        >
          {KIND_LABEL[entry.kind]}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink">
          <CalendarDays className="h-3.5 w-3.5" />
          {entry.period}
        </span>
      </div>

      <h3 className="mt-3.5 font-display text-base uppercase leading-snug tracking-tight">
        {entry.title}
      </h3>
      <p className="mt-1 text-sm font-bold text-ink">
        <span className={`mr-2 inline-block h-2.5 w-2.5 ${TONES[entry.tone]}`} aria-hidden="true" />
        {entry.org}
      </p>
      <p className="mt-3 text-sm leading-relaxed">{entry.description}</p>

      {entry.highlights?.length ? (
        <ul className="mt-4 space-y-2 border-l-2 border-ink pl-4">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-xs font-medium leading-relaxed text-ink">
              <span className={`inline-block h-2.5 w-2.5 shrink-0 ${TONES[entry.tone]}`} aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      {entry.credentialUrl ? (
        <a
          href={entry.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          View credential
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span className="sr-only">for {entry.title} (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  )
}

/**
 * Vertical chronological timeline. The connector line "draws" itself as the
 * list scrolls, and each entry alternates sides on large screens.
 */
export default function Timeline({ entries }: TimelineProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <ol ref={listRef} className="relative mt-14">
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-2 h-[calc(100%-1rem)] w-1.5 -translate-x-1/2 bg-ink/20 lg:left-1/2"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute left-5 top-2 h-[calc(100%-1rem)] w-1.5 origin-top -translate-x-1/2 bg-navy lg:left-1/2"
      />

      {entries.map((entry, index) => {
        const isLeft = index % 2 === 0

        return (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative pb-10 pl-16 last:pb-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:pl-0"
          >
            {/* Node */}
            <span className="absolute left-5 top-1 -translate-x-1/2 lg:left-1/2">
              <TimelineNode entry={entry} />
            </span>

            {/* Card */}
            <div
              className={
                isLeft
                  ? 'lg:col-start-1 lg:row-start-1 lg:pr-2'
                  : 'lg:col-start-2 lg:row-start-1 lg:pl-2'
              }
            >
              <TimelineCard entry={entry} />
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}