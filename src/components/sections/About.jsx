import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_BIO, ABOUT_EDUCATION, ABOUT_STRENGTHS } from '../../data/about';

const About = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about-section" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            About
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Analytics with statistical rigor
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-slate-600 leading-relaxed dark:text-slate-400"
          >
            {ABOUT_BIO.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {ABOUT_EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">{edu.degree}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{edu.school}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {edu.period} · {edu.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_STRENGTHS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
