import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Useful Links | LKSC & Associates LLP</title>

  <meta
    name="description"
    content="Access important government and regulatory resources related to corporate compliance in India."
  />

  <link rel="canonical" href="https://yourdomain.com/useful-links" />

  <meta property="og:title" content="Useful Links | LKSC" />
  <meta property="og:description" content="Important corporate and compliance resources." />
  <meta property="og:url" content="https://yourdomain.com/useful-links" />
</Helmet>

const links = [
  {
    name: "Ministry of Corporate Affairs",
    url: "https://www.mca.gov.in",
    logo: "/links/1.png",
    description: "The Ministry of Corporate Affairs is an Indian government ministry primarily concerned with administration of the Companies Act 2013, the Companies Act 1956, the Limited Liability Partnership Act, 2008, and the Insolvency and Bankruptcy Code, 2016.",
  },
  {
    name: "Securities and Exchange Board of India",
    url: "https://www.sebi.gov.in",
    logo: "/links/2.png",
    description: "The Securities and Exchange Board of India is the regulatory body for securities and commodity market in India under the ownership of Ministry of Finance within the Government of India.",
  },
  {
    name: "Bombay Stock Exchange",
    url: "https://www.bseindia.com",
    logo: "/links/3.png",
    description: "The BSE SENSEX is a free-float market-weighted stock market index of 30 well-established and financially sound companies listed on the Bombay Stock Exchange.",
  },
  {
    name: "National Stock Exchange of India",
    url: "https://www.nseindia.com",
    logo: "/links/4.png",
    description: "The National Stock Exchange of India is the leading stock exchange of India, located in Mumbai. It is the world's largest derivatives exchange by number of contracts traded.",
  },
  {
    name: "The Institute of Company Secretaries of India",
    url: "https://www.icsi.edu",
    logo: "/links/5.png",
    description: "The Institute of Company Secretaries of India is the premier national professional body that develops and regulates the profession of Company Secretaries in India.",
  },
  {
    name: "Reserve Bank of India",
    url: "https://www.rbi.org.in",
    logo: "/links/6.png",
    description: "The Reserve Bank of India is India's central bank and regulatory body responsible for regulation of the Indian banking system and monetary policy.",
  },
  {
    name: "Ministry of Finance",
    url: "https://www.finmin.nic.in",
    logo: "/links/7.png",
    description: "The Ministry of Finance is a ministry within the Government of India concerned with the economy of India, serving as the Treasury of India.",
  },
  {
    name: "The Institute of Chartered Accountants of India",
    url: "https://www.icai.org",
    logo: "/links/8.png",
    description: "The Institute of Chartered Accountants of India is India's largest professional accounting body and the world's 2nd largest professional accounting body under the administrative control of Ministry of Corporate Affairs.",
  },
  {
    name: "The Institute of Cost Accountants of India",
    url: "https://www.icmai.in",
    logo: "/links/9.png",
    description: "The Institute of Cost Accountants of India would be the preferred source of resources and professionals for the financial leadership of enterprises globally.",
  },
  {
    name: "National Securities Depository Limited",
    url: "https://www.nsdl.co.in",
    logo: "/links/10.png",
    description: "NSDL, one of the largest Depositories in the World, established in August 1996 has established a state-of-the-art infrastructure that handles most of the securities held and settled in dematerialized form in the Indian capital market.",
  },
  {
    name: "Central Depository Services (India) Limited",
    url: "https://www.cdslindia.com",
    logo: "/links/11.png",
    description: "Central Depository Services Ltd. is an Indian central securities depository, founded in 1999. CDSL is the largest depository in India in terms of number of demat accounts opened.",
  },
  {
    name: "National Company Law Tribunal",
    url: "https://www.nclt.gov.in",
    logo: "/links/12.png",
    description: "The Central Government has constituted National Company Law Tribunal (NCLT) under section 408 of the Companies Act, 2013 (18 of 2013) w.e.f. 01st June 2016.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.05, 
      duration: 0.4, 
      ease: "easeOut" as const  // 👈 add as const
    },
  }),
};

const UsefulLinks = () => (
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
            Resources
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Useful Links
          </h1>
          <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Quick access to important regulatory bodies, government ministries,
            and professional institutions.
          </p>
          <nav className="mt-6 text-sm font-body text-primary-foreground/60">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent">Useful Links</span>
          </nav>
        </motion.div>
      </div>
    </section>

    {/* Links Grid */}
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group bg-card rounded-xl border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-accent/30 transition-all overflow-hidden flex flex-col"
            >
              {/* Logo Area */}
              <div className="h-40 bg-secondary/30 flex items-center justify-center p-6 border-b border-border group-hover:bg-accent/5 transition-colors">
                <img
                  src={link.logo}
                  alt={link.name}
                  className="max-h-24 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">
                    {link.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-accent shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {link.description}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div className="h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>

  </div>
);

export default UsefulLinks;