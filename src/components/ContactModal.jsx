import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Facebook } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactModal = ({ isOpen, onClose }) => {
  const { config } = useStore();
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const email    = config.contactEmail    || 'contacto@georgevariedades.com';
  const phone    = config.contactPhone    || '+593 99 000 0000';
  const location = config.contactLocation || 'Ecuador — Envíos Seguros a Todo el País';
  const hours    = config.contactHours    || 'Lunes a Sábado: 9:00 AM – 7:00 PM';
  const ig       = config.contactIG       || '@georgevariedades';
  const fb       = config.contactFB       || 'fb.com/georgevariedades';
  const wa       = config.contactWA       || '+593 99 000 0000';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl rounded-2xl bg-[#0A0D0C] border border-[#00A859]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,168,89,0.25)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#062618]/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-grotesk font-bold text-base sm:text-lg text-white tracking-wide">
                CONTÁCTANOS // ATENCIÓN DIRECTA
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Cerrar">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-xs leading-relaxed text-[#CBD5E1]">
              ¿Tienes dudas sobre nuestras cremas de 120 ml, próximos lanzamientos de perfumes, ropa y relojes, o deseas hacer un pedido personalizado? Escríbenos directamente.
            </p>
            {sent ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle2 className="w-14 h-14 text-[#00FF88] mb-3" />
                <h4 className="font-grotesk font-bold text-xl text-white">¡MENSAJE ENVIADO!</h4>
                <p className="text-xs text-[#CBD5E1] mt-1">Nuestro equipo responderá a tu consulta pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">TU NOMBRE</label>
                    <input type="text" required placeholder="Ej. María García"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">CORREO ELECTRÓNICO</label>
                    <input type="email" required placeholder="maria@ejemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">ASUNTO O CONSULTA</label>
                  <textarea rows={3} required placeholder="Escribe tu consulta sobre productos, precios, envíos..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]" />
                </div>
                <button type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#107C41] to-[#00A859] hover:from-[#00A859] hover:to-[#00FF88] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,168,89,0.3)]">
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}

            {/* Datos de contacto — siempre visibles, dinámicos */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94A3B8]">
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#00A859] shrink-0" /><span>{email}</span>
                </a>
                <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#00A859] shrink-0" /><span>{phone}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00A859] shrink-0" /><span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#00A859] shrink-0" /><span>{hours}</span>
                </div>
                <a href={`https://wa.me/${wa.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-[#00FF88]">
                  <Phone className="w-4 h-4 shrink-0" /><span>WhatsApp: {wa}</span>
                </a>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <span className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4 text-[#00A859]" />{ig}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                  <Facebook className="w-4 h-4 text-[#00A859]" />{fb}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
