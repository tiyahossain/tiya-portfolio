import { motion } from 'framer-motion'
import { CodeXml, Lightbulb, Target, Terminal } from 'lucide-react'

import Reveal from './Reveal'
import { Section, SectionHeading } from './Section'
import { fadeUp, staggerContainer, viewportOnce } from './motion'

const PILLARS = [
  {
    icon: CodeXml,
    accent: 'bg-navy',
    accentText: 'text-on-navy',
    number: '01',
    title: 'Clean code, first',
    body: 'Readable, typed and tested by default. I optimise for the developer who reads the code next — architecture before cleverness.',
  },
  {
    icon: Lightbulb,
    accent: 'bg-sky',
    accentText: 'text-ink-solid',
    number: '02',
    title: 'Problem-solving mindset',
    body: 'I turn fuzzy requirements into small, shippable slices, then measure what actually shipped instead of guessing.',
  },
  {
    icon: Target,
    accent: 'bg-jam',
    accentText: 'text-ink-solid',
    number: '03',
    title: 'Growth on purpose',
    body: 'Growing toward front-end architecture and design systems for products used at real scale, with real constraints.',
  },
]

const CODE_SNIPPET: { indent: number; tokens: { text: string; className: string }[] }[] = [
  {
    indent: 0,
    tokens: [
      { text: 'const', className: 'text-jam' },
      { text: ' tiya', className: 'text-paper' },
      { text: ' = {', className: 'text-paper/70' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'role', className: 'text-sky' },
      { text: ': ', className: 'text-paper/70' },
      { text: "'Full-Stack Web Developer'", className: 'text-leaf' },
      { text: ',', className: 'text-paper/70' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'stack', className: 'text-sky' },
      { text: ': [', className: 'text-paper/70' },
      { text: "'React'", className: 'text-leaf' },
      { text: ', ', className: 'text-paper/70' },
      { text: "'TypeScript'", className: 'text-leaf' },
      { text: ', ', className: 'text-paper/70' },
      { text: "'Node.js'", className: 'text-leaf' },
      { text: '],', className: 'text-paper/70' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'values', className: 'text-sky' },
      { text: ': [', className: 'text-paper/70' },
      { text: "'clarity'", className: 'text-leaf' },
      { text: ', ', className: 'text-paper/70' },
      { text: "'performance'", className: 'text-leaf' },
      { text: ', ', className: 'text-paper/70' },
      { text: "'accessibility'", className: 'text-leaf' },
      { text: '],', className: 'text-paper/70' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'currently', className: 'text-sky' },
      { text: ': ', className: 'text-paper/70' },
      { text: "'building scalable product platforms'", className: 'text-leaf' },
      { text: ',', className: 'text-paper/70' },
    ],
  },
  { indent: 0, tokens: [{ text: '}', className: 'text-paper/70' }] },
]

const TAGS = [
  'Scalable architecture',
  'Design systems',
  'API design',
  'Performance budgets',
  'Accessibility (a11y)',
  'Mentoring & code review',
]

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        id="about"
        index="01"
        eyebrow="About me"
        title={
          <>
            Engineering software that feels <span className="mark-navy">effortless</span>
          </>
        }
        description="A quick look at how I think about code, products and the people who use them."
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        {/* Narrative */}
        <div className="min-w-0 space-y-6">
          <Reveal>
            <p className="text-base leading-relaxed sm:text-[1.0625rem]">
              I&apos;m a full-stack web developer who fell for the craft the moment a messy idea turned into
              something people could actually click. Today I work across the whole stack — thoughtful React
              interfaces on the front, well-shaped Node.js APIs on the back — and I care just as much about the{' '}
              <strong className="mark-leaf px-1 py-0.5">seams between them</strong> as the features on top.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed sm:text-[1.0625rem]">
              My approach is simple: understand the problem properly, keep the codebase readable, and ship in
              small increments. I write typed, documented code, treat accessibility and performance as features
              rather than afterthoughts, and review my own pull requests like a stranger would. When something
              breaks in production, I want the trail to be obvious — not a mystery hunt.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-base leading-relaxed sm:text-[1.0625rem]">
              Right now I&apos;m deepening my focus on scalability: cleaner data boundaries, better observability,
              and design systems that let a team move fast without drifting. Long term, I want to architect
              front-end platforms for products that serve thousands of people a day.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="flex flex-wrap gap-3 pt-1">
              {TAGS.map((tag, index) => (
                <span
                  key={tag}
                  className={`chip-brutal px-3 py-1.5 font-mono text-xs font-bold ${
                    index % 3 === 0
                      ? 'bg-navy text-on-navy'
                      : index % 3 === 1
                        ? 'bg-sky text-ink-solid'
                        : 'bg-jam text-ink-solid'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Code block — inverted slab */}
        <Reveal delay={0.1} y={34} className="min-w-0">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-full w-full border-2 border-ink bg-jam shadow-brutal"
            />

            <div className="relative border-2 border-ink bg-ink shadow-brutal-lg">
              {/* title bar */}
              <div className="flex items-center border-b-2 border-ink">
                <span className="border-r-2 border-paper/30 bg-navy px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-on-navy">
                  about.ts
                </span>
                <span className="ml-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-paper/60">
                  <Terminal className="h-3.5 w-3.5" />
                  profile
                </span>
              </div>

              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
                <code>
                  {CODE_SNIPPET.map((line, lineIndex) => (
                    <span key={lineIndex} className="flex">
                      <span className="mr-4 w-5 shrink-0 select-none text-right text-paper/35">
                        {lineIndex + 1}
                      </span>
                      <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                        {line.tokens.map((token, tokenIndex) => (
                          <span key={tokenIndex} className={token.className}>
                            {token.text}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                  <span className="flex">
                    <span className="mr-4 w-5 shrink-0 select-none text-right text-paper/35">08</span>
                    <span className="inline-block h-4 w-2.5 animate-caret bg-navy" />
                  </span>
                </code>
              </pre>

              <div className="flex items-center gap-2 border-t-2 border-paper/30 bg-paper/10 px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-paper/70">
                <span className="h-2.5 w-2.5 bg-leaf" />
                exec done — clean, maintainable, shipped.
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Pillars */}
      <motion.ul
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PILLARS.map(({ icon: Icon, accent, accentText, number, title, body }) => (
          <motion.li key={title} variants={fadeUp}>
            <div className="card-brutal group flex h-full flex-col bg-card">
              <div className={`flex items-center justify-between border-b-2 border-ink ${accent} ${accentText} px-5 py-3`}>
                <span className="font-display text-lg">{number}.</span>
                <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-card text-ink">
                  <Icon className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-black uppercase tracking-tight">{title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}