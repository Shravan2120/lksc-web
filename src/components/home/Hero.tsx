import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const cyclingPhrases = [
  "Corporate Governance",
  "Business Formation",
  "Statutory Compliance",
  "Capital Markets Advisory",
  "Business Transformation",
  "Cross-Border Transactions",
  "Audit & Taxation",
  "Debt Resolution",
  "Project Financing",
  "Business Transitions",
  "Company Law Services",
  "Regulatory Advisory",
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 300;

const Hero = () => {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = cyclingPhrases[phraseIndex];

    if (isPaused) return;

    if (!isDeleting && displayed === current) {
      setIsPaused(true);
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, PAUSE_AFTER_TYPE);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsPaused(true);
      timeoutRef.current = setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % cyclingPhrases.length);
        setIsDeleting(false);
        setIsPaused(false);
      }, PAUSE_AFTER_DELETE);
      return;
    }

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    timeoutRef.current = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, isPaused, phraseIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
<img
  src="/hero-bg.webp"
  alt=""
  className="w-full h-full object-cover"
  width={1920}
  height={1080}
  fetchPriority="high"
  decoding="async"
/>
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl lg:max-w-4xl"
        >
          <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-4">
           LKSC &amp; Associates LLP • Company Secretarial Services
          </p>

<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
  Your Trusted Partner in

  <span className="block text-accent min-h-[1.2em] mt-2">
    {displayed}
    <span
      className="inline-block w-[3px] ml-1 rounded-sm bg-accent"
      style={{
        height: "0.85em",
        animation: "blink 0.9s step-end infinite",
      }}
    />
  </span>
</h1>

<p className="font-body text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
  LKSC &amp; Associates LLP provides expert company secretarial,
  corporate compliance, company law, and advisory services to help
  businesses navigate regulatory requirements and maintain strong
  corporate governance.
</p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/expertise"
              className="inline-flex items-center px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
            >
              Our Services
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 border border-primary-foreground/30 text-primary-foreground font-medium rounded hover:border-accent hover:text-accent transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Cursor blink animation */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;