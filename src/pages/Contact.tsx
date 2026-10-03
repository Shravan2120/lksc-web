import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, User, AtSign, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// ── Config ──
const WORKER_URL = "https://lksc-contact-form.mute-brook-dd9f.workers.dev";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: object) => number;
      reset: (widgetId?: number) => void;
      execute: (widgetId?: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type TouchedFields = Partial<Record<keyof FormData, boolean>>;

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  else if (data.fullName.trim().length < 2) errors.fullName = "Name must be at least 2 characters.";
  if (!data.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[+]?[\d\s\-()]{7,15}$/.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  else if (data.subject.trim().length < 3) errors.subject = "Subject must be at least 3 characters.";
  if (!data.message.trim()) errors.message = "Message is required.";
  else if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
};

const getFieldState = (
  fieldName: keyof FormData,
  errors: FormErrors,
  touched: TouchedFields,
  value: string
): "idle" | "error" | "success" => {
  if (!touched[fieldName]) return "idle";
  if (errors[fieldName]) return "error";
  if (value.trim()) return "success";
  return "idle";
};

const getInputClass = (fieldName: keyof FormData, errors: FormErrors, touched: TouchedFields, form: FormData) => {
  const state = getFieldState(fieldName, errors, touched, form[fieldName]);
  const base = "w-full pl-10 pr-10 py-3 rounded bg-secondary text-foreground font-body text-sm border focus:outline-none focus:ring-2 placeholder:text-muted-foreground transition-all duration-200";
  if (state === "error") return `${base} border-red-400 focus:ring-red-400/50 bg-red-50/30`;
  if (state === "success") return `${base} border-green-400 focus:ring-green-400/50 bg-green-50/30`;
  return `${base} border-border focus:ring-accent/50`;
};

const getTextareaClass = (fieldName: keyof FormData, errors: FormErrors, touched: TouchedFields, form: FormData) => {
  const state = getFieldState(fieldName, errors, touched, form[fieldName]);
  const base = "w-full px-4 py-3 rounded bg-secondary text-foreground font-body text-sm border focus:outline-none focus:ring-2 placeholder:text-muted-foreground transition-all duration-200 resize-none";
  if (state === "error") return `${base} border-red-400 focus:ring-red-400/50 bg-red-50/30`;
  if (state === "success") return `${base} border-green-400 focus:ring-green-400/50 bg-green-50/30`;
  return `${base} border-border focus:ring-accent/50`;
};

const FieldIcon = ({ fieldName, icon: Icon, errors, touched, form }: {
  fieldName: keyof FormData; icon: React.ElementType;
  errors: FormErrors; touched: TouchedFields; form: FormData;
}) => {
  const state = getFieldState(fieldName, errors, touched, form[fieldName]);
  return (
    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <Icon className={`w-4 h-4 transition-colors duration-200 ${
        state === "error" ? "text-red-400" :
        state === "success" ? "text-green-500" :
        "text-muted-foreground/50"
      }`} />
    </div>
  );
};

const StatusIcon = ({ fieldName, errors, touched, form }: {
  fieldName: keyof FormData; errors: FormErrors;
  touched: TouchedFields; form: FormData;
}) => {
  const state = getFieldState(fieldName, errors, touched, form[fieldName]);
  if (state === "idle") return null;
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <AnimatePresence mode="wait">
        {state === "success" && (
          <motion.div key="success" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.15 }}>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </motion.div>
        )}
        {state === "error" && (
          <motion.div key="error" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.15 }}>
            <AlertCircle className="w-4 h-4 text-red-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ErrorMessage = ({ fieldName, errors, touched }: {
  fieldName: keyof FormData; errors: FormErrors; touched: TouchedFields;
}) => (
  <AnimatePresence>
    {touched[fieldName] && errors[fieldName] && (
      <motion.p
        initial={{ opacity: 0, y: -4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -4, height: 0 }}
        transition={{ duration: 0.2 }}
        className="text-xs text-red-500 mt-1 font-body flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3 shrink-0" />
        {errors[fieldName]}
      </motion.p>
    )}
  </AnimatePresence>
);

/* ── Main Component ── */
const Contact = () => {
  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const recaptchaWidgetId = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaTokenRef = useRef<string>("");

  // ── Load reCAPTCHA v2 invisible ──
  useEffect(() => {
    window.onRecaptchaLoad = () => {
      if (recaptchaContainerRef.current && recaptchaWidgetId.current === null) {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          size: "invisible",
          badge: "bottomright",
          callback: (token: string) => {
            recaptchaTokenRef.current = token;
          },
        });
      }
      setRecaptchaReady(true);
    };

    if (!document.getElementById("recaptcha-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      window.onRecaptchaLoad();
    }

    return () => {
      (window as Window & { onRecaptchaLoad?: () => void }).onRecaptchaLoad = undefined;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    if (touched[name as keyof FormData]) {
      const newErrors = validate(updatedForm);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate form
    const allTouched: TouchedFields = {
      fullName: true, email: true, phone: true, subject: true, message: true,
    };
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    try {
      // 2. Get reCAPTCHA token
      let recaptchaToken = "";
      if (recaptchaReady && recaptchaWidgetId.current !== null) {
        recaptchaTokenRef.current = "";
        window.grecaptcha.reset(recaptchaWidgetId.current);

        recaptchaToken = await new Promise<string>((resolve, reject) => {
          const checkToken = setInterval(() => {
            if (recaptchaTokenRef.current) {
              clearInterval(checkToken);
              resolve(recaptchaTokenRef.current);
            }
          }, 100);

          setTimeout(() => {
            clearInterval(checkToken);
            reject(new Error("reCAPTCHA timeout"));
          }, 10000);

          window.grecaptcha.execute(recaptchaWidgetId.current!);
        });
      }

      // 3. POST to Cloudflare Worker
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // 4. Success
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
      setTouched({});
      recaptchaTokenRef.current = "";
      if (recaptchaWidgetId.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }

    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      if (recaptchaWidgetId.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
    }
  };

  return (
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
              Get In Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              We're here to help with all your corporate secretarial needs.
            </p>
            <nav className="mt-6 text-sm font-body text-primary-foreground/60">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-accent">Contact</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <p className="font-body text-muted-foreground leading-relaxed">
                Whether you need assistance with company incorporation, statutory
                compliance, or corporate advisory, our team is here to help.
                Reach out to us today.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Mail, text: "info@lksc.in" },
                  { icon: Phone, text: "+91 8928147828" },
                  { icon: Phone, text: "+91 9833341840" },
                  { icon: Phone, text: "+91 9702755740" },
                  { icon: MapPin, text: "Office No. 302, Kateeleshwari Arcade, LBS Road, Near Mulund Check Naka, Mulund West, Mumbai - 400080" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-body text-foreground text-sm mt-2">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-[var(--shadow-card)] h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.0634843906746!2d72.9553871!3d19.184108000000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b90281c88717%3A0x4df5e0199a904550!2sKateeleshwari%20Apartment!5e0!3m2!1sen!2sin!4v1774441686482!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LKSC Office Location"
                />
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 rounded-lg shadow-[var(--shadow-card)] space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-sm font-body text-green-700">
                      Your message has been sent successfully! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <p className="text-sm font-body text-red-700">
                      Something went wrong. Please try again or email us directly at info@lksc.in
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="relative">
                    <FieldIcon fieldName="fullName" icon={User} errors={errors} touched={touched} form={form} />
                    <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} onBlur={handleBlur} className={getInputClass("fullName", errors, touched, form)} />
                    <StatusIcon fieldName="fullName" errors={errors} touched={touched} form={form} />
                  </div>
                  <ErrorMessage fieldName="fullName" errors={errors} touched={touched} />
                </div>
                <div>
                  <div className="relative">
                    <FieldIcon fieldName="email" icon={AtSign} errors={errors} touched={touched} form={form} />
                    <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} onBlur={handleBlur} className={getInputClass("email", errors, touched, form)} />
                    <StatusIcon fieldName="email" errors={errors} touched={touched} form={form} />
                  </div>
                  <ErrorMessage fieldName="email" errors={errors} touched={touched} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="relative">
                  <FieldIcon fieldName="phone" icon={Phone} errors={errors} touched={touched} form={form} />
                  <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} onBlur={handleBlur} className={getInputClass("phone", errors, touched, form)} />
                  <StatusIcon fieldName="phone" errors={errors} touched={touched} form={form} />
                </div>
                <ErrorMessage fieldName="phone" errors={errors} touched={touched} />
              </div>

              {/* Subject */}
              <div>
                <div className="relative">
                  <FieldIcon fieldName="subject" icon={MessageSquare} errors={errors} touched={touched} form={form} />
                  <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} onBlur={handleBlur} className={getInputClass("subject", errors, touched, form)} />
                  <StatusIcon fieldName="subject" errors={errors} touched={touched} form={form} />
                </div>
                <ErrorMessage fieldName="subject" errors={errors} touched={touched} />
              </div>

              {/* Message */}
              <div>
                <textarea rows={5} name="message" placeholder="Your Message" value={form.message} onChange={handleChange} onBlur={handleBlur} className={getTextareaClass("message", errors, touched, form)} />
                <ErrorMessage fieldName="message" errors={errors} touched={touched} />
              </div>

              {/* Hidden reCAPTCHA container */}
              <div ref={recaptchaContainerRef} />

              {/* reCAPTCHA branding — required by Google ToS */}
              <p className="text-xs text-muted-foreground font-body">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                  Terms of Service
                </a>{" "}
                apply.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying & Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;