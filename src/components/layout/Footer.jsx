import { SITE } from '../../data/site';
import SectionLink from '../ui/SectionLink';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
    <div className="container mx-auto flex flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{SITE.name}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{SITE.title}</p>
      </div>
      <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
        <a
          href={SITE.engineeringPortfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-600 dark:hover:text-brand-400"
        >
          Software engineering portfolio →
        </a>
        <SectionLink sectionId="contact-section" className="hover:text-brand-600 dark:hover:text-brand-400">
          Contact
        </SectionLink>
      </div>
    </div>
  </footer>
);

export default Footer;
