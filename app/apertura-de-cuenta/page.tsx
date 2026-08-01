"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Building2, User, Mail, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

// ─── Constants ────────────────────────────────────────────────────────────────

// Same domain used across the rest of the site (contact info, ContactForm,
// equipo "busquedas@" link) — kept as a single constant so it's a one-line
// change if the address needs to move.
const APERTURAS_EMAIL = "aperturas@gritcg.com";

// External KYB onboarding flow for Persona Jurídica (Chaindots).
const PERSONA_JURIDICA_ONBOARDING_URL =
  "https://app.chaindots.com/gritcapital/onboarding-process/kyb";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ─── Persona Jurídica card ──────────────────────────────────────────────────────

function PersonaJuridicaCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center text-center rounded-lg p-8 sm:p-10"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(11,15,11,0.10)",
        boxShadow: "0 4px 24px rgba(11,15,11,0.05)",
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "rgba(0,200,83,0.12)",
          border: "1px solid rgba(0,200,83,0.30)",
        }}
      >
        <Building2 size={24} className="text-accent-ink" strokeWidth={1.7} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-ink tracking-[-0.01em]">
        Persona Jurídica
      </h2>
      <p className="text-sm text-ink-muted mt-1 mb-5">(Empresa)</p>

      {/* Body */}
      <p className="text-base text-ink-muted leading-[1.75] mb-8 max-w-[340px]">
        Soluciones financieras completas para empresas de todos los tamaños.
        Gestión de capital, inversiones y servicios bancarios especializados.
      </p>

      {/* CTA */}
      <a
        href={PERSONA_JURIDICA_ONBOARDING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full flex items-center justify-center gap-2.5 px-6 py-3.5
                   text-[#0a0f0a] text-base font-bold tracking-wide rounded-lg overflow-hidden mt-auto"
        style={{ background: "#00c853" }}
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <span className="relative">Abrir Cuenta</span>
        <ArrowRight size={16} className="relative transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  );
}

// ─── Persona Física card ────────────────────────────────────────────────────────

function PersonaFisicaCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center text-center rounded-lg p-8 sm:p-10"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(11,15,11,0.10)",
        boxShadow: "0 4px 24px rgba(11,15,11,0.05)",
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "rgba(0,200,83,0.12)",
          border: "1px solid rgba(0,200,83,0.30)",
        }}
      >
        <User size={24} className="text-accent-ink" strokeWidth={1.7} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-ink tracking-[-0.01em] mb-5">
        Persona Física
      </h2>

      {/* Body */}
      <p className="text-base text-ink-muted leading-[1.75] mb-6 max-w-[340px]">
        Servicios financieros personalizados para individuos. Inversiones,
        planificación financiera y gestión patrimonial.
      </p>

      {/* Help box */}
      <div
        className="w-full rounded-lg p-4 mb-8 text-sm"
        style={{ background: "rgba(0,200,83,0.07)", border: "1px solid rgba(0,200,83,0.16)" }}
      >
        <p className="font-bold text-ink mb-1">¿Tenés preguntas?</p>
        <p className="text-ink-muted">
          Envíanos un email a{" "}
          <a
            href={`mailto:${APERTURAS_EMAIL}`}
            className="text-accent-ink underline hover:text-[#00c853] transition-colors duration-200"
          >
            {APERTURAS_EMAIL}
          </a>
        </p>
      </div>

      {/* CTA */}
      <a
        href={`mailto:${APERTURAS_EMAIL}`}
        className="group flex items-center justify-center gap-2.5 w-full px-6 py-3.5
                   text-accent-ink text-base font-bold tracking-wide rounded-lg
                   bg-white hover:bg-[rgba(0,200,83,0.05)] transition-colors duration-200 mt-auto"
        style={{ border: "1.5px solid #00c853" }}
      >
        <Mail size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
        <span>Abrir Cuenta enviando un email</span>
      </a>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AperturaDeCuentaPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <main style={{ background: "#f5f7f5" }}>
      <section className="pt-[105px]">
        <div className="min-h-[calc(100vh-105px)] flex items-center justify-center px-4 sm:px-6 py-16">
          <div ref={ref} className="max-w-4xl mx-auto w-full">

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease }}
              className="text-[clamp(2.2rem,5.5vw,3.75rem)] font-black leading-[1.06]
                         tracking-[-0.025em] text-ink text-center mb-14"
            >
              Apertura de Cuenta
            </motion.h1>

            {/* Cards */}
            <motion.div
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch"
            >
              <PersonaJuridicaCard />
              <PersonaFisicaCard />
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
