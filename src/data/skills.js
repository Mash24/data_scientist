export const ROLE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'data-analyst', label: 'Data Analyst' },
  { id: 'bi-developer', label: 'BI Developer' },
  { id: 'analytics-engineer', label: 'Analytics Engineer' },
];

export const ROLE_LABELS = {
  'data-analyst': 'Data Analyst',
  'bi-developer': 'BI Developer',
  'analytics-engineer': 'Analytics Engineer',
};

export const SKILL_CATEGORIES = [
  {
    id: 'analysis',
    title: 'Analysis & Statistics',
    description: 'Exploration, hypothesis testing, and insight communication.',
    skills: [
      'Descriptive & inferential statistics',
      'Regression & forecasting',
      'A/B test interpretation',
      'Cohort & funnel analysis',
      'Executive summaries',
    ],
  },
  {
    id: 'sql',
    title: 'SQL & Data Modeling',
    description: 'Warehouse-friendly SQL, joins, CTEs, and metric layers.',
    skills: [
      'PostgreSQL',
      'Window functions',
      'Dimensional modeling',
      'dbt-style transformations (learning)',
      'Data quality checks',
    ],
  },
  {
    id: 'bi',
    title: 'BI & Visualization',
    description: 'Dashboards and reports for business stakeholders.',
    skills: [
      'Power BI',
      'Looker Studio',
      'Excel / Google Sheets',
      'KPI dashboard design',
      'Stakeholder reporting',
    ],
  },
  {
    id: 'tools',
    title: 'Analysis & scripting',
    description: 'Python, notebooks, and documentation for reproducible analytics.',
    skills: [
      'Python (pandas)',
      'Jupyter notebooks',
      'Excel / Google Sheets',
      'Data dictionaries',
      'CSV & structured data imports',
    ],
  },
];
