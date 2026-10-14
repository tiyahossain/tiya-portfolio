import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import dashboardShot from '@/assets/project-dashboard.svg'
import commerceShot from '@/assets/project-commerce.svg'
import collabShot from '@/assets/project-collab.svg'
import ProjectCard from './ProjectCard'
import type { Project } from './ProjectCard'
import { Section, SectionHeading } from './Section'
import { GithubIcon } from './BrandIcons'
import { staggerContainer, viewportOnce } from './motion'

/** Exactly three flagship builds — swap the copy/links for your own work. */
const PROJECTS: Project[] = [
  {
    title: 'PulseBoard — Realtime Analytics',
    description:
      'A multi-tenant analytics platform that streams live product metrics over WebSockets. Includes role-based access, saved dashboards, drill-down charts and a background job pipeline that aggregates 1M+ daily events.',
    image: dashboardShot,
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
    demoUrl: 'https://pulseboard.tiyahossain.dev',
    repoUrl: 'https://github.com/tiyahossain/pulseboard',
    featured: true,
  },
  {
    title: 'Cartly — Headless Storefront',
    description:
      'A headless e-commerce storefront with server-rendered product pages, optimistic cart updates, Stripe checkout and a typed admin API. Scored 98/100 on Lighthouse performance for the catalogue route.',
    image: commerceShot,
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Prisma', 'Stripe'],
    demoUrl: 'https://cartly.tiyahossain.dev',
    repoUrl: 'https://github.com/tiyahossain/cartly',
  },
  {
    title: 'SyncSpace — Collaborative Editor',
    description:
      'A realtime workspace for docs and kanban boards with presence indicators, cursor tracking and conflict-free sync. Debounced persistence plus an event log keep every edit recoverable.',
    image: collabShot,
    tags: ['React', 'Node.js', 'Socket.IO', 'Redis', 'MongoDB'],
    demoUrl: 'https://syncspace.tiyahossain.dev',
    repoUrl: 'https://github.com/tiyahossain/syncspace',
  },
]

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Projects"
        title={
          <>
            Selected work, built <span className="mark-jam">end to end</span>
          </>
        }
        description="Three production-shaped builds that show how I think about data flow, performance and interface detail. Every one is live and open source."
      />

      <motion.div
        variants={staggerContainer(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            className={index === PROJECTS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="https://github.com/tiyahossain?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brutal bg-card px-6 py-3.5 text-sm uppercase tracking-wide text-ink"
        >
          <GithubIcon className="h-4 w-4" />
          Explore more on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </Section>
  )
}