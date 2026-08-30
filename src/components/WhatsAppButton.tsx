import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config';

interface WhatsAppButtonProps {
  variant?: 'primary' | 'floating' | 'compact';
  className?: string;
  text?: string;
}

export default function WhatsAppButton({
  variant = 'primary',
  className = '',
  text = 'Poslať na WhatsApp',
}: WhatsAppButtonProps) {
  const number = siteConfig.whatsappNumber;
  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(siteConfig.whatsappDefaultText)}`
    : '#';

  const base =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl';

  const variants = {
    primary:
      'bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3 shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5',
    floating:
      'fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3.5 shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:-translate-y-1',
    compact:
      'bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2 text-sm shadow-md shadow-[#25D366]/20',
  };

  return (
    <a
      href={href}
      target={number ? '_blank' : undefined}
      rel={number ? 'noopener noreferrer' : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={(e) => {
        if (!number) e.preventDefault();
      }}
    >
      <MessageCircle size={variant === 'compact' ? 16 : 20} className="shrink-0" />
      <span>{text}</span>
    </a>
  );
}
