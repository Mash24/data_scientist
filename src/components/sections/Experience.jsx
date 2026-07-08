import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Briefcase, Database } from 'lucide-react';
import { EXPERIENCES } from '../../data/experience';

const ROLE_ICONS = [BarChart3, Database];

const Experience = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="experience-section" className="py-14 sm:py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          What I’m doing
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Analytics & BI reporting — ongoing
        </h2>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Freelance + employment: operational dashboards, SQL-first reporting, and KPI definitions that teams can use immediately.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {EXPERIENCES.map((role, index) => {
            const Icon = ROLE_ICONS[index] ?? Briefcase;
            return (
              <motion.article
                key={role.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="dashboard-tile flex flex-col rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                      {role.analyticsAngle}
                    </p>
                    <h3 className="mt-0.5 font-bold text-slate-900 dark:text-white">
                      {role.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {role.company} · {role.period}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {role.impactChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-lg border border-brand-500/20 bg-brand-500/5 px-2.5 py-1 text-xs font-bold text-brand-800 dark:text-brand-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
                  {role.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
