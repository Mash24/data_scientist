import { ROLE_LABELS } from '../skills';

/**
 * Case study metadata. Full write-ups live in ./content/{slug}.js (lazy-loaded).
 *
 * status: 'draft' | 'published'
 * role: data-analyst | bi-developer | analytics-engineer
 */
export const CASE_STUDIES = [
  {
    slug: 'ecommerce-sales-analytics',
    title: 'E-commerce Sales & Customer Insights',
    role: 'data-analyst',
    status: 'draft',
    featured: true,
    excerpt:
      'Olist marketplace data: SQL revenue segmentation, repeat-purchase analysis, Power BI executive report, and Looker Studio embed.',
    businessQuestion:
      'Which product categories and customer segments drive revenue, and where is repeat-purchase risk rising?',
    tools: ['SQL', 'DuckDB', 'PostgreSQL', 'Power BI', 'Looker Studio'],
    outcomes: [
      'Monthly revenue & AOV trends',
      'Category and state segmentation',
      'Repeat rate & inactivity proxy',
    ],
    powerBiUrl: null,
    lookerStudioUrl: null,
    githubUrl: null,
    screenshots: [],
    publishDate: '2026-06-23',
  },
  {
    slug: 'saas-funnel-retention',
    title: 'SaaS Funnel & Retention Metrics',
    role: 'analytics-engineer',
    status: 'draft',
    featured: true,
    excerpt:
      'Event-based funnel and cohort retention model with documented metric definitions (placeholder — project in progress).',
    businessQuestion: 'Where do users drop off in onboarding, and how does retention compare by acquisition channel?',
    tools: ['SQL', 'dbt', 'DuckDB', 'Looker Studio'],
    outcomes: ['Funnel conversion', 'Cohort retention', 'Metric layer docs'],
    dashboardUrl: null,
    githubUrl: null,
    publishDate: '2026-06-01',
  },
  {
    slug: 'learning-platform-usage',
    title: 'Learning Platform Usage Analytics',
    role: 'bi-developer',
    status: 'draft',
    featured: false,
    excerpt:
      'Operational BI for an LMS-style platform: active users, course engagement, and school-level reporting (placeholder).',
    businessQuestion: 'How are schools and learners using the platform week over week?',
    tools: ['SQL', 'PostgreSQL', 'Looker Studio'],
    outcomes: ['WAU / MAU', 'Course engagement', 'School comparisons'],
    dashboardUrl: null,
    githubUrl: null,
    publishDate: '2026-06-01',
  },
];

export const getCaseStudyBySlug = (slug) =>
  CASE_STUDIES.find((study) => study.slug === slug) ?? null;

export const getPublishedCaseStudies = () =>
  CASE_STUDIES.filter((study) => study.status === 'published');

export const getFeaturedCaseStudies = () =>
  CASE_STUDIES.filter((study) => study.featured);

export const getRoleLabel = (role) => ROLE_LABELS[role] ?? role;

const contentLoaders = import.meta.glob('./content/*.js');

export async function loadCaseStudyContent(slug) {
  const key = `./content/${slug}.js`;
  const loader = contentLoaders[key];
  if (!loader) return null;
  const module = await loader();
  return module.default;
}
