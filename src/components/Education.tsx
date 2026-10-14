import { motion } from 'framer-motion'
import { Award, BadgeCheck, BookOpen, GraduationCap } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import Timeline from './Timeline'
import type { TimelineEntry } from './Timeline'
import { fadeUp, staggerContainer, viewportOnce } from './motion'

/** Oldest → newest, so the rail visually "draws" through my history. */
const ENTRIES: TimelineEntry[] = [
  {
    id: 'hsc',
    kind: 'degree',
    title: 'Higher Secondary Certificate — Science',
    org: 'Dhaka College',
    period: '2016 — 2018',
    description:
      'Built the analytical foundation I still lean on: mathematics, physics and the first taste of writing small programs to solve homework problems.',
    highlights: ['GPA 5.00 / 5.00', 'First exposure to C and algorithmic thinking'],
    icon: BookOpen,
    tone: 'navy',
  },
  {
    id: 'bsc',
    kind: 'degree',
    title: 'B.Sc. in Computer Science & Engineering',
    org: 'Daffodil International University',
    period: '2019 — 2023',
    description:
      'Four years of data structures, databases, networking and software engineering — capped with a final-year project building a full-stack web platform with a React client and a Node.js API.',
    highlights: [
      'Graduated with distinction (CGPA 3.82 / 4.00)',
      'Led the university programming club’s web team',
      'Thesis: scalable architectures for realtime web applications',
    ],
    icon: GraduationCap,
    tone: 'sky',
  },
  {
    id: 'freecodecamp',
    kind: 'certification',
    title: 'Responsive Web Design Certification',
    org: 'freeCodeCamp',
    period: '2023',
    description:
      '300 hours of hands-on HTML, CSS, flexbox, grid and accessibility fundamentals — the base layer every interface I build still sits on.',
    highlights: ['Semantic markup & ARIA basics', 'Flexbox, CSS grid and responsive layouts'],
    icon: BadgeCheck,
    tone: 'jam',
    credentialUrl: 'https://www.freecodecamp.org/certification/tiyahossain/responsive-web-design',
  },
  {
    id: 'meta',
    kind: 'certification',
    title: 'Meta Front-End Developer Professional Certificate',
    org: 'Coursera · Meta',
    period: '2024',
    description:
      'A nine-course specialisation covering React, advanced state management, UX principles and version control — with a capstone project shipped to production.',
    highlights: ['Advanced React patterns & hooks', 'UX research and wireframing'],
    icon: Award,
    tone: 'leaf',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/tiyahossain-meta-frontend',
  },
  {
    id: 'aws',
    kind: 'certification',
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    period: '2024',
    description:
      'Cloud fundamentals across compute, storage, networking and cost — used daily to reason about how the Node.js services I write are deployed and scaled.',
    highlights: ['EC2, S3, RDS & IAM essentials', 'Deployment, scaling and cost awareness'],
    icon: Award,
    tone: 'tang',
    credentialUrl: 'https://www.credly.com/badges/tiyahossain-aws-cloud-practitioner',
  },
  {
    id: 'mongodb',
    kind: 'certification',
    title: 'MongoDB Associate Developer — Node.js',
    org: 'MongoDB University',
    period: '2025',
    description:
      'Document modelling, aggregation pipelines, indexing strategy and the Node.js driver — sharpening the data layer of the APIs I build.',
    highlights: ['Schema design & aggregation pipelines', 'Indexing and query performance'],
    icon: Award,
    tone: 'grape',
    credentialUrl: 'https://learn.mongodb.com/c/tiyahossain-associate-developer-nodejs',
  },
]

const SUMMARY = [
  { value: '2', label: 'Academic degrees' },
  { value: '4', label: 'IT certifications' },
  { value: '300+', label: 'Hours of structured coursework' },
]

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading
        id="education"
        index="04"
        eyebrow="Education & Certifications"
        title={
          <>
            A foundation built on <span className="mark-leaf">learning in public</span>
          </>
        }
        description="Formal computer science, plus the certifications that keep my stack current. Everything below is verifiable."
      />

      <motion.dl
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {SUMMARY.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="border-2 border-ink bg-card px-5 py-4 text-center shadow-brutal"
          >
            <dt className="sr-only">{item.label}</dt>
            <dd className="font-display text-3xl leading-none text-ink">{item.value}</dd>
            <dd className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
              {item.label}
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      <Timeline entries={ENTRIES} />
    </Section>
  )
}