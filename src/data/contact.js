import { SITE } from './site';

export const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
};

export const PROJECT_TYPES = [
  'Dashboard / BI report',
  'Ad-hoc analysis',
  'Metrics & KPI design',
  'SQL / data modeling',
  'Analytics engineering',
  'Other',
];

export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`
  : null;

const buildMailtoBody = (data) =>
  [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.projectType ? `Project type: ${data.projectType}` : null,
    '',
    data.message,
  ]
    .filter(Boolean)
    .join('\n');

export async function submitContactForm(data) {
  if (FORMSPREE_ENDPOINT) {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Form submission failed. Please email directly.');
    return { method: 'formspree' };
  }

  const subject = encodeURIComponent(`Analytics inquiry from ${data.name}`);
  const body = encodeURIComponent(buildMailtoBody(data));
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  return { method: 'mailto' };
}
