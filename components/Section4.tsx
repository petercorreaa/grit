"use client";

const LINES = [
  {
    pre:  "GRIT es ",
    word: "innovación,",
    gradient: "linear-gradient(100deg, #00c853 0%, #69f0ae 55%, #b9f6ca 100%)",
  },
  {
    pre:  "",
    word: "precisión",
    gradient: "linear-gradient(100deg, #00e5ff 0%, #69f0ae 45%, #e0fff0 100%)",
  },
  {
    pre:  "y ",
    word: "resiliencia",
    gradient: "linear-gradient(100deg, #d4af37 0%, #a5d631 50%, #69f0ae 100%)",
  },
] as const;

const ORBS = [
  { w: 520, h: 420, top: "8%",  left: "-8%",  color: "rgba(0,200,83,0.13)",   blur: 90 },
  { w: 380, h: 380, top: "55%", left: "65%",  color: "rgba(0,229,255,0.08)",  blur: 80 },
  { w: 280, h: 280, top: "30%", left: "42%",  color: "rgba(0,200,83,0.07)",   blur: 70 },
  { w: 200, h: 200, top: "70%", left: "10%",  color: "rgba(212,175,55,0.06)", blur: 60 },
  { w: 160, h: 160, top: "5%",  left: "75%",  color: "rgba(0,200,83,0.09)",   blur: 50 },
] as const;

export default function Section4() {
  return (
    <section
      id="innovacion"
      className="relative min-h-[88vh] flex items-center justify-center
                 overflow-hidden py-24 md:py-32"
      style={{ background: "#060a06" }}
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
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">

        {/* Eyebrow */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="block w-10 h-px bg-accent opacity-60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Nuestra filosofía
          </span>
          <span className="block w-10 h-px bg-accent opacity-60" />
        </div>

        {/* Glow rule */}
        <div
          className="w-24 h-px mx-auto mb-10"
          style={{
            background: "linear-gradient(90deg, transparent, #00c853, #69f0ae, transparent)",
            boxShadow:  "0 0 12px 2px rgba(0,200,83,0.4)",
          }}
        />

        {/* Headline */}
        <h2
          className="text-[clamp(2.8rem,7.5vw,6rem)] font-black leading-[1.05]
                     tracking-[-0.03em] mb-12"
        >
          {LINES.map((line, i) => (
            <span key={i} className="block">
              {line.pre && <span className="text-[#f0f0f0]">{line.pre}</span>}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: line.gradient }}
              >
                {line.word}
              </span>
            </span>
          ))}
        </h2>

        {/* Body */}
        <div className="max-w-xl mx-auto">
          <p className="text-base sm:text-lg text-[#8a9e8a] leading-[1.8] mb-3">
            Estamos comprometidos con la excelencia y con convertir cada
            desafío en una oportunidad de éxito.
          </p>
          <p className="text-sm text-[#6a846a] leading-relaxed">
            Entregamos{" "}
            <span
              className="font-semibold bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #00c853, #69f0ae)" }}
            >
              resultados medibles
            </span>
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
                    ? "linear-gradient(90deg, #00c853, #69f0ae)"
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
