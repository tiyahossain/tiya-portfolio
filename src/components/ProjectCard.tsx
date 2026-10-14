import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { GithubIcon } from './BrandIcons'
import { fadeUp } from './motion'

export type Project = {
  title: string
  /** Short, punchy description of what the project does. */
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
  featured?: boolean
}

type ProjectCardProps = {
  project: Project
  /** 0-based position, used for the big card number. */
  index: number
  className?: string
}

/** Brutalist work card: hard border, chunky shadow, loud action slabs. */
export default function ProjectCard({ project, index, className = '' }: ProjectCardProps) {
  const { title, description, image, tags, demoUrl, repoUrl, featured } = project

  return (
    <motion.article
      variants={fadeUp}
      className={`card-brutal group flex h-full flex-col bg-card ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink">
        <img
          src={image}
          alt={`${title} interface preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        <span className="absolute left-3 top-3 border-2 border-ink bg-card px-2.5 py-1 font-mono text-xs font-bold text-ink shadow-brutal-sm">
          {`0${index + 1}`}
        </span>

        {featured ? (
          <span className="chip-brutal absolute right-3 top-3 bg-navy px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-solid">
            ★ Featured
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed">{description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <span className="chip-brutal bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t-2 border-ink pt-5">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal bg-navy px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-solid"
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span className="sr-only">for {title} (opens in a new tab)</span>
          </a>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal bg-card px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-ink"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Source
            <span className="sr-only">for {title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}