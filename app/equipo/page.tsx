"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Target, Eye, Lightbulb, Users, ShieldCheck, Telescope, ArrowRight,
} from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// ─── Shared ease ─────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIOS = [
  {
    name: "Nicolás Chiesa",
    role: "Co-Fundador | CEO | Sales & Trading",
    img: "/images/equipo/avatar-nicolas-chiesa.png",
    bio: "Con más de 20 años en el mercado financiero, lidera el área de sales & trading institucional en Grit. Fue Managing Director en PPI y Head Trader en Balanz Capital, donde fue reconocido por su visión estratégica y liderazgo de mesas de trading de alto rendimiento.",
  },
  {
    name: "Walter Stoeppelwerth",
    role: "Co-Fundador | CIO | Research & Strategy",
    img: "/images/equipo/avatar-walter-stoeppelwerth.png",
    bio: "Con más de 30 años en finanzas, Walter Stoeppelwerth lideró equipos en Smith Newcourt, Flemings, Balanz y PPI. Expandió un fondo de 37M a 2.000M USD en Tiedemann. Hoy, en Grit, dirige el research estratégico, con foco en renta fija, macroeconomía y gestión de riesgos en mercados globales.",
  },
  {
    name: "Belisario Álvarez de Toledo",
    role: "Co-Fundador | Head Trader | Sales & Trading",
    img: "/images/equipo/avatar-belisario-alvarez.png",
    bio: "Belisario Álvarez de Toledo cuenta con amplia experiencia en trading, research y gestión de portafolios. Trabajó en Consultatio, HSBC y Par5, especializándose en renta fija. En Grit, aporta una visión integral del mercado, enfocándose en análisis de riesgos y ejecución estratégica basada en research.",
  },
  {
    name: "Tomás Chittaro Villar",
    role: "Co-Fundador | VP & Managing Partner",
    img: "/images/equipo/avatar-tomas-chittaro.png",
    bio: "Con más de 20 años en finanzas, Tomás Chíttaro Villar lideró equipos en Grupo Petersen, especializándose en riesgos, eficiencia operativa y compliance. En Grit, aporta su experiencia en análisis financiero y control de riesgos, garantizando decisiones estratégicas basadas en evaluación de escenarios y sólida gestión corporativa.",
  },
] as const;

const TEAM = [
  { name: "Joaquín Bagües",      role: "Managing Director | CCO | Business Development", img: "/images/equipo/avatar-joaquin-bagues.png"        },
  { name: "Nicolás Kreutzer",    role: "Head de Institutional Sales",                   img: "/images/equipo/avatar-nicolas-kreutzer.jpeg"     },
  { name: "Ezequiel Loyato",     role: "Head de Corporate Sales",                       img: "/images/equipo/avatar-ezequiel-loyato.jpeg"      },
  { name: "Bautista Dominguez",  role: "Corporate & Sales",                             img: "/images/equipo/avatar-bautista-dominguez.jpeg"   },
  { name: "Manuela Watle",       role: "Analista de Back Office",                       img: "/images/equipo/avatar-manuela-watle.jpeg"        },
  { name: "Antonella Cardona",   role: "Head de Back Office",                           img: "/images/equipo/avatar-antonella-cardona.jpeg"    },
  { name: "Agostina Cravenna",   role: "Head de Accounting",                            img: "/images/equipo/avatar-agostina-cravenna.jpeg"    },
  { name: "Sabrina Gulli Godoy", role: "Head de Compliance",                            img: "/images/equipo/avatar-sabrina-gulli-godoy.jpeg"  },
] as const;

type ValorItem = { icon: LucideIcon; title: string; body: string };

const VALORES: ValorItem[] = [
  {
    icon: Target,
    title: "Determinación",
    body: "Acompañamos a nuestros clientes con firmeza, incluso en los contextos más desafiantes. Creemos en el esfuerzo sostenido como camino al crecimiento.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    body: "Hablamos claro. Nuestra comunicación es directa, honesta y sin vueltas. Construimos relaciones de confianza explicando cada paso con lenguaje simple y accesible.",
  },
  {
    icon: Lightbulb,
    title: "Innovación Responsable",
    body: "Nos apoyamos en la tecnología para crear soluciones financieras más eficientes, sin perder de vista la seguridad y el impacto a largo plazo.",
  },
  {
    icon: Users,
    title: "Cercanía",
    body: "Escuchamos activamente. Estamos al lado de nuestros clientes en cada decisión financiera, adaptándonos a sus necesidades y ayudándolos a tomar mejores decisiones.",
  },
  {
    icon: ShieldCheck,
    title: "Integridad",
    body: "Actuamos con ética en todo lo que hacemos. Defendemos los intereses de nuestros clientes y cumplimos con cada compromiso asumido.",
  },
  {
    icon: Telescope,
    title: "Visión de Futuro",
    body: "No solo pensamos en lo que funciona hoy, sino en lo que va a construir valor mañana. Buscamos oportunidades sostenibles que ayuden a personas y empresas a proyectarse.",
  },
];

const CTA_PHOTOS = [
  "/images/equipo/cta-image-1.jpeg",
  "/images/equipo/cta-image-2.jpeg",
  "/images/equipo/cta-image-3.jpeg",
  "/images/equipo/cta-image-4.jpeg",
  "/images/equipo/cta-image-5.jpeg",
] as const;

// ─── Avatar ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({
  name,
  src,
  size = "lg",
}: {
  name: string;
  src?: string;
  size?: "lg" | "sm";
}) {
  const initials = getInitials(name);
  return (
    <div
      className={`relative overflow-hidden rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[#e0f0e0] tracking-wide select-none ${
        size === "lg" ? "w-20 h-20 text-lg" : "w-12 h-12 text-sm"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(0,200,83,0.28) 0%, rgba(4,24,12,0.95) 100%)",
        border: "1px solid rgba(0,200,83,0.28)",
        boxShadow: "0 0 18px rgba(0,200,83,0.12)",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={size === "lg" ? "80px" : "48px"}
          className="object-cover object-center"
        />
      ) : (
        initials
      )}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <>
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
    </>
  );
}

// ─── SECTION 1: Page Hero ─────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "#0b0f0b" }}
      />

      {/* Mesh overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 15% 25%, rgba(0,200,83,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 70%  60% at 85% 75%, rgba(26,71,42,0.20)  0%, transparent 50%),
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
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto pt-28 pb-16"
      >
        {/* Eyebrow */}
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            GRIT
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.04]
                     tracking-[-0.025em] mb-6"
        >
          <span
            className="text-accent"
          >
            Nosotros
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#8a9e8a] leading-[1.78]">
          En GRIT Capital Group, combinamos un profundo conocimiento técnico con una amplia
          experiencia en el sector financiero. Fomentamos un ambiente colaborativo donde cada
          miembro del equipo contribuye con su perspectiva única, lo que nos permite abordar
          desafíos de manera creativa y efectiva enfocándonos en entender las necesidades de
          nuestros clientes.
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

// ─── SECTION 2: Socios ────────────────────────────────────────────────────────

type SocioData = (typeof SOCIOS)[number];

function SocioCard({ socio, index }: { socio: SocioData; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease }}
      className="relative flex flex-col rounded-lg p-7 group
                 transition-[border-color,box-shadow] duration-300
                 hover:border-[rgba(0,200,83,0.30)]
                 hover:shadow-[0_0_40px_rgba(0,200,83,0.07)]"
      style={{
        background: "rgba(255,255,255,0.022)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(0,200,83,0.11)",
      }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-sm"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,200,83,0.35) 40%, rgba(105,240,174,0.25) 70%, transparent)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Avatar + name block */}
      <div className="flex items-center gap-4 mb-5">
        <Avatar name={socio.name} src={socio.img} size="lg" />
        <div>
          <h3 className="text-[1rem] font-bold text-[#f0f0f0] leading-snug tracking-[-0.01em]">
            {socio.name}
          </h3>
          <p
            className="mt-1 text-sm font-semibold uppercase tracking-[0.12em]"
            style={{ color: "#00c853" }}
          >
            {socio.role}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-5"
        style={{ background: "rgba(0,200,83,0.08)" }}
      />

      {/* Bio */}
      <p className="text-base text-[#8a9e8a] leading-[1.78] flex-1">{socio.bio}</p>

      {/* Bottom accent */}
      <div className="mt-5 w-full h-px overflow-hidden">
        <motion.div
          className="h-full w-full origin-left"
          style={{
            background: "linear-gradient(90deg, #00c853, transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: index * 0.12 + 0.35, ease }}
        />
      </div>
    </motion.div>
  );
}

function SociosSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0b0f0b" }}
    >
      <SectionDivider />

      {/* Faint radial glow top-center */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,200,83,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-12 md:mb-16"
        >
          <span
            className="inline-flex items-center gap-2 text-sm font-bold
                       uppercase tracking-[0.2em] text-accent mb-5 block"
          >
            <span className="block w-6 h-px bg-accent" />
            Quienes Nos Guían
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.06]
                       tracking-[-0.025em] text-[#f0f0f0]"
          >
            Nuestros{" "}
            <span
              className="text-accent"
            >
              Socios
            </span>
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOCIOS.map((socio, i) => (
            <SocioCard key={socio.name} socio={socio} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 3: Team Grid ─────────────────────────────────────────────────────

type TeamMember = (typeof TEAM)[number];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease }}
      className="card-light relative flex flex-col items-center text-center gap-3 rounded-lg p-5"
    >
      <Avatar name={member.name} src={member.img} size="sm" />
      <div>
        <p className="text-[0.8125rem] font-bold text-ink leading-snug">
          {member.name}
        </p>
        <p
          className="mt-1 text-sm font-medium leading-snug"
          style={{ color: "#00893a" }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Top / bottom dividers */}
      {["top-0", "bottom-0"].map((pos) => (
        <div
          key={pos}
          aria-hidden
          className={`absolute ${pos} left-0 right-0 h-px`}
          style={{ background: "rgba(11,15,11,0.10)" }}
        />
      ))}

      {/* Diagonal grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 48 L48 0' stroke='rgba(0%2C200%2C83%2C0.10)' stroke-width='0.75' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-12 md:mb-16"
        >
          <span
            className="inline-flex items-center gap-2 text-sm font-bold
                       uppercase tracking-[0.2em] text-accent-ink mb-5 block"
          >
            <span className="block w-6 h-px bg-accent" />
            Team
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.06]
                       tracking-[-0.025em] text-ink"
          >
            Nuestro <span style={{ color: "#00893a" }}>Equipo</span>
          </h2>
        </motion.div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 4: Valores ───────────────────────────────────────────────────────

function ValorCard({ valor, index }: { valor: ValorItem; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = valor.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.13, ease }}
      className="relative flex flex-col rounded-lg p-7 cursor-default
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
        className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,200,83,0.20) 0%, rgba(0,200,83,0.06) 100%)",
          border: "1px solid rgba(0,200,83,0.22)",
        }}
      >
        <Icon size={18} className="text-accent" strokeWidth={1.7} />
      </div>

      <h3 className="text-[0.9375rem] font-bold leading-snug tracking-[-0.01em] mb-2.5 text-[#f0f0f0]">
        {valor.title}
      </h3>

      <p className="text-base text-[#8a9e8a] leading-[1.78] flex-1">{valor.body}</p>

      {/* Bottom accent */}
      <div className="mt-5 w-full h-px overflow-hidden">
        <motion.div
          className="h-full w-full origin-left"
          style={{
            background: "linear-gradient(90deg, #00c853, transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: (index % 3) * 0.13 + 0.35, ease }}
        />
      </div>
    </motion.div>
  );
}

function ValoresSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0b0f0b" }}
    >
      <SectionDivider />

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,200,83,0.11) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)",
          opacity: 0.45,
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-2 text-sm font-bold
                       uppercase tracking-[0.2em] text-accent mb-5 block"
          >
            <span className="block w-6 h-px bg-accent" />
            Valores
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[1.06]
                       tracking-[-0.025em] text-[#f0f0f0]"
          >
            Cómo trabajamos{" "}
            <span
              className="text-accent"
            >
              en Grit
            </span>
          </h2>
          <p className="mt-4 text-[0.9375rem] text-[#8a9e8a] leading-[1.78] max-w-lg mb-12 md:mb-16">
            Los valores que compartimos nos unen y nos guían en cada paso como un único equipo.
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALORES.map((valor, i) => (
            <ValorCard key={valor.title} valor={valor} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#equipo-cta-section"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5
                       text-[#0a0f0a] text-base font-bold tracking-wide rounded-lg overflow-hidden"
            style={{ background: "#00c853" }}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="relative">Unite a Grit</span>
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

// ─── SECTION 5: Join Us CTA ───────────────────────────────────────────────────

function CollagePhoto({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-lg"
      style={{ border: "1px solid rgba(0,200,83,0.12)" }}
    >
      <Image
        src={src}
        alt={`Equipo GRIT ${index + 1}`}
        fill
        sizes="(max-width: 1024px) 33vw, 300px"
        className="object-cover object-center"
      />
    </div>
  );
}

function JoinUsSection() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="equipo-cta-section"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0b0f0b" }}
    >
      <SectionDivider />

      {/* Aurora blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 580,
            height: 420,
            top: "-10%",
            left: "-8%",
            background: "radial-gradient(circle, rgba(0,200,83,0.13) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 320,
            bottom: "-5%",
            right: "5%",
            background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 240,
            top: "40%",
            left: "45%",
            background: "radial-gradient(circle, rgba(0,200,83,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease }}
          >
            <span
              className="inline-flex items-center gap-2 text-sm font-bold
                         uppercase tracking-[0.2em] text-accent mb-6 block"
            >
              <span className="block w-6 h-px bg-accent" />
              Trabajá con nosotros
            </span>

            <h2
              className="text-[clamp(2rem,5vw,3.8rem)] font-black leading-[1.04]
                         tracking-[-0.03em] mb-6"
            >
              <span
                className="text-accent"
              >
                Tu próximo desafío
              </span>
              <br />
              <span className="text-[#f0f0f0]">empieza acá</span>
            </h2>

            <p className="text-[0.9375rem] text-[#8a9e8a] leading-[1.8] mb-10 max-w-[460px]">
              GRIT está creciendo rápidamente, y siempre estamos en búsqueda de personas
              apasionadas, dinámicas y talentosas para sumarse a nuestro equipo. Construimos
              equipos diversos, impulsamos el talento y fomentamos un ambiente donde podés
              desarrollar tu mejor versión.
            </p>

            {/* mailto CTA */}
            <a
              href="mailto:busquedas@gritcg.com"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5
                         text-[#0a0f0a] text-base font-bold tracking-wide rounded-lg overflow-hidden"
              style={{ background: "#00c853" }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative">Envianos un mail a: busquedas@gritcg.com</span>
              <ArrowRight
                size={15}
                className="relative flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* Right — image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
          >
            {/* Mobile: 3 cards in a single row */}
            <div className="grid grid-cols-3 gap-2 lg:hidden">
              {CTA_PHOTOS.slice(0, 3).map((src, i) => (
                <div key={src} className="h-24">
                  <CollagePhoto src={src} index={i} />
                </div>
              ))}
            </div>

            {/* Desktop: masonry two-column flexbox */}
            <div className="hidden lg:flex gap-3">
              {/* Left column — taller items */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="h-52">
                  <CollagePhoto src={CTA_PHOTOS[0]} index={0} />
                </div>
                <div className="h-36">
                  <CollagePhoto src={CTA_PHOTOS[2]} index={2} />
                </div>
                <div className="h-40">
                  <CollagePhoto src={CTA_PHOTOS[4]} index={4} />
                </div>
              </div>
              {/* Right column — offset heights */}
              <div className="flex flex-col gap-3 flex-1 pt-5">
                <div className="h-36">
                  <CollagePhoto src={CTA_PHOTOS[1]} index={1} />
                </div>
                <div className="h-64">
                  <CollagePhoto src={CTA_PHOTOS[3]} index={3} />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EquipoPage() {
  return (
    <main className="bg-[#0b0f0b]">
      <PageHero />
      <SociosSection />
      <TeamSection />
      <ValoresSection />
      <JoinUsSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
