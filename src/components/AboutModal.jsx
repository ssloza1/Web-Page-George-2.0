import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Shield, Target, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutModal = ({ isOpen, onClose }) => {
  const { config } = useStore();
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
                GEORGE VARIEDADES // ESENCIA & ESTILO
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Cerrar">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[75vh]">
            {/* Cabecera marca */}
            <div className="p-4 rounded-xl bg-[#062618]/60 border border-[#107C41]/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#107C41] border border-[#00FF88] flex items-center justify-center text-white shrink-0 font-bebas text-2xl">
                G2
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-sm text-white">GEORGE VARIEDADES // ESENCIA & ESTILO</h4>
                <p className="text-xs text-[#CBD5E1]">Cuidado personal, fragancias y estilo diseñados para dejar tu presencia donde vayas.</p>
              </div>
            </div>

            {/* Historia */}
            <p className="text-sm font-inter text-[#CBD5E1] leading-relaxed">
              {config.aboutHistory ||
                'Buscando siempre dejar mi huella en el mundo, decidí empezar con un producto propio: algo que haga que tanto hombres como mujeres se sientan identificados, seguros de ser ellos mismos y convencidos de que aquí siempre hay más por entregar para nuestra gente. Así nació nuestra línea insignia GEORGE 2.2 — Esmeralda Puro Caramelo, el punto de partida de un universo de cuidado personal, perfumes, ropa y relojes con carácter propio.'}
            </p>

            {/* Misión */}
            <div className="p-4 rounded-xl bg-[#121715] border border-[#107C41]/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#00A859]" />
                <h5 className="font-montserrat font-bold text-sm text-[#00FF88] uppercase tracking-wider">Misión</h5>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {config.aboutMission ||
                  'Ofrecer productos de uso personal —cremas de alto cuidado, fragancias memorables, prendas y relojes— creados con calidad auténtica para resaltar la identidad, confianza y presencia única de cada persona.'}
              </p>
            </div>

            {/* Visión */}
            <div className="p-4 rounded-xl bg-[#121715] border border-[#107C41]/30">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-[#00FF88]" />
                <h5 className="font-montserrat font-bold text-sm text-[#00FF88] uppercase tracking-wider">Visión</h5>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {config.aboutVision ||
                  'Consolidar a GEORGE VARIEDADES como una marca referente de estilo y esencia propia, conectando con nuestra gente a través de lanzamientos exclusivos que hablen por sí solos.'}
              </p>
            </div>

            {/* 3 Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                { icon: Target, num: 1, defaultTitle: 'Esencia Propia', defaultDesc: 'Fórmulas y diseños pensados para dejar huella incluso cuando ya no estás.' },
                { icon: Shield, num: 2, defaultTitle: 'Identidad Sin Límites', defaultDesc: 'Colecciones creadas para hombres y mujeres auténticos y seguros de sí mismos.' },
                { icon: Award, num: 3, defaultTitle: 'Calidad Genuina', defaultDesc: 'Presentaciones cuidadas al detalle, como nuestra crema insignia de 120 ml.' },
              ].map(({ icon: Icon, num, defaultTitle, defaultDesc }) => (
                <div key={num} className="p-4 rounded-xl bg-[#121715] border border-white/10 text-center">
                  <Icon className="w-6 h-6 text-[#00A859] mx-auto mb-2" />
                  <h5 className="font-grotesk font-bold text-sm text-white">
                    {config[`aboutPillar${num}`] || defaultTitle}
                  </h5>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    {config[`aboutPillar${num}Desc`] || defaultDesc}
                  </p>
                </div>
              ))}
            </div>

            {/* Frase de cierre */}
            <p className="text-xs font-mono text-[#94A3B8] pt-2 text-center italic">
              "DEJA TU PRESENCIA, ASÍ NO ESTÉS." — GEORGE VARIEDADES
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
