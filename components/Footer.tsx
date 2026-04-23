"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, Phone, MapPin, FileText } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SITEMAP = [
  { label: "Servicios",        href: "#diferencial" },
  { label: "ADN",              href: "#nosotros"    },
  { label: "Equipo",           href: "#nosotros"    },
  { label: "Tarifario",        href: "#contacto"    },
  {
    label:    "Nuestros Idóneos",
    href:     "https://www.cnv.gov.ar/SitioWeb/RegistrosPublicos/Agentes",
    external: true,
  },
] as const;

const CONTACT_LINES = [
  { icon: MapPin,   text: "Av. Corrientes 1464, Piso 22"         },
  { icon: Mail,     text: "info@gritcg.com"                       },
  { icon: Phone,    text: "+54 9 11 5239-1930"                    },
  { icon: FileText, text: "ALyC Propio n° 2230 | ACyDI N° 202"   },
] as const;

const REGULATORY_BADGES = [
  "CNV",
  "BYMA",
  "MAV",
  "MAE",
  "ROFEX",
  "Caja de Valores",
  "Argentina Clearing",
] as const;

const LEGAL_TEXT =
  "GRIT CAPITAL GROUP Agente de Liquidación y Compensación Propio N°2230 ante la CNV. " +
  "Agente de Colocación y Distribución Integral de Fondos Comunes de Inversión N° 202 ante la CNV. " +
  "Agente miembro de BYMA, MAV y A3. Av. Corrientes 1464, Piso 22 Of. 1 CP 1042 CABA. " +
  "INSCRIPTO ANTE IGJ BAJO EL N° 7563 DEL LIBRO 117, TOMO - SOCIEDAD POR ACCIONES. " +
  "CUIT: 30-71852138-2.";

// ─── Logo ─────────────────────────────────────────────────────────────────────

function FooterLogo() {
  return (
    <a href="#" className="inline-flex items-center gap-2.5 group mb-5 block w-fit">
      <span className="relative flex-shrink-0">
        <span
          className="flex w-9 h-9 items-center justify-center rounded-sm
                     font-black text-[#0a0f0a] text-lg leading-none"
          style={{ background: "linear-gradient(135deg, #00c853 0%, #69f0ae 100%)" }}
        >
          G
        </span>
        <span className="absolute inset-0 rounded-sm bg-accent blur-md opacity-20
                         group-hover:opacity-40 transition-opacity duration-300" />
      </span>
      <span className="font-black text-base tracking-[-0.02em] text-[#f0f0f0] leading-tight">
        GRIT{" "}
        <span
          className="font-light bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #00c853, #69f0ae)",
          }}
        >
          Capital Group
        </span>
      </span>
    </a>
  );
}

// ─── Regulatory badge ──────────────────────────────────────────────────────────

function RegBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold
                 uppercase tracking-[0.12em] rounded-sm transition-colors duration-200
                 cursor-default"
      style={{
        background: "rgba(0,200,83,0.06)",
        border:     "1px solid rgba(0,200,83,0.14)",
        color:      "#8a9e8a",
      }}
    >
      {label}
    </span>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#050805" }}
    >
      {/* Top gradient border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,200,83,0.30) 30%, rgba(105,240,174,0.40) 50%, rgba(0,200,83,0.30) 70%, transparent 100%)",
        }}
      />

      {/* Very faint background glow top-center */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]
                   pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,200,83,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-10">

        {/* ── Three-column top grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-12">

          {/* Col 1 — logo + company info */}
          <div>
            <FooterLogo />

            <p className="text-[11px] font-semibold text-[#8a9e8a] mb-4 tracking-wide">
              Truegrit Capital S.A.
            </p>

            <ul className="space-y-2.5">
              {CONTACT_LINES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon
                    size={12}
                    className="text-accent flex-shrink-0 mt-[3px] opacity-70"
                  />
                  <span className="text-[11px] text-[#6a846a] leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — sitemap */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.18em]
                         text-[#f0f0f0] mb-5"
            >
              Sitemap
            </h4>
            <ul className="space-y-3">
              {SITEMAP.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs
                                 text-[#6a846a] hover:text-accent
                                 transition-colors duration-200 group"
                    >
                      {link.label}
                      <ExternalLink
                        size={10}
                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-xs text-[#6a846a] hover:text-accent
                                 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — regulatory badges */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.18em]
                         text-[#f0f0f0] mb-5"
            >
              Regulación & Membresías
            </h4>
            <div className="flex flex-wrap gap-2">
              {REGULATORY_BADGES.map((badge) => (
                <RegBadge key={badge} label={badge} />
              ))}
            </div>

            {/* CNV registration highlight */}
            <div
              className="mt-5 px-3 py-2.5 rounded-sm"
              style={{
                background: "rgba(0,200,83,0.04)",
                border:     "1px solid rgba(0,200,83,0.10)",
              }}
            >
              <p className="text-[10px] text-[#8a9e8a] leading-relaxed">
                <span className="text-accent font-semibold">ALyC Propio N°2230</span>
                {" · "}
                <span className="text-accent font-semibold">ACyDI N°202</span>
                <br />
                Registrado ante la Comisión Nacional de Valores
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          aria-hidden
          className="mb-7"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,200,83,0.14) 30%, rgba(0,200,83,0.14) 70%, transparent 100%)",
          }}
        />

        {/* ── Legal block ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-[10px] leading-[1.85] mb-5 max-w-4xl"
            style={{ color: "rgba(138,158,138,0.55)" }}
          >
            {LEGAL_TEXT}
          </p>

          {/* Bottom row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span
              className="text-[10px] font-mono"
              style={{ color: "rgba(138,158,138,0.4)" }}
            >
              © {new Date().getFullYear()} Truegrit Capital S.A. — GRIT Capital Group.
              Todos los derechos reservados.
            </span>

            <span
              className="text-[10px] font-mono tracking-wide"
              style={{ color: "rgba(0,200,83,0.28)" }}
            >
              Buenos Aires, Argentina
            </span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
