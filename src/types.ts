// Core data model: Category → Subcategory → Service → Questions → Pricing
// Designed so new categories, services, questions, and pricing rules can be
// added without touching application code.

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'file';

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  required?: boolean;
  example?: string;
}

export interface ServicePricing {
  /** Display string e.g. "od 7 €", "1–50 €", "dohoda" */
  label: string;
  /** Whether price is determined after submission based on details */
  negotiable?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  priceFrom: string;
  pricing?: ServicePricing;
  /** Questions shown in the "Čo mi máš napísať" section */
  questions: Question[];
  /** Free-text prompt shown above the description field */
  descriptionPrompt?: string;
  /** Example text shown to guide the user */
  example?: string;
  /** Whether this service involves system modification risk (root, ROM, etc.) */
  riskWarning?: boolean;
  /** Whether material / parts may be needed */
  hasMaterial?: boolean;
  /** Whether file upload is offered */
  hasFileUpload?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  icon?: string;
  services: Service[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

// ---- Runtime types ----

export type SpeedOption = 'normal' | 'fast' | 'express' | 'priority';

export interface SpeedInfo {
  id: SpeedOption;
  label: string;
  description: string;
  surcharge: number;
}

export type MaterialOption = 'self' | 'needed' | 'unknown';

export interface RequestDraft {
  categoryId: string;
  subcategoryId: string;
  serviceId: string;
  answers: Record<string, string>;
  description: string;
  speed: SpeedOption;
  material: MaterialOption;
  riskAccepted: boolean;
  /** Customer's proposed price in euros (empty string if not provided) */
  proposedPrice: string;
  /** Names of attached files */
  files: string[];
}

export type AppView =
  | { name: 'home' }
  | { name: 'categories' }
  | { name: 'subcategory'; categoryId: string; subcategoryId: string }
  | { name: 'service'; categoryId: string; subcategoryId: string; serviceId: string }
  | { name: 'message'; categoryId: string; subcategoryId: string; serviceId: string }
  | { name: 'how-it-works' }
  | { name: 'pricelist' }
  | { name: 'about' }
  | { name: 'contact' };
