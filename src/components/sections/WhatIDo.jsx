import { motion, useReducedMotion } from 'framer-motion';
import { Database, LineChart, PieChart } from 'lucide-react';
import { WHAT_I_DO } from '../../data/showcase';

const ICONS = {
  database: Database,
  pie: PieChart,
  trend: LineChart,
};

const WhatIDo = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-14 sm:py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Services
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          What I do
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-400">
          Services for organizations and individuals: SQL analysis, KPI design, and BI dashboards built for real decisions.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {WHAT_I_DO.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${item.color} dark:border-slate-800`}
              >
                <div className="flex items-center gap-3 border-b border-slate-200/60 bg-white/80 px-5 py-4 dark:border-slate-700/60 dark:bg-slate-900/80">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                </div>
                <div className="relative h-44 overflow-hidden bg-white dark:bg-slate-900">
                  <img
                    src={item.chart}
                    alt=""
                    className="h-full w-full object-cover object-left-top opacity-95"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
