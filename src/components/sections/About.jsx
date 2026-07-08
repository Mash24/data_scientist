import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, LineChart, Sigma, Table2 } from 'lucide-react';
import { ABOUT_EDUCATION, ABOUT_STRENGTHS } from '../../data/about';

import aboutDeskPhoto from '../../../assets/data-analyst-desk.jpg';

const STRENGTH_ICONS = [Table2, LineChart, Sigma, GraduationCap];

const About = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about-section" className="py-14 sm:py-16 bg-slate-50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          About
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Statistics + BI + SQL
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dashboard-tile overflow-hidden lg:col-span-2"
          >
            <img
              src={aboutDeskPhoto}
              alt="Data analyst working with dashboards"
              className="w-full bg-white dark:bg-slate-900"
            />
            <p className="border-t border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Data analyst · BI developer · Analytics engineer
            </p>
          </motion.div>

          <div className="space-y-3">
            {ABOUT_EDUCATION.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 dark:text-brand-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-xs text-slate-500">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ABOUT_STRENGTHS.map((item, index) => {
            const Icon = STRENGTH_ICONS[index];
            return (
              <motion.div
                key={item.title}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
