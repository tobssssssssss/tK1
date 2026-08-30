import { useState } from 'react';
import { Edit3, Check, MessageCircle, ArrowLeft } from 'lucide-react';
import type { Category, Service, RequestDraft } from '@/types';
import { generateWhatsAppMessage } from '@/lib/whatsapp';
import { siteConfig } from '@/config';

interface WhatsAppMessagePreviewProps {
  category: Category;
  service: Service;
  draft: RequestDraft;
  onBack: () => void;
  onDone: () => void;
}

export default function WhatsAppMessagePreview({
  category: _category,
  service,
  draft,
  onBack,
  onDone,
}: WhatsAppMessagePreviewProps) {
  const generatedMessage = generateWhatsAppMessage(
    _category,
    service,
    draft
  );
  const [message, setMessage] = useState(generatedMessage);
  const [editing, setEditing] = useState(false);

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    const url = siteConfig.whatsappNumber
      ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
        Takto bude vyzerať správa
      </h1>
      <p className="mb-6 text-sm text-slate-400">
        Skontroluj správu. Môžeš ju upraviť alebo rovno poslať na WhatsApp.
      </p>

      {/* Message preview */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
          <span className="text-sm font-medium text-slate-300">Náhľad správy</span>
          <button
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            {editing ? (
              <>
                <Check size={14} />
                Hotovo
              </>
            ) : (
              <>
                <Edit3 size={14} />
                Upraviť
              </>
            )}
          </button>
        </div>

        {editing ? (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={14}
            className="w-full bg-slate-900/50 px-5 py-4 text-sm leading-relaxed text-white focus:outline-none"
          />
        ) : (
          <div className="px-5 py-4">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-200">
              {message}
            </pre>
          </div>
        )}
      </div>

      {/* Price note */}
      {draft.proposedPrice.trim() && (
        <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm text-amber-200/90">
            Tvoja navrhovaná cena ({draft.proposedPrice.trim()} €) je iba návrh.
            Konečnú cenu potvrdím ja po WhatsApp správe.
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
        >
          <ArrowLeft size={18} />
          Späť
        </button>
        <button
          onClick={handleOpenWhatsApp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1ebe5d] hover:-translate-y-0.5"
        >
          <MessageCircle size={20} />
          Potvrdiť a otvoriť WhatsApp
        </button>
      </div>

      {/* After sending hint */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
        <p className="text-sm text-slate-400">
          Po odoslaní správy sa dohodneme na konečnej cene a termíne.
        </p>
        <button
          onClick={onDone}
          className="mt-3 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
        >
          Späť na domov
        </button>
      </div>
    </div>
  );
}
