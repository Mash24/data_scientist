import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FlaskConical, Github } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Disclosure from '../components/ui/Disclosure';
import MetricCard from '../components/ui/MetricCard';
import { usePageTitle } from '../hooks/usePageTitle';
import {
  getCaseStudyBySlug,
  getRoleLabel,
  loadCaseStudyContent,
} from '../data/case-studies';

const isLookerEmbed = (url) =>
  url && (url.includes('lookerstudio.google.com') || url.includes('datastudio.google.com'));

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageTitle(study?.title);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loadCaseStudyContent(slug).then((data) => {
      if (active) {
        setContent(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-slate-600 dark:text-slate-400">Case study not found.</p>
          <Link to="/" className="mt-4 inline-block text-brand-600">
            Back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const screenshotItems =
    study.screenshots?.length > 0
      ? study.screenshots
      : study.coverImage
        ? [{ src: study.coverImage, caption: 'Cover preview' }]
        : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {study.coverImage && (
        <div className="dashboard-grid border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Link
              to="/#case-studies-section"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
            >
              <ArrowLeft className="h-4 w-4" />
              All case studies
            </Link>

            <div className="mt-4 dashboard-panel overflow-hidden rounded-2xl border border-slate-200 shadow-xl dark:border-slate-700">
              <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 truncate text-xs text-slate-300">{study.title}</span>
              </div>
              <img
                src={study.coverImage}
                alt={study.title}
                className="w-full bg-white dark:bg-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      <article className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-brand-600/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
            {getRoleLabel(study.role)}
          </span>
          {study.status === 'draft' && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
              <FlaskConical className="h-3 w-3" />
              In progress
            </span>
          )}
          {study.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-700"
            >
              {tool}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {study.title}
        </h1>

        {study.outcomes && (
          <div className="mt-4 flex flex-wrap gap-2">
            {study.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="rounded-lg border border-brand-500/25 bg-brand-500/10 px-3 py-1.5 text-sm font-bold tabular-nums text-brand-800 dark:text-brand-300"
              >
                {outcome}
              </span>
            ))}
          </div>
        )}

        {study.kpis && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {study.kpis.map((kpi) => (
              <MetricCard key={kpi.label} {...kpi} />
            ))}
          </div>
        )}

        {(study.powerBiUrl || study.lookerStudioUrl || study.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {study.powerBiUrl && (
              <a
                href={study.powerBiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
              >
                Power BI report
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {study.lookerStudioUrl && !isLookerEmbed(study.lookerStudioUrl) && (
              <a
                href={study.lookerStudioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-800 dark:border-slate-600 dark:text-slate-200"
              >
                Looker Studio
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-800 dark:border-slate-600 dark:text-slate-200"
              >
                <Github className="h-3.5 w-3.5" />
                SQL & docs
              </a>
            )}
          </div>
        )}

        {study.lookerStudioUrl && isLookerEmbed(study.lookerStudioUrl) && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <iframe
              title="Looker Studio dashboard"
              src={study.lookerStudioUrl}
              width="100%"
              height="480"
              className="border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}

        {screenshotItems.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Analysis output
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              Charts from the SQL pipeline
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {screenshotItems.map((shot) => {
                const src = typeof shot === 'string' ? shot : shot.src;
                const caption = typeof shot === 'string' ? 'Analysis chart' : shot.caption;
                return (
                  <figure key={src} className="dashboard-tile overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                      <figcaption className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {caption}
                      </figcaption>
                      <span className="h-2 w-2 rounded-full bg-brand-500" />
                    </div>
                    <img src={src} alt={caption} className="w-full bg-white dark:bg-slate-900" loading="lazy" />
                  </figure>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Details
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            Methodology & write-up
          </h2>

          <div className="mt-5 space-y-3">
            {loading ? (
              <p className="text-slate-500">Loading…</p>
            ) : content?.sections ? (
              content.sections.map((section) => (
                <Disclosure
                  key={section.id}
                  title={section.title}
                  defaultOpen={section.id === 'insights'}
                >
                  <div
                    className="prose prose-sm prose-slate max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: section.body }}
                  />
                </Disclosure>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Full write-up coming soon.
              </p>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
