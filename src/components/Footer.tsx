"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { useContactSettings } from "@/providers/contact-provider";

export default function Footer() {
  const settings = useContactSettings();
  return (
    <footer className="bg-green-dark text-white">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-dark via-green-medium to-green-dark opacity-90" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Vous avez un projet immobilier ?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Que vous cherchiez à louer, acheter ou vendre, notre équipe est là pour vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-gold text-white rounded-full font-semibold hover:bg-gold-dark transition-all hover:shadow-lg hover:shadow-gold/25"
            >
              Nous Contacter
            </Link>
            <Link
              href="/partenaires"
              className="px-8 py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Devenir Partenaire
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 overflow-hidden rounded-lg shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Les Maisons Idayath"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg font-bold">
                    Les Maisons <span className="text-gold">Idayath</span>
                  </span>
                  <p className="text-xs text-white/50">Agence Immobilière</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Votre partenaire de confiance pour tous vos projets immobiliers. Location, vente, formation et bien plus encore.
              </p>
              <div className="flex gap-3">
                {settings?.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {settings?.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {settings?.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {!settings && (
                  <>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"><Facebook size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"><Instagram size={18} /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"><Linkedin size={18} /></a>
                  </>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gold">Liens Rapides</h3>
              <ul className="space-y-3">
                {[
                  { href: "/biens?type=location", label: "Location" },
                  { href: "/biens?type=vente", label: "Vente" },
                  { href: "/formations", label: "Formations" },
                  { href: "/services", label: "Nos Services" },
                  { href: "/blog", label: "Blog" },
                  { href: "/partenaires", label: "Espace Partenaires" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gold">Nos Services</h3>
              <ul className="space-y-3">
                {[
                  "Location d'Appartements",
                  "Vente d'Appartements",
                  "Vente de Terrains",
                  "Formations Immobilières",
                  "Ameublement & Décoration",
                  "Services de Déménagement",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-white/60 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gold">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">
                    {settings ? `${settings.address}, ${settings.city}` : "Abidjan, Côte d'Ivoire"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">{settings?.phone || '+225 00 00 000 000'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">{settings?.email || 'contact@maisonsidayath.ci'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">
                    {settings ? (<>{settings.hours_weekday && <span>{settings.hours_weekday}</span>}{settings.hours_weekday && settings.hours_weekend && <br />}{settings.hours_weekend && <span>{settings.hours_weekend}</span>}</>) : (<>Lun - Ven : 8h - 18h<br />Sam : 9h - 13h</>)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            &copy; 2026 Les Maisons Idayath. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white/70 transition-colors">
              Mentions Légales
            </Link>
            <Link href="#" className="hover:text-white/70 transition-colors">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
