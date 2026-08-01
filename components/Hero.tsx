"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Play, ArrowRight, TrendingUp, ShieldCheck, Zap, X } from "lucide-react";
import { GradientWave } from "@/components/ui/gradient-wave";

// ─── Gradient background config ───────────────────────────────────────────────
// Declared at module scope on purpose: GradientWave lists `colors`,
// `noiseFrequency` and `deform` in its effect's dependency array, so inline
// literals would be a new reference on every render and tear down / rebuild the
// WebGL context each time (this component re-renders whenever the demo modal
// opens).
const HERO_NOISE_FREQUENCY: [number, number] = [0.00012, 0.00055];
const HERO_DEFORM = { incline: 0.4, noiseAmp: 300, noiseFlow: 4.5 };

// ─── Animation variants ───────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// ─── Demo video modal ──────────────────────────────────────────────────────────

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    // Play explicitly (rather than relying on the `autoplay` attribute) so the
    // browser still associates playback with the click that opened the modal
    // and allows audio instead of silently muting it.
    video.muted = false;
    video.play().catch(() => {
      // Autoplay-with-sound was blocked; the user can press play manually.
    });
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: "rgba(2,6,2,0.88)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video de presentación de GRIT Capital Group"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden"
            style={{
              border: "1px solid rgba(0,200,83,0.22)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src="/assets/grit-equipo.mp4"
              controls
              playsInline
              className="w-full h-full object-contain bg-black"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar video"
              className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full
                         bg-[rgba(8,12,8,0.75)] border border-[rgba(0,200,83,0.28)]
                         text-[#f0f0f0] hover:bg-[rgba(0,200,83,0.18)] transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Trust bar ────────────────────────────────────────────────────────────────

const TRUST = [
  { icon: TrendingUp,  text: "Mercados locales e internacionales" },
  { icon: ShieldCheck, text: "Regulado por CNV"                   },
  { icon: Zap,         text: "Ejecución en tiempo real"           },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false);
  const [gradientColors, setGradientColors] = useState<string[] | null>(null);

  // Resolve the gradient palette from the brand CSS custom properties, so the
  // colours stay driven by the design tokens in globals.css. The WebGL layer
  // parses raw hex (`parseInt(hex, 16)`), so it cannot consume `var(--token)`
  // directly — the values have to be read once on the client.
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();
    setGradientColors([
      token("--black"),        // base
      token("--mid-green"),    // wave 1
      token("--brand-green"),  // wave 2
      token("--mid-green"),    // wave 3
    ]);
  }, []);

  return (
    <section id="inicio" className="relative">

      {/* Inset frame — the block sits below the fixed navbar and keeps a
          visible margin against the viewport edges, Lemon-style. */}
      <div className="px-3 sm:px-5 pt-[105px] pb-4 sm:pb-5">
        <div
          className="relative isolate flex flex-col overflow-hidden
                     rounded-[1.75rem] sm:rounded-[2.5rem]
                     min-h-[calc(100vh-125px)] bg-[#0b0f0b]"
        >

          {/* ── Animated gradient background (z-0) ── */}
          {gradientColors && (
            <GradientWave
              colors={gradientColors}
              noiseFrequency={HERO_NOISE_FREQUENCY}
              deform={HERO_DEFORM}
            />
          )}

          {/* ── Scrim ── keeps the white and green copy legible over the
              moving gradient without hiding it. */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(6,8,6,0.30) 0%, rgba(6,8,6,0.78) 100%)",
            }}
          />

          {/* ── Main content ── */}
          <div className="relative z-10 flex-1 flex items-center pb-14">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-16 pb-10 flex flex-col items-center text-center"
            >

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(1.4rem,5.5vw,4.5rem)] font-black leading-[1.04]
                       tracking-[-0.025em] mb-7"
          >
            <span className="block text-[#f0f0f0]">
              Transformamos <span className="text-accent">Información</span>
            </span>
            <span className="block text-[#f0f0f0]">
              en Decisiones Estratégicas
            </span>
          </motion.h1>

          {/* Subtext — font-size is a fluid clamp tuned (via real width
              measurement, not guessed) so the full sentence always fits one
              line, down to a 360px viewport, without wrapping. */}
          <motion.p
            variants={fadeUp}
            className="text-[clamp(0.68rem,3vw-0.55px,1.125rem)] text-[#8a9e8a] leading-relaxed mb-10 whitespace-nowrap"
          >
            Creado por amantes del mercado para{" "}
            <span className="text-[#c8d8c8]">potenciar tus inversiones</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4 mb-14">
            <a
              href="#equipo"
              className="group relative flex items-center gap-2.5 px-7 py-3.5
                         text-[#0a0f0a] text-base font-bold tracking-wide rounded-lg overflow-hidden"
              style={{ background: "#00c853" }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative">Conoce a nuestro equipo</span>
              <ArrowRight size={15} className="relative transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setShowDemo(true)}
              className="group flex items-center gap-3 px-6 py-3.5
                         border border-[rgba(0,200,83,0.22)]
                         bg-[rgba(0,200,83,0.04)] backdrop-blur-sm
                         text-[#f0f0f0] text-base font-medium tracking-wide rounded-lg
                         hover:border-[rgba(0,200,83,0.5)] hover:bg-[rgba(0,200,83,0.08)]
                         transition-all duration-200"
            >
              <span className="relative flex items-center justify-center w-7 h-7 rounded-full
                               border border-[rgba(0,200,83,0.35)] flex-shrink-0
                               group-hover:border-[rgba(0,200,83,0.7)] transition-colors duration-200">
                <span className="absolute inset-0 rounded-full bg-[rgba(0,200,83,0.12)]
                                 group-hover:scale-110 transition-transform duration-200" />
                <Play size={11} className="relative text-accent fill-current ml-0.5" />
              </span>
              Ver demo
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={13} className="text-accent flex-shrink-0" />
                <span className="text-sm text-[#8a9e8a] tracking-wide">{text}</span>
              </div>
            ))}
          </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Demo video modal ── */}
      {/* Kept outside the rounded block: the block is `overflow-hidden` and
          framer-motion applies transforms inside it, which would otherwise
          become the containing block for the modal's `fixed` positioning. */}
      <VideoModal open={showDemo} onClose={() => setShowDemo(false)} />

    </section>
  );
}
