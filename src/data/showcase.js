/** Visual showcase data — drives dashboard-style UI (not prose sections). */

import whatidoSqlPhoto from '../../assets/whatido-sql.jpg';
import whatidoBiPhoto from '../../assets/whatido-bi.jpg';
import whatidoStatsPhoto from '../../assets/whatido-stats.jpg';

export const SHOWCASE_KPIS = [
  { label: 'Revenue analyzed', value: 'R$ 13.2M', hint: 'Olist case study' },
  { label: 'Orders modeled', value: '96K+', hint: 'SQL pipeline' },
  { label: 'Avg order value', value: 'R$ 137', hint: 'Delivered orders' },
  { label: 'Repeat rate', value: '3%', hint: 'Retention KPI' },
];

export const HERO_EVIDENCE = [
  { label: 'Case studies published', value: '1', hint: 'E-commerce analytics' },
  { label: 'Revenue modeled', value: 'R$ 13.2M', hint: 'SQL + exports' },
  { label: 'Orders modeled', value: '96K+', hint: 'Delivered orders' },
  { label: 'Repeat rate measured', value: '3%', hint: 'Retention KPI' },
  { label: 'Users supported', value: '1,000+', hint: 'Operational BI' },
  { label: 'Degrees', value: '2', hint: 'Statistics + CS' },
];

export const CHART_GALLERY = [
  {
    src: '/images/case-studies/ecommerce/executive-summary.svg',
    title: 'Executive KPIs',
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    src: '/images/case-studies/ecommerce/revenue-trend.svg',
    title: 'Revenue trend',
    span: 'lg:col-span-2',
  },
  {
    src: '/images/case-studies/ecommerce/top-categories.svg',
    title: 'Category mix',
    span: '',
  },
  {
    src: '/images/case-studies/ecommerce/revenue-by-state.svg',
    title: 'Geo revenue',
    span: '',
  },
  {
    src: '/images/case-studies/ecommerce/reviews-vs-delivery.svg',
    title: 'Reviews × delivery',
    span: 'lg:col-span-2',
  },
];

export const TOOL_STACK = [
  { name: 'SQL', color: 'bg-blue-500' },
  { name: 'PostgreSQL', color: 'bg-sky-600' },
  { name: 'Power BI', color: 'bg-amber-500' },
  { name: 'Looker Studio', color: 'bg-violet-500' },
  { name: 'Python', color: 'bg-yellow-500' },
  { name: 'Excel', color: 'bg-emerald-600' },
  { name: 'Statistics', color: 'bg-rose-500' },
  { name: 'DuckDB', color: 'bg-orange-500' },
];

export const WHAT_I_DO = [
  {
    id: 'sql',
    title: 'SQL analysis',
    icon: 'database',
    chart: whatidoSqlPhoto,
    color: 'from-blue-600/20 to-cyan-500/10',
  },
  {
    id: 'bi',
    title: 'BI dashboards',
    icon: 'pie',
    chart: whatidoBiPhoto,
    color: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'stats',
    title: 'Statistical insight',
    icon: 'trend',
    chart: whatidoStatsPhoto,
    color: 'from-violet-600/20 to-purple-500/10',
  },
];
