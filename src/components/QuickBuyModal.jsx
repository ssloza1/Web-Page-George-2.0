import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Truck, CreditCard, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuickBuyModal = ({ isOpen, onClose, onPurchaseSuccess }) => {
  const [selectedPack, setSelectedPack] = useState('duo'); // 'solo' | 'duo' | 'trio'
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const PACKS = {
    solo: {
      name: 'GEORGE 2.0 // Edición 120 ml',
      price: 34.99,
      regularPrice: 42.00,
      discount: '17% OFF',
      tag: 'BÁSICO RUNNER',
      desc: '1 Tubo individual de 120 ml. Ideal para probar su fórmula de choque muscular.',
    },
    duo: {
      name: 'PACK RUNNER DÚO // 2x 120 ml',
      price: 59.49,
      regularPrice: 84.00,
      discount: '30% OFF',
      tag: 'MÁS VENDIDO ★',
      desc: '2 Tubos de 120 ml. Uno para tu mochila de pista y otro para tu kit de recuperación en casa.',
      badge: 'POPULAR',
    },
    trio: {
      name: 'MARATHON PRO LAB // 3x 120 ml',
      price: 78.75,
      regularPrice: 126.00,
      discount: '38% OFF',
      tag: 'MÁXIMO AHORRO',
      desc: '3 Tubos de 120 ml + Envío prioritario gratis + Toalla deportiva de microfibra de regalo.',
    },
  };

  const currentPack = PACKS[selectedPack];
  const total = (currentPack.price * quantity).toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Disparar confeti de lujo esmeralda y blanco
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00A859', '#107C41', '#00FF88', '#FFFFFF', '#E2E8F0'],
      });

      if (onPurchaseSuccess) {
        onPurchaseSuccess(quantity);
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-[#0A0D0C] border border-[#00A859]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,168,89,0.25)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#062618]/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-grotesk font-bold text-base sm:text-lg text-white tracking-wide">
                ACCESO EXCLUSIVO // COMPRA GEORGE 2.0
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Si la compra fue exitosa */}
          {isSuccess ? (
            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#107C41]/30 border-2 border-[#00FF88] flex items-center justify-center text-[#00FF88] mb-4 shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="font-grotesk font-bold text-2xl sm:text-3xl text-white mb-2">
                ¡ORDEN CONFIRMADA!
              </h4>
              <p className="text-sm font-inter text-[#CBD5E1] max-w-md mb-6 leading-relaxed">
                Gracias por confiar en <span className="text-[#00FF88] font-semibold">GEORGE VARIEDADES</span>. Tu pedido de la fórmula <span className="font-bold text-white">GEORGE 2.0</span> está siendo preparado por nuestro equipo y llegará a tu dirección en 24-48 horas.
              </p>
              <div className="p-4 rounded-xl bg-[#062618]/60 border border-[#107C41]/50 text-xs text-[#E2E8F0] font-mono mb-6 w-full max-w-sm">
                PEDIDO #GV-{Math.floor(Math.random() * 899999 + 100000)} // ENVÍO PRIORITARIO
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,168,89,0.3)]"
              >
                Volver a la Tienda
              </button>
            </div>
          ) : (
            /* Formulario de Compra */
            <form onSubmit={handleCheckout} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
              {/* Selección de Packs */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold tracking-widest text-[#94A3B8] uppercase">
                  1. SELECCIONA TU PRESENTACIÓN
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(PACKS).map(([key, pack]) => {
                    const isSelected = selectedPack === key;
                    return (
                      <div
                        key={key}
                        onClick={() => setSelectedPack(key)}
                        className={`relative p-3.5 rounded-xl cursor-pointer transition-all border text-left flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#062618]/80 border-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                            : 'bg-[#121715]/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {pack.badge && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#00A859] text-[9px] font-mono font-black text-white tracking-wider">
                            {pack.badge}
                          </span>
                        )}
                        <div>
                          <div className="text-[10px] font-mono text-[#00A859] font-bold uppercase">{pack.tag}</div>
                          <div className="font-grotesk font-bold text-sm text-white mt-0.5">{pack.name}</div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/10 flex items-baseline justify-between">
                          <span className="text-base font-extrabold text-[#00FF88] font-montserrat">${pack.price}</span>
                          <span className="text-xs text-[#94A3B8] line-through font-montserrat">${pack.regularPrice}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#121715] border border-white/10">
                <div>
                  <span className="text-xs font-grotesk font-bold text-white block">Cantidad de Unidades</span>
                  <span className="text-[11px] text-[#94A3B8]">Cada unidad incluye embalaje especial anti-impacto.</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-base font-bold text-white w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Datos de Envío Express */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold tracking-widest text-[#94A3B8] uppercase">
                  2. DATOS DE ENTREGA INMEDIATA
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo del corredor/a"
                    defaultValue="Carlos Mendoza"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico para rastreo"
                    defaultValue="carlos.runner@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Dirección de entrega (Ciudad, Calle, N°)"
                  defaultValue="Av. Las Américas 402, Apt 5B"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121715] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF88]"
                />
              </div>

              {/* Resumen y Garantías */}
              <div className="p-4 rounded-xl bg-[#062618]/50 border border-[#107C41]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#00FF88] shrink-0" />
                  <div className="text-left text-xs">
                    <span className="font-bold text-white block">Envío Nacional 24-48h Gratis</span>
                    <span className="text-[#94A3B8]">Garantía de rendimiento deportivo 30 días</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#94A3B8] block">TOTAL A PAGAR</span>
                  <span className="text-2xl font-black font-montserrat text-[#00FF88]">${total} USD</span>
                </div>
              </div>

              {/* Botón de Confirmación */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#107C41] via-[#00A859] to-[#00FF88] hover:shadow-[0_0_35px_rgba(0,168,89,0.7)] text-white font-montserrat font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>PROCESANDO ORDEN SEGURA...</span>
                ) : (
                  <>
                    <span>CONFIRMAR Y FINALIZAR COMPRA</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#00A859]" /> PAGO ENCRIPTADO SSL</span>
                <span>•</span>
                <span>DESPACHO OFICIAL GEORGE VARIEDADES</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
