import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { EASE } from './motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
  once?: boolean
}

/**
 * Small wrapper that fades + slides its children in when they scroll into view.
 * Respects `prefers-reduced-motion`.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
