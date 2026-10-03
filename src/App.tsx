import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
/* 🔥 Lazy Imports */
const About = lazy(() => import("./pages/About"));
const Expertise = lazy(() => import("./pages/Expertise"));
const Contact = lazy(() => import("./pages/Contact"));
const UsefulLinks = lazy(() => import("./pages/UsefulLinks"));

/* ───────────────────────────────────────────── */
const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
          Loading...
        </div>
      }
    >
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/useful-links" element={<UsefulLinks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/temp" element={null} />
      </Routes>
    </Suspense>
  );
};

/* ───────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main className="pt-16">
        <AppRoutes />
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;