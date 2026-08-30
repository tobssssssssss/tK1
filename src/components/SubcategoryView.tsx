import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import type { Category } from '@/types';

interface SubcategoryViewProps {
  category: Category;
  onSelectSubcategory: (subcategoryId: string) => void;
  onSelectService: (subcategoryId: string, serviceId: string) => void;
}

export default function SubcategoryView({
  category,
  onSelectSubcategory,
  onSelectService,
}: SubcategoryViewProps) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[category.icon] ?? Icons.Wrench;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Category header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <Icon size={28} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{category.name}</h1>
          <p className="mt-1 text-sm text-slate-400">{category.description}</p>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-white">Čo potrebuješ?</h2>

      {/* Subcategories */}
      <div className="space-y-8">
        {category.subcategories.map((sub) => (
          <div key={sub.id}>
            <button
              onClick={() => onSelectSubcategory(sub.id)}
              className="mb-3 inline-flex items-center gap-2 text-base font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {sub.name}
              <ChevronRight size={18} />
            </button>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sub.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => onSelectService(sub.id, service.id)}
                  className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-emerald-500/30 hover:bg-white/[0.07] hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-white">{service.name}</h3>
                    <ChevronRight
                      size={16}
                      className="mt-0.5 shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-400"
                    />
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                  <div className="mt-1 text-sm font-semibold text-emerald-400">
                    {service.priceFrom}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
