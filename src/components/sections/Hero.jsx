import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { HERO } from '../../data/hero';
import SectionLink from '../ui/SectionLink';

const Hero = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home-section"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-400">
            <BarChart3 className="h-3.5 w-3.5" />
            {HERO.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            {HERO.headline}{' '}
            <span className="text-brand-600 dark:text-brand-400">{HERO.headlineAccent}</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {HERO.subhead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {HERO.ctas.map((cta) => (
              <SectionLink
                key={cta.sectionId}
                sectionId={cta.sectionId}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  cta.primary
                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                    : 'border border-slate-300 text-slate-800 hover:border-brand-400 dark:border-slate-600 dark:text-slate-200'
                }`}
              >
                {cta.label}
                {cta.primary && <ArrowRight className="h-4 w-4" />}
              </SectionLink>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {HERO.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <dt className="text-xs text-slate-500 dark:text-slate-400">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
