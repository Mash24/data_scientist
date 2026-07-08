import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2, Github, Linkedin, Mail, Send } from 'lucide-react';
import { SITE } from '../../data/site';
import {
  FORMSPREE_ENDPOINT,
  INITIAL_FORM_STATE,
  PROJECT_TYPES,
  submitContactForm,
} from '../../data/contact';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white';

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState('idle');
  const reducedMotion = useReducedMotion();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContactForm(formData);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Contact
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Hire me for data & BI (freelance + contract)
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{SITE.availability}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Data Analyst', 'BI Developer', 'Analytics Engineer'].map((role) => (
              <span
                key={role}
                className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-bold text-brand-800 dark:text-brand-300"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.form
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50"
          >
            {status === 'success' ? (
              <p className="text-brand-700 dark:text-brand-400">
                Thanks — your message is on its way. I&apos;ll reply within 24 hours.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name *"
                    required
                    className={inputClass}
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    required
                    className={inputClass}
                  />
                </div>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company (optional)"
                  className={inputClass}
                />
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={inputClass}
                  aria-label="Project type"
                >
                  <option value="">Project type</option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="What question are you trying to answer with data? *"
                  required
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send message
                </button>
                {!FORMSPREE_ENDPOINT && (
                  <p className="text-xs text-slate-500">
                    No Formspree ID set — submit opens your email client.
                  </p>
                )}
              </div>
            )}
          </motion.form>

          <motion.aside
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4 text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Direct email</p>
              <a href={`mailto:${SITE.email}`} className="mt-1 flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Profiles</p>
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href={SITE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Location</p>
              <p className="mt-1">{SITE.location}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Open to</p>
              <p className="mt-1">
                Data analyst, BI developer, and analytics engineer work — as full-time roles or freelance/contract delivery.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
