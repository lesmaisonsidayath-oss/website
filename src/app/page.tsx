"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Home, Key, MapPin, GraduationCap, Paintbrush, Truck,
  ArrowRight, Star, Users, Building, Award, ChevronRight, Quote,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import SectionTitle from "@/components/SectionTitle";
import { getProperties, getTestimonials, getBlogPosts } from "@/lib/api";
import type { ApiProperty, ApiTestimonial, ApiBlogPost } from "@/lib/api";

const services = [
  { icon: Key, title: "Location d'Appartements", description: "Trouvez le logement idéal parmi notre large sélection d'appartements à louer.", href: "/biens?type=location", color: "from-green-dark to-green-medium" },
  { icon: Building, title: "Vente d'Appartements", description: "Investissez dans l'immobilier avec nos appartements de qualité à vendre.", href: "/biens?type=vente&cat=appartement", color: "from-green-medium to-green-light" },
  { icon: MapPin, title: "Vente de Terrains", description: "Des terrains viabilisés dans des emplacements stratégiques pour vos projets.", href: "/biens?type=vente&cat=terrain", color: "from-gold-dark to-gold" },
  { icon: GraduationCap, title: "Formations Immobilières", description: "Développez vos compétences avec nos formations certifiantes en immobilier.", href: "/formations", color: "from-green-dark to-green-light" },
  { icon: Paintbrush, title: "Ameublement & Décoration", description: "Transformez votre intérieur avec nos experts en design et décoration.", href: "/services#decoration", color: "from-gold to-gold-light" },
  { icon: Truck, title: "Services de Déménagement", description: "Un déménagement serein et organisé grâce à notre équipe professionnelle.", href: "/services#demenagement", color: "from-green-medium to-green-dark" },
];

const stats = [
  { number: "500+", label: "Biens Gérés", icon: Building },
  { number: "1200+", label: "Clients Satisfaits", icon: Users },
  { number: "10+", label: "Années d'Expérience", icon: Award },
  { number: "50+", label: "Partenaires", icon: Star },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [featuredProperties, setFeaturedProperties] = useState<ApiProperty[]>([]);
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<ApiBlogPost[]>([]);

  useEffect(() => {
    getProperties({ featured: '1' }).then(setFeaturedProperties).catch(() => {});
    getTestimonials().then(setTestimonials).catch(() => {});
    getBlogPosts().then(setBlogPosts).catch(() => {});
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920" alt="Immobilier de luxe" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 via-green-dark/60 to-green-dark/90" />
          <div className="absolute inset-0 hero-pattern" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-gold/30 text-gold text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm bg-white/5">
              Agence Immobilière de Confiance
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Trouvez la Maison<br />de vos <span className="gradient-text">Rêves</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            Location, vente, formation et bien plus encore. Les Maisons Idayath vous accompagne dans tous vos projets immobiliers.
          </motion.p>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/10">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Home size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <select className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/10 rounded-xl text-white border-0 outline-none appearance-none cursor-pointer text-sm">
                    <option value="" className="text-dark">Type de bien</option>
                    <option value="appartement" className="text-dark">Appartement</option>
                    <option value="terrain" className="text-dark">Terrain</option>
                    <option value="villa" className="text-dark">Villa</option>
                    <option value="studio" className="text-dark">Studio</option>
                  </select>
                </div>
                <div className="flex-1 relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input type="text" placeholder="Localisation" className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/10 rounded-xl text-white placeholder-white/50 border-0 outline-none text-sm" />
                </div>
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">FCFA</span>
                  <input type="text" placeholder="Budget max" className="w-full pl-14 pr-4 py-3 sm:py-4 bg-white/10 rounded-xl text-white placeholder-white/50 border-0 outline-none text-sm" />
                </div>
                <Link href="/biens" className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gold rounded-xl text-white font-semibold hover:bg-gold-dark transition-all duration-300 whitespace-nowrap">
                  <Search size={18} /><span>Rechercher</span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
            {["Location", "Vente", "Terrains", "Formations"].map((tag) => (
              <span key={tag} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-white/60 text-xs sm:text-sm hover:border-gold/50 hover:text-gold cursor-pointer transition-all">{tag}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Ce que nous offrons" title="Nos Services" description="Une gamme complète de services immobiliers pour répondre à tous vos besoins." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link href={service.href} className="group block p-6 sm:p-8 bg-white rounded-2xl border border-gray-light/50 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark mb-2 sm:mb-3 group-hover:text-green-dark transition-colors">{service.title}</h3>
                  <p className="text-gray text-sm leading-relaxed mb-3 sm:mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">En savoir plus <ArrowRight size={16} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      {featuredProperties.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
              <SectionTitle subtitle="Biens Immobiliers" title="Nos Biens en Vedette" description="Découvrez notre sélection de biens immobiliers soigneusement choisis." centered={false} />
              <Link href="/biens" className="inline-flex items-center gap-2 px-6 py-3 bg-green-dark text-white rounded-full font-semibold text-sm hover:bg-green-medium transition-all shrink-0 self-start md:self-auto">
                Voir tous les biens <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== STATS ===== */}
      <section className="py-16 sm:py-20 bg-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                  <stat.icon size={24} className="text-gold" />
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" alt="Notre agence" fill className="object-cover" />
              </div>
              <div className="absolute bottom-4 right-4 px-4 py-3 bg-gold rounded-xl text-white shadow-lg">
                <div className="text-xl sm:text-2xl font-bold">10+</div>
                <div className="text-xs">ans d&apos;expérience</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionTitle subtitle="Qui sommes-nous" title="Votre Partenaire Immobilier de Confiance" centered={false} />
              <p className="text-gray leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Les Maisons Idayath est une agence immobilière complète offrant une gamme étendue de services.
                De la location à la vente, en passant par la formation et la décoration, nous vous accompagnons
                dans chaque étape de vos projets immobiliers.
              </p>
              <p className="text-gray leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Notre engagement : un service personnalisé, une expertise reconnue et une transparence
                totale pour construire ensemble votre avenir immobilier.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/a-propos" className="px-6 sm:px-8 py-3 bg-green-dark text-white rounded-full font-semibold text-sm hover:bg-green-medium transition-all text-center">En savoir plus</Link>
                <Link href="/contact" className="px-6 sm:px-8 py-3 border-2 border-green-dark text-green-dark rounded-full font-semibold text-sm hover:bg-green-dark hover:text-white transition-all text-center">Nous Contacter</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-off-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle subtitle="Témoignages" title="Ce que Disent Nos Clients" description="La satisfaction de nos clients est notre plus belle récompense." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={testimonial.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-light/50 hover:shadow-xl transition-all duration-500 relative">
                  <Quote size={32} className="text-gold/20 absolute top-4 right-4 sm:top-6 sm:right-6" />
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} size={14} className="text-gold fill-gold" />))}
                  </div>
                  <p className="text-gray leading-relaxed mb-4 sm:mb-6 italic text-sm sm:text-base">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-dark to-green-medium flex items-center justify-center text-white font-bold text-sm shrink-0">{testimonial.name.charAt(0)}</div>
                    <div className="min-w-0">
                      <div className="font-semibold text-dark text-sm sm:text-base truncate">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BLOG PREVIEW ===== */}
      {blogPosts.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
              <SectionTitle subtitle="Blog & Actualités" title="Nos Derniers Articles" description="Restez informé avec nos articles, conseils et actualités immobilières." centered={false} />
              <Link href="/blog" className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all shrink-0">Voir tous les articles <ArrowRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogPosts.slice(0, 3).map((post, index) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group bg-white rounded-2xl overflow-hidden border border-gray-light/50 hover:shadow-xl transition-all duration-500">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image src={post.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><span className="px-3 py-1 rounded-full bg-gold text-white text-xs font-semibold">{post.category}</span></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray mb-2 sm:mb-3">
                      {post.published_at && <span>{new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-dark mb-2 group-hover:text-green-dark transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs sm:text-sm text-gray line-clamp-2 mb-3 sm:mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">Lire la suite <ArrowRight size={14} /></Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PARTNER CTA ===== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-dark via-green-medium to-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-gold/30 text-gold text-xs sm:text-sm font-medium mb-4 sm:mb-6">Propriétaires & Agences</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Vous souhaitez mettre votre bien en <span className="gradient-text">location ou en vente</span> ?
            </h2>
            <p className="text-white/70 text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">Rejoignez notre réseau de partenaires et bénéficiez de notre expertise pour valoriser et commercialiser vos biens immobiliers.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/partenaires" className="px-6 sm:px-8 py-3 sm:py-4 bg-gold text-white rounded-full font-semibold hover:bg-gold-dark transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base">Devenir Partenaire <ArrowRight size={18} /></Link>
              <Link href="/contact" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all text-sm sm:text-base text-center">En Savoir Plus</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
