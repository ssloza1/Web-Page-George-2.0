import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight, Activity, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

export const MenuModal = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const categories = [
    {
      title: 'CREMAS & GELES DE RECUPERACIÓN',
      badge: 'DESTACADO',
      items: [
        { name: 'GEORGE 2.0 - Crema Dermo-Sport 120 ml', price: '$34.99', status: 'MODELO INSIGNIA', isHero: true },
        { name: 'GEORGE Cryo-Freeze Roll-On 90ml', price: '$24.50', status: 'DISPONIBLE' },
        { name: 'Bálsamo Antifricción Extra-Distance 100g', price: '$22.00', status: 'DISPONIBLE' },
      ],
    },
    {
      title: 'EQUIPAMIENTO & ACCESORIOS RUNNING',
      badge: 'NUEVA COLECCIÓN',
      items: [
        { name: 'Cinturón de Hidratación Ergonómico Carbon 2.0', price: '$44.00', status: 'STOCK LIMITADO' },
        { name: 'Calcetines de Compresión Graduada Maratón', price: '$19.90', status: 'DISPONIBLE' },
        { name: 'Chaleco Ultraligero Transpirable Pro Trail', price: '$65.00', status: 'DISPONIBLE' },
      ],
    },
    {
      title: 'KITS DE ENTRENAMIENTO & PACKS',
      badge: 'AHORRO',
      items: [
        { name: 'Pack Dúo Runner (2x GEORGE 2.0 120 ml)', price: '$59.49', status: 'AHORRA 30%' },
        { name: 'Marathon Finisher Box (Crema + Roll-On + Electrolitos)', price: '$89.00', status: 'EDICIÓN ESPECIAL' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#0A0D0C] border border-[#00A859]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,168,89,0.25)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#062618]/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-grotesk font-bold text-base sm:text-lg text-white tracking-wide">
                CATÁLOGO // GEORGE VARIEDADES
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

          {/* Categorías */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#00A859] uppercase">
                    {cat.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-mono">
                    {cat.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onClose();
                        if (onSelectProduct) onSelectProduct(item);
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        item.isHero
                          ? 'bg-[#062618]/80 border-[#00FF88]/60 hover:border-[#00FF88] shadow-[0_0_15px_rgba(0,168,89,0.2)]'
                          : 'bg-[#121715]/70 border-white/10 hover:border-white/30 hover:bg-[#161E1A]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.isHero ? 'bg-[#00FF88] animate-ping' : 'bg-[#107C41]'}`} />
                        <div>
                          <span className="font-grotesk font-semibold text-sm text-white block">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#94A3B8]">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-montserrat font-bold text-sm text-[#00FF88]">
                          {item.price}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
