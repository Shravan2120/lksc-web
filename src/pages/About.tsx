import Navbar from "@/components/navbar";
 import FoundersSection from "@/components/home/FoundersSection";
import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Heart,
  Eye,
  Award,
  Users,
  Clock,
  TrendingUp,
 // CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>About Us | LKSC & Associates LLP</title>

  <meta
    name="description"
    content="Learn about LKSC & Associates LLP, a trusted firm providing corporate law, compliance, and advisory services."
  />

  <link rel="canonical" href="https://yourdomain.com/about" />

  <meta property="og:title" content="About LKSC & Associates LLP" />
  <meta property="og:description" content="Trusted corporate and compliance experts." />
  <meta property="og:url" content="https://yourdomain.com/about" />
</Helmet>
const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Upholding the highest ethical standards in every engagement and interaction.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "Delivering accurate, detail-oriented solutions with zero room for error.",
  },
  {
    icon: Heart,
    title: "Client-Centricity",
    description:
      "Placing our clients' interests at the core of every decision we make.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Maintaining open communication and clear processes at every stage.",
  },
];

/* const certifications = [
  "Institute of Company Secretaries of India (ICSI)",
  "Member — ICSI Centre for Corporate Governance",
  "Registered with Ministry of Corporate Affairs",
  "Empanelled with Stock Exchanges (BSE & NSE)",
  "ISO 9001:2015 Certified Processes",
  "Member — Corporate Laws Committee, ICSI",
]; */

const START_YEAR = 2018; // ← change this to your actual start year
const experience = new Date().getFullYear() - START_YEAR;

const stats = [
  { icon: Clock, value: `${experience}+`, label: "Years Experience" },
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Award, value: "100%", label: "Compliance Rate" },
  { icon: TrendingUp, value: "100+", label: "Industries Covered" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero Banner */}
    <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
            Who We Are
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Us
          </h1>
          <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            A legacy of trust, professional excellence, and unwavering
            commitment to corporate governance.
          </p>
          <nav className="mt-6 text-sm font-body text-primary-foreground/60">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent">About Us</span>
          </nav>
        </motion.div>
      </div>
    </section>

    {/* About Detail */}
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Premier Firm Built on{" "}
              <span className="text-accent">Trust & Excellence</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              LKSC & Associates LLP is a premier company secretarial firm,Peer reviewed 
              by the Institute of Company Secretaries committed
              to delivering exceptional corporate governance and compliance
              solutions. Founded on principles of integrity, precision, and
              client-centricity, we have earned the trust of businesses across
              diverse sectors.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Our team of qualified company secretaries and legal professionals
              brings deep expertise in corporate law, regulatory compliance, and
              strategic advisory — empowering organisations to navigate the
              complexities of the business landscape with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] text-center border border-border"
              >
                <s.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-foreground">
                  {s.value}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
            What Drives Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Our Core Values
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-card rounded-xl border border-border p-8 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Founders */}
     <FoundersSection />

    {/* Certifications */}
{/*     <section className="py-20 bg-primary">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
            Credentials
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Certifications & Memberships
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-start gap-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-4 hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <span className="font-body text-sm text-primary-foreground/80">
                {cert}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section> */}

    {/* CTA */}
    <section className="py-20 bg-background">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Work With Us?
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8">
            Partner with LKSC & Associates LLP for reliable, expert corporate
            secretarial services tailored to your business needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>

  
  </div>
);

export default About;