import type { Transition, Variants } from 'framer-motion'

/** Shared "expo-out" easing curve — gives every reveal the same premium feel. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const springSoft: Transition = { type: 'spring', stiffness: 220, damping: 26 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/** Standard viewport config so scroll animations fire once, slightly early. */
export const viewportOnce = { once: true, amount: 0.2 } as const
