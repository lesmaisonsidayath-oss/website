"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getContactSettings, sendContactMessage } from "@/lib/api";
import type { ApiContactSettings } from "@/lib/api";

export default function ContactPage() {
  const [settings, setSettings] = useState<ApiContactSettings | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getContactSettings().then(setSettings).catch(() => {});
  }, []);

  const contactInfo = settings ? [
    { icon: MapPin, title: "Adresse", lines: [`${settings.address}, ${settings.city}`] },
    { icon: Phone, title: "Téléphone", lines: [settings.phone, settings.phone_secondary].filter(Boolean) as string[] },
    { icon: Mail, title: "Email", lines: [settings.email, settings.email_secondary].filter(Boolean) as string[] },
    { icon: Clock, title: "Horaires", lines: settings.opening_hours ? settings.opening_hours.split('\n') : ["Lun - Ven : 8h - 18h", "Sam : 9h - 13h"] },
  ] : [
    { icon: MapPin, title: "Adresse", lines: ["Abidjan, Côte d'Ivoire"] },
    { icon: Phone, title: "Téléphone", lines: ["+225 00 00 000 000"] },
    { icon: Mail, title: "Email", lines: ["contact@maisonsidayath.ci"] },
    { icon: Clock, title: "Horaires", lines: ["Lun - Ven : 8h - 18h", "Sam : 9h - 13h"] },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await sendContactMessage(formData);
      setSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920" alt="Contact" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/80 to-green-dark/90" />
        <div className="relative z-10 text-center pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-5 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium mb-6">
            Contact
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl md:text-6xl font-bold text-white mb-4">
            Parlons de votre <span className="gradient-text">Projet</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-light/50 text-center hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-green-dark/10 flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-green-dark" />
                </div>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-gray text-sm">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle subtitle="Formulaire" title="Envoyez-nous un Message" centered={false} />

              {sent ? (
                <div className="p-8 bg-green-50 rounded-2xl border border-green-200 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">Message envoyé !</h3>
                  <p className="text-gray">Nous vous répondrons dans les plus brefs délais.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-sm text-gold font-semibold">Envoyer un autre message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 rounded-xl text-sm text-red-600">{error}</div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-dark uppercase mb-2 block">Nom complet *</label>
                      <input type="text" placeholder="Votre nom" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-dark uppercase mb-2 block">Téléphone</label>
                      <input type="tel" placeholder="+225 00 00 000 000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark uppercase mb-2 block">Email *</label>
                    <input type="email" placeholder="votre@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark uppercase mb-2 block">Sujet *</label>
                    <select required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all">
                      <option value="">Choisir un sujet</option>
                      <option>Location d&apos;appartement</option>
                      <option>Achat d&apos;appartement</option>
                      <option>Achat de terrain</option>
                      <option>Formations immobilières</option>
                      <option>Décoration d&apos;intérieur</option>
                      <option>Déménagement</option>
                      <option>Partenariat</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark uppercase mb-2 block">Message *</label>
                    <textarea rows={6} placeholder="Décrivez votre projet ou posez votre question..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-light bg-off-white text-dark placeholder-gray text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none" />
                  </div>

                  <button type="submit" disabled={sending} className="w-full sm:w-auto px-8 py-3 bg-green-dark text-white rounded-full font-semibold hover:bg-green-medium transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50">
                    <Send size={16} /> {sending ? 'Envoi...' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map placeholder + WhatsApp */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-light mb-6">
                <iframe
                  src={settings?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254242.0789985795!2d-4.0892503!3d5.3484185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3fe70ddce19221a6!2sAbidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sfr!2sfr!4v1234567890"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>

              <div className="bg-green-dark p-8 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={24} className="text-gold" />
                  <h3 className="text-xl font-bold">Chat en direct</h3>
                </div>
                <p className="text-white/70 mb-6 text-sm">
                  Besoin d&apos;une réponse rapide ? Contactez-nous directement via WhatsApp pour un échange instantané.
                </p>
                <a
                  href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : "https://wa.me/22500000000"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-full font-semibold text-sm hover:bg-gold-dark transition-all"
                >
                  Écrire sur WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
