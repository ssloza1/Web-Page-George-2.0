import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Flame, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';

export const ApplicationModal = ({ isOpen, onClose, onOpenBuyModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      img: '/assets/arm_cream_1.jpg',
      title: 'Aplicación Directa & Textura de Enfriamiento',
      subtitle: 'Fórmula de absorción inmediata post-kilómetro',
      caption: 'Al entrar en contacto con la piel fatigada por el asfalto, los bio-activos de mentol y extracto de esmeralda reducen la micro-inflamación y entregan hidratación elástica sin bloquear la transpiración dérmica.',
    },
    {
      img: '/assets/arm_cream_2.jpg',
      title: 'Difusión Homogénea & Efecto Barrera',
      subtitle: 'Protección antifricción extrema para distancias largas',
      caption: 'El complejo Óleo Caramelo crea un escudo microscópico de lubricación duradera que previene las quemaduras por fricción en entrenamientos bajo calor o lluvia.',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl rounded-2xl bg-[#0A0D0C] border border-[#00A859]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,168,89,0.25)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#062618]/60">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-grotesk font-bold text-base sm:text-lg text-white tracking-wide">
                ENSAYO CLÍNICO EN PIEL // MODELO GEORGE 2.0
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

          {/* Slider de Imágenes Reales */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0E1512]">
            {/* Foto real */}
            <div className="relative aspect-square sm:aspect-auto sm:h-[420px] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={slides[currentSlide].img}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#00FF88]">
                ESTUDIO REAL #0{currentSlide + 1}
              </div>

              {/* Botones de navegación */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/20"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all border border-white/20"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Panel de Información & Beneficios */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#00A859] tracking-widest uppercase font-bold block mb-1">
                  {slides[currentSlide].subtitle}
                </span>
                <h4 className="font-grotesk font-bold text-xl sm:text-2xl text-white mb-3 leading-snug">
                  {slides[currentSlide].title}
                </h4>
                <p className="font-inter text-sm text-[#CBD5E1] leading-relaxed mb-6">
                  {slides[currentSlide].caption}
                </p>

                {/* Métricas destacadas */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#107C41]/30 border border-[#00A859] flex items-center justify-center text-[#00FF88] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-[#E2E8F0] font-medium">98.4% de reducción en irritaciones por roce de vestimenta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#107C41]/30 border border-[#00A859] flex items-center justify-center text-[#00FF88] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-[#E2E8F0] font-medium">Tiempo de reactivación muscular 2.4x más acelerado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#107C41]/30 border border-[#00A859] flex items-center justify-center text-[#00FF88] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-[#E2E8F0] font-medium">Testado por corredores de maratón y ultra distancia</span>
                  </div>
                </div>
              </div>

              {/* Botón CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-[#00FF88]' : 'w-2 bg-white/20'}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => { onClose(); onOpenBuyModal(); }}
                  className="px-6 py-2.5 rounded-full bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,168,89,0.35)]"
                >
                  Comprar Ahora ($34.99)
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
