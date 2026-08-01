"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, Users } from "lucide-react";

// ─── Count-up hook ───────────────────────────────────────────────────────────

function useCountUp(target: number, durationMs = 1800, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    setValue(0);
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, active]);

  return value;
}

// ─── Stats config ────────────────────────────────────────────────────────────

const STATS = [
  {
    icon: Clock,
    prefix: "",
    value: 15,
    suffix: "+",
    unit: "años",
    label: "de experiencia",
  },
  {
    icon: TrendingUp,
    prefix: "$",
    value: 500,
    suffix: "M+",
    unit: "",
    label: "gestionados",
  },
  {
    icon: Users,
    prefix: "",
    value: 200,
    suffix: "+",
    unit: "",
    label: "clientes",
  },
] as const;

// ─── Animation variants ──────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// ─── Geometric graphic ───────────────────────────────────────────────────────

function GeometricGraphic() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[420px]">

      {/* Radial green glow behind everything */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,200,83,0.13) 0%, transparent 70%)",
        }}
      />

      {/* Outer slow-spin ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] rounded-full"
        style={{
          border: "1px solid rgba(0,200,83,0.10)",
        }}
      />

      {/* Mid ring — counter-rotate */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[260px] h-[260px] rounded-full"
        style={{
          border: "1px dashed rgba(0,200,83,0.14)",
        }}
      >
        {/* Orbital dot */}
        <span
          className="absolute -top-1.5 left-1/2 -translate-x-1/2
                     w-3 h-3 rounded-full bg-accent"
          style={{ boxShadow: "0 0 10px 3px rgba(0,200,83,0.5)" }}
        />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[175px] h-[175px] rounded-full"
        style={{ border: "1px solid rgba(0,200,83,0.18)" }}
      >
        {/* Orbital dot */}
        <span
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2
                     w-2 h-2 rounded-full"
          style={{
            background: "rgba(212,175,55,0.85)",
            boxShadow: "0 0 8px 2px rgba(212,175,55,0.45)",
          }}
        />
      </motion.div>

      {/* Central polyhedron — CSS hexagon via clip-path */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="relative z-10 w-[88px] h-[88px] flex items-center justify-center"
        style={{
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          background: "linear-gradient(135deg, rgba(0,200,83,0.25) 0%, rgba(26,71,42,0.6) 100%)",
          border: "1px solid rgba(0,200,83,0.3)",
        }}
      >
        <span className="font-black text-xl tracking-tighter text-accent">
          G
        </span>
      </motion.div>

      {/* Corner accent diamonds */}
      {[
        { top: "14%", left: "12%",  size: 9,  delay: 0    },
        { top: "18%", right: "14%", size: 7,  delay: 0.6  },
        { bottom: "16%", left: "18%",  size: 6,  delay: 1.2  },
        { bottom: "12%", right: "10%", size: 10, delay: 0.9  },
        { top: "48%", left: "5%",   size: 5,  delay: 1.5  },
        { top: "55%", right: "6%",  size: 5,  delay: 0.3  },
      ].map((dot, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2.8 + i * 0.4,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-lg"
          style={{
            top: "top" in dot ? dot.top : undefined,
            bottom: "bottom" in dot ? dot.bottom : undefined,
            left: "left" in dot ? dot.left : undefined,
            right: "right" in dot ? dot.right : undefined,
            width:  dot.size,
            height: dot.size,
            background: i % 3 === 0
              ? "rgba(212,175,55,0.7)"
              : "rgba(0,200,83,0.55)",
            transform: "rotate(45deg)",
          }}
        />
      ))}

      {/* Floating stat chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[8%] glass neon-border rounded-lg px-3 py-2 z-20"
      >
        <p className="text-sm text-[#8a9e8a] uppercase tracking-wider">Rendimiento</p>
        <p className="text-base font-black text-accent">+18.4%</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute bottom-[14%] left-[6%] glass neon-border rounded-lg px-3 py-2 z-20"
      >
        <p className="text-sm text-[#8a9e8a] uppercase tracking-wider">Cartera activa</p>
        <p className="text-base font-black text-[#f0f0f0]">$500M+</p>
      </motion.div>

    </div>
  );
}

// ─── Stat counter card ───────────────────────────────────────────────────────

function StatItem({
  icon: Icon,
  prefix,
  value,
  suffix,
  unit,
  label,
  active,
}: {
  icon: typeof Clock;
  prefix: string;
  value: number;
  suffix: string;
  unit: string;
  label: string;
  active: boolean;
}) {
  const count = useCountUp(value, 1600, active);

  return (
    <motion.div
      variants={slideUp}
      className="flex flex-col items-center sm:items-start gap-1 px-6 py-5
                 first:pl-0 sm:first:pl-6
                 border-r border-[rgba(0,200,83,0.10)] last:border-0"
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-accent flex-shrink-0" />
        <span className="text-sm uppercase tracking-[0.15em] text-[#8a9e8a] font-semibold">
          {label}
        </span>
      </div>
      <div className="text-3xl sm:text-4xl font-black tabular-nums leading-none text-[#f0f0f0]">
        <span className="text-[#8a9e8a] text-2xl">{prefix}</span>
        {active ? count.toLocaleString("es-AR") : "0"}
        <span className="text-accent text-3xl">{suffix}</span>
        {unit && (
          <span className="text-lg text-[#8a9e8a] font-normal ml-1">{unit}</span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section1 ────────────────────────────────────────────────────────────────

export default function Section1() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const statsInView   = useInView(statsRef,   { once: true, margin: "-60px" });

  return (
    <section
      id="equipo"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0b0f0b" }}
    >
      {/* Section top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,200,83,0.18) 40%, rgba(0,200,83,0.18) 60%, transparent 100%)",
        }}
      />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,200,83,0.18) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6">

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={sectionInView ? "show" : "hidden"}
          >
            {/* Eyebrow */}
            <motion.div variants={slideUp} className="mb-6">
              <span
                className="inline-flex items-center gap-2 text-sm font-bold
                           uppercase tracking-[0.2em] text-accent"
              >
                <span className="block w-6 h-px bg-accent" />
                EN GRIT
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={slideUp}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.06]
                         tracking-[-0.02em] mb-7"
            >
              <span className="text-[#f0f0f0]">
                Entendemos que cada
                <br />
                cliente es{" "}
              </span>
              <span className="text-accent">ÚNICO</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={slideUp}
              className="text-[#8a9e8a] leading-[1.8] text-[0.9375rem] mb-8 max-w-[520px]"
            >
              Por eso, nos adaptamos a sus necesidades y objetivos específicos
              para generar valor real y ofrecer soluciones financieras
              personalizadas. Nuestra visión está centrada en maximizar el
              rendimiento de nuestros clientes a través de un enfoque
              estratégico, con{" "}
              <span className="text-[#c8d8c8] font-medium">
                determinación, experiencia y ejecución
              </span>
              .
            </motion.p>

            {/* CTA link */}
            <motion.div variants={slideUp}>
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 text-base font-semibold
                           text-accent hover:text-[#69f0ae] transition-colors duration-200"
              >
                Descubre como podemos ayudarte
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — geometric graphic */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={sectionInView ? "show" : "hidden"}
            className="hidden lg:flex items-center justify-center"
          >
            <GeometricGraphic />
          </motion.div>
        </div>

        {/* ── Stats glass card ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="mt-16 md:mt-20"
        >
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(0,200,83,0.13)",
              boxShadow:
                "0 0 0 1px rgba(0,200,83,0.04), 0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00c853, transparent)",
                opacity: 0.6,
              }}
            />

            <motion.div
              variants={container}
              initial="hidden"
              animate={statsInView ? "show" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0
                         divide-[rgba(0,200,83,0.08)]"
            >
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  {...stat}
                  active={statsInView}
                />
              ))}
            </motion.div>

            {/* Bottom-right glow */}
            <div
              className="absolute bottom-0 right-0 w-48 h-24 pointer-pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 100% 100%, rgba(0,200,83,0.08) 0%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>

      </div>

      {/* Section bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,200,83,0.10) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
