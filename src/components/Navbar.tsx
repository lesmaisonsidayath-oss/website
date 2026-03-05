"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  submenu?: { href: string; label: string }[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À Propos" },
  {
    href: "/services",
    label: "Nos Services",
    /*submenu: [
      { href: "/biens?type=location", label: "Location d'Appartements" },
      { href: "/biens?type=vente&cat=appartement", label: "Vente d'Appartements" },
      { href: "/biens?type=vente&cat=terrain", label: "Vente de Terrains" },
      { href: "/formations", label: "Formations Immobilières" },
      { href: "/services#decoration", label: "Ameublement & Décoration" },
      { href: "/services#demenagement", label: "Services de Déménagement" },
    ],*/
  },
  { href: "/biens", label: "Biens Immobiliers" },
  //{ href: "/formations", label: "Formations" },
  { href: "/partenaires", label: "Partenaires" },
  //{ href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileSubmenuKey, setMobileSubmenuKey] = useState<string | null>(null);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ===== TOP BAR ===== */}
      <div
        className={`transition-all duration-500 border-b border-white/10 ${
          scrolled ? "max-h-0 opacity-0 overflow-hidden" : "max-h-10 opacity-100"
        }`}
      >
        <div className="bg-green-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end gap-6 h-9 text-xs">
              <a
                href="tel:+22500000000"
                className="flex items-center gap-1.5 text-white/70 hover:text-gold transition-colors"
              >
                <Phone size={12} />
                <span>+225 00 00 000 000</span>
              </a>
              <a
                href="mailto:contact@maisonsidayath.ci"
                className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-gold transition-colors"
              >
                <Mail size={12} />
                <span>contact@maisonsidayath.ci</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAV ===== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 xl:h-[76px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10 xl:w-11 xl:h-11 overflow-hidden rounded-xl shrink-0 bg-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Les Maisons Idayath"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className={`hidden sm:inline text-base xl:text-lg font-bold transition-colors whitespace-nowrap ${
                  scrolled ? "text-green-dark" : "text-white"
                }`} style={{textTransform: "uppercase"}}
              >
                Les Maisons <span className="text-gold">Idayath</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center">
              <nav className="flex items-center" role="navigation">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <div
                      key={link.href}
                      className="relative mx-[10px]"
                      onMouseEnter={() => link.submenu && setActiveSubmenu(link.href)}
                      onMouseLeave={() => setActiveSubmenu(null)}
                      onFocus={() => link.submenu && setActiveSubmenu(link.href)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setActiveSubmenu(null);
                      }}
                    >
                      <Link
                        href={link.href}
                        className={[
                          "px-[10px] py-[10px] rounded-xl text-xs font-semibold uppercase tracking-[1.5px] transition-all duration-200",
                          "flex items-center gap-1.5 whitespace-nowrap",
                          active
                            ? "text-gold"
                            : scrolled
                              ? "text-dark-soft hover:text-green-dark"
                              : "text-white/85 hover:text-white",
                          scrolled ? "hover:bg-black/5" : "hover:bg-white/10",
                        ].join(" ")}
                        style={{padding:"10px", margin:"5px"}}
                        aria-current={active ? "page" : undefined}
                        {...(link.submenu && {
                          "aria-haspopup": "true" as const,
                          "aria-expanded": activeSubmenu === link.href,
                        })}
                      >
                        {link.label}
                        {link.submenu && (
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              activeSubmenu === link.href ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {/* Dropdown submenu */}
                      <AnimatePresence>
                        {link.submenu && activeSubmenu === link.href && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.16 }}
                            className="absolute left-0 top-full pt-3 z-50"
  
                          >
                            <div
                              className="w-[320px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
                              role="menu"
                              style={{padding: "20px"}}
                            >
                              <div className="px-4 py-3 border-b border-gray-light">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                  {link.label}
                                </p>
                              </div>

                              <div className="py-2">
                                {link.submenu.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    role="menuitem"
                                    className="group flex items-start gap-3 px-4 py-3 text-sm text-dark-soft hover:bg-green-dark hover:text-white transition-all"
                                  >
                                    <span className="h-2 w-2 mt-2 rounded-full bg-gold/70 group-hover:bg-white/80" />
                                    <span className="leading-snug">{sub.label}</span>
                                  </Link>
                                ))}
                              </div>

                              <div className="px-4 py-3 border-t border-gray-light bg-gray-50">
                                <Link
                                  href={link.href}
                                  className="text-sm font-semibold text-green-dark hover:text-gold transition-colors"
                                >
                                  Voir tous les services →
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Right side: CTA + Mobile burger */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="hidden xl:inline-flex px-5 py-2.5 bg-gold text-white rounded-full text-sm font-semibold hover:bg-gold-dark transition-all duration-200" 
                style={{padding:"10px 20px", margin:"5px"}}
              >
                Nous Contacter
              </Link>

              <button
                onClick={() => setIsOpen((v) => !v)}
                className={`xl:hidden p-2 rounded-xl transition-colors ${
                  scrolled ? "text-green-dark hover:bg-black/5" : "text-white hover:bg-white/10"
                }`}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ===== MOBILE / TABLET MENU ===== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              id="mobile-menu"
              className="xl:hidden bg-white border-t border-gray-light overflow-hidden"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  const isSubOpen = mobileSubmenuKey === link.href;

                  return (
                    <div key={link.href}>
                      {link.submenu ? (
                        <>
                          <button
                            onClick={() =>
                              setMobileSubmenuKey((prev) => (prev === link.href ? null : link.href))
                            }
                            className={[
                              "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all font-semibold text-sm",
                              active ? "text-gold bg-gold/10" : "text-dark-soft hover:bg-black/5",
                            ].join(" ")}
                            aria-expanded={isSubOpen}
                          >
                            {link.label}
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`}
                            />
                          </button>

                          <AnimatePresence>
                            {isSubOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18 }}
                                className="ml-2 mt-1 overflow-hidden"
                              >
                                <div className="rounded-xl border border-gray-light bg-gray-50 p-2 space-y-1">
                                  <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-sm font-semibold text-green-dark hover:bg-white transition"
                                  >
                                    Tous les services
                                  </Link>

                                  {link.submenu.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => setIsOpen(false)}
                                      className="block px-3 py-2 rounded-lg text-sm text-dark-soft hover:bg-white hover:text-green-dark transition"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={[
                            "block px-4 py-3 rounded-xl transition-all font-semibold text-sm",
                            active ? "text-gold bg-gold/10" : "text-dark-soft hover:bg-black/5",
                          ].join(" ")}
                          aria-current={active ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-gray-light mt-2">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-6 py-3 bg-gold text-white rounded-full font-semibold text-sm hover:bg-gold-dark transition" 
                  >
                    Nous Contacter
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}