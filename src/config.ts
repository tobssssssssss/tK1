import type { SpeedInfo } from '@/types';

export const siteConfig = {
  name: 'TK1',
  tagline: 'Školský servisný projekt',
  // WhatsApp number in international format without + or spaces.
  // Fill this in once the number is confirmed.
  whatsappNumber: '',
  whatsappDefaultText: 'Ahoj, mám záujem o službu.',
  email: '',
  description:
    'TK1 — môj školský servisný projekt. Pomáham s počítačmi, mobilmi, webmi, dátami, grafikou a rôznymi ďalšími vecami.',
  slogan: 'Nevieš, či to viem? Opýtaj sa.',
  sloganSub: 'Ak to nie je v ponuke, napíš mi, čo potrebuješ. Dohodneme sa.',
};

export const speedOptions: SpeedInfo[] = [
  {
    id: 'normal',
    label: 'Normálne',
    description: 'bežne do 1 mesiaca – bez príplatku',
    surcharge: 0,
  },
  {
    id: 'fast',
    label: 'Rýchlejšie',
    description: '+5 €',
    surcharge: 5,
  },
  {
    id: 'express',
    label: 'Expres',
    description: '+10 €',
    surcharge: 10,
  },
  {
    id: 'priority',
    label: 'Prioritne',
    description: '+15 €',
    surcharge: 15,
  },
];

export const speedDeadlineNote =
  'Termín závisí od typu práce, náročnosti a dostupnosti materiálu.';

export const materialNote =
  'Materiál, náhradné diely alebo licencie sa môžu účtovať samostatne.';

export const priceProposalNote =
  'Cena je iba návrh. Konečnú cenu musím potvrdiť ja.';
