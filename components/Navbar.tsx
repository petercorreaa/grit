"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(Link);

const NAV_LINKS = [
  { label: "Inicio",    href: "/",          route: true  },
  { label: "Servicios", href: "/servicios", route: true  },
  { label: "Equipo",    href: "/equipo",    route: true  },
];

// Stagger children of the desktop nav
const navContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const navLinkVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

// Mobile drawer
const drawerVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" as const } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={shouldReduce ? false : { y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 bg-[#0b0f0b] transition-[border-color,box-shadow,padding] duration-400 ${
          scrolled
            ? "border-b border-[rgba(0,200,83,0.14)] shadow-[0_4px_32px_rgba(0,0,0,0.45)] py-4"
            : "border-b border-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link
            href="/"
            onClick={() => setActive("/")}
            className="flex items-center flex-shrink-0"
            aria-label="GRIT Capital Group — inicio"
          >
            <Image
              src="/images/logo-blanco.png"
              alt="GRIT Capital Group"
              width={130}
              height={60}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* ── Desktop nav ── */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              const sharedClass = `relative text-base font-semibold uppercase tracking-[0.12em] transition-colors duration-200 py-1 ${
                isActive ? "text-[#f0f0f0]" : "text-[#8a9e8a] hover:text-[#f0f0f0]"
              }`;
              const indicator = isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-[#00c853]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              );
              return link.route ? (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  variants={navLinkVariants}
                  onClick={() => setActive(link.href)}
                  className={sharedClass}
                >
                  {link.label}
                  {indicator}
                </MotionLink>
              ) : (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={navLinkVariants}
                  onClick={() => setActive(link.href)}
                  className={sharedClass}
                >
                  {link.label}
                  {indicator}
                </motion.a>
              );
            })}
          </motion.nav>

          {/* ── Desktop CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            className="hidden md:flex items-center gap-3"
          >
            {/* Ghost */}
            <a
              href="#contacto"
              className="px-5 py-2.5 text-base font-semibold uppercase tracking-[0.1em] text-[#8a9e8a] border border-[rgba(0,200,83,0.22)] rounded-lg hover:text-[#f0f0f0] hover:border-[rgba(0,200,83,0.45)] transition-all duration-200"
            >
              Ingresar
            </a>
            {/* Solid gradient CTA */}
            <Link
              href="/apertura-de-cuenta"
              className="relative px-6 py-2.5 text-base font-bold uppercase tracking-[0.1em] text-[#0a0f0a] rounded-lg overflow-hidden group"
              style={{
                background: "#00c853",
              }}
            >
              {/* Hover sheen */}
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative">Abrir Cuenta</span>
            </Link>
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="md:hidden relative w-11 h-11 flex items-center justify-center text-[#f0f0f0] flex-shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed top-0 left-0 right-0 z-40 pt-[97px] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#0b0f0b]"
              onClick={() => setOpen(false)}
            />

            {/* Drawer body */}
            <div className="relative px-6 pt-8 pb-10 flex flex-col border-b border-[rgba(0,200,83,0.14)]">
              {/* Nav links */}
              <nav className="flex flex-col gap-1 mb-8" aria-label="Navegación móvil">
                {NAV_LINKS.map((link, i) => {
                  const mobileInner = (
                    <>
                      <span className="text-lg font-semibold uppercase tracking-[0.12em] text-[#f0f0f0] group-hover:text-accent transition-colors duration-200">
                        {link.label}
                      </span>
                      <span className="text-[#8a9e8a] group-hover:text-accent transition-colors duration-200 text-base">→</span>
                    </>
                  );
                  const mobileClass = "flex items-center justify-between py-4 border-b border-[rgba(0,200,83,0.07)] group";
                  const mobileMotion = {
                    initial:    { opacity: 0, x: -12 },
                    animate:    { opacity: 1, x: 0 },
                    transition: { delay: i * 0.06 + 0.08, duration: 0.3, ease: "easeOut" as const },
                  };
                  return link.route ? (
                    <MotionLink
                      key={link.href}
                      href={link.href}
                      {...mobileMotion}
                      onClick={() => { setActive(link.href); setOpen(false); }}
                      className={mobileClass}
                    >
                      {mobileInner}
                    </MotionLink>
                  ) : (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      {...mobileMotion}
                      onClick={() => { setActive(link.href); setOpen(false); }}
                      className={mobileClass}
                    >
                      {mobileInner}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.08, duration: 0.3, ease: "easeOut" as const }}
                className="flex flex-col gap-3"
              >
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="w-full text-center py-3.5 text-base font-semibold uppercase tracking-[0.1em] text-[#8a9e8a] border border-[rgba(0,200,83,0.22)] rounded-lg hover:text-[#f0f0f0] hover:border-[rgba(0,200,83,0.45)] transition-all duration-200"
                >
                  Ingresar
                </a>
                <Link
                  href="/apertura-de-cuenta"
                  onClick={() => setOpen(false)}
                  className="w-full text-center py-3.5 text-base font-bold uppercase tracking-[0.1em] text-[#0a0f0a] rounded-lg"
                  style={{
                    background: "#00c853",
                  }}
                >
                  Abrir Cuenta
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
