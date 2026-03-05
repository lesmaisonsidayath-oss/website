"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Award, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getFormations, formatPrice } from "@/lib/api";
import type { ApiFormation } from "@/lib/api";

export default function FormationsPage() {
  const [formations, setFormations] = useState<ApiFormation[]>([]);

  useEffect(() => {
    getFormations().then(setFormations).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920" alt="Formations" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium mb-6">
            Formations Immobilières
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Développez vos <span className="gradient-text">Compétences</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Des formations professionnelles animées par des experts pour maîtriser tous les aspects de l&apos;immobilier.
          </motion.p>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 sm:py-20 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Users, title: "Experts du Secteur", desc: "Des formateurs avec plus de 10 ans d'expérience terrain." },
              { icon: Award, title: "Certification", desc: "Un certificat de formation reconnu à la fin de chaque session." },
              { icon: Clock, title: "Flexibilité", desc: "Formations en présentiel ou distanciel selon vos disponibilités." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 sm:p-8 bg-white rounded-2xl border border-gray-light/50">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-dark/10 flex items-center justify-center mb-4">
                  <item.icon size={28} className="text-green-dark" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Catalogue" title="Nos Formations" description="Choisissez la formation qui correspond à vos objectifs professionnels." />

          <div className="space-y-6 sm:space-y-8">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-light/50 hover:shadow-xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="relative h-56 sm:h-64 lg:h-auto">
                    <Image src={formation.image_url || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"} alt={formation.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-gold text-white text-xs font-semibold">{formation.level}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">{formation.title}</h3>
                    <p className="text-gray leading-relaxed mb-6 text-sm sm:text-base">{formation.description}</p>

                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-dark-soft">
                        <Clock size={16} className="text-gold shrink-0" /> {formation.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-dark-soft">
                        <Users size={16} className="text-gold shrink-0" /> {formation.format}
                      </div>
                      {formation.date && (
                        <div className="flex items-center gap-2 text-sm text-dark-soft">
                          <Calendar size={16} className="text-gold shrink-0" /> {new Date(formation.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      )}
                    </div>

                    {formation.topics.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-dark mb-3">Programme :</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {formation.topics.map((topic) => (
                            <div key={topic} className="flex items-center gap-2 text-sm text-gray">
                              <CheckCircle size={14} className="text-gold shrink-0" /> {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-light">
                      <div className="text-xl sm:text-2xl font-bold text-green-dark">{formatPrice(formation.price, 'vente')}</div>
                      <Link href="/contact" className="px-6 py-3 bg-gold text-white rounded-full font-semibold text-sm hover:bg-gold-dark transition-all inline-flex items-center gap-2">
                        S&apos;inscrire <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-green-dark">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">Besoin d&apos;une formation sur-mesure ?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Nous créons des programmes adaptés à vos besoins spécifiques. Contactez-nous pour en discuter.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-gold text-white rounded-full font-semibold hover:bg-gold-dark transition-all hover:shadow-lg hover:shadow-gold/25">
            Nous Contacter
          </Link>
        </div>
      </section>
    </>
  );
}
