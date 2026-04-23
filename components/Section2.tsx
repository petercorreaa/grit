"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Telescope, ShieldCheck, CandlestickChart, ArrowRight } from "lucide-react";

// ─── Card data ───────────────────────────────────────────────────────────────

const CARDS = [
  {
    icon: Telescope,
    label: "01",
    title: "Research Propio y\nVisión Global",
    body: "Contamos con un equipo de research propio, con visión global y experiencia en mercados internacionales, lo que nos permite anticipar tendencias y oportunidades para nuestros clientes.",
    // accent tones per card for the icon halo
    haloFrom: "rgba(0,200,83,0.18)",
    haloTo:   "rgba(0,200,83,0.04)",
    iconColor: "#00c853",
  },
  {
    icon: ShieldCheck,
    label: "02",
    title: "Gestión de Riesgos\nAvanzada",
    body: "Implementamos modelos cuantitativos y cualitativos de gestión de riesgos, adaptados a cada cliente, para proteger y potenciar su patrimonio en todo momento.",
    haloFrom: "rgba(105,240,174,0.16)",
    haloTo:   "rgba(105,240,174,0.03)",
    iconColor: "#69f0ae",
  },
  {
    icon: CandlestickChart,
    label: "03",
    title: "Ejecución Precisa en\nSales & Trading",
    body: "Ofrecemos acceso directo a mercados globales y ejecución precisa en operaciones de Sales & Trading, asegurando eficiencia y transparencia en cada transacción.",
    haloFrom: "rgba(212,175,55,0.16)",
    haloTo:   "rgba(212,175,55,0.03)",
    iconColor: "#d4af37",
  },
] as const;

// ─── Variants ────────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// ─── Diagonal-grid SVG background ────────────────────────────────────────────
// Rendered once as an inline <svg> data-URI so no extra network request.

function DiagonalGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 48 L48 0' stroke='rgba(0%2C200%2C83%2C0.055)' stroke-width='0.75' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
      }}
    />
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────

type CardData = (typeof CARDS)[number];

function FeatureCard({ card }: { card: CardData }) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={cardVariant}
      whileHover="hovered"
      initial="rest"
      animate="rest"
      className="relative flex flex-col rounded-sm overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(0,200,83,0.11)",
      }}
    >
      {/* Hover glow border — rendered as an absolutely-positioned overlay
          so the base border stays unchanged */}
      <motion.div
        variants={{
          rest:    { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          boxShadow: `0 0 0 1px rgba(0,200,83,0.32), 0 16px 56px rgba(0,200,83,0.10)`,
        }}
      />

      {/* Lift on hover */}
      <motion.div
        variants={{
          rest:    { y: 0   },
          hovered: { y: -6  },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-full p-8"
      >
        {/* Card number */}
        <span
          className="self-end text-[11px] font-mono font-bold tracking-[0.15em]"
          style={{ color: "rgba(0,200,83,0.25)" }}
        >
          {card.label}
        </span>

        {/* Icon halo + icon */}
        <div className="mt-4 mb-7">
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${card.haloFrom} 0%, ${card.haloTo} 100%)`,
              border: `1px solid ${card.iconColor}28`,
            }}
          >
            {/* Pulse ring on hover */}
            <motion.div
              variants={{
                rest:    { scale: 1,    opacity: 0    },
                hovered: { scale: 1.55, opacity: 0.18 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-full"
              style={{ background: card.haloFrom }}
            />
            <Icon size={24} style={{ color: card.iconColor }} strokeWidth={1.6} />
          </div>
        </div>

        {/* Title — newlines respected via whitespace-pre-line */}
        <h3
          className="text-[1.05rem] font-bold leading-snug tracking-[-0.01em] mb-4 text-[#f0f0f0] whitespace-pre-line"
        >
          {card.title}
        </h3>

        {/* Body */}
        <p className="text-sm text-[#8a9e8a] leading-[1.75] flex-1">
          {card.body}
        </p>

        {/* Bottom accent line — animates in on hover */}
        <motion.div
          variants={{
            rest:    { scaleX: 0, opacity: 0 },
            hovered: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-7 h-px origin-left"
          style={{
            background: `linear-gradient(90deg, ${card.iconColor} 0%, transparent 100%)`,
          }}
        />
      </motion.div>
    </motion.article>
  );
}

// ─── Section2 ─────────────────────────────────────────────────────────────────

export default function Section2() {
  const ref        = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(ref,       { once: true, margin: "-80px" });
  const headerView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#060b06" }}
    >
      {/* Diagonal grid overlay */}
      <DiagonalGrid />

      {/* Ambient glow — top-right */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[520px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(0,200,83,0.07) 0%, transparent 65%)",
        }}
      />
      {/* Ambient glow — bottom-left */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(0,200,83,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Top / bottom dividers */}
      {[0, 1].map((pos) => (
        <div
          key={pos}
          aria-hidden
          className={`absolute ${pos === 0 ? "top-0" : "bottom-0"} left-0 right-0 h-px`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,200,83,0.13) 40%, rgba(0,200,83,0.13) 60%, transparent)",
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          variants={container}
          initial="hidden"
          animate={headerView ? "show" : "hidden"}
          className="mb-16 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          {/* Left */}
          <div>
            <motion.span
              variants={headerVariant}
              className="inline-flex items-center gap-2 text-[10px] font-bold
                         uppercase tracking-[0.2em] text-accent mb-5 block"
            >
              <span className="block w-6 h-px bg-accent" />
              Somos diferentes
            </motion.span>

            <motion.h2
              variants={headerVariant}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.06]
                         tracking-[-0.025em] text-[#f0f0f0]"
            >
              Lo que nos hace{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, #00c853 0%, #69f0ae 55%, #f0f0f0 100%)",
                }}
              >
                distintos
              </span>
            </motion.h2>
          </div>

          {/* Right — CTA link */}
          <motion.div variants={headerVariant} className="flex-shrink-0">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-accent hover:text-[#69f0ae] transition-colors duration-200"
            >
              Ver Nuestros Servicios
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Card grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {CARDS.map((card) => (
            <FeatureCard key={card.label} card={card} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
