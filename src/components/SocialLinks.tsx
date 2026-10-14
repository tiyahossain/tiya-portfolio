import type { ComponentType } from 'react'

import { GithubIcon, LinkedinIcon, XIcon } from './BrandIcons'

export type Social = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export const SOCIALS: Social[] = [
  { label: 'GitHub', href: 'https://github.com/tiyahossain', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tiyahossain', icon: LinkedinIcon },
  { label: 'X (Twitter)', href: 'https://x.com/tiyahossain', icon: XIcon },
]

type SocialLinksProps = {
  className?: string
  iconClassName?: string
  /**
   * Utility classes appended last. Because base colours live in the
   * `.social-tile` component layer, any `border-*`/`bg-*`/`text-*` utilities
   * passed here reliably win (utilities beat components in Tailwind).
   */
  itemClassName?: string
}

/** Square social tiles — always open in a new tab with a safe rel. */
export default function SocialLinks({
  className = '',
  iconClassName = 'h-[18px] w-[18px]',
  itemClassName = '',
}: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={[
              'social-tile grid h-10 w-10 place-items-center border-2',
              'shadow-brutal-sm transition-all duration-150',
              'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-navy hover:text-on-navy hover:shadow-brutal',
              itemClassName,
            ].join(' ')}
          >
            <Icon className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  )
}