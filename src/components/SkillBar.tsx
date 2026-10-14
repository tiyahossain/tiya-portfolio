import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'

import { EASE } from './motion'

export type SkillTone = 'navy' | 'sky' | 'jam' | 'leaf' | 'tang'

const TONES: Record<SkillTone, string> = {
  navy: 'bg-navy',
  sky: 'bg-sky',
  jam: 'bg-jam',
  leaf: 'bg-leaf',
  tang: 'bg-tang',
}

type SkillBarProps = {
  name: string
  /** Proficiency, 0–100. */
  level: number
  icon?: ComponentType<{ className?: string }>
  /** Accent used for the fill and the percentage chip. */
  tone?: SkillTone
  /** Stagger the fill / count-up animation. */
  delay?: number
}

/**
 * Animated proficiency bar: the track fills and the percentage counts up the
 * first time the row scrolls into view. Respects `prefers-reduced-motion`.
 */
export default function SkillBar({ name, level, icon: Icon, tone = 'sky', delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const [prefersReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || prefersReduced) return

    const duration = 1100
    const startAt = performance.now() + delay * 1000
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - startAt) / duration, 0), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * level))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, level, delay, prefersReduced])

  const percentage = prefersReduced ? level : display

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-wide text-ink">
          {Icon ? <Icon className="h-4 w-4" /> : null}
          {name}
        </span>
        <span className={`border-2 border-ink px-2 py-1 font-mono text-xs font-bold text-ink tabular-nums ${TONES[tone]}`}>
          {percentage}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2.5 h-5 w-full border-2 border-ink bg-paper"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={
            prefersReduced ? { duration: 0 } : { duration: 1.1, ease: EASE, delay }
          }
          className={`relative h-full overflow-hidden ${TONES[tone]}`}
        >
          <span className="bg-stripes absolute inset-0" />
        </motion.div>
      </div>
    </div>
  )
}