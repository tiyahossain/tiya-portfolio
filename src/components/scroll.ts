/** Smooth-scrolls to a section by id and keeps the URL hash in sync. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)

  if (!target) {
    window.location.hash = id
    return
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}
