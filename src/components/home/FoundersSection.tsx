import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const founders = [
  {
    name: "CS Lalith Kotian",
    designation: "Managing Partner",
    qualifications: "ACS, LLB",
    description:
      "CS Lalith Kotian brings extensive experience in corporate law and governance, leading the firm with a vision for excellence and client-first service.",
    linkedin: "https://www.linkedin.com/in/lalith-kotian-724bbbb5/",
    email: "lalith@lksc.in",
    specializations: [
      "Corporate Governance",
      "Mergers & Acquisitions",
      "Regulatory Compliance",
    ],
  },
  {
    name: "CS Sanket Chauhan",
    designation: "Managing Partner",
    qualifications: "ACS, LLB",
    description:
      "A seasoned professional with deep expertise in statutory compliance and advisory, CS Sanket Chauhan ensures every client receives meticulous, tailored solutions.",
    linkedin:
      "https://www.linkedin.com/in/cs-sanket-chauhan-407591160/",
    email: "sanket@lksc.in",
    specializations: [
      "Statutory Compliance",
      "Secretarial Audit",
      "Corporate Restructuring",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const FoundersSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <p className="text-accent font-body text-sm tracking-[0.25em] uppercase mb-3">
          Leadership
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Meet Our Founders
        </h2>
      </div>

      {/* Founder Cards */}
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {founders.map((founder, i) => (
          <motion.div
            key={founder.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group bg-card rounded-xl border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-2 transition-all duration-300 relative"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            {/* Founder Information */}
            <div className="p-8">
              <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                {founder.name}
              </h3>

              <p className="font-body text-accent text-sm font-medium mt-1">
                {founder.designation}
              </p>

              <p className="font-body text-xs text-muted-foreground mt-1 mb-5">
                {founder.qualifications}
              </p>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                {founder.description}
              </p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mb-6">
                {founder.specializations.map((specialization) => (
                  <span
                    key={specialization}
                    className="text-xs font-body px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {specialization}
                  </span>
                ))}
              </div>

              {/* Social / Contact Links */}
              <div className="flex gap-3 pt-4 border-t border-border">
                {/* LinkedIn */}
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`View ${founder.name} on LinkedIn`}
                  aria-label={`View ${founder.name} on LinkedIn`}
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent transition-colors group/link"
                >
                  <FaLinkedin className="w-4 h-4 text-accent group-hover/link:text-accent-foreground transition-colors" />
                </a>

                {/* Email */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${founder.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Email ${founder.name}`}
                  aria-label={`Email ${founder.name}`}
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent transition-colors group/link"
                >
                  <Mail className="w-4 h-4 text-accent group-hover/link:text-accent-foreground transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FoundersSection;