import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, sectionPath } from '../../data/navigation';
import { SITE } from '../../data/site';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-bold text-slate-900 dark:text-white">
          {SITE.name}
          <span className="mt-0.5 block text-xs font-medium text-brand-600 dark:text-brand-400">
            Data · BI · Analytics
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.sectionId}
              to={sectionPath(link.sectionId)}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 px-4 py-4 md:hidden dark:border-slate-800">
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.sectionId}>
                <Link
                  to={sectionPath(link.sectionId)}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
