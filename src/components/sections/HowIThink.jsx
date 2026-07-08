import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Database,
  LineChart,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';

import thinkingPhoto from '../../../assets/hero-dashboard-wall.jpg';

const STEPS = [
  { step: '01', icon: Search, title: 'Audit data', sub: 'grain + freshness' },
  { step: '02', icon: LineChart, title: 'Compare periods', sub: 'trend + deltas' },
  { step: '03', icon: Sparkles, title: 'Segment', sub: 'categories + users' },
  { step: '04', icon: Database, title: 'Metric definitions', sub: 'SQL-first KPIs' },
  { step: '05', icon: Target, title: 'Dashboard output', sub: 'decision-ready charts' },
];

const HowIThink = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="py-14 sm:py-16 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            How I think
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            From question to decision
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Example: sales dropped 12%. Diagnose the driver, fix the metric, then ship a dashboard that leadership can act on.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="dashboard-tile overflow-hidden rounded-2xl p-0">
              <div className="relative h-64 bg-slate-100 dark:bg-slate-900">
                <img
                  src={thinkingPhoto}
                  alt="Analytics dashboard visual example"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-200/90">
                    Business question
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    Sales dropped 12%
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Driver found', 'Metric fixed', 'Dashboard shipped'].map((x) => (
                      <span
                        key={x}
                        className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-sm"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {STEPS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.step}
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="dashboard-tile rounded-2xl border border-slate-200/80 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600">
                        {s.step}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-black text-slate-900">{s.title}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {s.sub}
                    </p>
                    {idx < STEPS.length - 1 && (
                      <div className="mt-3 flex items-center gap-2 text-brand-600/90">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIThink;

