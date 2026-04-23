"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Clock } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ClientType  = "cliente"  | "no-cliente";
type ProfileType = "corporativo" | "individuo" | "institucional";

interface FormState {
  clientType:  ClientType;
  profileType: ProfileType;
  nombre:      string;
  email:       string;
  mensaje:     string;
}

interface FormErrors {
  nombre?:  string;
  email?:   string;
  mensaje?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  { icon: Mail,   label: "Email",     value: "info@gritcg.com"              },
  { icon: Phone,  label: "Teléfono",  value: "+54 11 4000-0000"             },
  { icon: MapPin, label: "Dirección", value: "Av. del Libertador 1234, CABA"},
  { icon: Clock,  label: "Horario",   value: "Lun–Vie 9:00–18:00 ART"      },
] as const;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.nombre.trim())
    errors.nombre = "El nombre es requerido.";
  if (!form.email.trim())
    errors.email = "El email es requerido.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Ingresá un email válido.";
  if (!form.mensaje.trim())
    errors.mensaje = "El mensaje es requerido.";
  else if (form.mensaje.trim().length < 10)
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  return errors;
}

// ─── Pill toggle ──────────────────────────────────────────────────────────────

function PillGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="relative px-4 py-1.5 rounded-full text-xs font-semibold
                       tracking-wide transition-all duration-200 overflow-hidden"
            style={{
              border: selected
                ? "1px solid rgba(0,200,83,0.5)"
                : "1px solid rgba(0,200,83,0.18)",
              color: selected ? "#0a0f0a" : "#8a9e8a",
            }}
          >
            {/* Animated gradient fill */}
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                opacity: selected ? 1 : 0,
                scale:   selected ? 1 : 0.85,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                background: "linear-gradient(135deg, #00c853 0%, #69f0ae 100%)",
              }}
            />
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Field wrapper with animated error ───────────────────────────────────────

function Field({
  label,
  error,
  touched,
  children,
}: {
  label: string;
  error?: string;
  touched: boolean;
  children: React.ReactNode;
}) {
  const hasError = touched && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a9e8a]">
        {label}
        {hasError && (
          <span className="ml-1 text-[#f44336] normal-case tracking-normal font-normal text-[10px]">
            — {error}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Shared input classes ─────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return [
    "w-full bg-[rgba(255,255,255,0.03)] rounded-sm px-4 py-3",
    "text-sm text-[#f0f0f0] placeholder:text-[#8a9e8a]/40",
    "outline-none transition-all duration-200",
    hasError
      ? "border border-[rgba(244,67,54,0.45)] focus:border-[rgba(244,67,54,0.7)]"
      : "border border-[rgba(0,200,83,0.12)] focus:border-[rgba(0,200,83,0.45)] focus:shadow-[0_0_0_3px_rgba(0,200,83,0.08)]",
  ].join(" ");
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessPanel({ firstName }: { firstName: string }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease }}
      className="flex flex-col items-center justify-center text-center
                 gap-5 min-h-[480px] px-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
      >
        <CheckCircle2 size={56} className="text-accent" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-[#f0f0f0] mb-2">
          ¡Mensaje recibido{firstName ? `, ${firstName}` : ""}!
        </h3>
        <p className="text-sm text-[#8a9e8a] leading-relaxed max-w-[280px] mx-auto">
          Un asesor de GRIT te contactará en las próximas 24 horas hábiles.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const slideUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const leftCol: Variants = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

// ─── ContactForm ──────────────────────────────────────────────────────────────

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormState>({
    clientType:  "no-cliente",
    profileType: "individuo",
    nombre:      "",
    email:       "",
    mensaje:     "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);

  function touch(field: keyof FormState) {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate({ ...form });
    setErrors(errs);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const next = { ...form, [e.target.id]: e.target.value };
    setForm(next);
    if (touched[e.target.id as keyof FormState]) {
      setErrors(validate(next));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Touch all validated fields
    setTouched({ nombre: true, email: true, mensaje: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  }

  const firstName = form.nombre.trim().split(" ")[0] ?? "";

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#080d08" }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2
                   w-[600px] h-[320px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,200,83,0.10) 0%, transparent 70%)",
          filter: "blur(50px)",
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
              "linear-gradient(90deg, transparent, rgba(0,200,83,0.13) 40%, rgba(0,200,83,0.13) 60%, transparent)",
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left column ── */}
          <motion.div
            variants={leftCol}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="lg:pt-2"
          >
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold
                         uppercase tracking-[0.2em] text-accent mb-6 block"
            >
              <span className="block w-6 h-px bg-accent" />
              Contacto
            </span>

            {/* Headline */}
            <h2
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.05]
                         tracking-[-0.025em] mb-5"
            >
              <span className="text-[#f0f0f0]">Contac</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, #00c853 0%, #69f0ae 55%, #f0f0f0 100%)",
                }}
              >
                tanos
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-[0.9375rem] text-[#8a9e8a] leading-[1.78] mb-10 max-w-[400px]">
              ¿Tenés preguntas, sugerencias o querés saber más sobre nuestros
              servicios?{" "}
              <span className="text-[#c8d8c8]">Estamos para ayudarte.</span>
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background: "rgba(0,200,83,0.08)",
                      border: "1px solid rgba(0,200,83,0.14)",
                    }}
                  >
                    <Icon size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a9e8a] mb-0.5 font-semibold">
                      {label}
                    </p>
                    <p className="text-sm text-[#f0f0f0]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column — form card ── */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.024)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,200,83,0.11)",
                boxShadow:
                  "0 0 0 1px rgba(0,200,83,0.04), 0 24px 64px rgba(0,0,0,0.45)",
              }}
            >
              {/* Top accent bar */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #00c853 30%, #69f0ae 70%, transparent 100%)",
                  opacity: 0.55,
                }}
              />

              <AnimatePresence mode="wait">
                {sent ? (
                  <SuccessPanel key="success" firstName={firstName} />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-7 sm:p-8 space-y-6"
                    noValidate
                  >

                    {/* Radio group 1 — client type */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a9e8a]">
                        ¿Sos cliente?
                      </p>
                      <PillGroup<ClientType>
                        value={form.clientType}
                        onChange={(v) => setForm((f) => ({ ...f, clientType: v }))}
                        options={[
                          { value: "cliente",    label: "Soy cliente"       },
                          { value: "no-cliente", label: "Aún no soy cliente"},
                        ]}
                      />
                    </div>

                    {/* Radio group 2 — profile type */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a9e8a]">
                        Perfil
                      </p>
                      <PillGroup<ProfileType>
                        value={form.profileType}
                        onChange={(v) => setForm((f) => ({ ...f, profileType: v }))}
                        options={[
                          { value: "corporativo",   label: "Corporativo"   },
                          { value: "individuo",     label: "Individuo"     },
                          { value: "institucional", label: "Institucional" },
                        ]}
                      />
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px"
                      style={{ background: "rgba(0,200,83,0.08)" }}
                    />

                    {/* Nombre */}
                    <Field
                      label="Nombre"
                      error={errors.nombre}
                      touched={!!touched.nombre}
                    >
                      <input
                        id="nombre"
                        type="text"
                        placeholder="Juan Pérez"
                        value={form.nombre}
                        onChange={handleChange}
                        onBlur={() => touch("nombre")}
                        className={inputClass(!!touched.nombre && !!errors.nombre)}
                      />
                    </Field>

                    {/* Email */}
                    <Field
                      label="Email"
                      error={errors.email}
                      touched={!!touched.email}
                    >
                      <input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={() => touch("email")}
                        className={inputClass(!!touched.email && !!errors.email)}
                      />
                    </Field>

                    {/* Mensaje */}
                    <Field
                      label="Mensaje"
                      error={errors.mensaje}
                      touched={!!touched.mensaje}
                    >
                      <textarea
                        id="mensaje"
                        rows={4}
                        placeholder="Contanos sobre tus objetivos de inversión…"
                        value={form.mensaje}
                        onChange={handleChange}
                        onBlur={() => touch("mensaje")}
                        className={`${inputClass(!!touched.mensaje && !!errors.mensaje)} resize-none`}
                      />
                    </Field>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={loading ? {} : { scale: 1.02, boxShadow: "0 0 28px rgba(0,200,83,0.35)" }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="relative w-full flex items-center justify-center gap-2.5
                                 py-3.5 rounded-sm text-sm font-bold tracking-wide
                                 text-[#0a0f0a] overflow-hidden
                                 disabled:opacity-55 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #00c853 0%, #69f0ae 100%)",
                      }}
                    >
                      {/* Hover sheen */}
                      <motion.span
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{ background: "rgba(255,255,255,0.10)" }}
                      />

                      {loading ? (
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-[#0a0f0a] border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <span className="relative">Enviar</span>
                          <ArrowRight size={15} className="relative" />
                        </>
                      )}
                    </motion.button>

                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
