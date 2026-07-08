import { ROLE_LABELS } from '../skills';

import saasFunnelCover from '../../../assets/saas-funnel-dashboard.jpg';
import lmsLearningAnalyticsCover from '../../../assets/lms-learning-analytics.jpg';

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
    status: 'published',
    featured: true,
    coverImage: '/images/case-studies/ecommerce/executive-summary.svg',
    excerpt:
      'Olist marketplace data: SQL revenue segmentation, repeat-purchase analysis, Power BI executive report, and Looker Studio embed.',
    businessQuestion:
      'Which product categories and customer segments drive revenue, and where is repeat-purchase risk rising?',
    tools: ['SQL', 'DuckDB', 'PostgreSQL', 'Power BI', 'Looker Studio'],
    outcomes: [
      'R$ 13.2M revenue · 96k orders',
      'SP = 38% of revenue',
      '3% repeat rate · 80% inactive',
    ],
    kpis: [
      { label: 'Revenue', value: 'R$ 13.2M', hint: 'Delivered orders' },
      { label: 'Orders', value: '96,478', hint: '2016–2018' },
      { label: 'AOV', value: 'R$ 137', hint: 'Per order' },
      { label: 'Card share', value: '78%', hint: 'Payment mix' },
      { label: 'Repeat rate', value: '3%', hint: 'Marketplace leakage' },
      { label: 'Inactive 90d+', value: '80%', hint: 'Reactivation opp.' },
    ],
    powerBiUrl: null,
    lookerStudioUrl: null,
    githubUrl: null,
    screenshots: [
      { src: '/images/case-studies/ecommerce/executive-summary.svg', caption: 'Executive summary KPIs' },
      { src: '/images/case-studies/ecommerce/revenue-trend.svg', caption: 'Monthly revenue trend' },
      { src: '/images/case-studies/ecommerce/top-categories.svg', caption: 'Top categories by revenue' },
      { src: '/images/case-studies/ecommerce/revenue-by-state.svg', caption: 'Revenue by state' },
      { src: '/images/case-studies/ecommerce/reviews-vs-delivery.svg', caption: 'Reviews vs delivery time' },
    ],
    publishDate: '2026-06-23',
  },
  {
    slug: 'saas-funnel-retention',
    title: 'SaaS Funnel & Retention Metrics',
    role: 'analytics-engineer',
    status: 'draft',
    featured: true,
    coverImage: saasFunnelCover,
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
    coverImage: lmsLearningAnalyticsCover,
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
