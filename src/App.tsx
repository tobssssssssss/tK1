import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import SubcategoryView from '@/components/SubcategoryView';
import ServiceDetail from '@/components/ServiceDetail';
import WhatsAppMessagePreview from '@/components/WhatsAppMessagePreview';
import PriceListPage from '@/components/PriceListPage';
import HowItWorksPage from '@/components/HowItWorksPage';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import Breadcrumbs from '@/components/Breadcrumbs';
import WhatsAppButton from '@/components/WhatsAppButton';
import { categories } from '@/data/catalog';
import type { AppView, RequestDraft } from '@/types';

function emptyDraft(catId: string, subId: string, svcId: string): RequestDraft {
  return {
    categoryId: catId,
    subcategoryId: subId,
    serviceId: svcId,
    answers: {},
    description: '',
    speed: 'normal',
    material: 'unknown',
    riskAccepted: false,
    proposedPrice: '',
    files: [],
  };
}

export default function App() {
  const [view, setView] = useState<AppView>({ name: 'home' });
  const [draft, setDraft] = useState<RequestDraft | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const navigate = (v: AppView) => {
    if (v.name === 'service') {
      setDraft(emptyDraft(v.categoryId, v.subcategoryId, v.serviceId));
    }
    setView(v);
  };

  const findCategory = (id: string) => categories.find((c) => c.id === id);
  const findSubcategory = (catId: string, subId: string) =>
    findCategory(catId)?.subcategories.find((s) => s.id === subId);
  const findService = (catId: string, subId: string, svcId: string) =>
    findSubcategory(catId, subId)?.services.find((s) => s.id === svcId);

  const handleSelectCategory = (catId: string) => {
    const cat = findCategory(catId);
    if (!cat) return;
    if (cat.subcategories.length === 1 && cat.subcategories[0].services.length === 1) {
      const sub = cat.subcategories[0];
      navigate({ name: 'service', categoryId: catId, subcategoryId: sub.id, serviceId: sub.services[0].id });
      return;
    }
    if (cat.subcategories.length === 1) {
      navigate({ name: 'subcategory', categoryId: catId, subcategoryId: cat.subcategories[0].id });
      return;
    }
    navigate({ name: 'subcategory', categoryId: catId, subcategoryId: cat.subcategories[0].id });
  };

  const handleSelectSubcategory = (catId: string, subId: string) => {
    navigate({ name: 'subcategory', categoryId: catId, subcategoryId: subId });
  };

  const handleSelectService = (catId: string, subId: string, svcId: string) => {
    navigate({ name: 'service', categoryId: catId, subcategoryId: subId, serviceId: svcId });
  };

  const updateDraft = (updates: Partial<RequestDraft>) => {
    setDraft((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const handleGenerateMessage = () => {
    if (!draft || view.name !== 'service') return;
    setView({
      name: 'message',
      categoryId: view.categoryId,
      subcategoryId: view.subcategoryId,
      serviceId: view.serviceId,
    });
  };

  const renderContent = () => {
    switch (view.name) {
      case 'home':
        return (
          <>
            <Hero onNavigate={navigate} />
            <CategoryGrid
              categories={categories}
              onSelectCategory={handleSelectCategory}
              onNavigate={navigate}
            />
          </>
        );

      case 'categories':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[{ label: 'Domov', onClick: () => navigate({ name: 'home' }) }, { label: 'Služby' }]}
                onBack={() => navigate({ name: 'home' })}
              />
            </div>
            <CategoryGrid
              categories={categories}
              onSelectCategory={handleSelectCategory}
              onNavigate={navigate}
            />
          </>
        );

      case 'subcategory': {
        const cat = findCategory(view.categoryId);
        if (!cat) return <NotFound onHome={() => navigate({ name: 'home' })} />;
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[
                  { label: 'Domov', onClick: () => navigate({ name: 'home' }) },
                  { label: 'Služby', onClick: () => navigate({ name: 'categories' }) },
                  { label: cat.name },
                ]}
                onBack={() => navigate({ name: 'categories' })}
              />
            </div>
            <SubcategoryView
              category={cat}
              onSelectSubcategory={(subId) => handleSelectSubcategory(cat.id, subId)}
              onSelectService={(subId, svcId) => handleSelectService(cat.id, subId, svcId)}
            />
          </>
        );
      }

      case 'service': {
        const cat = findCategory(view.categoryId);
        const sub = findSubcategory(view.categoryId, view.subcategoryId);
        const svc = findService(view.categoryId, view.subcategoryId, view.serviceId);
        if (!cat || !sub || !svc || !draft) return <NotFound onHome={() => navigate({ name: 'home' })} />;
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[
                  { label: 'Domov', onClick: () => navigate({ name: 'home' }) },
                  { label: 'Služby', onClick: () => navigate({ name: 'categories' }) },
                  { label: cat.name, onClick: () => navigate({ name: 'subcategory', categoryId: cat.id, subcategoryId: sub.id }) },
                  { label: svc.name },
                ]}
                onBack={() => navigate({ name: 'subcategory', categoryId: cat.id, subcategoryId: sub.id })}
              />
            </div>
            <ServiceDetail
              category={cat}
              service={svc}
              draft={draft}
              onUpdateDraft={updateDraft}
              onGenerateMessage={handleGenerateMessage}
            />
          </>
        );
      }

      case 'message': {
        const cat = findCategory(view.categoryId);
        const sub = findSubcategory(view.categoryId, view.subcategoryId);
        const svc = findService(view.categoryId, view.subcategoryId, view.serviceId);
        if (!cat || !sub || !svc || !draft) return <NotFound onHome={() => navigate({ name: 'home' })} />;
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[
                  { label: 'Domov', onClick: () => navigate({ name: 'home' }) },
                  { label: 'Služby', onClick: () => navigate({ name: 'categories' }) },
                  { label: cat.name, onClick: () => navigate({ name: 'subcategory', categoryId: cat.id, subcategoryId: sub.id }) },
                  { label: svc.name, onClick: () => navigate({ name: 'service', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id }) },
                  { label: 'Správa' },
                ]}
                onBack={() => navigate({ name: 'service', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id })}
              />
            </div>
            <WhatsAppMessagePreview
              category={cat}
              service={svc}
              draft={draft}
              onBack={() => navigate({ name: 'service', categoryId: cat.id, subcategoryId: sub.id, serviceId: svc.id })}
              onDone={() => navigate({ name: 'home' })}
            />
          </>
        );
      }

      case 'how-it-works':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[{ label: 'Domov', onClick: () => navigate({ name: 'home' }) }, { label: 'Ako to funguje' }]}
                onBack={() => navigate({ name: 'home' })}
              />
            </div>
            <HowItWorksPage />
          </>
        );

      case 'pricelist':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[{ label: 'Domov', onClick: () => navigate({ name: 'home' }) }, { label: 'Cenník' }]}
                onBack={() => navigate({ name: 'home' })}
              />
            </div>
            <PriceListPage />
          </>
        );

      case 'about':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[{ label: 'Domov', onClick: () => navigate({ name: 'home' }) }, { label: 'O TK1' }]}
                onBack={() => navigate({ name: 'home' })}
              />
            </div>
            <AboutPage onNavigate={navigate} />
          </>
        );

      case 'contact':
        return (
          <>
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumbs
                crumbs={[{ label: 'Domov', onClick: () => navigate({ name: 'home' }) }, { label: 'Kontakt' }]}
                onBack={() => navigate({ name: 'home' })}
              />
            </div>
            <ContactPage onNavigate={navigate} />
          </>
        );

      default:
        return <NotFound onHome={() => navigate({ name: 'home' })} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header currentView={view} onNavigate={navigate} />
      <main className="pb-20">{renderContent()}</main>
      <Footer onNavigate={navigate} />
      <WhatsAppButton variant="floating" text="" />
    </div>
  );
}

function NotFound({ onHome }: { onHome: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-white">Stránka sa nenašla</h1>
      <button
        onClick={onHome}
        className="mt-4 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white"
      >
        Späť na domov
      </button>
    </div>
  );
}
