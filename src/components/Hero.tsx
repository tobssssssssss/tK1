import { ArrowRight, HelpCircle } from 'lucide-react';
import type { AppView } from '@/types';
import { siteConfig } from '@/config';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Čo potrebuješ{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              vyriešiť?
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Vyber si, čo potrebuješ. Ukážem ti, čo mi máš napísať, a potom mi môžeš
            správu poslať cez WhatsApp.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => onNavigate({ name: 'categories' })}
              className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              Vybrať službu
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate({ name: 'service', categoryId: 'nieco-ine', subcategoryId: 'ine', serviceId: 'vlastna-poziadavka' })}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5"
            >
              <HelpCircle size={20} />
              Niečo iné
            </button>
          </div>

          {/* Slogan */}
          <div className="mt-12 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5">
            <p className="text-lg font-semibold text-emerald-300">{siteConfig.slogan}</p>
            <p className="mt-1 text-sm text-slate-400">{siteConfig.sloganSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
