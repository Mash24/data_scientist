import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Database, FileCode2 } from 'lucide-react';

const STEPS = [
  { icon: Database, label: 'SQL', sub: 'PostgreSQL · DuckDB', color: 'bg-blue-600' },
  { icon: FileCode2, label: 'Transform', sub: 'Python pipeline', color: 'bg-amber-500' },
  { icon: BarChart3, label: 'Visualize', sub: 'Power BI · Looker', color: 'bg-brand-600' },
];

const DataPipeline = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center gap-4 sm:gap-6"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.color} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{step.label}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{step.sub}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <ArrowRight className="hidden h-6 w-6 text-slate-300 sm:block dark:text-slate-600" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DataPipeline;
