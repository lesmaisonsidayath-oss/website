"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Key, Building, MapPin, GraduationCap, Paintbrush, Truck, ArrowRight, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const services = [
  {
    id: "location",
    icon: Key,
    title: "Location d'Appartements",
    description: "Nous disposons d'un large catalogue de biens en location pour répondre à tous les budgets et besoins. Du studio au grand appartement familial, trouvez votre futur chez-vous.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    features: ["Catalogue varié et actualisé", "Visites organisées rapidement", "Accompagnement juridique", "Suivi post-location"],
    href: "/biens?type=location",
  },
  {
    id: "vente-appart",
    icon: Building,
    title: "Vente d'Appartements",
    description: "Investissez en toute sérénité avec notre sélection d'appartements à vendre. Nous vous accompagnons de la recherche jusqu'à la signature de l'acte de vente.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    features: ["Évaluation précise des biens", "Négociation professionnelle", "Vérification juridique complète", "Accompagnement notarial"],
    href: "/biens?type=vente&cat=appartement",
  },
  {
    id: "vente-terrain",
    icon: MapPin,
    title: "Vente de Terrains",
    description: "Trouvez le terrain idéal pour votre projet de construction. Nous proposons des terrains viabilisés dans des zones stratégiques avec tous les documents en règle.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    features: ["Terrains viabilisés", "Documents vérifiés (ACD, Permis)", "Emplacements stratégiques", "Conseil en investissement"],
    href: "/biens?type=vente&cat=terrain",
  },
  {
    id: "formations",
    icon: GraduationCap,
    title: "Formations Immobilières",
    description: "Développez vos compétences en immobilier grâce à nos formations animées par des experts du secteur. De l'investissement à la gestion locative, nous couvrons tous les sujets.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    features: ["Formateurs experts", "Certificat de formation", "Petits groupes personnalisés", "Cas pratiques réels"],
    href: "/formations",
  },
  {
    id: "decoration",
    icon: Paintbrush,
    title: "Ameublement & Décoration",
    description: "Transformez votre intérieur avec nos services de décoration. Notre équipe de designers crée des espaces qui vous ressemblent, alliant esthétique et fonctionnalité.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    features: ["Conseil personnalisé", "Design sur-mesure", "Suivi de projet complet", "Portfolio de réalisations"],
    href: "/contact",
  },
  {
    id: "demenagement",
    icon: Truck,
    title: "Services de Déménagement",
    description: "Un déménagement sans stress grâce à notre équipe professionnelle. Nous prenons en charge l'ensemble du processus pour une transition en toute sérénité.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    features: ["Devis gratuit et transparent", "Emballage et protection", "Transport sécurisé", "Couverture assurance"],
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920" alt="Nos services" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium mb-6">
            Nos Services
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Des Services <span className="gradient-text">Complets</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            6 services intégrés pour vous accompagner dans tous vos projets immobiliers et au-delà.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 lg:mb-24 last:mb-0"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-dark/30 to-transparent" />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-dark to-green-medium flex items-center justify-center mb-6">
                  <service.icon size={24} className="text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4">{service.title}</h2>
                <p className="text-gray leading-relaxed mb-6">{service.description}</p>
                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-gold shrink-0" />
                      <span className="text-dark-soft text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href={service.href} className="inline-flex items-center gap-2 px-6 py-3 bg-green-dark text-white rounded-full font-semibold text-sm hover:bg-green-medium transition-all">
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-green-dark">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">Besoin d&apos;un service sur-mesure ?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-gold text-white rounded-full font-semibold hover:bg-gold-dark transition-all hover:shadow-lg hover:shadow-gold/25">
            Demander un Devis
          </Link>
        </div>
      </section>
    </>
  );
}
