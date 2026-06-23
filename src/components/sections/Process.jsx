import { motion, useReducedMotion } from 'framer-motion';
import { PROCESS_STEPS } from '../../data/process';

const Process = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="process-section" className="py-16 sm:py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Process
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            How I work with data
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                {step.step}
              </span>
              <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
