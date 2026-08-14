import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RouteFallback } from './components/RouteFallback';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastProvider } from '@/components/ui/toast';

/*
 * Home ships in the initial bundle since it is the landing page; every other
 * route is split into its own chunk and fetched on navigation.
 */
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Product = lazy(() => import('./pages/Product'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Public marketing site: navbar and footer wrap the page. */
function MarketingLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1200]
        focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<MarketingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/product" element={<Product />} />
                <Route path="/contact" element={<Contact />} />

                {/*
                 * Retired routes. /device was the appliance landing page before
                 * it merged into /product; the rest were content pages that have
                 * been removed. Redirecting rather than 404ing keeps any link
                 * already out in the world working.
                 */}
                <Route path="/device" element={<Navigate to="/product" replace />} />
                <Route
                  path="/case-studies"
                  element={<Navigate to="/solutions" replace />}
                />
                <Route path="/blog" element={<Navigate to="/" replace />} />
                <Route path="/resources" element={<Navigate to="/" replace />} />
                <Route
                  path="/compliance"
                  element={<Navigate to="/services" replace />}
                />
                <Route path="/soc/*" element={<Navigate to="/product" replace />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </ToastProvider>
    </Router>
  );
};

export default App;
