"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getBlogPosts } from "@/lib/api";
import type { ApiBlogPost } from "@/lib/api";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<ApiBlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then(setBlogPosts).catch(() => {});
  }, []);

  const featured = blogPosts[0];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920" alt="Blog" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium mb-6">
            Blog & Actualités
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nos <span className="gradient-text">Articles</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Conseils, tendances et actualités du marché immobilier pour vous accompagner dans vos décisions.
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-12 sm:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-gray-light/50 hover:shadow-xl transition-all">
              <div className="relative h-56 sm:h-72 lg:h-auto">
                <Image src={featured.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"} alt={featured.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-gold text-white text-xs font-semibold">{featured.category}</span>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-gray mb-4">
                  {featured.published_at && <span>{new Date(featured.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark mb-4">{featured.title}</h2>
                <p className="text-gray leading-relaxed mb-6 text-sm sm:text-base">{featured.excerpt}</p>
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
                  Lire l&apos;article complet <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 sm:py-16 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Tous les articles" title="Dernières Publications" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-light/50 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <Image src={post.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold text-white text-xs font-semibold">{post.category}</span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-sm text-gray mb-3">
                    {post.published_at && <span>{new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-dark mb-2 group-hover:text-green-dark transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                    Lire la suite <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
