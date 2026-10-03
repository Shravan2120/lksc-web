import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Qualified & experienced Company Secretaries",
  "Personalised attention to every client",
  "Proactive compliance management",
  "End-to-end corporate solutions",
  "Strict confidentiality and data security",
  "Timely delivery and transparent pricing",
];

const WhyUsPreview = () => (
  <section id="why-us" className="py-24 bg-primary">
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-12">
          Built on Trust, Driven by Excellence
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 text-left">
          {reasons.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <span className="font-body text-primary-foreground/80">{r}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyUsPreview;