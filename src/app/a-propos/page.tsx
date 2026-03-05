"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Heart, Shield, Users, Award, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const values = [
  { icon: Shield, title: "Confiance", description: "Transparence et honnêteté dans chaque transaction." },
  { icon: Heart, title: "Engagement", description: "Un accompagnement personnalisé et dévoué à chaque client." },
  { icon: Award, title: "Excellence", description: "Des standards élevés pour un service irréprochable." },
  { icon: Users, title: "Proximité", description: "Une équipe à l'écoute, disponible et réactive." },
];

const team = [
  { name: "Idayath K.", role: "Fondatrice & Directrice", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" },
  { name: "Moussa D.", role: "Responsable Commercial", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
  { name: "Fatou B.", role: "Chargée de Formations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" },
  { name: "Kofi A.", role: "Expert Immobilier", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
          alt="Notre agence"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium mb-6"
          >
            À Propos de Nous
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Notre <span className="gradient-text">Histoire</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Depuis plus de 10 ans, Les Maisons Idayath accompagne ses clients dans leurs projets immobiliers avec passion et expertise.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                  alt="Notre bureau"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 p-4 sm:p-6 bg-gold rounded-2xl text-white shadow-xl hidden md:block">
                <div className="text-2xl sm:text-3xl font-bold">10+</div>
                <div className="text-xs sm:text-sm">Années d&apos;expérience</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle subtitle="Notre histoire" title="Une Agence Née de la Passion" centered={false} />
              <p className="text-gray leading-relaxed mb-6">
                Fondée avec la vision de révolutionner le secteur immobilier, Les Maisons Idayath est née de la passion
                d&apos;une équipe déterminée à offrir des services immobiliers d&apos;excellence. Nous croyons que chaque
                client mérite un accompagnement sur-mesure.
              </p>
              <p className="text-gray leading-relaxed mb-8">
                Au fil des années, nous avons élargi nos services pour couvrir tous les aspects de l&apos;immobilier :
                location, vente, formation, décoration d&apos;intérieur et même le déménagement. Cette approche globale
                fait notre force et notre différence.
              </p>
              <div className="space-y-3">
                {["Plus de 500 biens gérés avec succès", "Une équipe d'experts passionnés", "Un réseau de partenaires solide", "Des formations certifiantes reconnues"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-gold shrink-0" />
                    <span className="text-dark-soft">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl border border-gray-light/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-dark to-green-medium flex items-center justify-center mb-6">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Notre Mission</h3>
              <p className="text-gray leading-relaxed">
                Accompagner nos clients dans la réalisation de leurs projets immobiliers en offrant des services
                complets, professionnels et personnalisés. Nous nous engageons à créer de la valeur pour chaque
                personne qui nous fait confiance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-2xl border border-gray-light/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center mb-6">
                <Eye size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Notre Vision</h3>
              <p className="text-gray leading-relaxed">
                Devenir la référence incontournable de l&apos;immobilier en offrant une expérience client
                exceptionnelle et des solutions innovantes. Nous aspirons à transformer le paysage immobilier
                avec intégrité et excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Nos valeurs" title="Ce Qui Nous Guide" description="Des valeurs fortes au service de votre satisfaction." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-green-dark/5 flex items-center justify-center mb-6 group-hover:bg-green-dark group-hover:scale-110 transition-all duration-300">
                  <value.icon size={32} className="text-green-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{value.title}</h3>
                <p className="text-gray text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Notre équipe" title="Des Experts à Votre Service" description="Une équipe passionnée et expérimentée pour vous accompagner." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                  <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-dark">{member.name}</h3>
                <p className="text-gold text-sm font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à démarrer votre projet ?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Contactez-nous dès aujourd&apos;hui et découvrez comment nous pouvons vous aider.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-gold text-white rounded-full font-semibold hover:bg-gold-dark transition-all hover:shadow-lg hover:shadow-gold/25">
            Nous Contacter
          </Link>
        </div>
      </section>
    </>
  );
}
