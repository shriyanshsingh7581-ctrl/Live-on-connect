import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { LiveStreamPage } from './pages/LiveStreamPage';
import { StreamGalleryPage } from './pages/StreamGalleryPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (defaultService?: string) => {
    setSelectedService(defaultService);
    setQuoteModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <ScrollToTop />
        <Header onOpenQuoteModal={handleOpenQuoteModal} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route
              path="/about"
              element={<AboutPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route
              path="/services"
              element={<ServicesPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route
              path="/live-stream"
              element={<LiveStreamPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route
              path="/stream-gallery"
              element={<StreamGalleryPage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route
              path="*"
              element={<HomePage onOpenQuoteModal={handleOpenQuoteModal} />}
            />
          </Routes>
        </main>

        <Footer onOpenQuoteModal={handleOpenQuoteModal} />

        <QuoteModal
          isOpen={quoteModalOpen}
          defaultService={selectedService}
          onClose={() => setQuoteModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
