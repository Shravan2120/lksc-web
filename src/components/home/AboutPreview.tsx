import { motion } from "framer-motion";
import { Award, Clock, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const START_YEAR = 2018; // ← change this to your actual start year
const experience = new Date().getFullYear() - START_YEAR;

const stats = [
  { icon: Clock, value: `${experience}+`, label: "Years Experience" },
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Award, value: "100%", label: "Compliance Rate" },
  { icon: TrendingUp, value: "100+", label: "Industries Covered" },
];

const AboutPreview = () => (
  <section id="about" className="py-24 bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
            About Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            A Legacy of Trust &amp;{" "}
            <span className="text-accent">Professional Excellence</span>
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            LKSC &amp; Associates LLP is a premier company secretarial firm Peer 
            reviewed by the Institute of Company Secretaries committed to
            delivering exceptional corporate governance and compliance solutions.
            Founded on principles of integrity, precision, and client-centricity,
            we have earned the trust of businesses across diverse sectors.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Our team of qualified company secretaries and legal professionals
            brings deep expertise in corporate law, regulatory compliance, and
            strategic advisory — empowering organisations to navigate the
            complexities of the business landscape with confidence.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity"
          >
            Know More
          </Link>
        </motion.div>

        {/* Right Stats Grid */}
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
              className="bg-card p-6 rounded-lg shadow-md text-center border border-border"
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
);

export default AboutPreview;