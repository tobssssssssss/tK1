import { Cpu } from 'lucide-react';
import { siteConfig } from '@/config';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

export default function Logo({ size = 'md', showText = true, onClick }: LogoProps) {
  const sizes = {
    sm: { box: 'h-9 w-9', icon: 18, text: 'text-lg' },
    md: { box: 'h-11 w-11', icon: 22, text: 'text-xl' },
    lg: { box: 'h-16 w-16', icon: 32, text: 'text-3xl' },
  };
  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 group cursor-pointer"
      aria-label={`${siteConfig.name} — domov`}
    >
      <div
        className={`${s.box} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30 transition-transform group-hover:scale-105 group-active:scale-95`}
      >
        <Cpu size={s.icon} className="text-white" strokeWidth={2.2} />
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
      </div>
      {showText && (
        <span className={`${s.text} font-bold tracking-tight text-white`}>
          {siteConfig.name}
        </span>
      )}
    </button>
  );
}
