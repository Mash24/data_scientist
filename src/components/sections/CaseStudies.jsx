import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { CASE_STUDIES, getRoleLabel } from '../../data/case-studies';
import { ROLE_FILTERS } from '../../data/skills';

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const reducedMotion = useReducedMotion();

  const filtered =
    activeFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.role === activeFilter);

  return (
    <section id="case-studies-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Portfolio proof
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Case studies
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Each study follows: business question → data → SQL/analysis → dashboard → insights.
            Placeholders below are scaffolded — replace with real work as you build projects.
          </p>
        </motion.div>

        <div className="mb-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max flex-nowrap gap-2 pb-1 sm:w-auto sm:flex-wrap">
            {ROLE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter.id
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((study, index) => (
            <motion.article
              key={study.slug}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:text-brand-400">
                  {getRoleLabel(study.role)}
                </span>
                {study.status === 'draft' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <FlaskConical className="h-3 w-3" />
                    In progress
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{study.title}</h3>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                {study.businessQuestion}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {study.excerpt}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <Link
                to={`/case-studies/${study.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                View case study
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
