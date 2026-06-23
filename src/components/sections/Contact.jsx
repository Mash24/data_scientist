import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2, Mail, Send } from 'lucide-react';
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
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            <Mail className="h-4 w-4" />
            Contact
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Let&apos;s talk about your data
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{SITE.availability}</p>
        </motion.div>

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
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-brand-600 dark:text-brand-400">
                {SITE.email}
              </a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Location</p>
              <p className="mt-1">{SITE.location}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-900 dark:text-white">Also see</p>
              <a
                href={SITE.engineeringPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-brand-600 dark:text-brand-400"
              >
                Software engineering portfolio →
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
