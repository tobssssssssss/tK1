import { priceList } from '@/data/catalog';
import { Tag } from 'lucide-react';

export default function PriceListPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <Tag size={28} />
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Cenník</h1>
        <p className="mt-3 text-base text-slate-400">
          Základné ceny našich služieb. Konečná cena sa dohodne podľa konkrétnej požiadavky.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-5 py-3.5 text-left text-sm font-semibold text-slate-300">
                Služba
              </th>
              <th className="px-5 py-3.5 text-right text-sm font-semibold text-slate-300">
                Cena
              </th>
            </tr>
          </thead>
          <tbody>
            {priceList.map((entry, i) => (
              <tr
                key={entry.service}
                className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                }`}
              >
                <td className="px-5 py-3.5 text-sm text-slate-200">{entry.service}</td>
                <td className="px-5 py-3.5 text-right text-sm font-semibold text-emerald-400">
                  {entry.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Ceny sú orientačné a konečná cena sa môže dohodnúť cez WhatsApp. Materiál, náhradné
        diely a licencie sa môžu účtovať samostatne.
      </p>
    </div>
  );
}
