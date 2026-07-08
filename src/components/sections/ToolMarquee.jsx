import { TOOL_STACK } from '../../data/showcase';

const ToolChip = ({ tool }) => (
  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
    <span className={`h-2.5 w-2.5 rounded-full ${tool.color}`} aria-hidden="true" />
    {tool.name}
  </span>
);

const ToolMarquee = () => {
  const coreTools = TOOL_STACK.filter((t) =>
    ['SQL', 'PostgreSQL', 'Power BI', 'Looker Studio', 'Python', 'Statistics'].includes(
      t.name
    )
  );
  const items = [...coreTools, ...coreTools];

  return (
    <section
      className="border-y border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-950"
      aria-label="Core stack"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />
        <div className="flex motion-safe:animate-marquee gap-4 px-4">
          {items.map((tool, index) => (
            <ToolChip key={`${tool.name}-${index}`} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolMarquee;
