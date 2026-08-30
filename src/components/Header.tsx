import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import type { AppView } from '@/types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const navItems: { label: string; view: AppView }[] = [
  { label: 'Domov', view: { name: 'home' } },
  { label: 'Služby', view: { name: 'categories' } },
  { label: 'Ako to funguje', view: { name: 'how-it-works' } },
  { label: 'Cenník', view: { name: 'pricelist' } },
  { label: 'O TK1', view: { name: 'about' } },
];

function isActive(current: AppView, target: AppView): boolean {
  return current.name === target.name;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="md" onClick={() => handleNav({ name: 'home' })} />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.view)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(currentView, item.view)
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-slate-950/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.view)}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive(currentView, item.view)
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
