"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── Brand colors ─────────────────────────────────────────── */
const C = {
  royal: "#1B3A8A",
  royalDark: "#0F2460",
  royalLight: "#2952C4",
  sky: "#6BA3D6",
  gold: "#C8993A",
  goldLight: "#E8C06A",
  white: "#FFFFFF",
  navy: "#0F1E4A",
  gray: "#F4F7FB",
};

/* ─── Services data ────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "⚖️",
    title: "Notary Public",
    tagline: "Official. Trusted. Fast.",
    desc: "Witnessed and certified signature authentication for legal documents, affidavits, powers of attorney, wills, and more.",
    docs: ["Government-issued photo ID", "Unsigned document (sign in my presence)", "Any co-signers must be present"],
    price: "From $10/signature",
  },
  {
    icon: "🏠",
    title: "Loan Signing Agent",
    tagline: "Mortgage closings made seamless.",
    desc: "Certified signing agent for mortgage closings, refinances, and real estate transactions. Coordinating with title companies and lenders.",
    docs: ["Closing package (sent by title/lender)", "Government-issued photo ID", "Certified check or wire confirmation (if required)"],
    price: "Call for package pricing",
  },
  {
    icon: "🌍",
    title: "Apostille Agent",
    tagline: "Documents recognized worldwide.",
    desc: "Authentication of US documents for use in foreign countries — birth certificates, diplomas, corporate docs, and more.",
    docs: ["Original document or certified copy", "Government-issued photo ID", "Destination country name"],
    price: "From $150/document",
  },
];

/* ─── FAQ data ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do you offer mobile notary services?",
    a: "Yes! I come to you — at home, your office, hospital, or wherever is convenient. Serving Boston, Brookline, and surrounding areas.",
  },
  {
    q: "How quickly can you come out?",
    a: "Same-day and next-day appointments are often available. Call or email to check availability.",
  },
  {
    q: "What documents do I need to bring?",
    a: "Always bring a valid, unexpired government-issued photo ID (driver's license, passport, or state ID). Bring the unsigned document — you must sign it in my presence.",
  },
  {
    q: "How long does an apostille take?",
    a: "Apostille processing through the MA Secretary of State typically takes 2–5 business days. Rush options may be available.",
  },
  {
    q: "Can you notarize documents in a language other than English?",
    a: "Yes, as long as I can identify the signature line and the signer presents valid ID. I can work with multilingual documents.",
  },
  {
    q: "Do you handle hospital or nursing home visits?",
    a: "Absolutely. I'm experienced with bedside notarizations and understand the sensitivity of these situations.",
  },
];

/* ─── Pricing calculator data ─────────────────────────────── */
const PRICE_RATES: Record<string, number> = {
  "Notarial Act": 10,
  "Loan Signing (standard)": 125,
  "Loan Signing (complex)": 200,
  "Apostille": 150,
  "Travel Fee (0–5 mi)": 0,
  "Travel Fee (5–15 mi)": 25,
  "Travel Fee (15–30 mi)": 50,
};

/* ─── Testimonials ─────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Maria S.",
    location: "Boston, MA",
    text: "Tania was incredibly professional and came to my home the same day. The process was quick and she explained everything clearly. Highly recommend!",
    rating: 5,
  },
  {
    name: "James T.",
    location: "Brookline, MA",
    text: "Needed an apostille for my international business documents. Tania walked me through the entire process and had everything done in record time.",
    rating: 5,
  },
  {
    name: "Linda R.",
    location: "Cambridge, MA",
    text: "Tania helped us with our mortgage closing. Incredibly patient, detail-oriented, and made a stressful process feel easy. Will use again!",
    rating: 5,
  },
];

/* ─── Component: Stars ─────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: C.gold }}>★</span>
      ))}
    </div>
  );
}

/* ─── Component: Section wrapper ───────────────────────────── */
function Section({ children, className = "", id = "", style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} className={`py-20 px-4 ${className}`} style={style}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ─── Component: Navbar ────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services", "How It Works", "Pricing", "FAQ", "Contact"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,36,96,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-playfair text-xl font-semibold tracking-wide">
          Tania Guity
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {l}
            </a>
          ))}
          <a
            href="tel:6176751974"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{ background: C.gold, color: C.royalDark }}
          >
            Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: C.royalDark }}
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white/90 text-base font-medium py-1"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </a>
              ))}
              <a
                href="tel:6176751974"
                className="text-center text-sm font-semibold px-4 py-2 rounded-full"
                style={{ background: C.gold, color: C.royalDark }}
              >
                Call 617-675-1974
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Section: Hero ────────────────────────────────────────── */
function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.royalDark} 0%, ${C.royal} 60%, ${C.royalLight} 100%)` }}>
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      {/* Watercolor blob */}
      <motion.div
        style={{ background: `radial-gradient(circle, ${C.sky} 0%, transparent 70%)` } as any}
        className="absolute -top-32 -right-32 w-96 h-96 blob opacity-20"
        animate={{ borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-72 h-72 blob opacity-15"
        animate={{ borderRadius: ["40% 60% 60% 40%/60% 40% 60% 40%", "60% 40% 40% 60%/40% 60% 40% 60%", "40% 60% 60% 40%/60% 40% 60% 40%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)` } as React.CSSProperties}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full pt-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(200,153,58,0.2)", color: C.goldLight, border: `1px solid ${C.gold}` }}
            >
              Serving Boston · Brookline & Beyond
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Tania Guity
            </h1>
            <p className="text-xl md:text-2xl font-light mb-2" style={{ color: C.sky }}>
              Notary Public · Loan Signing Agent
            </p>
            <p className="text-xl md:text-2xl font-light mb-8" style={{ color: C.sky }}>
              · Apostille Agent
            </p>
            <p className="text-white/75 text-base leading-relaxed mb-10 max-w-md">
              Professional, reliable notary services — at your location or mine.
              Available Monday through Saturday, 8 AM to 8 PM.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full font-semibold text-sm shadow-lg"
                style={{ background: C.gold, color: C.royalDark }}
              >
                Book Appointment
              </motion.a>
              <motion.a
                href="tel:6176751974"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full font-semibold text-sm border-2"
                style={{ borderColor: C.white, color: C.white }}
              >
                617-675-1974
              </motion.a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: "✓", label: "Licensed & Bonded" },
                { icon: "📍", label: "Mobile Service" },
                { icon: "⚡", label: "Same-Day Available" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span style={{ color: C.gold }}>{b.icon}</span>
                  <span className="text-white/80 text-sm">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="font-playfair text-2xl text-white mb-6">Why clients choose Tania</h3>
              {[
                { n: "500+", label: "Documents Notarized" },
                { n: "7 Days", label: "Mon–Sat, 8AM–8PM" },
                { n: "24hr", label: "Typical Turnaround" },
                { n: "5★", label: "Client Rating" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-4 mb-5 last:mb-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: "rgba(200,153,58,0.18)", color: C.goldLight }}
                  >
                    {s.n}
                  </div>
                  <p className="text-white/80 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full" style={{ background: C.gold }} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Section: Services ────────────────────────────────────── */
function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="services" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: C.gold }}>What I Do</p>
        <h2 className="font-playfair text-4xl font-bold" style={{ color: C.royalDark }}>
          Professional Notary Services
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-3xl p-8 cursor-pointer hover-lift border"
            style={{
              borderColor: active === i ? C.royal : "#E8EDF5",
              background: active === i ? `linear-gradient(135deg, ${C.royalDark}, ${C.royal})` : C.white,
              color: active === i ? C.white : C.navy,
            }}
            onClick={() => setActive(active === i ? null : i)}
          >
            <div className="text-4xl mb-4">{s.icon}</div>
            <h3 className="font-playfair text-xl font-semibold mb-1">{s.title}</h3>
            <p className="text-sm font-medium mb-3" style={{ color: active === i ? C.goldLight : C.gold }}>
              {s.tagline}
            </p>
            <p className="text-sm leading-relaxed mb-4 opacity-80">{s.desc}</p>

            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.goldLight }}>
                    What to bring:
                  </p>
                  <ul className="space-y-1.5">
                    {s.docs.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-white/85">
                        <span style={{ color: C.gold }}>✓</span> {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 pt-4 border-t border-current/10 text-xs font-semibold" style={{ color: active === i ? C.goldLight : C.royal }}>
              {s.price} · Click to see required docs
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Section: How It Works ────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", icon: "📞", title: "Contact Tania", desc: "Call, text, or email to describe your notary need and preferred location/time." },
    { n: "02", icon: "📅", title: "Confirm Appointment", desc: "Get a same-day or next-day confirmation with pricing and document requirements." },
    { n: "03", icon: "✍️", title: "Sign & Get Notarized", desc: "Tania arrives, verifies your ID, witnesses your signature, and applies the official seal." },
  ];

  return (
    <Section id="how-it-works" style={{ background: C.gray } as React.CSSProperties}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: C.gold }}>Simple Process</p>
        <h2 className="font-playfair text-4xl font-bold" style={{ color: C.royalDark }}>
          How It Works
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connector line desktop */}
        <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5" style={{ background: `linear-gradient(to right, ${C.sky}, ${C.royal})` }} />

        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative text-center"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 relative z-10"
              style={{ background: `linear-gradient(135deg, ${C.royalDark}, ${C.royalLight})`, boxShadow: `0 8px 32px rgba(27,58,138,0.3)` }}
            >
              {s.icon}
            </div>
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: C.gold }}>{s.n}</div>
            <h3 className="font-playfair text-xl font-semibold mb-3" style={{ color: C.royalDark }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#5a6a8a" }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Section: Pricing Calculator ──────────────────────────── */
function Pricing() {
  const [service, setService] = useState("Notarial Act");
  const [qty, setQty] = useState(1);
  const [travel, setTravel] = useState("Travel Fee (0–5 mi)");

  const total = (PRICE_RATES[service] ?? 0) * qty + (PRICE_RATES[travel] ?? 0);

  return (
    <Section id="pricing" className="bg-white">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: C.gold }}>Transparent Pricing</p>
          <h2 className="font-playfair text-4xl font-bold mb-6" style={{ color: C.royalDark }}>
            Instant Estimate
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#5a6a8a" }}>
            MA state law caps notarial fees at $10 per notarial act. Loan signing and apostille fees vary by complexity.
            Travel fees apply outside downtown Boston. Use the calculator for a quick estimate — final pricing confirmed at booking.
          </p>
          <div className="space-y-4">
            {[
              { label: "🏙️ Boston & Brookline", note: "No travel fee" },
              { label: "🚗 Up to 15 miles", note: "$25 travel" },
              { label: "🗺️ Up to 30 miles", note: "$50 travel" },
              { label: "🏥 Hospital / nursing home", note: "Call for rates" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#E8EDF5" }}>
                <span className="text-sm" style={{ color: C.navy }}>{r.label}</span>
                <span className="text-sm font-medium" style={{ color: C.royal }}>{r.note}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 shadow-xl"
          style={{ background: `linear-gradient(135deg, ${C.royalDark}, ${C.royal})` }}
        >
          <h3 className="font-playfair text-2xl text-white mb-6">Price Calculator</h3>

          <label className="block text-white/70 text-xs uppercase tracking-wider mb-1">Service</label>
          <select
            className="w-full rounded-xl p-3 mb-4 text-sm font-medium border-0 outline-none"
            style={{ background: "rgba(255,255,255,0.12)", color: C.white }}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {["Notarial Act", "Loan Signing (standard)", "Loan Signing (complex)", "Apostille"].map((o) => (
              <option key={o} value={o} style={{ color: C.navy, background: C.white }}>{o}</option>
            ))}
          </select>

          <label className="block text-white/70 text-xs uppercase tracking-wider mb-1">Quantity / Signatures</label>
          <input
            type="number"
            min={1}
            max={50}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-xl p-3 mb-4 text-sm font-medium border-0 outline-none"
            style={{ background: "rgba(255,255,255,0.12)", color: C.white }}
          />

          <label className="block text-white/70 text-xs uppercase tracking-wider mb-1">Travel Zone</label>
          <select
            className="w-full rounded-xl p-3 mb-6 text-sm font-medium border-0 outline-none"
            style={{ background: "rgba(255,255,255,0.12)", color: C.white }}
            value={travel}
            onChange={(e) => setTravel(e.target.value)}
          >
            {Object.keys(PRICE_RATES).filter(k => k.startsWith("Travel")).map((o) => (
              <option key={o} value={o} style={{ color: C.navy, background: C.white }}>{o}</option>
            ))}
          </select>

          <div className="rounded-2xl p-5 mb-6" style={{ background: "rgba(200,153,58,0.15)", border: `1px solid ${C.gold}` }}>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Estimated Total</p>
            <p className="font-playfair text-4xl font-bold" style={{ color: C.goldLight }}>
              ${total.toLocaleString()}
            </p>
            <p className="text-white/50 text-xs mt-1">Final pricing confirmed at booking</p>
          </div>

          <a
            href="#contact"
            className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: C.gold, color: C.royalDark }}
          >
            Book at This Rate
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Section: Testimonials ────────────────────────────────── */
function Testimonials() {
  return (
    <Section id="testimonials" style={{ background: `linear-gradient(135deg, ${C.royalDark}, ${C.royal})` } as React.CSSProperties}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: C.goldLight }}>Client Reviews</p>
        <h2 className="font-playfair text-4xl font-bold text-white">What Clients Say</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-3xl p-7"
          >
            <Stars n={t.rating} />
            <p className="text-white/85 text-sm leading-relaxed my-4">"{t.text}"</p>
            <div>
              <p className="text-white font-semibold text-sm">{t.name}</p>
              <p className="text-white/50 text-xs">{t.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Section: FAQ ─────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq" style={{ background: C.gray } as React.CSSProperties}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: C.gold }}>Common Questions</p>
        <h2 className="font-playfair text-4xl font-bold" style={{ color: C.royalDark }}>FAQ</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((f, i) => (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: open === i ? C.royal : "#E8EDF5", background: C.white }}
          >
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-medium text-sm pr-4" style={{ color: C.royalDark }}>{f.q}</span>
              <span
                className="text-xl shrink-0 transition-transform"
                style={{ color: C.gold, transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#5a6a8a" }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Section: Contact / Booking ───────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission (replace with actual API/email handler)
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <Section id="contact" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: C.gold }}>Get In Touch</p>
        <h2 className="font-playfair text-4xl font-bold" style={{ color: C.royalDark }}>Book an Appointment</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "📞", label: "Phone", value: "617-675-1974", href: "tel:6176751974" },
            { icon: "✉️", label: "Email", value: "Tania.Guity@outlook.com", href: "mailto:Tania.Guity@outlook.com" },
            { icon: "🕐", label: "Hours", value: "Monday – Saturday · 8 AM to 8 PM", href: null },
            { icon: "📍", label: "Service Area", value: "Boston, Brookline & Beyond", href: null },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 mb-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0"
                style={{ background: `rgba(27,58,138,0.08)`, color: C.royal }}
              >
                {c.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.gold }}>{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="font-medium hover:underline" style={{ color: C.royalDark }}>{c.value}</a>
                ) : (
                  <p className="font-medium" style={{ color: C.royalDark }}>{c.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Quick-call CTA */}
          <motion.a
            href="tel:6176751974"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold shadow-lg pulse-gold"
            style={{ background: C.royal, color: C.white }}
          >
            <span className="text-xl">📞</span>
            Call Now · 617-675-1974
          </motion.a>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 shadow-xl"
          style={{ background: `linear-gradient(135deg, ${C.royalDark}, ${C.royal})` }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="font-playfair text-2xl text-white mb-3">Request Received!</h3>
              <p className="text-white/70 text-sm">Tania will confirm your appointment within a few hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-playfair text-2xl text-white mb-4">Appointment Request</h3>

              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { key: "phone", label: "Phone Number", type: "tel", placeholder: "617-xxx-xxxx" },
                { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { key: "date", label: "Preferred Date", type: "date", placeholder: "" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-white/70 text-xs uppercase tracking-wider mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    required={f.key === "name" || f.key === "phone"}
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full rounded-xl p-3 text-sm border-0 outline-none placeholder:text-white/30"
                    style={{ background: "rgba(255,255,255,0.1)", color: C.white }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-1">Service Needed</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-xl p-3 text-sm border-0 outline-none"
                  style={{ background: "rgba(255,255,255,0.1)", color: C.white }}
                >
                  <option value="" style={{ color: C.navy, background: C.white }}>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title} style={{ color: C.navy, background: C.white }}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Location, special requirements…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl p-3 text-sm border-0 outline-none resize-none placeholder:text-white/30"
                  style={{ background: "rgba(255,255,255,0.1)", color: C.white }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: C.gold, color: C.royalDark }}
              >
                {loading ? "Sending…" : "Request Appointment →"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Section: Footer ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 px-4" style={{ background: C.royalDark }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-playfair text-xl text-white font-semibold mb-1">Tania Guity</p>
          <p className="text-white/50 text-xs">Notary Public · Loan Signing Agent · Apostille Agent</p>
        </div>
        <div className="text-center">
          <p className="text-white/70 text-sm">Mon–Sat 8AM–8PM · Boston, Brookline & Beyond</p>
          <a href="tel:6176751974" className="text-white font-semibold">617-675-1974</a>
          {" · "}
          <a href="mailto:Tania.Guity@outlook.com" className="text-white/70 text-sm">Tania.Guity@outlook.com</a>
        </div>
        <p className="text-white/30 text-xs">© {new Date().getFullYear()} Tania Guity. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Mobile floating call button ──────────────────────────── */
function FloatingCall() {
  return (
    <motion.a
      href="tel:6176751974"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl pulse-gold"
      style={{ background: C.gold, color: C.royalDark }}
      aria-label="Call Tania"
    >
      📞
    </motion.a>
  );
}

/* ─── Root Page ─────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingCall />
    </>
  );
}
