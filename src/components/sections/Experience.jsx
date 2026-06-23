import { motion, useReducedMotion } from 'framer-motion';
import { EXPERIENCES } from '../../data/experience';

const Experience = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="experience-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Experience
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Engineering roles with analytics overlap
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Reframed for data hiring — expand with real metrics and dashboards as you document
            them.
          </p>
        </motion.div>

        <div className="space-y-5">
          {EXPERIENCES.map((role, index) => (
            <motion.article
              key={role.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {role.analyticsAngle}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {role.title} · {role.company}
                  </h3>
                  <p className="text-sm text-slate-500">{role.period}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{role.summary}</p>
              <ul className="mt-4 space-y-2">
                {role.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
