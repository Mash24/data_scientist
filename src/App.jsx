import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRouteScroll } from './hooks/useRouteScroll';

const Home = lazy(() => import('./pages/Home'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
  </div>
);

function App() {
  useRouteScroll();

  return (
    <main className="font-sans">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
