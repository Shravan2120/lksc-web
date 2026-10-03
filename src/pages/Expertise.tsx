import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Scale, RefreshCw, ClipboardCheck, BarChart2,
  FileCheck, Globe, TrendingUp, XCircle, AlertTriangle,
  Calculator, Briefcase, PiggyBank, ShieldCheck, ChevronRight,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import servicesData from "@/data/services.json";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Our Services | LKSC & Associates LLP</title>

  <meta
    name="description"
    content="Explore company incorporation, corporate law, audit, taxation, and compliance services by LKSC."
  />

  <link rel="canonical" href="https://yourdomain.com/expertise" />

  <meta property="og:title" content="Our Services | LKSC" />
  <meta property="og:description" content="Corporate, audit, and compliance services." />
  <meta property="og:url" content="https://yourdomain.com/expertise" />
</Helmet>
const iconMap: Record<string, React.ElementType> = {
  Building2,
  Scale,
  RefreshCw,
  ClipboardCheck,
  BarChart2,
  FileCheck,
  Globe,
  TrendingUp,
  XCircle,
  AlertTriangle,
  Calculator,
  Briefcase,
  PiggyBank,    // ← Mutual Fund
  ShieldCheck,  // ← IPR
};

const Expertise = () => {
  const location = useLocation();
  const services = servicesData.services || [];
  const params = new URLSearchParams(location.search);
  const initialId = params.get("service") || services?.[0]?.id;
  const [activeId, setActiveId] = useState(initialId);
  const sectionRef = useRef<HTMLDivElement>(null);

  const active = services.find((s) => s.id === activeId) || services?.[0];
  const Icon = iconMap[active?.icon] || Building2;

  // Sync URL param changes (from navbar dropdown)
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const sid = p.get("service");
    if (sid) {
      setActiveId(sid);
setTimeout(() => {
  const yOffset = -100; // adjust based on navbar height
  const y =
    sectionRef.current!.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}, 50);
    }
  }, [location.search]);

  const handleServiceClick = (id: string) => {
    setActiveId(id);
setTimeout(() => {
  const yOffset = -100; // adjust based on navbar height
  const y =
    sectionRef.current!.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-14 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
              What We Do
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Services
            </h1>
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Comprehensive professional services covering every aspect of
              corporate compliance, governance, and business management.
            </p>
            <nav className="mt-6 text-sm font-body text-primary-foreground/60">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-accent">Services</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <section ref={sectionRef} className="py-12 container mx-auto scroll-mt-32">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:w-72 xl:w-80 shrink-0 w-full"
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)] sticky top-20">
              <div className="bg-primary px-5 py-4">
                <p className="text-accent text-xs font-body tracking-[0.2em] uppercase font-semibold">
                  All Services
                </p>
              </div>
              <nav className="divide-y divide-border">
                {services.map((s) => {
                  const SIcon = iconMap[s.icon] || Building2;
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleServiceClick(s.id)}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 group relative ${
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeBar"
                          className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r"
                        />
                      )}
                      <SIcon
                        size={15}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-accent"
                            : "text-muted-foreground/60 group-hover:text-accent/70"
                        }`}
                      />
                      <span className="font-body text-sm leading-snug">
                        {s.shortLabel}
                      </span>
                      {isActive && (
                        <ChevronRight size={14} className="ml-auto text-accent shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="p-5 bg-secondary/40 border-t border-border">
                <p className="text-xs font-body text-muted-foreground mb-3">
                  Need personalised guidance?
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
                >
                  Contact Us <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Service Header Card */}
                <div className="bg-primary rounded-xl p-8 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <p className="text-accent font-body text-xs tracking-[0.2em] uppercase mb-1.5">
                        {active?.tagline}
                      </p>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                        {active?.label}
                      </h2>
                      <p className="font-body text-primary-foreground/70 leading-relaxed max-w-2xl">
                        {active?.intro}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detail Sections */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {active?.sections.map((section, i) => (
                    <motion.div
                      key={section.heading}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                      className="bg-card border border-border rounded-xl p-6 hover:border-accent/30 hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-5 bg-accent rounded-full shrink-0" />
                        <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                          {section.heading}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {section.items.map((item) => (
                          <motion.li
                            key={item}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex items-start gap-2.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors cursor-default"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="mt-8 p-6 bg-secondary/50 border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-display text-base font-semibold text-foreground mb-1">
                      Interested in {active?.shortLabel}?
                    </p>
                    <p className="text-sm font-body text-muted-foreground">
                      Our team is ready to assist you with your specific requirements.
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
                  >
                    Get Started <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary mt-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Need Expert Professional Support?
            </h2>
            <p className="font-body text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Get in touch with our team to discuss how we can help your business
              stay compliant and grow with confidence.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
              >
                Contact Us Today <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Expertise;