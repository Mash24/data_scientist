import { SECTION_IDS } from './site';

export const NAV_LINKS = [
  { label: 'Home', sectionId: SECTION_IDS.home },
  { label: 'Work', sectionId: SECTION_IDS.caseStudies },
  { label: 'Stack', sectionId: SECTION_IDS.skills },
  { label: 'Experience', sectionId: SECTION_IDS.experience },
  { label: 'Contact', sectionId: SECTION_IDS.contact },
];

export const sectionPath = (sectionId) => `/#${sectionId}`;
