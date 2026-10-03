import { Link } from "react-router-dom";
import servicesData from "@/data/services.json";

const services = servicesData.services.slice(0, 4);
const Footer = () => (
  <footer className="bg-primary py-12 border-t border-accent/10">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">

      {/* Brand */}
<div>
  <div className="flex items-center gap-3 mb-3">
    
    {/* CS Logo */}
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

  </div>
  <p className="font-body text-primary-foreground/60 text-sm mt-2 max-w-xs leading-relaxed">
    Professional company secretarial services built on trust, expertise,
    and a commitment to excellence.
  </p>
</div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Services", to: "/expertise" },
              { label: "Useful Links", to: "/useful-links" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
            Services
          </h4>
<ul className="space-y-2">
  {services.map((s) => (
    <li key={s.id}>
      <Link
        to={`/expertise?service=${s.id}`}
        className="font-body text-sm text-primary-foreground/60 hover:text-accent"
      >
        {s.shortLabel}
      </Link>
    </li>
  ))}
</ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Office No. 302, Kateeleshwari Arcade,
              LBS Road, Near Mulund Check Naka,
              Mulund West, Mumbai - 400080
            </li>
            <li className="font-body text-sm text-primary-foreground/60">
              info@lksc.in
            </li>
          </ul>
        </div>

      </div>

      {/* Divider + Copyright */}
      <div className="border-t border-primary-foreground/10 pt-6 text-center">
        <p className="font-body text-xs text-primary-foreground/40">
          {`© ${new Date().getFullYear()} LKSC & Associates LLP. All rights reserved.`}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;