"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Star,
  Check,
  Scale,
  Home,
  Globe,
  ShieldCheck,
  Calendar,
  FileSignature,
  ChevronDown,
  ArrowRight,
  Quote,
  Stamp,
  BadgeCheck,
  Menu,
  X,
} from "lucide-react";

/* ─── Brand palette ──────────────────────────────────────────────
   Eight-step blue ramp + restrained gold accents. Blue carries the
   brand; gold appears only as: thin portrait rim, primary CTA fill,
   the word "refined", and a few sparkle dots.                      */
const C = {
  ice:       "#F4FAFF",
  powder:    "#D6E8F7",
  skyPale:   "#BBD8EE",
  skyMid:    "#8FBBE3",
  sky:       "#5C9DD6",
  cerulean:  "#2F7AC4",
  royalSoft: "#1F58B0",
  royal:     "#143F8C",
  navy:      "#0B255B",
  ink:       "#06112F",
  mist:      "#F4F7FB",
  paper:     "#FBFCFE",
  gold:      "#B8862B",
  goldSoft:  "#D9AE52",
  goldPale:  "#F2E1B0",
};

/* ─── Content ────────────────────────────────────────────────── */
const SERVICES = [
  {
    Icon: Scale,
    title: "Notary Public",
    tagline: "Official. Trusted. Precise.",
    desc: "Witnessed and certified signature authentication for legal documents, affidavits, powers of attorney, wills, and personal records.",
    docs: [
      "Government-issued photo ID",
      "Unsigned document (sign in my presence)",
      "Any co-signers must be present",
    ],
    price: "From $10 / signature",
  },
  {
    Icon: Home,
    title: "Loan Signing Agent",
    tagline: "Mortgage closings, made seamless.",
    desc: "Certified signing agent for mortgage closings, refinances, and real-estate transactions. I coordinate directly with title companies and lenders.",
    docs: [
      "Closing package from title or lender",
      "Government-issued photo ID",
      "Certified check or wire confirmation (if required)",
    ],
    price: "Call for package pricing",
  },
  {
    Icon: Globe,
    title: "Apostille Agent",
    tagline: "Documents recognized worldwide.",
    desc: "Authentication of US documents for use abroad — birth certificates, diplomas, corporate filings, and more, prepared end-to-end.",
    docs: [
      "Original document or certified copy",
      "Government-issued photo ID",
      "Destination country name",
    ],
    price: "From $150 / document",
  },
];

const FAQS = [
  { q: "Do you offer mobile notary services?", a: "Yes — I come to you, whether at home, your office, a hospital, or anywhere convenient. I serve Boston, Brookline, and the surrounding area." },
  { q: "How quickly can you come out?", a: "Same-day and next-day appointments are often available. Call or email and I'll confirm a time within hours." },
  { q: "What documents do I need to bring?", a: "A valid, unexpired government-issued photo ID (driver's license, passport, or state ID), and the unsigned document — you'll sign it in my presence." },
  { q: "How long does an apostille take?", a: "Apostille processing through the MA Secretary of State typically takes 2–5 business days. Rush options may be available on request." },
  { q: "Can you notarize documents in another language?", a: "Yes — as long as I can identify the signature line and the signer presents valid ID, I'm comfortable working with multilingual documents." },
  { q: "Do you handle hospital or nursing-home visits?", a: "Absolutely. I'm experienced with bedside notarizations and understand the sensitivity these visits require." },
];

const PRICE_RATES: Record<string, number> = {
  "Notarial Act": 10,
  "Loan Signing (standard)": 125,
  "Loan Signing (complex)": 200,
  "Apostille": 150,
  "Travel Fee (0–5 mi)": 0,
  "Travel Fee (5–15 mi)": 25,
  "Travel Fee (15–30 mi)": 50,
};

const TESTIMONIALS = [
  { name: "Maria S.", location: "Boston, MA", text: "Tania was incredibly professional and came to my home the same day. The process was quick and she explained everything clearly. Highly recommend!", rating: 5 },
  { name: "James T.", location: "Brookline, MA", text: "Needed an apostille for international business documents. Tania walked me through the entire process and had everything done in record time.", rating: 5 },
  { name: "Linda R.", location: "Cambridge, MA", text: "Tania helped us with our mortgage closing. Patient, detail-oriented, and made a stressful process feel easy. Will use her again.", rating: 5 },
];

/* ─── Atoms ──────────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={14} strokeWidth={1.5} fill={C.gold} stroke={C.gold} />
      ))}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="eyebrow mb-4 inline-flex items-center gap-3" style={{ color: light ? C.skyMid : C.cerulean }}>
      <span
        className="inline-block w-10 h-px"
        style={{
          background: light
            ? `linear-gradient(to right, ${C.powder}, ${C.skyMid}, ${C.sky})`
            : `linear-gradient(to right, ${C.skyMid}, ${C.cerulean}, ${C.royal})`,
        }}
      />
      {children}
    </p>
  );
}

function Section({ children, className = "", id = "", style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} className={`py-28 px-6 ${className}`} style={style}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* Monogram mark — thin gold rim on a watercolor disc, like the headshot frame */
function Monogram({ size = 40, onDark = true }: { size?: number; onDark?: boolean }) {
  const rim = onDark ? C.goldSoft : C.gold;
  const fill = onDark ? C.goldSoft : C.royal;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="mono-bg" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={onDark ? C.skyMid : C.powder} stopOpacity="0.35" />
          <stop offset="60%" stopColor={onDark ? C.cerulean : C.skyPale} stopOpacity="0.20" />
          <stop offset="100%" stopColor={onDark ? C.ink : "transparent"} stopOpacity={onDark ? 0.85 : 0} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#mono-bg)" />
      <circle cx="32" cy="32" r="30" fill="none" stroke={rim} strokeWidth="0.8" />
      <circle cx="32" cy="32" r="27" fill="none" stroke={rim} strokeWidth="0.4" opacity="0.4" />
      <text
        x="50%" y="56%"
        textAnchor="middle"
        fill={fill}
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="22"
        fontWeight="500"
        letterSpacing="2"
      >TG</text>
    </svg>
  );
}

/* ─── Navbar ────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8,21,61,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184,134,43,0.18)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <Monogram size={36} />
          <div className="leading-tight">
            <p className="text-white font-playfair text-lg tracking-wide">Tania Guity</p>
            <p className="eyebrow" style={{ color: C.skyMid, fontSize: 9 }}>Notary &middot; Loan Signing &middot; Apostille</p>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/75 hover:text-white text-[13px] font-medium tracking-wide transition-colors link-underline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:6176751974"
            className="btn-gold inline-flex items-center gap-2 text-[12px] font-semibold uppercase px-5 py-2.5 rounded-full"
          >
            <Phone size={14} strokeWidth={2} />
            617-675-1974
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ background: C.ink, borderColor: "rgba(184,134,43,0.15)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white/85 text-base font-medium tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:6176751974"
                className="btn-gold inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase px-5 py-3 rounded-full mt-2"
              >
                <Phone size={14} /> Call 617-675-1974
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Portrait Visual — thin gold rim, blue-watercolor disc, like the card ─ */
function PortraitVisual() {
  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto">
      {/* Ice-white watercolor blob — top-left of circle */}
      <div
        aria-hidden
        className="absolute -top-12 -left-12 w-[72%] h-[72%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${C.ice} 0%, ${C.powder} 35%, ${C.skyMid} 70%, transparent 90%)`,
          filter: "blur(44px)",
          opacity: 0.85,
          mixBlendMode: "screen",
        }}
      />
      {/* Cerulean wash — bottom-right */}
      <div
        aria-hidden
        className="absolute -bottom-10 -right-8 w-[65%] h-[65%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${C.sky} 0%, ${C.cerulean} 45%, ${C.royal} 80%, transparent 95%)`,
          filter: "blur(40px)",
          opacity: 0.85,
          mixBlendMode: "screen",
        }}
      />
      {/* Sky band — left middle */}
      <div
        aria-hidden
        className="absolute top-1/3 -left-6 w-[40%] h-[45%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${C.skyMid}, ${C.sky} 55%, transparent 85%)`,
          filter: "blur(34px)",
          opacity: 0.7,
          mixBlendMode: "screen",
        }}
      />

      {/* A few scattered sparkles — mostly powder-blue with two tiny gold dots */}
      <div className="absolute top-5 right-14 w-1.5 h-1.5 rounded-full" style={{ background: C.powder, opacity: 0.9 }} />
      <div className="absolute top-24 right-3 w-1 h-1 rounded-full" style={{ background: C.skyPale }} />
      <div className="absolute bottom-12 right-10 w-1.5 h-1.5 rounded-full" style={{ background: C.skyMid }} />
      <div className="absolute bottom-6 left-20 w-1 h-1 rounded-full" style={{ background: C.powder }} />
      <div className="absolute top-36 -left-1 w-1 h-1 rounded-full" style={{ background: C.skyMid }} />
      <div className="absolute top-10 right-8 w-1 h-1 rounded-full" style={{ background: C.gold, opacity: 0.7 }} />
      <div className="absolute bottom-20 left-10 w-1 h-1 rounded-full" style={{ background: C.goldSoft, opacity: 0.6 }} />

      {/* Thin gold rim — matches the rim on Tania's headshot (1px, restrained) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 140deg, ${C.gold}, ${C.goldSoft} 30%, ${C.gold} 60%, ${C.goldSoft} 100%)`,
          padding: "1.5px",
          boxShadow: "0 30px 80px -30px rgba(11,37,91,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <div className="w-full h-full rounded-full" style={{ background: C.ink }} />
      </div>

      {/* Inner watercolor disc — heavy blue layering */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          inset: "10px",
          background: `
            radial-gradient(circle at 22% 18%, ${C.ice}, transparent 45%),
            radial-gradient(circle at 18% 30%, ${C.powder}, transparent 50%),
            radial-gradient(circle at 35% 55%, ${C.skyMid}, transparent 55%),
            radial-gradient(circle at 70% 78%, ${C.cerulean}, transparent 65%),
            radial-gradient(circle at 55% 50%, ${C.royal}, ${C.navy} 75%, ${C.ink} 100%)
          `,
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(217,174,82,0.20)",
        }}
      >
        {/* Powder watercolor sweep inside the disc, top-left */}
        <div
          aria-hidden
          className="absolute -top-1/4 -left-1/4 w-[110%] h-[90%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${C.ice} 0%, ${C.powder} 25%, ${C.skyMid} 55%, transparent 80%)`,
            opacity: 0.65,
            filter: "blur(18px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Centered name + monogram + caption */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <svg width="68" height="68" viewBox="0 0 64 64" aria-hidden className="mb-3 opacity-95">
            <circle cx="32" cy="32" r="30" fill="none" stroke={C.goldSoft} strokeWidth="0.8" />
            <circle cx="32" cy="32" r="26" fill="none" stroke={C.gold} strokeWidth="0.4" opacity="0.5" />
            <text
              x="50%" y="56%"
              textAnchor="middle"
              fill={C.goldSoft}
              fontFamily="Playfair Display, Georgia, serif"
              fontSize="22"
              fontWeight="500"
              letterSpacing="2"
            >TG</text>
          </svg>
          <p className="font-playfair text-white text-3xl leading-tight mb-2">Tania Guity</p>
          <div
            className="w-12 h-px mb-3"
            style={{ background: `linear-gradient(to right, transparent, ${C.skyMid}, ${C.goldSoft}, ${C.skyMid}, transparent)` }}
          />
          <p className="eyebrow" style={{ color: C.skyMid, fontSize: 9 }}>
            Mass. Notary &middot; Est. 2020
          </p>
          <p className="font-playfair italic text-white/75 text-[13px] mt-4 leading-snug">
            &ldquo;Discretion, precision,
            <br /> and a steady hand.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden" style={{ background: C.ink }}>
      {/* ═══ Watercolor backdrop — visible blue & gold blobs blended onto deep navy ═══ */}

      {/* Pale aqua splash, top-left (largest, brightest — like the card's left edge) */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-25%", left: "-20%", width: "85%", height: "120%",
          background: `radial-gradient(ellipse, ${C.skyPale} 0%, ${C.skyMid} 25%, ${C.cerulean} 50%, transparent 72%)`,
          filter: "blur(60px)",
          opacity: 0.75,
          mixBlendMode: "screen",
        }}
      />
      {/* Cerulean ribbon, lower-left */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-25%", left: "-15%", width: "60%", height: "85%",
          background: `radial-gradient(ellipse, ${C.cerulean} 0%, ${C.royalSoft} 45%, transparent 75%)`,
          filter: "blur(70px)",
          opacity: 0.85,
          mixBlendMode: "screen",
        }}
      />
      {/* Mid sky highlight */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "35%", width: "35%", height: "45%",
          background: `radial-gradient(ellipse, ${C.skyMid} 0%, ${C.cerulean} 50%, transparent 75%)`,
          filter: "blur(60px)",
          opacity: 0.45,
          mixBlendMode: "screen",
        }}
      />
      {/* Royal-blue depth, right side (no gold here — keep gold restrained) */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "10%", right: "-12%", width: "50%", height: "60%",
          background: `radial-gradient(ellipse, ${C.royalSoft} 0%, ${C.royal} 45%, transparent 75%)`,
          filter: "blur(80px)",
          opacity: 0.55,
          mixBlendMode: "screen",
        }}
      />
      {/* Tiny gold sparkle, bottom-right (small, precious) */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-8%", right: "-5%", width: "28%", height: "40%",
          background: `radial-gradient(ellipse, ${C.goldSoft} 0%, ${C.gold} 50%, transparent 75%)`,
          filter: "blur(70px)",
          opacity: 0.20,
          mixBlendMode: "screen",
        }}
      />

      {/* Constellations — sky-blue primary, gold reserved as a small sparkle */}
      <div className="absolute top-[25%] left-[5%] w-72 h-56 dots-powder opacity-80 pointer-events-none" />
      <div className="absolute top-[58%] left-[22%] w-48 h-40 dots-sky opacity-90 pointer-events-none" />
      <div className="absolute top-[18%] right-[14%] w-44 h-44 dots-sky opacity-50 pointer-events-none" />
      <div className="absolute bottom-[14%] right-[10%] w-32 h-32 dots opacity-60 pointer-events-none" />

      {/* Film grain overlay */}
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* ═══ Centered content layer ═══ */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-10 pt-28 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* LEFT — copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-7"
            >
              <Eyebrow light>Boston &middot; Brookline &middot; Beyond</Eyebrow>

              <h1 className="font-playfair text-white font-medium leading-[1.02] tracking-[-0.02em] text-[44px] sm:text-[60px] lg:text-[80px]">
                Notarial services,
                <br />
                <span className="italic font-normal" style={{ color: C.goldSoft }}>refined</span>{" "}
                <span className="italic font-normal text-white/95">for modern life.</span>
              </h1>

              <div className="flex items-center gap-4 mt-7 mb-7">
                <span
                  className="w-16 h-px"
                  style={{ background: `linear-gradient(to right, ${C.skyMid}, ${C.goldSoft})` }}
                />
                <p className="text-white/85 font-playfair italic text-[17px] lg:text-[19px]">
                  Tania Guity &mdash; Notary Public &middot; Loan Signing Agent &middot; Apostille
                </p>
              </div>

              <p className="text-white/70 text-[15px] lg:text-[16px] leading-[1.85] max-w-xl mb-10">
                Discreet, exact, and dependable. Mobile appointments at your home,
                office, or hospital &mdash; Monday through Saturday, 8 AM to 8 PM.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <a
                  href="#contact"
                  className="btn-gold inline-flex items-center gap-2 px-7 py-4 rounded-full text-[12px] font-semibold uppercase"
                >
                  Book an appointment
                  <ArrowRight size={15} strokeWidth={2} />
                </a>
                <a
                  href="tel:6176751974"
                  className="btn-outline inline-flex items-center gap-2 px-7 py-4 rounded-full text-[12px] font-semibold uppercase"
                >
                  <Phone size={14} strokeWidth={2} />
                  617-675-1974
                </a>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { Icon: ShieldCheck, label: "Licensed & Bonded" },
                  { Icon: MapPin, label: "Mobile Service" },
                  { Icon: Clock, label: "Same-Day Available" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon size={15} strokeWidth={1.5} style={{ color: C.skyMid }} />
                    <span className="text-white/75 text-[13px] tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — portrait visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
              className="lg:col-span-5"
            >
              <PortraitVisual />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors z-20"
        aria-label="Scroll down"
      >
        <span className="eyebrow" style={{ fontSize: 10 }}>Explore</span>
        <ChevronDown size={16} strokeWidth={1.5} className="drift" />
      </a>
    </header>
  );
}

/* ─── Services ──────────────────────────────────────────────── */
function Services() {
  return (
    <Section id="services" className="bg-white relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mb-16"
      >
        <Eyebrow>Services</Eyebrow>
        <h2 className="font-playfair text-[40px] md:text-[52px] font-medium leading-[1.1] tracking-tight" style={{ color: C.ink }}>
          Three specialties,
          <br />
          <span className="italic" style={{ color: C.cerulean }}>handled with care.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="card-lift p-9 rounded-sm relative bg-white overflow-hidden"
            style={{ border: "1px solid rgba(14,38,87,0.10)" }}
          >
            {/* Watercolor wash — alternating ice/powder/sky blue corners */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${
                  i === 0 ? "rgba(214,232,247,0.85)" : i === 1 ? "rgba(143,187,227,0.55)" : "rgba(187,216,238,0.70)"
                } 0%, transparent 70%)`,
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${
                  i === 0 ? "rgba(187,216,238,0.55)" : i === 1 ? "rgba(214,232,247,0.70)" : "rgba(143,187,227,0.45)"
                } 0%, transparent 75%)`,
              }}
            />

            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-7"
                style={{
                  background: `linear-gradient(160deg, ${C.ice}, ${C.powder} 60%, ${C.skyPale})`,
                  border: `1px solid ${C.skyMid}`,
                  boxShadow: `inset 0 0 0 4px rgba(255,255,255,0.5), 0 8px 24px -10px rgba(31,88,176,0.30)`,
                }}
              >
                <s.Icon size={22} strokeWidth={1.4} style={{ color: C.cerulean }} />
              </div>

              <h3 className="font-playfair text-2xl mb-2" style={{ color: C.ink }}>{s.title}</h3>
              <p className="font-playfair italic text-[14px] mb-5" style={{ color: C.cerulean }}>
                {s.tagline}
              </p>

              <p className="text-[14px] leading-[1.75] mb-6" style={{ color: "#4A5675" }}>
                {s.desc}
              </p>

              <div className="hairline-cool mb-5" />

              <p className="eyebrow mb-3" style={{ color: C.cerulean }}>What to bring</p>
              <ul className="space-y-2.5 mb-7">
                {s.docs.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[13px] leading-[1.6]" style={{ color: "#4A5675" }}>
                    <Check size={14} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: C.cerulean }} />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(14,38,87,0.08)" }}>
                <span className="text-[12px] font-semibold tracking-wider uppercase" style={{ color: C.royal }}>
                  {s.price}
                </span>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider link-underline" style={{ color: C.cerulean }}>
                  Book
                  <ArrowRight size={12} strokeWidth={2} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ─── How It Works ──────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", Icon: Phone,         title: "Reach out",        desc: "Call, text, or email with a brief description of your need, location, and preferred time." },
    { n: "02", Icon: Calendar,      title: "Confirm details",  desc: "I'll respond within hours with a confirmed appointment, pricing, and document checklist." },
    { n: "03", Icon: FileSignature, title: "Sign & seal",      desc: "I arrive on time, verify your ID, witness the signature, and apply the official seal." },
  ];

  return (
    <Section id="how-it-works" className="marble-soft relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mb-20"
      >
        <Eyebrow>The process</Eyebrow>
        <h2 className="font-playfair text-[40px] md:text-[52px] font-medium leading-[1.1] tracking-tight" style={{ color: C.ink }}>
          Three steps from
          <br />
          <span className="italic" style={{ color: C.cerulean }}>request to seal.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-6 relative">
        <div
          className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px"
          style={{
            background: `linear-gradient(to right, ${C.skyMid}, ${C.cerulean}, ${C.royal}, ${C.cerulean}, ${C.skyMid})`,
            opacity: 0.7,
          }}
        />

        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative z-10 mx-auto w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(160deg, ${C.ice}, ${C.powder} 70%, ${C.skyPale})`,
                border: `1px solid ${C.skyMid}`,
                boxShadow: `0 0 0 6px rgba(143,187,227,0.20), 0 16px 40px -18px rgba(31,88,176,0.45)`,
              }}
            >
              <s.Icon size={26} strokeWidth={1.3} style={{ color: C.cerulean }} />
            </div>

            <p className="font-playfair text-center mt-6 mb-2" style={{ color: C.cerulean, fontSize: 14, letterSpacing: "0.3em" }}>
              {s.n}
            </p>
            <h3 className="font-playfair text-xl text-center mb-3" style={{ color: C.ink }}>{s.title}</h3>
            <p className="text-[14px] leading-[1.7] text-center max-w-xs mx-auto" style={{ color: "#4A5675" }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Pricing ───────────────────────────────────────────────── */
function Pricing() {
  const [service, setService] = useState("Notarial Act");
  const [qty, setQty] = useState(1);
  const [travel, setTravel] = useState("Travel Fee (0–5 mi)");
  const total = (PRICE_RATES[service] ?? 0) * qty + (PRICE_RATES[travel] ?? 0);

  return (
    <Section id="pricing" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="font-playfair text-[40px] md:text-[52px] font-medium leading-[1.1] tracking-tight mb-8" style={{ color: C.ink }}>
            Transparent rates.
            <br />
            <span className="italic" style={{ color: C.cerulean }}>No surprises.</span>
          </h2>
          <p className="text-[15px] leading-[1.8] mb-10" style={{ color: "#4A5675" }}>
            Massachusetts caps notarial fees at $10 per act. Loan-signing and apostille fees vary by complexity. Travel charges apply outside downtown Boston. Use the calculator for a quick estimate — final pricing is confirmed at booking.
          </p>

          <div>
            {[
              { label: "Boston & Brookline",       note: "No travel fee" },
              { label: "Up to 15 miles",            note: "$25 travel" },
              { label: "Up to 30 miles",            note: "$50 travel" },
              { label: "Hospital / nursing home",   note: "Call for rates" },
            ].map((r, i) => (
              <div key={r.label}>
                <div className="flex items-center justify-between py-4">
                  <span className="text-[14px]" style={{ color: C.ink }}>{r.label}</span>
                  <span className="text-[13px] font-medium tracking-wide" style={{ color: C.cerulean }}>{r.note}</span>
                </div>
                {i < 3 && <div className="hairline-cool" />}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-sm p-10 marble grain overflow-hidden"
          style={{ boxShadow: "0 30px 90px -40px rgba(8,21,61,0.5)" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Stamp size={18} strokeWidth={1.5} style={{ color: C.skyMid }} />
            <p className="eyebrow" style={{ color: C.skyMid }}>Estimate</p>
          </div>
          <h3 className="font-playfair text-3xl text-white mb-9">Price calculator</h3>

          <label className="block eyebrow mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Service</label>
          <select
            className="field-dark mb-7 cursor-pointer"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {["Notarial Act", "Loan Signing (standard)", "Loan Signing (complex)", "Apostille"].map((o) => (
              <option key={o} value={o} style={{ color: C.ink, background: "#fff" }}>{o}</option>
            ))}
          </select>

          <label className="block eyebrow mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Quantity / signatures</label>
          <input
            type="number"
            min={1}
            max={50}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="field-dark mb-7"
          />

          <label className="block eyebrow mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Travel zone</label>
          <select
            className="field-dark mb-10 cursor-pointer"
            value={travel}
            onChange={(e) => setTravel(e.target.value)}
          >
            {Object.keys(PRICE_RATES).filter(k => k.startsWith("Travel")).map((o) => (
              <option key={o} value={o} style={{ color: C.ink, background: "#fff" }}>{o}</option>
            ))}
          </select>

          <div className="hairline mb-7" />

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Estimated total</p>
              <p className="text-white/40 text-[12px]">Final price confirmed at booking</p>
            </div>
            <p className="font-playfair text-5xl font-medium" style={{ color: C.powder }}>
              ${total.toLocaleString()}
            </p>
          </div>

          <a
            href="#contact"
            className="btn-gold inline-flex items-center justify-center gap-2 w-full py-4 rounded-full text-[12px] font-semibold uppercase"
          >
            Book at this rate
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Testimonials ──────────────────────────────────────────── */
function Testimonials() {
  return (
    <Section id="testimonials" className="marble grain relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mb-16"
      >
        <Eyebrow light>Testimonials</Eyebrow>
        <h2 className="font-playfair text-white text-[40px] md:text-[52px] font-medium leading-[1.1] tracking-tight">
          Trusted by clients
          <br />
          <span className="italic" style={{ color: C.skyMid }}>across Greater Boston.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="rounded-sm p-8 backdrop-blur-md relative"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(217,174,82,0.18)",
            }}
          >
            <Quote size={28} strokeWidth={1} fill={C.skyMid} stroke={C.skyMid} className="opacity-80 mb-5" />
            <Stars n={t.rating} />
            <blockquote className="text-white/80 text-[14.5px] leading-[1.75] mt-5 mb-7 font-playfair italic">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <div className="hairline mb-5" />
            <figcaption className="flex items-center justify-between">
              <div>
                <p className="text-white text-[14px] font-medium">{t.name}</p>
                <p className="eyebrow mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{t.location}</p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-playfair text-[13px]"
                style={
                  i === 1
                    ? { background: "rgba(214,232,247,0.20)", color: C.powder, border: `1px solid ${C.skyMid}` }
                    : { background: "rgba(143,187,227,0.18)", color: C.skyMid, border: `1px solid ${C.cerulean}` }
                }
                aria-hidden
              >
                {t.name.split(" ").map(s => s[0]).join("")}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-white">
      <div className="grid md:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4"
        >
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-playfair text-[40px] md:text-[48px] font-medium leading-[1.1] tracking-tight mb-6" style={{ color: C.ink }}>
            Common
            <br />
            <span className="italic" style={{ color: C.cerulean }}>questions.</span>
          </h2>
          <p className="text-[14.5px] leading-[1.75]" style={{ color: "#4A5675" }}>
            A quick answer for the things clients ask most. Don&rsquo;t see yours? Call or email — I&rsquo;m happy to help.
          </p>
        </motion.div>

        <div className="md:col-span-8">
          <div className="hairline-cool" />
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between py-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-playfair text-[18px] pr-4 transition-colors group-hover:opacity-80" style={{ color: C.ink }}>
                  {f.q}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform"
                  style={{
                    color: C.cerulean,
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[14.5px] leading-[1.8] max-w-2xl" style={{ color: "#4A5675" }}>
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="hairline-cool" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Contact ───────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  const contactItems = [
    { Icon: Phone,  label: "Phone",        value: "617-675-1974",          href: "tel:6176751974" },
    { Icon: Mail,   label: "Email",        value: "Tania.Guity@outlook.com", href: "mailto:Tania.Guity@outlook.com" },
    { Icon: Clock,  label: "Hours",        value: "Monday – Saturday  ·  8 AM to 8 PM" },
    { Icon: MapPin, label: "Service area", value: "Boston, Brookline & beyond" },
  ];

  return (
    <Section id="contact" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mb-16"
      >
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="font-playfair text-[40px] md:text-[52px] font-medium leading-[1.1] tracking-tight" style={{ color: C.ink }}>
          Book your
          <br />
          <span className="italic" style={{ color: C.cerulean }}>appointment.</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-7 mb-12">
            {contactItems.map((c) => (
              <div key={c.label} className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(160deg, ${C.ice}, ${C.powder} 60%, ${C.skyPale})`,
                    border: `1px solid ${C.skyMid}`,
                    boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.6)",
                  }}
                >
                  <c.Icon size={18} strokeWidth={1.4} style={{ color: C.cerulean }} />
                </div>
                <div className="pt-1.5">
                  <p className="eyebrow mb-1.5" style={{ color: C.cerulean }}>{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="font-playfair text-lg link-underline" style={{ color: C.ink }}>
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-playfair text-lg" style={{ color: C.ink }}>{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hairline-cool mb-8" />

          <a
            href="tel:6176751974"
            className="btn-gold inline-flex items-center gap-3 px-7 py-4 rounded-full text-[12px] font-semibold uppercase"
          >
            <Phone size={15} strokeWidth={2} />
            Call now · 617-675-1974
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-sm p-10 marble grain relative"
          style={{ boxShadow: "0 30px 90px -40px rgba(8,21,61,0.5)" }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(143,187,227,0.15)", border: `1px solid ${C.skyMid}` }}
              >
                <BadgeCheck size={28} strokeWidth={1.5} style={{ color: C.powder }} />
              </div>
              <h3 className="font-playfair text-3xl text-white mb-3">Request received</h3>
              <p className="text-white/65 text-[14px] leading-[1.7] max-w-xs mx-auto">
                Tania will confirm your appointment within a few hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-1">
              <div className="flex items-center gap-3 mb-1">
                <FileSignature size={18} strokeWidth={1.5} style={{ color: C.skyMid }} />
                <p className="eyebrow" style={{ color: C.skyMid }}>New request</p>
              </div>
              <h3 className="font-playfair text-3xl text-white mb-8">Appointment details</h3>

              {[
                { key: "name",  label: "Full name",      type: "text",  placeholder: "Your name", required: true },
                { key: "phone", label: "Phone number",   type: "tel",   placeholder: "617-xxx-xxxx", required: true },
                { key: "email", label: "Email",          type: "email", placeholder: "your@email.com" },
                { key: "date",  label: "Preferred date", type: "date",  placeholder: "" },
              ].map((f) => (
                <div key={f.key} className="pb-2">
                  <label className="eyebrow block mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="field-dark"
                  />
                </div>
              ))}

              <div className="pb-2">
                <label className="eyebrow block mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Service needed</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="field-dark cursor-pointer"
                >
                  <option value="" style={{ color: C.ink, background: "#fff" }}>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title} style={{ color: C.ink, background: "#fff" }}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="pb-8">
                <label className="eyebrow block mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Additional notes</label>
                <textarea
                  rows={2}
                  placeholder="Location, special requirements…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="field-dark resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold inline-flex items-center justify-center gap-2 w-full py-4 rounded-full text-[12px] font-semibold uppercase disabled:opacity-60"
              >
                {loading ? "Sending…" : (
                  <>
                    Request appointment
                    <ArrowRight size={14} strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative pt-20 pb-12 px-6 marble grain overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <Monogram size={48} />
              <div>
                <p className="font-playfair text-white text-2xl">Tania Guity</p>
                <p className="eyebrow mt-1" style={{ color: C.skyMid, fontSize: 10 }}>
                  Notary &middot; Loan Signing &middot; Apostille
                </p>
              </div>
            </div>
            <p className="text-white/55 text-[14px] leading-[1.75] max-w-sm">
              Discreet, exact, and dependable notary services for Greater Boston.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4" style={{ color: C.skyMid }}>Contact</p>
            <a href="tel:6176751974" className="block text-white text-[14px] mb-2 link-underline w-fit">
              617-675-1974
            </a>
            <a href="mailto:Tania.Guity@outlook.com" className="block text-white/70 text-[13px] link-underline w-fit">
              Tania.Guity@outlook.com
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4" style={{ color: C.skyMid }}>Hours &amp; area</p>
            <p className="text-white text-[14px] mb-2">Monday – Saturday  ·  8 AM to 8 PM</p>
            <p className="text-white/70 text-[13px]">Boston, Brookline &amp; beyond</p>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[12px] tracking-wide">
            © {new Date().getFullYear()} Tania Guity. All rights reserved.
          </p>
          <p className="text-white/40 text-[12px] tracking-wide italic font-playfair">
            Massachusetts commissioned notary public.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Mobile floating call button ───────────────────────────── */
function FloatingCall() {
  return (
    <motion.a
      href="tel:6176751974"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
      className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full flex items-center justify-center shadow-xl btn-gold"
      aria-label="Call Tania"
    >
      <Phone size={20} strokeWidth={2} />
    </motion.a>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
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
