import { ArrowUp } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import PageTransition from './components/PageTransition';

const AgileAcademyPage = lazy(() => import('./components/AgileAcademyPage'));
const AgileStockPage = lazy(() => import('./components/AgileStockPage'));
const AskPageWidget = lazy(() => import('./components/AskPageWidget'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ToolsPage = lazy(() => import('./components/ToolsPage'));

type Page = 'home' | 'tools' | 'agile-stock' | 'agile-academy';

const pageByPath: Record<string, Page> = {
  '/': 'home',
  '/tools': 'tools',
  '/agile-stock': 'agile-stock',
  '/agile-academy': 'agile-academy'
};

const pathByPage: Record<Page, string> = {
  home: '/',
  tools: '/tools',
  'agile-stock': '/agile-stock',
  'agile-academy': '/agile-academy'
};

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#efe7da] px-4 text-[#171411]">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-pulse rounded-full bg-[#d75f32]" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#171411]/55">Cargando GYO</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(pageByPath[location.pathname] ?? 'home');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageChange = (page: string) => {
    const nextPage = (pageByPath[`/${page}`] ?? (page === 'home' ? 'home' : page)) as Page;
    const nextPath = pathByPage[nextPage] ?? '/';

    setCurrentPage(nextPage);
    navigate(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#efe7da]">
      <PageTransition currentPage={currentPage}>
        <Suspense fallback={<PageFallback />}>
          {currentPage === 'home' && <HomePage onPageChange={handlePageChange} />}
          {currentPage === 'tools' && <ToolsPage onPageChange={handlePageChange} />}
          {currentPage === 'agile-stock' && <AgileStockPage onPageChange={handlePageChange} />}
          {currentPage === 'agile-academy' && <AgileAcademyPage onPageChange={handlePageChange} />}
        </Suspense>
      </PageTransition>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-28 right-6 z-50 rounded-full bg-[#171411] p-3 text-[#efe7da] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#d75f32] ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <Suspense fallback={null}>
        <AskPageWidget />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
