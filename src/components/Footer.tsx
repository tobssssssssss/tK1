import Logo from '@/components/Logo';
import WhatsAppButton from '@/components/WhatsAppButton';
import { siteConfig } from '@/config';
import type { AppView } from '@/types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo size="md" onClick={() => onNavigate({ name: 'home' })} />
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Navigácia
            </h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate({ name: 'home' })} className="text-left text-sm text-slate-400 transition-colors hover:text-white">Domov</button>
              <button onClick={() => onNavigate({ name: 'categories' })} className="text-left text-sm text-slate-400 transition-colors hover:text-white">Služby</button>
              <button onClick={() => onNavigate({ name: 'how-it-works' })} className="text-left text-sm text-slate-400 transition-colors hover:text-white">Ako to funguje</button>
              <button onClick={() => onNavigate({ name: 'pricelist' })} className="text-left text-sm text-slate-400 transition-colors hover:text-white">Cenník</button>
              <button onClick={() => onNavigate({ name: 'about' })} className="text-left text-sm text-slate-400 transition-colors hover:text-white">O TK1</button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Kontakt
            </h3>
            <p className="text-sm text-slate-400">
              Kontaktuj ma cez WhatsApp a dohodneme sa.
            </p>
            <WhatsAppButton variant="compact" text="Poslať na WhatsApp" />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}.
          </p>
        </div>
      </div>
    </footer>
  );
}
