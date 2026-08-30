import { Cpu, Heart, HelpCircle } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { siteConfig } from '@/config';
import type { AppView } from '@/types';

interface AboutPageProps {
  onNavigate: (view: AppView) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <Cpu size={28} />
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Čo je TK1?</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <p className="text-base leading-relaxed text-slate-300">
          TK1 je môj školský servisný projekt. Skúšam pomáhať s počítačmi, mobilmi,
          webmi, dátami, grafikou a rôznymi ďalšími vecami. Ak niečo v ponuke nie
          je, pokojne sa opýtaj.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
          <Heart size={20} className="mt-0.5 shrink-0 text-emerald-400" />
          <div>
            <p className="font-semibold text-emerald-300">{siteConfig.slogan}</p>
            <p className="mt-1 text-sm text-slate-400">{siteConfig.sloganSub}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <HelpCircle size={20} className="text-emerald-400" />
          Ako to funguje
        </h2>
        <ol className="space-y-2 text-sm text-slate-300">
          <li className="flex gap-2"><span className="font-semibold text-emerald-400">1.</span> Vyber si službu z kategórií.</li>
          <li className="flex gap-2"><span className="font-semibold text-emerald-400">2.</span> Napíš mi, čo potrebuješ.</li>
          <li className="flex gap-2"><span className="font-semibold text-emerald-400">3.</span> Môžeš navrhnúť cenu.</li>
          <li className="flex gap-2"><span className="font-semibold text-emerald-400">4.</span> Web vytvorí WhatsApp správu.</li>
          <li className="flex gap-2"><span className="font-semibold text-emerald-400">5.</span> Skontroluj a odošli.</li>
          <li className="flex gap-2"><span className="font-semibold text-emerald-400">6.</span> Dohodneme konečnú cenu.</li>
        </ol>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <WhatsAppButton variant="primary" text="Poslať na WhatsApp" />
        <button
          onClick={() => onNavigate({ name: 'categories' })}
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          Pozrieť si služby
        </button>
      </div>
    </div>
  );
}
