"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Play, ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";

// ─── Ticker data ─────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { symbol: "SPY",     change: "+1.2%", up: true  },
  { symbol: "BTC/USD", change: "+3.4%", up: true  },
  { symbol: "MERVAL",  change: "+0.8%", up: true  },
  { symbol: "GD30",    change: "+2.1%", up: true  },
  { symbol: "AAPL",    change: "-0.3%", up: false },
  { symbol: "TSLA",    change: "+1.8%", up: true  },
  { symbol: "GOLD",    change: "+0.5%", up: true  },
  { symbol: "AL30",    change: "+1.4%", up: true  },
  { symbol: "YPF",     change: "+2.9%", up: true  },
  { symbol: "EUR/USD", change: "-0.1%", up: false },
  { symbol: "S&P 500", change: "+0.9%", up: true  },
  { symbol: "NASDAQ",  change: "+1.3%", up: true  },
  { symbol: "GGAL",    change: "+3.1%", up: true  },
  { symbol: "BMA",     change: "+1.6%", up: true  },
];

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

// ─── Dot-matrix canvas background ────────────────────────────────────────────

function DotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const SPACING = 38;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      t += 0.007;
      const cols = Math.ceil(canvas.offsetWidth / SPACING) + 1;
      const rows = Math.ceil(canvas.offsetHeight / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wave = Math.sin(t + c * 0.45 + r * 0.32) * 0.5 + 0.5;
          const isGold = (c * 7 + r * 13) % 31 === 0;
          const opacity = wave * 0.10 + 0.02;
          const radius  = wave * 0.9 + 0.4;
          ctx.beginPath();
          ctx.arc(c * SPACING, r * SPACING, radius, 0, Math.PI * 2);
          ctx.fillStyle = isGold
            ? `rgba(212,175,55,${opacity * 0.6})`
            : `rgba(0,200,83,${opacity})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduce]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

// ─── Ticker strip ─────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <motion.div
      variants={fadeIn}
      className="absolute bottom-0 left-0 right-0 overflow-hidden
                 border-t border-[rgba(0,200,83,0.12)]
                 bg-[rgba(8,12,8,0.75)] backdrop-blur-sm"
    >
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center
                      px-4 bg-[rgba(0,200,83,0.08)] border-r border-[rgba(0,200,83,0.14)]">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase
                         tracking-[0.14em] text-accent whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Live
        </span>
      </div>

      <div className="pl-20 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-0 whitespace-nowrap py-2.5"
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 font-mono text-[11px]
                         border-r border-[rgba(0,200,83,0.07)] last:border-0"
            >
              <span className="text-[#8a9e8a] tracking-wide">{item.symbol}</span>
              <span className={`font-semibold ${item.up ? "text-[#00c853]" : "text-[#f44336]"}`}>
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none
                      bg-gradient-to-l from-[rgba(8,12,8,0.9)] to-transparent" />
    </motion.div>
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
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background gradient ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at bottom, #0a1f0a 0%, #050a05 100%)",
        }}
      />

      {/* ── Mesh overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 10% 20%, rgba(0,200,83,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 70%  60% at 90% 80%, rgba(26,71,42,0.22)  0%, transparent 50%),
            radial-gradient(ellipse 50%  40% at 55% 45%, rgba(0,200,83,0.05)  0%, transparent 60%),
            radial-gradient(ellipse 30%  25% at 75% 15%, rgba(212,175,55,0.04) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Dot matrix ── */}
      <DotMatrix />

      {/* ── Edge vignette ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Decorative vertical rules ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,200,83,0.07)] to-transparent" />
        <div className="absolute right-[35%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,200,83,0.04)] to-transparent" />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,200,83,0.06)] to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center pb-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto w-full px-5 sm:px-8 pt-32 pb-10 flex flex-col items-center text-center"
        >

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.6rem,6.5vw,5.25rem)] font-black leading-[1.04]
                       tracking-[-0.025em] mb-7"
          >
            <span className="block text-[#f0f0f0]">
              Transformamos
            </span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #00c853 0%, #69f0ae 40%, #f0f0f0 75%)",
              }}
            >
              Información en
            </span>
            <span className="block text-[#f0f0f0]">
              Decisiones Estratégicas
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[#8a9e8a] leading-relaxed max-w-lg mb-10"
          >
            Creado por amantes del mercado para{" "}
            <span className="text-[#c8d8c8]">potenciar tus inversiones</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-4 mb-14">
            <a
              href="#equipo"
              className="group relative flex items-center gap-2.5 px-7 py-3.5
                         text-[#0a0f0a] text-sm font-bold tracking-wide rounded-sm overflow-hidden"
              style={{ background: "linear-gradient(135deg, #00c853 0%, #69f0ae 100%)" }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative">Conoce a nuestro equipo</span>
              <ArrowRight size={15} className="relative transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <button
              className="group flex items-center gap-3 px-6 py-3.5
                         border border-[rgba(0,200,83,0.22)]
                         bg-[rgba(0,200,83,0.04)] backdrop-blur-sm
                         text-[#f0f0f0] text-sm font-medium tracking-wide rounded-sm
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
                <span className="text-[11px] text-[#8a9e8a] tracking-wide">{text}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* ── Ticker strip pinned to bottom ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.9 }}
        className="relative z-10"
      >
        <Ticker />
      </motion.div>

    </section>
  );
}
