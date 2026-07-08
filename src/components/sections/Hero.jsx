import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { HERO } from '../../data/hero';
import { CHART_GALLERY, HERO_EVIDENCE, SHOWCASE_KPIS } from '../../data/showcase';
import SectionLink from '../ui/SectionLink';
import MetricCard from '../ui/MetricCard';
import { SITE } from '../../data/site';

import dataAnalystDeskPhoto from '../../../assets/data-analyst-desk.jpg';
import heroDashboardWallPhoto from '../../../assets/hero-dashboard-wall.jpg';

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const heroChartTiles = CHART_GALLERY.slice(0, 2);
  const heroTiles = [
    { src: dataAnalystDeskPhoto, title: 'SQL desk workflow' },
    ...heroChartTiles,
    { src: heroDashboardWallPhoto, title: 'Dashboard wall overview' },
  ];

  return (
    <section
      id="home-section"
      className="dashboard-grid relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-100 to-white py-12 sm:py-16 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-6">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4 xl:col-span-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              <BarChart3 className="h-3.5 w-3.5" />
              {HERO.eyebrow}
            </span>

            <h1 className="mt-5 text-4xl font-black leading-none tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              <span className="text-brand-600 dark:text-brand-400">{HERO.headline}</span>
              <br />
              {HERO.headlineMid}
              {HERO.headlineAccent && (
                <>
                  <br />
                  <span className="text-slate-700 dark:text-slate-300">
                    {HERO.headlineAccent}
                  </span>
                </>
              )}
            </h1>

            <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              {HERO.subhead}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {HERO.ctas.map((cta) => (
                <div key={cta.sectionId ?? cta.label} className="inline-flex">
                  {cta.href ? (
                    <a
                      href={cta.href ?? SITE.resumeUrl}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                        cta.primary
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700'
                          : 'border-2 border-slate-300 text-slate-800 dark:border-slate-600 dark:text-slate-200'
                      }`}
                    >
                      {cta.label}
                      {cta.primary && <ArrowRight className="h-4 w-4" />}
                    </a>
                  ) : (
                    <SectionLink
                      sectionId={cta.sectionId}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                        cta.primary
                          ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700'
                          : 'border-2 border-slate-300 text-slate-800 dark:border-slate-600 dark:text-slate-200'
                      }`}
                    >
                      {cta.label}
                      {cta.primary && <ArrowRight className="h-4 w-4" />}
                    </SectionLink>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-8 xl:col-span-9"
          >
            <div className="dashboard-panel overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:shadow-black/30">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-800 px-4 py-2.5 dark:border-slate-700">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-medium text-slate-300">
                  analytics_dashboard.pbix · sample output
                </span>
              </div>

              <div className="bg-slate-50 p-3 sm:p-4 dark:bg-slate-900/80">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {SHOWCASE_KPIS.map((kpi) => (
                    <MetricCard key={kpi.label} {...kpi} />
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
                  {heroTiles.map((tile) => (
                    <div
                      key={tile.src}
                      className="dashboard-tile overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                    >
                      <img
                        src={tile.src}
                        alt={tile.title}
                        className="w-full"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {HERO_EVIDENCE.map((item) => (
            <MetricCard key={item.label} {...item} compact />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
