import { useState, useRef } from 'react';
import { AlertTriangle, Upload, CheckCircle2, FileText, Info, MessageCircle } from 'lucide-react';
import type { Category, Service, RequestDraft, SpeedOption, MaterialOption } from '@/types';
import { speedOptions, speedDeadlineNote, materialNote, priceProposalNote } from '@/config';

interface ServiceDetailProps {
  category: Category;
  service: Service;
  draft: RequestDraft;
  onUpdateDraft: (updates: Partial<RequestDraft>) => void;
  onGenerateMessage: () => void;
}

export default function ServiceDetail({
  category: _category,
  service,
  draft,
  onUpdateDraft,
  onGenerateMessage,
}: ServiceDetailProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>(draft.files);

  const handleAnswer = (questionId: string, value: string) => {
    onUpdateDraft({
      answers: { ...draft.answers, [questionId]: value },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const names = files.map((f) => f.name);
    const updated = [...fileNames, ...names];
    setFileNames(updated);
    onUpdateDraft({ files: updated });
  };

  const removeFile = (name: string) => {
    const updated = fileNames.filter((f) => f !== name);
    setFileNames(updated);
    onUpdateDraft({ files: updated });
  };

  const requiredQuestions = service.questions.filter((q) => q.required);
  const requiredAnswered = requiredQuestions.every((q) => {
    const val = draft.answers[q.id];
    return val && val.trim().length > 0;
  });
  const descriptionOk = !service.descriptionPrompt || draft.description.trim().length > 0;
  const riskOk = !service.riskWarning || draft.riskAccepted;
  const canProceed = requiredAnswered && descriptionOk && riskOk;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Title + price */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{service.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
            Cena {service.priceFrom}
          </span>
          {service.pricing?.negotiable && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-300">
              Konečnú cenu dohodneme
            </span>
          )}
        </div>
        <p className="mt-4 text-base leading-relaxed text-slate-300">{service.description}</p>
      </div>

      {/* Risk warning */}
      {service.riskWarning && (
        <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={22} className="mt-0.5 shrink-0 text-red-400" />
            <div>
              <h3 className="font-semibold text-red-300">Upozornenie</h3>
              <p className="mt-1 text-sm leading-relaxed text-red-200/90">
                Úprava systému môže spôsobiť stratu dát, problémy so zárukou alebo tzv. brick
                zariadenia. V niektorých prípadoch sa zariadenie nemusí podariť obnoviť. Pred
                zásahom odporúčame zálohu dát.
              </p>
              <label className="mt-3 flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={draft.riskAccepted}
                  onChange={(e) => onUpdateDraft({ riskAccepted: e.target.checked })}
                  className="h-5 w-5 rounded border-red-400/50 bg-transparent text-red-500 focus:ring-red-500/50"
                />
                <span className="text-sm font-medium text-red-200">Rozumiem možným rizikám.</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* What to write section */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-xl font-bold text-white">Čo mi máš napísať?</h2>
        <p className="mb-5 text-sm text-slate-400">
          Aby som ti vedel pomôcť, pošli mi tieto informácie:
        </p>

        {service.example && (
          <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-2">
              <Info size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  Príklad
                </p>
                <p className="mt-1 text-sm italic text-slate-300">{service.example}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {service.questions.map((q) => (
            <div key={q.id}>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                {q.label}
                {q.required && <span className="ml-1 text-emerald-400">*</span>}
              </label>

              {q.type === 'text' && (
                <input
                  type="text"
                  value={draft.answers[q.id] ?? ''}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              )}

              {q.type === 'textarea' && (
                <textarea
                  value={draft.answers[q.id] ?? ''}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                />
              )}

              {q.type === 'select' && q.options && (
                <select
                  value={draft.answers[q.id] ?? ''}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                >
                  <option value="">— vyber —</option>
                  {q.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {q.type === 'file' && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-slate-900/30 px-4 py-4 text-sm text-slate-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
                  >
                    <Upload size={18} />
                    Nahrať súbor
                  </button>
                  {fileNames.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {fileNames.map((name) => (
                        <div
                          key={name}
                          className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300"
                        >
                          <span className="flex items-center gap-2 truncate">
                            <FileText size={14} className="shrink-0 text-emerald-400" />
                            {name}
                          </span>
                          <button
                            onClick={() => removeFile(name)}
                            className="shrink-0 text-slate-500 transition-colors hover:text-red-400"
                          >
                            Odstrániť
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Description field */}
      {service.descriptionPrompt && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">{service.descriptionPrompt}</h2>
          <textarea
            value={draft.description}
            onChange={(e) => onUpdateDraft({ description: e.target.value })}
            placeholder="Opíš problém vlastnými slovami..."
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>
      )}

      {/* Price proposal */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-1 text-lg font-bold text-white">Koľko by si za to dal?</h2>
        <p className="mb-4 text-sm text-slate-400">
          Môžeš navrhnúť vlastnú cenu. Konečnú cenu vždy potvrdím ja.
        </p>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              value={draft.proposedPrice}
              onChange={(e) => onUpdateDraft({ proposedPrice: e.target.value })}
              placeholder="napr. 10"
              className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">€</span>
          </div>
        </div>
        <p className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
          <Info size={13} className="mt-0.5 shrink-0" />
          {priceProposalNote}
        </p>
      </div>

      {/* Speed selector */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-1 text-lg font-bold text-white">Rýchlosť</h2>
        <p className="mb-4 text-sm text-slate-400">Vyber si, ako rýchlo potrebuješ službu.</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {speedOptions.map((opt) => {
            const selected = draft.speed === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onUpdateDraft({ speed: opt.id as SpeedOption })}
                className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all ${
                  selected
                    ? 'border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'border-white/10 bg-slate-900/30 hover:border-white/20'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-semibold text-white">{opt.label}</span>
                  {selected && <CheckCircle2 size={18} className="text-emerald-400" />}
                </div>
                <span className="text-xs text-slate-400">{opt.description}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
          <Info size={13} className="mt-0.5 shrink-0" />
          {speedDeadlineNote}
        </p>
      </div>

      {/* Material selector */}
      {service.hasMaterial && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-1 text-lg font-bold text-white">Materiál</h2>
          <p className="mb-4 text-sm text-slate-400">{materialNote}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {([
              { id: 'self', label: 'Mám vlastný' },
              { id: 'needed', label: 'Potrebujem' },
              { id: 'unknown', label: 'Neviem' },
            ] as { id: MaterialOption; label: string }[]).map((opt) => {
              const selected = draft.material === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateDraft({ material: opt.id })}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                    selected
                      ? 'border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'border-white/10 bg-slate-900/30 hover:border-white/20'
                  }`}
                >
                  <CheckCircle2
                    size={20}
                    className={selected ? 'text-emerald-400' : 'text-slate-600'}
                  />
                  <span className="font-medium text-white">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Generate WhatsApp message button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onGenerateMessage}
          disabled={!canProceed}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all sm:w-auto ${
            canProceed
              ? 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#1ebe5d] hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-white/5 text-slate-500'
          }`}
        >
          <MessageCircle size={20} />
          Vytvoriť správu na WhatsApp
        </button>
        {!canProceed && (
          <p className="text-sm text-slate-500">
            {service.riskWarning && !riskOk
              ? 'Prosím, potvrď súhlas s rizikami.'
              : 'Vyplň všetky povinné polia označené *.'}
          </p>
        )}
      </div>
    </div>
  );
}
