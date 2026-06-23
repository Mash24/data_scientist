import { motion, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data/skills';

const Skills = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills-section" className="py-16 sm:py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Skills
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Tools across the analytics stack
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Honest skill map — items marked in progress will move to delivered projects as case
            studies ship.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">{category.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {category.description}
              </p>
              <ul className="mt-4 space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
