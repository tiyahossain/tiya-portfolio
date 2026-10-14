import { motion } from 'framer-motion'
import {
  CircleAlert,
  CircleCheck,
  Clock,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { Section, SectionHeading } from './Section'
import SocialLinks from './SocialLinks'
import { EASE } from './motion'

type FieldName = 'name' | 'email' | 'message'
type FormValues = Record<FieldName, string>
type FormErrors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL_VALUES: FormValues = { name: '', email: '', message: '' }
const MESSAGE_LIMIT = 1000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/* Flip to `true` to preview the error state without wiring a service. */
const SIMULATE_FAILURE = false

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  switch (field) {
    case 'name':
      if (!trimmed) return 'Please tell me your name.'
      if (trimmed.length < 2) return 'That looks a little short — at least 2 characters.'
      return undefined
    case 'email':
      if (!trimmed) return 'An email address is required so I can reply.'
      if (!EMAIL_PATTERN.test(trimmed)) return 'Hmm, that email address looks invalid.'
      return undefined
    case 'message':
      if (!trimmed) return 'Don’t be shy — add a short message.'
      if (trimmed.length < 10) return 'A few more details please (at least 10 characters).'
      return undefined
    default:
      return undefined
  }
}

const CONTACT_DETAILS = [
  {
    icon: Mail,
    accent: 'bg-navy',
    accentText: 'text-on-navy',
    label: 'Email',
    value: 'hello@tiyahossain.dev',
    href: 'mailto:hello@tiyahossain.dev',
  },
  { icon: MapPin, accent: 'bg-sky', accentText: 'text-ink-solid', label: 'Location', value: 'Dhaka, Bangladesh · Remote worldwide' },
  { icon: Clock, accent: 'bg-jam', accentText: 'text-ink-solid', label: 'Response time', value: 'Usually within 24 hours' },
]

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const handleChange = (
    field: FieldName,
  ): ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => (event) => {
    const value = event.target.value
    setValues((current) => ({ ...current, [field]: value }))

    if (status === 'success' || status === 'error') setStatus('idle')

    // Clear an existing error as soon as the field becomes valid.
    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }))
    }
  }

  const handleBlur = (field: FieldName) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FormErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    }

    const hasErrors = Object.values(nextErrors).some(Boolean)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })

    if (hasErrors) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      // ── Connect your form service here ──────────────────────────────────
      // e.g. await fetch('https://formspree.io/f/your-id', {
      //        method: 'POST',
      //        headers: { 'Content-Type': 'application/json' },
      //        body: JSON.stringify(values),
      //      })
      await new Promise((resolve) => setTimeout(resolve, 1200))
      if (SIMULATE_FAILURE) throw new Error('Simulated network failure')

      if (!mounted.current) return
      setStatus('success')
      setValues(INITIAL_VALUES)
      setTouched({})
      setErrors({})
    } catch {
      if (!mounted.current) return
      setStatus('error')
    }
  }

  const inputClasses = (field: FieldName) => {
    const hasError = Boolean(errors[field] && touched[field])

    return [
      'w-full border-2 border-ink bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-all duration-150',
      'placeholder:text-ink/40 focus:bg-card focus:shadow-brutal focus-visible:outline-none',
      hasError ? 'border-jam focus:shadow-[4px_4px_0_0_var(--color-jam)]' : '',
    ].join(' ')
  }

  const nameError = touched.name ? errors.name : undefined
  const emailError = touched.email ? errors.email : undefined
  const messageError = touched.message ? errors.message : undefined

  const fieldErrorText = (message: string) => (
    <span className="flex items-start gap-2 font-mono text-xs font-bold text-ink">
      <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jam" />
      {message}
    </span>
  )

  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        index="05"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="mark-sky">worth shipping</span>
          </>
        }
        description="Have a product to build, a codebase to untangle, or a role in mind? Send a note — I read every message myself."
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-4"
        >
          {CONTACT_DETAILS.map(({ icon: Icon, accent, accentText, label, value, href }) => (
            <div
              key={label}
              className="card-brutal flex items-start gap-4 bg-card p-5 transition-transform"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center border-2 border-ink ${accent} ${accentText} shadow-brutal-sm`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block truncate text-sm font-bold text-ink underline-offset-4 transition-colors hover:bg-navy hover:text-on-navy"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 block text-sm font-bold text-ink">{value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="border-2 border-ink bg-leaf p-5 shadow-brutal">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-ink-solid">
              <ShieldCheck className="h-4 w-4" />
              Currently open to projects
            </p>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink-solid/90">
              Contract, part-time or full-time. Freelance builds and long-term product teams both welcome.
            </p>
          </div>

          <div className="mt-1">
            <p className="mb-3 border-l-2 border-ink pl-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
              Elsewhere — say hi
            </p>
            <SocialLinks />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contact-heading"
            className="relative border-2 border-ink bg-card p-6 shadow-brutal sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink"
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tiya Hossain"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? 'contact-name-error' : undefined}
                  className={inputClasses('name')}
                />
                {nameError ? (
                  <p id="contact-name-error" role="alert" className="mt-2">
                    {fieldErrorText(nameError)}
                  </p>
                ) : null}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink"
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'contact-email-error' : undefined}
                  className={inputClasses('email')}
                />
                {emailError ? (
                  <p id="contact-email-error" role="alert" className="mt-2">
                    {fieldErrorText(emailError)}
                  </p>
                ) : null}
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink"
                  >
                    Message *
                  </label>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      values.message.length > MESSAGE_LIMIT ? 'text-jam' : 'text-ink/60'
                    }`}
                  >
                    {values.message.length}/{MESSAGE_LIMIT}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  maxLength={MESSAGE_LIMIT}
                  placeholder="Tell me about the project, the timeline and what success looks like…"
                  value={values.message}
                  onChange={handleChange('message')}
                  onBlur={handleBlur('message')}
                  aria-invalid={Boolean(messageError)}
                  aria-describedby={messageError ? 'contact-message-error' : undefined}
                  className={`${inputClasses('message')} resize-y`}
                />
                {messageError ? (
                  <p id="contact-message-error" role="alert" className="mt-2">
                    {fieldErrorText(messageError)}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Honeypot — hidden from humans, bots love it */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-brutal bg-ink px-6 py-3.5 text-sm uppercase tracking-wide text-paper disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>

              <p className="font-mono text-xs leading-relaxed text-ink">
                Your details stay private. No newsletters, ever.
              </p>
            </div>

            {/* Status feedback */}
            <div aria-live="polite" className="mt-4">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 border-2 border-ink bg-leaf px-4 py-3 text-sm font-bold text-ink-solid shadow-brutal"
                >
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Message sent — thanks! I&apos;ll get back to you within 24 hours.
                    <span className="mt-0.5 block text-xs font-medium text-ink-solid/90">
                      Hook this form up to Formspree, EmailJS or your own API to go live.
                    </span>
                  </span>
                </motion.div>
              ) : null}

              {status === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 border-2 border-ink bg-jam px-4 py-3 text-sm font-bold text-ink-solid shadow-brutal"
                >
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Something needs another look. Check the highlighted fields above and try again.
                  </span>
                </motion.div>
              ) : null}
            </div>
          </form>
        </motion.div>
      </div>
    </Section>
  )
}