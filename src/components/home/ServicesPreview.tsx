import { motion } from "framer-motion";
import {
  Building2,
  Scale,
  RefreshCw,
  ClipboardCheck,
  BarChart2,
  FileCheck,
  Globe,
  TrendingUp,
  XCircle,
  Briefcase,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Building2,    title: "Incorporation Of Company",        id: "incorporation",         color: "bg-blue-500/10 text-blue-500" },
  { icon: Scale,        title: "Company Law Services",            id: "company-law",           color: "bg-violet-500/10 text-violet-500" },
  { icon: RefreshCw,    title: "Corporate Restructuring",         id: "corporate-restructuring", color: "bg-amber-500/10 text-amber-500" },
  { icon: ClipboardCheck,title: "Audit & Certification",          id: "audit-certification",   color: "bg-emerald-500/10 text-emerald-500" },
  { icon: BarChart2,    title: "SEBI & Listing",                  id: "sebi-listing",          color: "bg-rose-500/10 text-rose-500" },
  { icon: FileCheck,    title: "Applications & Approval",         id: "applications-approval", color: "bg-cyan-500/10 text-cyan-500" },
  { icon: Globe,        title: "Foreign Exchange Management",     id: "foreign-exchange",      color: "bg-teal-500/10 text-teal-500" },
  { icon: TrendingUp,   title: "Project Financing",               id: "project-financing",     color: "bg-orange-500/10 text-orange-500" },
  { icon: XCircle,      title: "Closure Of Business",             id: "closure-business",      color: "bg-red-500/10 text-red-500" },

  // ✅ New Services
  { icon: TrendingUp,   title: "Mutual Fund Services",            id: "mutual-fund",           color: "bg-green-500/10 text-green-500" },
  { icon: ShieldCheck,  title: "Intellectual Property Rights (IPR)", id: "ipr",              color: "bg-purple-500/10 text-purple-500" },

  { icon: Briefcase,    title: "Other Varied Services",           id: "other-services",        color: "bg-pink-500/10 text-pink-500" },
];

const ServicesPreview = () => (
  <section id="services" className="py-24 bg-secondary">
    <div className="container mx-auto">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
          What We Do
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Our Services
        </h2>
        <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          From incorporation to investment advisory, we cover the full spectrum of
          corporate compliance, governance, and financial services.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            >
              <Link
                to={`/expertise?service=${s.id}`}
                className="group flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3.5 hover:border-accent/40 hover:shadow-[var(--shadow-elevated)] transition-all duration-200 h-full"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${s.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={16} />
                </div>

                {/* Title */}
                <span className="font-body text-sm text-foreground/80 group-hover:text-accent transition-colors duration-200 leading-snug">
                  {s.title}
                </span>

                {/* Arrow */}
                <ArrowRight
                  size={13}
                  className="ml-auto shrink-0 text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/expertise"
          className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity text-sm"
        >
          Explore All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  </section>
);

export default ServicesPreview;