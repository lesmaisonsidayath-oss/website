"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Maximize,
  BedDouble,
  Bath,
  DoorOpen,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getProperty, formatPrice } from "@/lib/api";
import type { ApiProperty } from "@/lib/api";
import { useContactSettings } from "@/providers/contact-provider";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const contact = useContactSettings();
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!slug) return;
    getProperty(slug)
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-green-dark/20 border-t-green-dark rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
        <h1 className="text-2xl font-bold text-dark mb-4">Bien non trouvé</h1>
        <p className="text-gray mb-6">Ce bien n&apos;existe pas ou a été supprimé.</p>
        <Link
          href="/biens"
          className="px-6 py-3 bg-green-dark text-white rounded-full font-semibold text-sm hover:bg-green-medium transition-all"
        >
          Voir tous les biens
        </Link>
      </div>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images.map((img) => img.url)
      : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"];

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le bien "${property.title}". Pouvez-vous me donner plus d'informations ?`
  );

  return (
    <>
      {/* Back link */}
      <section className="pt-24 pb-4 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/biens"
            className="inline-flex items-center gap-2 text-sm text-gray hover:text-green-dark transition-colors"
          >
            <ArrowLeft size={16} />
            Retour aux biens
          </Link>
        </div>
      </section>

      {/* Image gallery */}
      <section className="pb-8 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-2 relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src={images[selectedImage]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    property.type === "vente" ? "bg-gold" : "bg-green-medium"
                  }`}
                >
                  {property.type === "location" ? "Location" : property.type === "location_meublee" ? "Meublé" : "Vente"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-dark/60 backdrop-blur-sm">
                  {property.category}
                </span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-4">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 sm:h-24 lg:h-[116px] rounded-xl overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-3 ring-green-dark"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Vue ${index + 1}`} fill className="object-cover" />
                    {index === 3 && images.length > 4 && (
                      <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          +{images.length - 4}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-8 sm:py-12 bg-off-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-light/50"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1 text-gray mb-4">
                  <MapPin size={16} className="text-gold" />
                  <span>{property.city}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-dark">
                  {formatPrice(property.price, property.type)}
                </div>
              </motion.div>

              {/* Characteristics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-light/50"
              >
                <h2 className="text-lg font-bold text-dark mb-4">Caractéristiques</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {property.surface > 0 && (
                    <div className="flex flex-col items-center p-4 rounded-xl bg-off-white">
                      <Maximize size={24} className="text-green-medium mb-2" />
                      <span className="font-bold text-dark">{property.surface} m²</span>
                      <span className="text-xs text-gray">Surface</span>
                    </div>
                  )}
                  {property.rooms != null && property.rooms > 0 && (
                    <div className="flex flex-col items-center p-4 rounded-xl bg-off-white">
                      <DoorOpen size={24} className="text-green-medium mb-2" />
                      <span className="font-bold text-dark">{property.rooms}</span>
                      <span className="text-xs text-gray">Pièces</span>
                    </div>
                  )}
                  {property.bedrooms != null && property.bedrooms > 0 && (
                    <div className="flex flex-col items-center p-4 rounded-xl bg-off-white">
                      <BedDouble size={24} className="text-green-medium mb-2" />
                      <span className="font-bold text-dark">{property.bedrooms}</span>
                      <span className="text-xs text-gray">Chambres</span>
                    </div>
                  )}
                  {property.bathrooms != null && property.bathrooms > 0 && (
                    <div className="flex flex-col items-center p-4 rounded-xl bg-off-white">
                      <Bath size={24} className="text-green-medium mb-2" />
                      <span className="font-bold text-dark">{property.bathrooms}</span>
                      <span className="text-xs text-gray">Salles de bain</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-light/50"
              >
                <h2 className="text-lg font-bold text-dark mb-4">Description</h2>
                <p className="text-gray leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </motion.div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-light/50"
                >
                  <h2 className="text-lg font-bold text-dark mb-4">Équipements</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-medium flex-shrink-0" />
                        <span className="text-dark-soft text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Contact card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-light/50 sticky top-28"
              >
                <h3 className="text-lg font-bold text-dark mb-4">Intéressé par ce bien ?</h3>
                <p className="text-sm text-gray mb-6">
                  Contactez-nous pour plus d&apos;informations ou pour planifier une visite.
                </p>

                <div className="space-y-3">
                  {contact?.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-dark text-white font-semibold text-sm hover:bg-green-medium transition-all"
                    >
                      <Phone size={18} />
                      Appeler
                    </a>
                  )}
                  {contact?.whatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1da851] transition-all"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </a>
                  )}
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-green-dark text-green-dark font-semibold text-sm hover:bg-green-dark hover:text-white transition-all"
                  >
                    Nous contacter
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-light">
                  <p className="text-xs text-gray text-center">
                    Réf: {property.slug}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
