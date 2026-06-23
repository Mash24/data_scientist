import { SECTION_IDS } from './site';

export const NAV_LINKS = [
  { label: 'Home', sectionId: SECTION_IDS.home },
  { label: 'About', sectionId: SECTION_IDS.about },
  { label: 'Skills', sectionId: SECTION_IDS.skills },
  { label: 'Case Studies', sectionId: SECTION_IDS.caseStudies },
  { label: 'Process', sectionId: SECTION_IDS.process },
  { label: 'Experience', sectionId: SECTION_IDS.experience },
  { label: 'Contact', sectionId: SECTION_IDS.contact },
];

export const sectionPath = (sectionId) => `/#${sectionId}`;
