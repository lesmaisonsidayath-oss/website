"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Upload, Shield, TrendingUp, Handshake, Building, Users, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export default function PartenairesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920" alt="Espace partenaires" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium mb-6">
            Espace Partenaires
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Devenez <span className="gradient-text">Partenaire</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Propriétaires et agences, rejoignez notre réseau et bénéficiez de notre expertise pour valoriser vos biens.
          </motion.p>
        </div>
      </section>

      {/* For Owners */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle subtitle="Propriétaires" title="Confiez-nous Votre Bien" centered={false} />
              <p className="text-gray leading-relaxed mb-6">
                Vous souhaitez mettre votre bien en location ou en vente ? Nous nous occupons de tout : estimation,
                commercialisation, visites, et gestion. Profitez de notre réseau et de notre expertise pour maximiser
                la valeur de votre patrimoine.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: TrendingUp, text: "Estimation gratuite et précise de votre bien" },
                  { icon: Shield, text: "Sécurisation juridique de chaque transaction" },
                  { icon: Upload, text: "Diffusion multicanale pour une visibilité maximale" },
                  { icon: Handshake, text: "Un interlocuteur unique dédié à votre dossier" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-gold" />
                    </div>
                    <span className="text-dark-soft pt-2 text-sm sm:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-full font-semibold text-sm hover:bg-gold-dark transition-all">
                Déposer mon bien <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* Owner form */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-light shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-6">Formulaire de dépôt de bien</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nom complet" className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                    <input type="tel" placeholder="Téléphone" className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                  </div>
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all">
                      <option>Type de bien</option>
                      <option>Appartement</option>
                      <option>Villa</option>
                      <option>Terrain</option>
                      <option>Studio</option>
                    </select>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all">
                      <option>Transaction</option>
                      <option>Location</option>
                      <option>Vente</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Localisation du bien" className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Surface (m²)" className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                    <input type="text" placeholder="Prix souhaité" className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                  </div>
                  <textarea placeholder="Description du bien..." rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none" />
                  <button className="w-full py-3 bg-green-dark text-white rounded-xl font-semibold hover:bg-green-medium transition-all">
                    Soumettre mon bien
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Agencies */}
      <section className="py-16 sm:py-20 lg:py-24 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Agences partenaires" title="Rejoignez Notre Réseau" description="Développez votre activité grâce à un partenariat gagnant-gagnant." />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { icon: Building, title: "Catalogue Partagé", desc: "Accédez à un catalogue élargi de biens pour vos clients et partagez les vôtres." },
              { icon: Users, title: "Réseau Étendu", desc: "Bénéficiez d'un réseau de partenaires pour multiplier vos opportunités." },
              { icon: Handshake, title: "Commissions Attractives", desc: "Un système de commissionnement transparent et avantageux pour tous." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-light/50 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-dark/10 flex items-center justify-center mb-4">
                  <item.icon size={28} className="text-green-dark" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-green-dark text-white rounded-full font-semibold hover:bg-green-medium transition-all">
              Devenir Partenaire <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
