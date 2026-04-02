"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";
import type { ApiProperty } from "@/lib/api";

export default function BiensPage() {
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getProperties().then(setProperties).catch(() => {});
  }, []);

  const filtered = properties.filter((p) => {
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.city.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920" alt="Biens immobiliers" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nos <span className="gradient-text">Biens Immobiliers</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Explorez notre catalogue de biens immobiliers avec des filtres avancés pour trouver exactement ce que vous cherchez.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-light sticky top-16 lg:top-20 z-40">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" />
              <input
                type="text"
                placeholder="Rechercher par titre ou ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "Tous" },
                { value: "location", label: "Location" },
                { value: "location_meublee", label: "Meublé" },
                { value: "vente", label: "Vente" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTypeFilter(opt.value)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    typeFilter === opt.value
                      ? "bg-green-dark text-white"
                      : "bg-off-white text-dark-soft hover:bg-gray-light"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold bg-off-white text-dark-soft hover:bg-gray-light transition-all flex items-center gap-2"
              >
                <SlidersHorizontal size={16} />
                Filtres
              </button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-light"
            >
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label className="text-xs font-semibold text-gray uppercase mb-1 block">Catégorie</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-light bg-off-white text-dark text-sm outline-none focus:border-gold"
                  >
                    <option value="all">Toutes</option>
                    <option value="studio">Studio</option>
                    <option value="F2">F2</option>
                    <option value="F3">F3</option>
                    <option value="F4">F4</option>
                    <option value="villa">Villa</option>
                    <option value="terrain">Terrain</option>
                  </select>
                </div>
                <button
                  onClick={() => { setTypeFilter("all"); setCategoryFilter("all"); setSearchQuery(""); }}
                  className="px-4 py-2 text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <X size={14} /> Réinitialiser
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-8 sm:py-12 bg-off-white min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <p className="text-gray text-sm">
              <span className="font-semibold text-dark">{filtered.length}</span> bien(s) trouvé(s)
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-light flex items-center justify-center mb-4">
                <Search size={32} className="text-gray" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Aucun bien trouvé</h3>
              <p className="text-gray mb-6">Essayez de modifier vos critères de recherche.</p>
              <button
                onClick={() => { setTypeFilter("all"); setCategoryFilter("all"); setSearchQuery(""); }}
                className="px-6 py-3 bg-green-dark text-white rounded-full font-semibold text-sm hover:bg-green-medium transition-all"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
