"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, BedDouble, Bath, Heart } from "lucide-react";
import type { ApiProperty } from "@/lib/api";
import { formatPrice } from "@/lib/api";

export default function PropertyCard({ property, index = 0 }: { property: ApiProperty; index?: number }) {
  const imageUrl = property.main_image_url || property.images?.[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-light/50"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              property.type === "location" ? "bg-green-medium" : "bg-gold"
            }`}
          >
            {property.type === "location" ? "Location" : "Vente"}
          </span>
        </div>

        {/* Favorite */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 hover:text-red-500 transition-all text-white">
          <Heart size={18} />
        </button>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="text-white font-bold text-lg">
            {formatPrice(property.price, property.type)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-green-dark transition-colors line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-gray mb-4">
          <MapPin size={14} className="text-gold" />
          <span className="text-sm">{property.neighborhood ? `${property.neighborhood}, ` : ''}{property.city}</span>
        </div>

        <p className="text-sm text-gray leading-relaxed mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-light">
          {property.surface > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray">
              <Maximize size={14} className="text-green-medium" />
              <span>{property.surface} m²</span>
            </div>
          )}
          {property.bedrooms && property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray">
              <BedDouble size={14} className="text-green-medium" />
              <span>{property.bedrooms} Ch.</span>
            </div>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray">
              <Bath size={14} className="text-green-medium" />
              <span>{property.bathrooms} SdB</span>
            </div>
          )}
        </div>

        <Link
          href={`/biens/${property.slug}`}
          className="mt-4 block text-center py-2.5 rounded-xl text-sm font-semibold text-green-dark border-2 border-green-dark/20 hover:bg-green-dark hover:text-white transition-all duration-300"
        >
          Voir les détails
        </Link>
      </div>
    </motion.div>
  );
}
