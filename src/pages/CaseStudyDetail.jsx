import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FlaskConical, Github } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
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

  const hasDashboards =
    study.powerBiUrl || study.lookerStudioUrl || study.githubUrl || study.screenshots?.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <article className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/#case-studies-section"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400"
        >
          <ArrowLeft className="h-4 w-4" />
          All case studies
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:text-brand-400">
            {getRoleLabel(study.role)}
          </span>
          {study.status === 'draft' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <FlaskConical className="h-3 w-3" />
              SQL & write-up ready — add live dashboards
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          {study.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{study.businessQuestion}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-white px-2.5 py-0.5 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-700"
            >
              {tool}
            </span>
          ))}
        </div>

        {(hasDashboards || study.status === 'draft') && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Links & dashboards
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {study.powerBiUrl && (
                <a
                  href={study.powerBiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-400 dark:border-slate-600 dark:text-slate-200"
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-brand-400 dark:border-slate-600 dark:text-slate-200"
                >
                  <Github className="h-3.5 w-3.5" />
                  SQL & docs
                </a>
              )}
            </div>

            {study.lookerStudioUrl && isLookerEmbed(study.lookerStudioUrl) && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
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

            {!study.powerBiUrl && !study.lookerStudioUrl && study.status === 'draft' && (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Build dashboards using{' '}
                <code className="text-xs">projects/ecommerce-sales-analytics/power-bi/</code> and{' '}
                <code className="text-xs">looker-studio/SETUP.md</code>, then add URLs to{' '}
                <code className="text-xs">case-studies/index.js</code>.
              </p>
            )}

            {study.screenshots?.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {study.screenshots.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Dashboard screenshot"
                    className="rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-10 space-y-10">
          {loading ? (
            <p className="text-slate-500">Loading case study…</p>
          ) : content?.sections ? (
            content.sections.map((section) => (
              <section key={section.id}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
                <div
                  className="prose prose-slate mt-4 max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </section>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-slate-600 dark:text-slate-400">
                No content module yet. Create{' '}
                <code className="text-sm">src/data/case-studies/content/{slug}.js</code>.
              </p>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
