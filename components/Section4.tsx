"use client";

const WORDS = [
  { text: "GRIT",         color: "#f0f0f0" },
  { text: "es",           color: "#f0f0f0" },
  { text: "innovación,",  color: "#00c853" },
  { text: "precisión",    color: "#00c853" },
  { text: "y",            color: "#f0f0f0" },
  { text: "resiliencia",  color: "#00c853" },
] as const;

const ORBS = [
  { w: 520, h: 420, top: "8%",  left: "-8%",  color: "rgba(0,200,83,0.10)", blur: 90 },
  { w: 380, h: 380, top: "55%", left: "65%",  color: "rgba(0,200,83,0.06)", blur: 80 },
  { w: 280, h: 280, top: "30%", left: "42%",  color: "rgba(0,200,83,0.05)", blur: 70 },
] as const;

export default function Section4() {
  return (
    <section
      id="innovacion"
      className="relative min-h-[88vh] flex items-center justify-center
                 overflow-hidden py-24 md:py-32"
      style={{ background: "#060806" }}
    >
      {/* ── Static background ── */}

      {/* Aurora mesh — static */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 20% 35%, rgba(0,200,83,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 55% 40% at 80% 65%, rgba(0,100,60,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 65% 20%, rgba(0,229,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 45% at 30% 80%, rgba(26,71,42,0.20)  0%, transparent 55%)
          `,
        }}
      />

      {/* Blur orbs — static */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width:      orb.w,
              height:     orb.h,
              top:        orb.top,
              left:       orb.left,
              background: orb.color,
              filter:     `blur(${orb.blur}px)`,
              opacity:    0.75,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(6,10,6,0.65) 100%)",
        }}
      />

      {/* Top / bottom dividers */}
      {["top-0", "bottom-0"].map((pos) => (
        <div
          key={pos}
          aria-hidden
          className={`absolute ${pos} left-0 right-0 h-px`}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,200,83,0.15) 40%, rgba(0,200,83,0.15) 60%, transparent)",
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 text-center">

        {/* Eyebrow */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="block w-10 h-px bg-accent opacity-60" />
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            Nuestra filosofía
          </span>
          <span className="block w-10 h-px bg-accent opacity-60" />
        </div>

        {/* Glow rule */}
        <div
          className="w-24 h-px mx-auto mb-10"
          style={{
            background: "linear-gradient(90deg, transparent, #00c853, transparent)",
            boxShadow:  "0 0 12px 2px rgba(0,200,83,0.4)",
          }}
        />

        {/* Headline */}
        <h2
          className="text-[clamp(2rem,8vw,6rem)] font-black leading-[1.1]
                     tracking-[-0.03em] mb-12"
        >
          {WORDS.map((w, i) => (
            <span key={i} style={{ color: w.color }}>
              {w.text}
              {i < WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        {/* Body */}
        <div className="max-w-xl mx-auto">
          <p className="text-base sm:text-lg text-[#8a9e8a] leading-[1.8] mb-3">
            Estamos comprometidos con la excelencia y con convertir cada
            desafío en una oportunidad de éxito.
          </p>
          <p className="text-base text-[#6a846a] leading-relaxed">
            Entregamos{" "}
            <span className="font-semibold text-accent">resultados medibles</span>
            .
          </p>
        </div>

        {/* Bottom dash row */}
        <div className="mt-16 flex items-center justify-center gap-3">
          {[20, 40, 80, 40, 20].map((w, i) => (
            <div
              key={i}
              className="h-px rounded-full"
              style={{
                width:     w,
                background:
                  i === 2
                    ? "#00c853"
                    : "rgba(0,200,83,0.2)",
                boxShadow: i === 2 ? "0 0 8px rgba(0,200,83,0.4)" : "none",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
