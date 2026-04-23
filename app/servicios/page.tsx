"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  BarChart2, TrendingUp, Landmark, Building2, Globe,
  Eye, Handshake, ShieldCheck, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// ─── Shared ease ─────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── SECTION 1: Page Hero ─────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">

      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at bottom, #0a1f0a 0%, #050a05 100%)" }}
      />

      {/* Mesh overlay */}
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

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 text-center px-5 sm:px-8 max-w-3xl mx-auto pt-28 pb-16"
      >
        {/* Eyebrow */}
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            GRIT
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.04]
                     tracking-[-0.025em] mb-5"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(100deg, #00c853 0%, #69f0ae 45%, #f0f0f0 80%)",
            }}
          >
            Nuestros Servicios
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#8a9e8a] leading-relaxed max-w-xl mx-auto">
          Transformamos datos en decisiones, riesgos en oportunidades y mercados en
          herramientas de crecimiento
        </p>
      </motion.div>

      {/* Bottom divider */}
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

// ─── SECTION 2: Services Grid ─────────────────────────────────────────────────

const SERVICES = [
  {
    icon: BarChart2,
    title: "Análisis Financiero y Asesoramiento Estratégico",
    body: "Evaluaciones de riesgo y estrategias de diversificación global fundamentadas en análisis de datos",
  },
  {
    icon: TrendingUp,
    title: "Gestión de Inversiones y Operaciones de Trading",
    body: "Acceso a instrumentos de renta fija, renta variable y fondos comunes de inversión.",
  },
  {
    icon: Landmark,
    title: "Banca Privada y Servicios para Family Offices",
    body: "Administración patrimonial, planificación financiera y acceso a inversiones alternativas",
  },
  {
    icon: Building2,
    title: "Consultoría para Empresas e Instituciones",
    body: "Optimización del endeudamiento, mejora de la liquidez y cobertura de riesgos financieros.",
  },
  {
    icon: Globe,
    title: "Acceso a Mercados",
    body: "Operamos en MAE, BYMA, ROFEX y MAV, garantizando conectividad directa con los principales mercados locales.",
  },
] as const;

type ServiceData = (typeof SERVICES)[number];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const containerVariant: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

function ServiceCard({
  service,
  className = "",
}: {
  service: ServiceData;
  className?: string;
}) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={cardVariant}
      whileHover="hovered"
      initial="rest"
      animate="rest"
      className={`relative flex flex-col rounded-sm overflow-hidden cursor-default ${className}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(0,200,83,0.11)",
      }}
    >
      {/* Hover glow border */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 1px rgba(0,200,83,0.32), 0 16px 56px rgba(0,200,83,0.10)",
        }}
      />

      {/* Lift on hover */}
      <motion.div
        variants={{ rest: { y: 0 }, hovered: { y: -6 } }}
        transition={{ duration: 0.35, ease }}
        className="flex flex-col h-full p-7"
      >
        {/* Icon */}
        <div className="mb-5">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,200,83,0.20) 0%, rgba(0,200,83,0.06) 100%)",
              border: "1px solid rgba(0,200,83,0.22)",
            }}
          >
            <Icon size={20} className="text-accent" strokeWidth={1.7} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[1rem] font-bold leading-snug tracking-[-0.01em] mb-3 text-[#f0f0f0]">
          {service.title}
        </h3>

        {/* Body */}
        <p className="text-sm text-[#8a9e8a] leading-[1.75] flex-1">{service.body}</p>

        {/* Bottom accent on hover */}
        <motion.div
          variants={{
            rest:    { scaleX: 0, opacity: 0 },
            hovered: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="mt-5 h-px origin-left"
          style={{
            background: "linear-gradient(90deg, #00c853, #69f0ae, transparent)",
          }}
        />
      </motion.div>
    </motion.article>
  );
}

function ServicesGrid() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#060b06" }}
    >
      {/* Dividers */}
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-12 md:mb-16"
        >
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold
                       uppercase tracking-[0.2em] text-accent mb-5 block"
          >
            <span className="block w-6 h-px bg-accent" />
            Servicios
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.06]
                       tracking-[-0.025em] text-[#f0f0f0]"
          >
            Lo que{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #00c853 0%, #69f0ae 55%, #f0f0f0 100%)",
              }}
            >
              ofrecemos
            </span>
          </h2>
        </motion.div>

        {/* 3 + 2 centered grid using 6 virtual columns */}
        <motion.div
          ref={ref}
          variants={containerVariant}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5"
        >
          <ServiceCard service={SERVICES[0]} className="lg:col-span-2" />
          <ServiceCard service={SERVICES[1]} className="lg:col-span-2" />
          <ServiceCard service={SERVICES[2]} className="lg:col-span-2" />
          <ServiceCard service={SERVICES[3]} className="lg:col-start-2 lg:col-span-2" />
          <ServiceCard service={SERVICES[4]} className="lg:col-span-2" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#contactanos-section"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5
                       text-[#0a0f0a] text-sm font-bold tracking-wide rounded-sm overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00c853 0%, #69f0ae 100%)",
            }}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative">Contactanos</span>
            <ArrowRight
              size={15}
              className="relative transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

// ─── SECTION 3: Fondos Banner ─────────────────────────────────────────────────

function FondosBanner() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-28 overflow-hidden"
      style={{ background: "#080d08" }}
    >
      {/* Dividers */}
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

      {/* Animated centered radial glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{ opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <div
          style={{
            width: 700,
            height: 420,
            background:
              "radial-gradient(ellipse, rgba(0,200,83,0.20) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 text-center max-w-4xl mx-auto px-5 sm:px-8"
      >
        {/* Eyebrow */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="block w-8 h-px bg-accent opacity-60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            ACDI
          </span>
          <span className="block w-8 h-px bg-accent opacity-60" />
        </div>

        {/* Headline */}
        <h2
          className="text-[clamp(2.2rem,5.5vw,4rem)] font-black leading-[1.06]
                     tracking-[-0.025em] mb-6"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(100deg, #00c853 0%, #69f0ae 50%, #f0f0f0 85%)",
            }}
          >
            Conocé nuestros Fondos
          </span>
        </h2>

        {/* Body */}
        <p className="text-base sm:text-lg text-[#8a9e8a] leading-[1.78] max-w-2xl mx-auto mb-10">
          Impulsamos el acceso justo y simple a los mercados, empoderando a cada persona y empresa
          para tomar el control de su futuro financiero.
        </p>

        {/* CTA — ghost style, fills on hover */}
        <Link
          href="/fondos"
          className="group inline-flex items-center gap-2.5 px-8 py-3.5
                     text-sm font-bold tracking-wide rounded-sm
                     border border-[rgba(0,200,83,0.35)] text-accent
                     hover:bg-[rgba(0,200,83,0.10)] hover:border-[rgba(0,200,83,0.6)]
                     transition-all duration-200"
        >
          Ver Fondos
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </section>
  );
}

// ─── SECTION 4: Valores ───────────────────────────────────────────────────────

const VALORES = [
  {
    icon: Eye,
    title: "Transparencia y análisis profesional",
    body: "Brindamos asesoramiento basado en datos y evaluaciones objetivas para decisiones de inversión sólidas.",
  },
  {
    icon: Handshake,
    title: "Compromiso con la confianza y el largo plazo",
    body: "Construimos relaciones duraderas, priorizando los intereses del cliente en cada decisión financiera.",
  },
  {
    icon: ShieldCheck,
    title: "Integridad en cada operación",
    body: "Actuamos con responsabilidad y ética, cuidando el patrimonio como si fuera propio.",
  },
] as const;

type ValorData = (typeof VALORES)[number];

function ValorCard({ valor, index }: { valor: ValorData; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = valor.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease }}
      className="relative flex flex-col rounded-sm p-7 cursor-default
                 transition-[border-color] duration-300
                 hover:border-[rgba(0,200,83,0.28)]"
      style={{
        background: "rgba(255,255,255,0.022)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0,200,83,0.10)",
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,83,0.16) 0%, rgba(0,200,83,0.04) 100%)",
          border: "1px solid rgba(0,200,83,0.20)",
        }}
      >
        <Icon size={20} className="text-accent" strokeWidth={1.6} />
      </div>

      {/* Title */}
      <h3 className="text-[1rem] font-bold leading-snug tracking-[-0.01em] mb-3 text-[#f0f0f0]">
        {valor.title}
      </h3>

      {/* Body */}
      <p className="text-sm text-[#8a9e8a] leading-[1.78] flex-1">{valor.body}</p>

      {/* Bottom accent */}
      <div className="mt-5 w-full h-px overflow-hidden">
        <motion.div
          className="h-full w-full origin-left"
          style={{
            background: "linear-gradient(90deg, #00c853, #69f0ae, transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: index * 0.13 + 0.35, ease }}
        />
      </div>
    </motion.div>
  );
}

function ValoresSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0c1410" }}
    >
      {/* Dot grid */}
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

      {/* Dividers */}
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-12 md:mb-16"
        >
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold
                       uppercase tracking-[0.2em] text-accent mb-5 block"
          >
            <span className="block w-6 h-px bg-accent" />
            Valores
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.06]
                       tracking-[-0.025em] text-[#f0f0f0]"
          >
            Nuestro{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #00c853 0%, #69f0ae 55%, #f0f0f0 100%)",
              }}
            >
              Compromiso
            </span>
          </h2>
          <p className="mt-4 text-[0.9375rem] text-[#8a9e8a] leading-[1.78] max-w-lg">
            Impulsamos el acceso justo y simple a los mercados, empoderando a cada persona y empresa
            para tomar el control de su futuro financiero.
          </p>
        </motion.div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALORES.map((valor, i) => (
            <ValorCard key={valor.title} valor={valor} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
  return (
    <main className="bg-[#050a05]">
      <PageHero />
      <ServicesGrid />
      <FondosBanner />
      <ValoresSection />
      <div id="contactanos-section">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
