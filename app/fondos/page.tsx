"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// ─── Shared ease ─────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Data ─────────────────────────────────────────────────────────────────────
// Sociedades Gerentes de Fondos Comunes de Inversión distribuidos por GRIT.
// Same destinations as gritcg.com/fondos — surfaced as direct links instead
// of behind a dropdown, so a click gets straight to the fund's own site.

const FONDOS = [
  { name: "Adcap Asset Management S.G.F.C.I.S.A.",                       href: "https://asset.ad-cap.com.ar/" },
  { name: "BACS Administradora de Activos S.A.S.G.F.C.I",                href: "https://www.torontotrust.com.ar/advertencia-al-publico-inversor/" },
  { name: "Balanz S.G.F.C.I.S.A.U.",                                     href: "https://fondos.balanz.com/fondos/money-market" },
  { name: "BAVSA Fondos S.A.",                                           href: "https://bavsafondos.com/tratamiento-impositivo" },
  { name: "Capital Markets Argentina Asset Management S.A.",             href: "http://www.cmafondos.com.ar/verfondos.asp" },
  { name: "CMF Asset Management S.A.U.",                                 href: "https://www.fundcorp.com.ar/#beneficios-de-invertir-en-fondos" },
  { name: "Consultatio Asset Management G.F.C.I.S.A.",                   href: "https://consultatioasset.com.ar/#nuestros-fondos" },
  { name: "Dracma S.A.",                                                 href: "https://dracmasa.com.ar/servicios/" },
  { name: "Max Capital Asset Management S.A.",                           href: "https://www.max.capital/nosotros/asset-management/" },
  { name: "MEGA QM S.A.",                                                href: "https://megaqm.com.ar/megaqm-rg-cnv-917-21/" },
  { name: "Parakeet Sociedad Gerente De Fondos Comunes De Inversion S.A.", href: "https://parakeetfondosweb.prod.ingecloud.com/TempFiles/d8039ec5-235c-451f-b3f2-944a0535626e.pdf" },
  { name: "Schroder SA Sociedad Gerente de Fondos Comunes de Inversión", href: "https://www.schroders.com/es-ar/ar/inversores-profesionales/fondos-y-estrategias/fondos-comunes-de-inversion/" },
  { name: "StoneX Asset Management S.A.",                                href: "https://www.stonex.com/es-ar/fondos-comunes-de-inversion/" },
  { name: "Valiant Asset Management S.G.F.C.I.S.A.U.",                   href: "https://www.fondosvaliant.com/#fondos" },
] as const;

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// ─── SECTION 1: Hero ──────────────────────────────────────────────────────────

function FondosHero() {
  return (
    <section className="relative min-h-[48vh] flex items-center justify-center overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={{ background: "#0b0f0b" }} />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 10% 20%, rgba(0,200,83,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 70%  60% at 90% 80%, rgba(26,71,42,0.22)  0%, transparent 50%),
            radial-gradient(ellipse 50%  40% at 55% 45%, rgba(0,200,83,0.05)  0%, transparent 60%)
          `,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto pt-28 pb-16"
      >
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            ACyDI N&deg;202
          </span>
        </div>

        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.04]
                     tracking-[-0.025em] mb-5"
        >
          <span className="text-[#f0f0f0]">Nuestros </span>
          <span className="text-accent">Fondos</span>
        </h1>

        <p className="text-base sm:text-lg text-[#8a9e8a] leading-relaxed max-w-xl mx-auto">
          Transformamos datos en decisiones, riesgos en oportunidades y mercados en
          herramientas de crecimiento.
        </p>
      </motion.div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,200,83,0.15) 40%, rgba(0,200,83,0.15) 60%, transparent)",
        }}
      />
    </section>
  );
}

// ─── SECTION 2: Ledger index ───────────────────────────────────────────────────

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const listVariant: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.045 } },
};

function FondoRow({
  fondo,
  index,
}: {
  fondo: (typeof FONDOS)[number];
  index: number;
}) {
  return (
    <motion.a
      variants={rowVariant}
      href={fondo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver fondos de ${fondo.name} (abre en una nueva pestaña)`}
      className="group relative flex items-center gap-4 sm:gap-6 py-5 px-2 sm:px-4
                 border-b border-[rgba(0,200,83,0.12)]
                 transition-colors duration-200 hover:bg-[rgba(0,200,83,0.05)]"
    >
      {/* Index number */}
      <span
        className="font-mono text-sm sm:text-base tabular-nums flex-shrink-0 w-8 sm:w-10
                   text-[rgba(0,200,83,0.45)] group-hover:text-accent transition-colors duration-200"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name + domain */}
      <span className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
        <span
          className="text-[0.9375rem] sm:text-[1.0625rem] font-bold leading-snug tracking-[-0.01em]
                     text-[#f0f0f0] group-hover:text-white transition-colors duration-200"
        >
          {fondo.name}
        </span>
        <span className="text-xs sm:text-sm font-mono text-[#5a6e5a] group-hover:text-[#8a9e8a] transition-colors duration-200 truncate">
          {domainOf(fondo.href)}
        </span>
      </span>

      {/* Arrow */}
      <span
        className="relative flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0
                   border border-[rgba(0,200,83,0.22)]
                   group-hover:border-[rgba(0,200,83,0.6)] group-hover:bg-[rgba(0,200,83,0.10)]
                   transition-all duration-200"
      >
        <ArrowUpRight
          size={15}
          className="text-accent transition-transform duration-200
                     group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </motion.a>
  );
}

function FondosLedger() {
  const [query, setQuery] = useState("");
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FONDOS;
    return FONDOS.filter((f) => f.name.toLowerCase().includes(q));
  }, [query]);

  const mid = Math.ceil(filtered.length / 2);
  const colA = filtered.slice(0, mid);
  const colB = filtered.slice(mid);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#0b0f0b" }}>
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,200,83,0.13) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {["top-0", "bottom-0"].map((pos) => (
        <div
          key={pos}
          aria-hidden
          className={`absolute ${pos} left-0 right-0 h-px`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,200,83,0.13) 40%, rgba(0,200,83,0.13) 60%, transparent)",
          }}
        />
      ))}

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span
              className="inline-flex items-center gap-2 text-sm font-bold
                         uppercase tracking-[0.2em] text-accent mb-5 block"
            >
              <span className="block w-6 h-px bg-accent" />
              {FONDOS.length} Sociedades Gerentes
            </span>
            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.06]
                         tracking-[-0.025em] text-[#f0f0f0]"
            >
              Acceso <span className="text-accent">directo</span>
            </h2>
            <p className="mt-4 text-[0.9375rem] text-[#8a9e8a] leading-[1.78] max-w-lg">
              Un click te lleva al sitio oficial de cada fondo — sin menús intermedios.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a6e5a] pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un fondo..."
              className="w-full pl-11 pr-4 py-3 rounded-lg text-sm text-[#f0f0f0]
                         placeholder:text-[#5a6e5a] outline-none
                         transition-colors duration-200 focus:border-[rgba(0,200,83,0.5)]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,200,83,0.16)",
              }}
            />
          </div>
        </motion.div>

        {/* Ledger */}
        {filtered.length > 0 ? (
          <div ref={ref} className="grid lg:grid-cols-2 lg:gap-x-12">
            <motion.div variants={listVariant} initial="hidden" animate={inView ? "show" : "hidden"}>
              {colA.map((fondo) => (
                <FondoRow key={fondo.name} fondo={fondo} index={FONDOS.indexOf(fondo)} />
              ))}
            </motion.div>
            <motion.div variants={listVariant} initial="hidden" animate={inView ? "show" : "hidden"}>
              {colB.map((fondo) => (
                <FondoRow key={fondo.name} fondo={fondo} index={FONDOS.indexOf(fondo)} />
              ))}
            </motion.div>
          </div>
        ) : (
          <p className="text-center text-[#8a9e8a] py-16">
            No encontramos fondos que coincidan con &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FondosPage() {
  return (
    <main className="bg-[#0b0f0b]">
      <FondosHero />
      <FondosLedger />
      <ContactForm />
      <Footer />
    </main>
  );
}
