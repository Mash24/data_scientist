import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Disclosure = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="dashboard-tile overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900 dark:text-white">{title}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default Disclosure;
