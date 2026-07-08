import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, Database, LineChart, MessageSquare } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/process';

const STEP_ICONS = [ClipboardList, Database, LineChart, MessageSquare];

const Process = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="process-section" className="py-14 sm:py-16 bg-slate-50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Workflow
        </p>
        <h2 className="mt-1 text-center text-2xl font-bold text-slate-900 dark:text-white">
          Question → SQL → Dashboard → Insight
        </h2>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-500/0 via-brand-500/40 to-brand-500/0 lg:block"
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <motion.div
                key={step.step}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-lg font-black text-white shadow-lg shadow-brand-600/30">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                  Step {step.step}
                </span>
                <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{step.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
