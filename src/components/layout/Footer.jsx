import { Github, Linkedin, Mail } from 'lucide-react';
import { SITE } from '../../data/site';
import { TOOL_STACK } from '../../data/showcase';
import SectionLink from '../ui/SectionLink';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div className="border-b border-slate-100 py-3 dark:border-slate-800">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
        {TOOL_STACK.slice(0, 6).map((tool) => (
          <span
            key={tool.name}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${tool.color}`} />
            {tool.name}
          </span>
        ))}
      </div>
    </div>

    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div>
        <p className="font-bold text-slate-900 dark:text-white">{SITE.name}</p>
        <p className="mt-0.5 text-sm font-medium text-brand-600 dark:text-brand-400">{SITE.title}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
        <a
          href={SITE.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={SITE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <SectionLink
          sectionId="contact-section"
          className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          Contact
        </SectionLink>
      </div>

      <a
        href={SITE.otherPortfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
      >
        {SITE.otherPortfolioLabel}
      </a>
    </div>
  </footer>
);

export default Footer;
