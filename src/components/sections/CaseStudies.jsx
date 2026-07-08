import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { CASE_STUDIES, getRoleLabel } from '../../data/case-studies';
import MetricCard from '../ui/MetricCard';

const StudyCard = ({ study, large = false }) => (
  <article
    className={`dashboard-tile group flex flex-col overflow-hidden ${large ? 'lg:flex-row' : ''}`}
  >
    {study.coverImage && (
      <Link
        to={`/case-studies/${study.slug}`}
        className={`relative block overflow-hidden bg-slate-100 dark:bg-slate-800 ${
          large ? 'lg:w-3/5 lg:shrink-0' : 'aspect-[16/10]'
        }`}
      >
        {large && study.screenshots?.length >= 4 ? (
          <div className="relative min-h-[260px] bg-slate-900 p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-[11px] font-medium text-slate-300">
                ecommerce_analytics.pbix
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {study.screenshots.slice(0, 4).map((shot, idx) => {
                const src = typeof shot === 'string' ? shot : shot.src;
                const caption = typeof shot === 'string' ? `Chart ${idx + 1}` : shot.caption;
                return (
                  <div
                    key={src}
                    className="overflow-hidden rounded-lg border border-slate-700 bg-white shadow-sm"
                  >
                    <img
                      src={src}
                      alt={caption}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <img
            src={study.coverImage}
            alt={study.title}
            className={`w-full object-cover object-left-top transition duration-300 group-hover:scale-[1.02] ${
              large ? 'h-full min-h-[220px]' : 'h-full'
            }`}
            loading="lazy"
          />
        )}
        {study.status === 'draft' && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
            <FlaskConical className="h-3 w-3" />
            In progress
          </span>
        )}
      </Link>
    )}

    <div className={`flex flex-1 flex-col ${large ? 'p-6 lg:justify-center' : 'p-5'}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-brand-600/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
          {getRoleLabel(study.role)}
        </span>
        {study.tools.slice(0, 4).map((tool) => (
          <span
            key={tool}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400"
          >
            {tool}
          </span>
        ))}
      </div>

      <h3
        className={`font-bold text-slate-900 dark:text-white ${
          large ? 'text-2xl' : 'text-lg'
        }`}
      >
        {study.title}
      </h3>

      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Business question
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {study.businessQuestion}
        </p>
      </div>

      {study.kpis && large && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {study.kpis.slice(0, 6).map((kpi) => (
            <MetricCard key={kpi.label} {...kpi} compact />
          ))}
        </div>
      )}

      {study.outcomes && (
        <div className="mt-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Outcomes
          </p>
          <div className="flex flex-wrap gap-2">
            {study.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="rounded-lg border border-brand-500/20 bg-brand-500/5 px-2.5 py-1 text-xs font-bold tabular-nums text-brand-800 dark:text-brand-300"
              >
                {outcome}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        to={`/case-studies/${study.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        Read case study
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  </article>
);

const CaseStudies = () => {
  const reducedMotion = useReducedMotion();

  const featuredStudies = CASE_STUDIES.filter((s) => s.featured && s.status === 'published').slice(
    0,
    3
  );
  const inProgressStudies = CASE_STUDIES.filter((s) => s.status === 'draft').slice(0, 4);

  return (
    <section id="case-studies-section" className="py-14 sm:py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            What I’ve done
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            End-to-end analytics proof
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Business question → SQL analysis → dashboards → measurable outcomes.
          </p>
        </div>

        {featuredStudies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={index === 0 ? 'md:col-span-2' : ''}
              >
                <StudyCard study={study} large={index === 0} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Published case studies coming soon.
          </p>
        )}

        {inProgressStudies.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  What I’m building
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  In progress
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Drafts are shown for transparency — proof above is published work.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {inProgressStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <StudyCard study={study} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
