"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { Globe2, Target, Lightbulb, ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    num:   "01",
    icon:  Globe2,
    title: "Adaptabilidad Global",
    body:  "Nos ajustamos a cada cliente y su contexto único, brindando soluciones específicas para cada mercado, ya sea en EE.UU., Latinoamérica o cualquier parte del mundo.",
    align: "left" as const,
  },
  {
    num:   "02",
    icon:  Target,
    title: "Enfoque en Resultados",
    body:  "Nuestro principal objetivo es maximizar los resultados de nuestros clientes. Cada decisión está pensada para generar un impacto real, positivo y medible.",
    align: "center" as const,
  },
  {
    num:   "03",
    icon:  Lightbulb,
    title: "Innovación Estratégica",
    body:  "Detectamos oportunidades antes que otros, y las transformamos en estrategias claras y ejecutables. Nuestra capacidad de anticipar movimientos de mercado es lo que nos diferencia.",
    align: "right" as const,
  },
] as const;

// ─── Variants ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Connecting-line with scroll-driven fill ──────────────────────────────────

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden md:block relative h-[1px] my-0">
      {/* Rail */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,200,83,0.10)" }}
      />
      {/* Animated fill */}
      <motion.div
        style={{ scaleX, transformOrigin: "left center" }}
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "#00c853",
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── Individual timeline item ─────────────────────────────────────────────────

function TimelineItem({
  item,
  index,
}: {
  item: (typeof ITEMS)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon   = item.icon;

  // Alternate entrance direction — left / up / right
  const xStart = index === 0 ? -36 : index === 2 ? 36 : 0;
  const yStart = index === 1 ? 36 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xStart, y: yStart }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Large faded number — background decoration */}
      <div
        aria-hidden
        className="absolute -top-4 left-1/2 -translate-x-1/2 select-none
                   font-black leading-none pointer-events-none"
        style={{
          fontSize: "clamp(5rem,10vw,8rem)",
          color: "rgba(0,200,83,0.055)",
          letterSpacing: "-0.04em",
          zIndex: 0,
          // Nudge each number so it sits behind its own card
          top: "-1.4rem",
        }}
      >
        {item.num}
      </div>

      {/* Node on the timeline rail — visible md+ */}
      <div className="hidden md:flex items-center justify-center mb-6 relative z-10">
        <motion.div
          animate={inView ? { scale: [0.5, 1.15, 1] } : { scale: 0.5 }}
          transition={{ duration: 0.55, delay: index * 0.14 + 0.2 }}
          className="w-3 h-3 rounded-full bg-accent"
          style={{ boxShadow: "0 0 10px 3px rgba(0,200,83,0.45)" }}
        />
      </div>

      {/* Card body */}
      <div
        className="relative z-10 rounded-lg p-7 w-full flex-1 flex flex-col items-center gap-5
                   transition-[border-color,box-shadow] duration-300
                   group-hover:border-[rgba(0,200,83,0.28)]"
        style={{
          background: "rgba(255,255,255,0.022)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(0,200,83,0.10)",
        }}
      >
        {/* Icon circle */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulse ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 72,
              height: 72,
              background:
                "radial-gradient(circle, rgba(0,200,83,0.14) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
          />
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, rgba(0,200,83,0.16) 0%, rgba(0,200,83,0.04) 100%)",
              border: "1px solid rgba(0,200,83,0.20)",
            }}
          >
            <Icon size={22} className="text-accent" strokeWidth={1.6} />
          </div>
        </div>

        {/* Number badge — mobile only */}
        <span
          className="md:hidden text-sm font-mono font-bold tracking-[0.2em]"
          style={{ color: "rgba(0,200,83,0.35)" }}
        >
          {item.num}
        </span>

        {/* Title */}
        <h3 className="text-[1.05rem] font-bold text-[#f0f0f0] leading-snug tracking-[-0.01em]">
          {item.title}
        </h3>

        {/* Body */}
        <p className="text-base text-[#8a9e8a] leading-[1.78] max-w-[300px] flex-1">
          {item.body}
        </p>

        {/* Bottom accent — grows on hover */}
        <div className="w-full h-px overflow-hidden">
          <motion.div
            className="h-full w-full origin-left"
            style={{
              background: "linear-gradient(90deg, #00c853, transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: index * 0.14 + 0.35, ease }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section3 ─────────────────────────────────────────────────────────────────

export default function Section3() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="por-que"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0b0f0b" }}
    >
      {/* Subtle square dot grid — lighter bg so use lower opacity */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,200,83,0.13) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* Top / bottom section dividers */}
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

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerView ? "show" : "hidden"}
          transition={{ staggerChildren: 0.13 }}
          className="mb-16 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          <div>
            <motion.span
              variants={fadeIn}
              className="inline-flex items-center gap-2 text-sm font-bold
                         uppercase tracking-[0.2em] text-accent mb-5 block"
            >
              <span className="block w-6 h-px bg-accent" />
              Por qué elegir GRIT
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.06]
                         tracking-[-0.025em] text-[#f0f0f0]"
            >
              ¿Por qué{" "}
              <span className="text-accent">elegirnos?</span>
            </motion.h2>
          </div>

          <motion.div variants={fadeIn} className="flex-shrink-0">
            <a
              href="#equipo"
              className="group inline-flex items-center gap-2 text-base font-semibold
                         text-accent hover:text-[#69f0ae] transition-colors duration-200"
            >
              Conoce al Equipo
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Timeline layout ── */}
        <div className="relative">

          {/* Horizontal connecting line with scroll-driven fill */}
          <div className="hidden md:block px-[calc(100%/6)]">
            <TimelineLine />
          </div>

          {/* Items — sit on top of the line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:-mt-[13px]">
            {ITEMS.map((item, i) => (
              <TimelineItem key={item.num} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
