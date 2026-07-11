import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import CaseStudies from './pages/CaseStudies';
import Compliance from './pages/Compliance';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { DemoBackgroundPaths } from './components/ui/demo';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/background-paths" element={<DemoBackgroundPaths />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
