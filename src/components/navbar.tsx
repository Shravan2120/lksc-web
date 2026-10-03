  import { useState, useRef } from "react";
  import { Menu, X, ChevronDown } from "lucide-react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useNavigate, useLocation } from "react-router-dom";

  const services = [
    { label: "Incorporation Of Company / Business Formation", id: "incorporation" },
    { label: "Company Law Services", id: "company-law" },
    { label: "Corporate Restructuring", id: "corporate-restructuring" },
    { label: "Audit & Certification", id: "audit-certification" },
    { label: "SEBI & Listing", id: "sebi-listing" },
    { label: "Applications & Approval", id: "applications-approval" },
    { label: "Foreign Exchange Management", id: "foreign-exchange" },
    { label: "Project Financing", id: "project-financing" },
    { label: "Closure Of Business", id: "closure-business" },
    { label: "Mutual Fund Services", id: "mutual-fund" },
    { label: "Intellectual Property Rights (IPR)", id: "ipr" },
    { label: "Other Varied Services", id: "other-services" },
  ];

  // ✅ Services moved right after About


  const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleNavClick = (to: string) => {
      setOpen(false);
      setServicesOpen(false);
      if (location.pathname === to) {
        navigate("/blank", { replace: true });
        setTimeout(() => navigate(to, { replace: true }), 0);
      } else {
        navigate(to);
      }
    };

    const handleServiceClick = (id: string) => {
      setOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);
      navigate(`/expertise?service=${id}`);
    };

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setServicesOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
    };

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20">
        <div className="w-full flex items-center justify-between h-16 px-6">

{/* Logo */}
<button onClick={() => handleNavClick("/")} className="flex items-center gap-3">
  
  {/* CS Logo Image */}
  <img
    src="/cs-logo2.png"
    alt="CS Logo"
    className="h-10 w-auto object-contain"
  />

  {/* Divider */}
  <div className="h-10 w-px bg-primary-foreground/20" />

  {/* Text */}
  <div className="flex flex-col items-start leading-tight">
    <span className="font-display text-lg font-bold text-primary-foreground tracking-wide">
      LKSC <span className="text-accent italic">&</span> Associates LLP
    </span>
    <span className="font-body text-xs text-accent tracking-[0.15em] uppercase">
      Company Secretaries
    </span>
  </div>

</button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">

            {/* Home */}
            <li>
              <button
                onClick={() => handleNavClick("/")}
                className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Home
              </button>
            </li>

            {/* About */}
            <li>
              <button
                onClick={() => handleNavClick("/about")}
                className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
              >
                About
              </button>
            </li>

            {/* ✅ Services dropdown — right after About */}
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick("/expertise")}
                className="flex items-center gap-1 text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-80 rounded-xl overflow-hidden"
                    style={{
                      background: "#ffffff",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {/* Dropdown header accent strip */}
                    <div className="bg-accent px-4 py-2.5">
                      <p className="text-accent-foreground text-xs font-semibold tracking-[0.15em] uppercase font-body">
                        Our Services
                      </p>
                    </div>

                    {/* Service items */}
                    <div className="py-1">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleServiceClick(s.id)}
                          className="w-full text-left px-4 py-2.5 text-sm font-body transition-all duration-150 group flex items-center gap-2"
                          style={{ color: "#374151" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#f0f4ff";
                            (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--accent))";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                          }}
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                            style={{ background: "hsl(var(--accent))" }}
                          />
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Useful Links */}
            <li>
              <button
                onClick={() => handleNavClick("/useful-links")}
                className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Useful Links
              </button>
            </li>

            {/* Contact */}
            <li>
              <button
                onClick={() => handleNavClick("/contact")}
                className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Contact
              </button>
            </li>

          </ul>

          {/* CTA */}
          <button
            onClick={() => handleNavClick("/contact")}
            className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </button>

          {/* Mobile Toggle */}
<button
  onClick={() => setOpen(!open)}
  className="md:hidden text-primary-foreground"
  aria-label={open ? "Close menu" : "Open menu"}
  aria-expanded={open}
  aria-controls="mobile-menu"
>
  {open ? <X size={24} /> : <Menu size={24} />}
</button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
            id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-primary overflow-hidden"
            >
              <ul className="flex flex-col py-4 px-6 gap-4">
                <li>
                  <button
                    onClick={() => handleNavClick("/")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick("/about")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    About
                  </button>
                </li>

                {/* Mobile Services — right after About */}
                <li>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center gap-1 text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Services
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 ml-4 flex flex-col gap-2 overflow-hidden"
                      >
                        {services.map((s) => (
                          <li key={s.id}>
                            <button
                              onClick={() => handleServiceClick(s.id)}
                              className="text-sm text-primary-foreground/60 hover:text-accent transition-colors text-left"
                            >
                              {s.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <li>
                  <button
                    onClick={() => handleNavClick("/useful-links")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Useful Links
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick("/contact")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Contact
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleNavClick("/contact")}
                    className="inline-flex px-5 py-2 text-sm font-medium bg-accent text-accent-foreground rounded"
                  >
                    Get in Touch
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  };

  export default Navbar;