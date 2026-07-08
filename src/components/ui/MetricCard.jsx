const MetricCard = ({ label, value, hint, className = '', compact = false }) => (
  <div
    className={`rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700/80 dark:bg-slate-900 ${
      compact ? 'p-3' : 'p-4'
    } ${className}`}
  >
    <p className={`font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
      compact ? 'text-[10px]' : 'text-[11px]'
    }`}>
      {label}
    </p>
    <p className={`mt-1 font-bold tabular-nums tracking-tight text-slate-900 dark:text-white ${
      compact ? 'text-lg' : 'text-2xl'
    }`}>
      {value}
    </p>
    {hint && (
      <p className={`mt-1 text-brand-600 dark:text-brand-400 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
        {hint}
      </p>
    )}
  </div>
);

export default MetricCard;
