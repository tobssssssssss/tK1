import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Category, AppView } from '@/types';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onNavigate: (view: AppView) => void;
}

export default function CategoryGrid({
  categories,
  onSelectCategory,
  onNavigate,
}: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Vyber si kategóriu</h2>
        <p className="mt-3 text-lg text-slate-400">
          Klikni na kategóriu a pokračuj k konkrétnej službe.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = (Icons as unknown as Record<string, LucideIcon>)[cat.icon] ?? Icons.Wrench;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/[0.07] hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition-colors group-hover:bg-emerald-500/20">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-white">{cat.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{cat.description}</p>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                Pokračovať
                <Icons.ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* "Neviem čo vybrať" CTA */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-8 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Nevieš, čo vybrať?</h3>
          <p className="mt-1 text-sm text-slate-400">
            Napíš mi svoju požiadavku vlastnými slovami a dohodneme sa.
          </p>
        </div>
        <button
          onClick={() =>
            onNavigate({
              name: 'service',
              categoryId: 'nieco-ine',
              subcategoryId: 'ine',
              serviceId: 'vlastna-poziadavka',
            })
          }
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5"
        >
          <Icons.HelpCircle size={18} />
          Napísať vlastnú požiadavku
        </button>
      </div>
    </section>
  );
}
