import { ChevronRight, ArrowLeft } from 'lucide-react';

export interface Crumb {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
  onBack?: () => void;
}

export default function Breadcrumbs({ crumbs, onBack }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-3">
      {onBack && (
        <button
          onClick={onBack}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Späť</span>
        </button>
      )}

      <nav className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <div key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} className="text-slate-600" />}
              {crumb.onClick && !isLast ? (
                <button
                  onClick={crumb.onClick}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className={isLast ? 'font-medium text-emerald-400' : 'text-slate-400'}>
                  {crumb.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
