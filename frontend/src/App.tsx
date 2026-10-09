import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Research = lazy(() => import('./pages/Research'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const ResearchDirectorDetail = lazy(() => import('./pages/ResearchDirectorDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PAGE_TITLES: Record<string, string> = {
  '/': 'UGCSL – United Global Campus of Sri Lanka',
  '/about': 'About Us | UGCSL',
  '/programs': 'Academic Programs | UGCSL',
  '/admissions': 'Admissions | UGCSL',
  '/research': 'Research | UGCSL',
  '/news': 'News & Events | UGCSL',
  '/contact': 'Contact Us | UGCSL',
};

function PageMeta() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] ?? 'UGCSL – United Global Campus of Sri Lanka';
    document.documentElement.lang = i18n.language;
  }, [pathname, i18n.language]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageMeta />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <ErrorBoundary>
        <div id="main-content">
          <Suspense fallback={
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '100vh' 
            }}>
              <div className="spinner" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/directors/:id" element={<ResearchDirectorDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </ErrorBoundary>
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}
