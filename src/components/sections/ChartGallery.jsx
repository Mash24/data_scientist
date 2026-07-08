import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CHART_GALLERY, SHOWCASE_KPIS } from '../../data/showcase';

const ChartGallery = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="dashboard-grid border-b border-slate-200 bg-slate-100/80 py-10 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Live sample output
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Real charts from my work
            </h2>
          </div>
          <Link
            to="/case-studies/ecommerce-sales-analytics"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
          >
            Full case study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {CHART_GALLERY.map((chart, index) => (
            <motion.div
              key={chart.src}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`dashboard-tile group overflow-hidden ${chart.span}`}
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/90">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {chart.title}
                </span>
                <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              </div>
              {chart.title === 'Executive KPIs' ? (
                <div className="relative">
                  <img
                    src={chart.src}
                    alt={chart.title}
                    className="w-full bg-white transition duration-300 group-hover:scale-[1.02] dark:bg-slate-900"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {SHOWCASE_KPIS.slice(0, 3).map((kpi) => (
                        <div
                          key={kpi.label}
                          className="rounded-md bg-white/95 px-2 py-1 shadow-sm"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                            {kpi.label}
                          </p>
                          <p className="text-xs font-black tabular-nums text-slate-900">
                            {kpi.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={chart.src}
                  alt={chart.title}
                  className="w-full bg-white transition duration-300 group-hover:scale-[1.02] dark:bg-slate-900"
                  loading="lazy"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChartGallery;
