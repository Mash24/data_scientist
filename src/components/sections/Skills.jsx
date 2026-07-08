import { motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  Database,
  FileSpreadsheet,
  LineChart,
  Sigma,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/skills';

const CATEGORY_META = {
  analysis: { icon: Sigma, color: 'text-violet-600', bg: 'bg-violet-500/10' },
  sql: { icon: Database, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  bi: { icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-500/10' },
  tools: { icon: FileSpreadsheet, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
};

const Skills = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills-section" className="py-14 sm:py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Stack
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Tools I use daily
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, index) => {
            const meta = CATEGORY_META[category.id] ?? { icon: LineChart, color: '', bg: '' };
            const Icon = meta.icon;
            return (
              <motion.div
                key={category.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="dashboard-tile flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${meta.bg}`}>
                  <Icon className={`h-6 w-6 ${meta.color}`} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{category.title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      title={skill}
                      className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                    >
                      {skill.length > 16 ? `${skill.slice(0, 14)}…` : skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
