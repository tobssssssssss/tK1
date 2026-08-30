import { MousePointerClick, ListChecks, FileText, Send, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Vyber kategóriu',
    desc: 'Klikni na kategóriu, ktorá najviac zodpovedá tvojmu problému — opravy, počítače, mobily, web a ďalšie.',
  },
  {
    icon: ListChecks,
    title: 'Vyber konkrétnu službu',
    desc: 'V rámci kategórie si vyber presnú službu, ktorú potrebuješ. Vidíš orientačnú cenu.',
  },
  {
    icon: FileText,
    title: 'Vyplň detaily',
    desc: 'Odpovedz na otázky špecifické pre danú službu. Čím viac detailov, tým presnejšia cena.',
  },
  {
    icon: Send,
    title: 'Odošli požiadavku',
    desc: 'Skontroluj súhrn a odošli. Požiadavka sa uloží a my ťa budeme kontaktovať.',
  },
  {
    icon: MessageCircle,
    title: 'Dohodneme cenu',
    desc: 'Kontaktujeme ťa cez WhatsApp a dohodneme konečnú cenu a termín realizácie.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Ako to funguje</h1>
        <p className="mt-3 text-base text-slate-400">
          Jednoducho, krok za krokom ťa vedieme od výberu služby až po dohodnutie ceny.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                  <Icon size={24} />
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 h-full w-px flex-1 bg-white/10" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Krok {i + 1}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
