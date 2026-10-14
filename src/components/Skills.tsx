import { motion } from 'framer-motion'
import {
  Blocks,
  Braces,
  Cloud,
  Container,
  Database,
  Eye,
  GitBranch,
  GitPullRequest,
  Layers,
  MonitorSmartphone,
  Palette,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTubeDiagonal,
  Workflow,
  Zap,
} from 'lucide-react'
import type { ComponentType } from 'react'

import { Section, SectionHeading } from './Section'
import SkillBar from './SkillBar'
import type { SkillTone } from './SkillBar'
import { fadeUp, staggerContainer, viewportOnce } from './motion'

type Skill = {
  name: string
  level: number
  icon: ComponentType<{ className?: string }>
  tone: SkillTone
}

type SkillCategory = {
  title: string
  blurb: string
  icon: ComponentType<{ className?: string }>
  band: string
  code: string
  skills: Skill[]
}

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    code: 'fe/',
    blurb: 'Interfaces that stay fast as they grow.',
    icon: MonitorSmartphone,
    band: 'bg-navy',
    skills: [
      { name: 'React & Next.js', level: 95, icon: Blocks, tone: 'navy' },
      { name: 'TypeScript', level: 90, icon: Braces, tone: 'navy' },
      { name: 'Tailwind CSS', level: 93, icon: Palette, tone: 'navy' },
      { name: 'Framer Motion', level: 86, icon: Sparkles, tone: 'navy' },
      { name: 'Responsive & accessible UI', level: 92, icon: Eye, tone: 'navy' },
    ],
  },
  {
    title: 'Backend',
    code: 'be/',
    blurb: 'APIs and data layers built to scale.',
    icon: Server,
    band: 'bg-sky',
    skills: [
      { name: 'Node.js', level: 91, icon: Server, tone: 'sky' },
      { name: 'Express & REST API design', level: 89, icon: Workflow, tone: 'sky' },
      { name: 'PostgreSQL & Prisma', level: 85, icon: Database, tone: 'sky' },
      { name: 'MongoDB', level: 80, icon: Layers, tone: 'sky' },
      { name: 'Auth & web security', level: 82, icon: ShieldCheck, tone: 'sky' },
    ],
  },
  {
    title: 'Tools & DevOps',
    code: 'tools/',
    blurb: 'The workflow that keeps shipping calm.',
    icon: Container,
    band: 'bg-jam',
    skills: [
      { name: 'Git & GitHub', level: 93, icon: GitBranch, tone: 'jam' },
      { name: 'Vite & tooling', level: 88, icon: Zap, tone: 'jam' },
      { name: 'Docker', level: 76, icon: Container, tone: 'jam' },
      { name: 'Testing (Vitest / Jest)', level: 81, icon: TestTubeDiagonal, tone: 'jam' },
      { name: 'AWS & CI/CD', level: 74, icon: Cloud, tone: 'jam' },
    ],
  },
]

const WORKFLOW = [
  'Requirements → wireframe',
  'Typed React components',
  'Reusable design tokens',
  'REST / GraphQL contracts',
  'Automated tests',
  'CI previews & reviews',
  'Observability & iteration',
]

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        index="02"
        eyebrow="Skills"
        title={
          <>
            A toolkit tuned for <span className="mark-sky">scalable products</span>
          </>
        }
        description="Honest proficiency levels across the three areas I work in every day — frontend craft, backend systems, and the tooling that holds it together."
      />

      <motion.div
        variants={staggerContainer(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {CATEGORIES.map((category) => {
          const CategoryIcon = category.icon
          return (
            <motion.article
              key={category.title}
              variants={fadeUp}
              className="card-brutal bg-card"
            >
              {/* Colour band header */}
              <div className={`flex items-center gap-3 border-b-2 border-ink px-5 py-4 ${category.band}`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-card text-ink">
                  <CategoryIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base uppercase leading-none tracking-tight text-ink-solid">
                    {category.title}
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-solid">
                    {category.code}
                  </p>
                </div>
                <span className="ml-auto hidden font-mono text-[11px] font-bold text-ink-solid sm:block">
                  N={category.skills.length}
                </span>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  {category.blurb}
                </p>
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    tone={skill.tone}
                    delay={0.1 + index * 0.09}
                  />
                ))}
              </div>
            </motion.article>
          )
        })}
      </motion.div>

      {/* Workflow slab */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.55 }}
        className="mt-10 border-2 border-ink bg-ink shadow-brutal"
      >
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="inline-flex w-max items-center gap-2 border-2 border-ink bg-navy px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-solid shadow-brutal-sm">
            <Terminal className="h-4 w-4" />
            How I ship
          </span>

          <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {WORKFLOW.map((step, index) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-paper">
                  <span className="text-navy">✳</span>
                  {step}
                </span>
                {index < WORKFLOW.length - 1 ? (
                  <span className="text-paper/40" aria-hidden="true">
                    <GitPullRequest className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink"
      >
        <Terminal className="mr-2 inline h-3.5 w-3.5" />
        always learning — system design &amp; edge rendering next
      </motion.p>
    </Section>
  )
}