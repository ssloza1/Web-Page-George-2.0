import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Shield, Target, Zap } from 'lucide-react';

export const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-[#0A0D0C] border border-[#00A859]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,168,89,0.25)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#062618]/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-grotesk font-bold text-base sm:text-lg text-white tracking-wide">
                HISTORIA & MISIÓN // GEORGE VARIEDADES
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

          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[75vh]">
            <div className="p-4 rounded-xl bg-[#062618]/60 border border-[#107C41]/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#107C41] border border-[#00FF88] flex items-center justify-center text-white shrink-0 font-bebas text-2xl">
                G2
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-sm text-white">GEORGE VARIEDADES • RUNNING LAB</h4>
                <p className="text-xs text-[#CBD5E1]">Pioneros en biotecnología dermo-deportiva para atletas de asfalto y montaña.</p>
              </div>
            </div>

            <p className="text-sm font-inter text-[#CBD5E1] leading-relaxed">
              En <strong className="text-white">GEORGE VARIEDADES</strong> nacimos de una pasión inquebrantable por el running de fondo. Sabemos que cada maratón, cada kilómetro de asfalto y cada serie de cuestas exige el máximo del cuerpo. Por eso, tras más de 24 meses de investigación clínica formulamos nuestro modelo insignia: <strong className="text-[#00FF88]">GEORGE 2.0</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#121715] border border-white/10 text-center">
                <Target className="w-6 h-6 text-[#00A859] mx-auto mb-2" />
                <h5 className="font-grotesk font-bold text-sm text-white">Objetivo Cero Roce</h5>
                <p className="text-[11px] text-[#94A3B8] mt-1">Eliminar la fricción que frena tu ritmo en carrera.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121715] border border-white/10 text-center">
                <Zap className="w-6 h-6 text-[#00FF88] mx-auto mb-2" />
                <h5 className="font-grotesk font-bold text-sm text-white">Efecto Térmico Activo</h5>
                <p className="text-[11px] text-[#94A3B8] mt-1">Reactivación circulatoria casi instantánea.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#121715] border border-white/10 text-center">
                <Award className="w-6 h-6 text-[#107C41] mx-auto mb-2" />
                <h5 className="font-grotesk font-bold text-sm text-white">Calidad Farmacéutica</h5>
                <p className="text-[11px] text-[#94A3B8] mt-1">Ingredientes puros y envase ergonómico de 150ml.</p>
              </div>
            </div>

            <p className="text-xs font-mono text-[#94A3B8] pt-2 text-center">
              "NO CORRES PARA ESCAPAR, CORRES PARA SUPERARTE." — TEAM GEORGE
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
