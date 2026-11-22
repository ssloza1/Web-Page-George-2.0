import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactModal = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
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
                CONTACTO & SOPORTE ATLETA // GEORGE
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {sent ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle2 className="w-14 h-14 text-[#00FF88] mb-3" />
                <h4 className="font-grotesk font-bold text-xl text-white">¡MENSAJE ENVIADO!</h4>
                <p className="text-xs text-[#CBD5E1] mt-1">Un especialista en rendimiento responderá a tu consulta en menos de 3 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">TU NOMBRE</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Sofía Runner"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">CORREO ELECTRÓNICO</label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@ejemplo.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">ASUNTO O CONSULTA DE RUNNING</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Escribe tu consulta sobre dosificación, compras por volumen para clubes o envíos..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#107C41] to-[#00A859] hover:from-[#00A859] hover:to-[#00FF88] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,168,89,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje a Soporte</span>
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00A859]" />
                <span>hola@georgevariedades.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00A859]" />
                <span>+57 300 928 2000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00A859]" />
                <span>Medellín / Bogotá / Envíos Globales</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
