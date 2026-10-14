import { Moon, Sun } from 'lucide-react'

import { useTheme } from './ThemeProvider'

type ThemeToggleProps = {
  className?: string
}

/** Segmented LIGHT / DARK switch with a hard offset shadow. */
export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Colour scheme"
      className={`flex border-2 border-ink bg-card shadow-brutal-sm ${className}`}
    >
      <button
        type="button"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
        className={[
          'inline-flex items-center gap-1.5 px-2.5 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-150',
          theme === 'light'
            ? 'bg-ink text-paper'
            : 'text-ink hover:bg-navy hover:text-on-navy',
        ].join(' ')}
      >
        <Sun className="h-3.5 w-3.5" />
        Light
      </button>
      <button
        type="button"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={[
          'inline-flex items-center gap-1.5 border-l-2 border-ink px-2.5 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-150',
          theme === 'dark'
            ? 'bg-ink text-paper'
            : 'text-ink hover:bg-navy hover:text-on-navy',
        ].join(' ')}
      >
        <Moon className="h-3.5 w-3.5" />
        Dark
      </button>
    </div>
  )
}