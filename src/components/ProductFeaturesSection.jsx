import React from 'react';
import { ShoppingCart, ShieldCheck, Sparkles, Thermometer, Droplet, Hash, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductFeaturesSection = ({ onOpenBuyModal }) => {
  const { config } = useStore();

  const specsList = [
    {
      label: 'Fórmula Activa',
      value: config.formulaName || 'Extracto Bio-Esmeralda & Puro Caramelo',
      icon: Sparkles,
      color: '#00FF88',
    },
    {
      label: 'Acción Térmica',
      value: config.thermalAction || 'Efecto Dual Frío/Calor de Absorción Rápida',
      icon: Thermometer,
      color: '#00A859',
    },
    {
      label: 'Resistencia',
      value: config.resistance || 'Antifricción & Sudor Extremo (8 Horas)',
      icon: ShieldCheck,
      color: '#00FF88',
    },
    {
      label: 'Contenido Neto',
      value: config.netContent || '150 ml / 5.07 fl. oz. (Envase Ergonómico)',
      icon: Droplet,
      color: '#00A859',
    },
    {
      label: 'Código de Edición',
      value: config.editionCode || '#GV-ESM-2.0',
      icon: Hash,
      color: '#E2E8F0',
    },
  ];

  return (
    <section className="relative w-full bg-[#0A0D0C] text-white py-20 px-4 sm:px-8 border-t border-[#107C41]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado: Título a la izquierda, Subtítulo a la derecha */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00A859] uppercase block mb-2">
              BIOTECNOLOGÍA DERMO-DEPORTIVA // SPEC SHEET
            </span>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl md:text-[48px] text-white leading-tight">
              {config.featuresTitle || 'Lo Que Hace Excepcional a GEORGE 2.0'}
            </h2>
          </div>
          <p className="font-inter font-normal text-base sm:text-[18px] text-[#E2E8F0]/80 max-w-lg leading-relaxed">
            {config.featuresSubtitle || 'Explora la fórmula de recuperación y rendimiento diseñada para atletas que no se detienen.'}
          </p>
        </div>

        {/* Contenedor Central con esquinas redondeadas 30px y fondo horizontal con bokeh cinematográfico */}
        <div className="relative w-full min-h-[540px] rounded-[30px] overflow-hidden border border-[#107C41]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center p-6 sm:p-10 lg:p-14">
          
          {/* Fondo desenfocado cinematográfico (Cinematic Bokeh Tubo + Cristales Esmeralda) */}
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[#062618]">
            <img 
              src="/assets/george_223_chica_diamonds.jpg" 
              alt="GEORGE 2.0 con cristales esmeralda" 
              className="w-full h-full object-cover filter blur-[14px] opacity-45 scale-110"
            />
            {/* Gradiente radial de viñeta oscura para encuadre */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#0A0D0C]/70 to-[#0A0D0C]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D0C]/90 via-[#062618]/50 to-transparent" />
          </div>

          {/* Panel Glassmorphism Izquierda (superpuesta translúcida rgba(6,38,24,0.45) con blur 16px) */}
          <div 
            className="w-full max-w-xl rounded-[20px] p-6 sm:p-8 backdrop-blur-[16px] border border-[#107C41]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            style={{ backgroundColor: 'rgba(6, 38, 24, 0.55)' }}
          >
            {/* Badge superior */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="font-bebas text-2xl tracking-wider text-white">GEORGE 2.0</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#107C41]/60 border border-[#00FF88]/50 text-[11px] font-mono font-bold text-[#00FF88]">
                ESTUDIO LAB #2026
              </span>
            </div>

            {/* Tabla de Especificaciones */}
            <div className="space-y-4 mb-8">
              {specsList.map((spec, idx) => (
                <div 
                  key={idx}
                  className="flex items-start sm:items-center justify-between gap-4 py-2 border-b border-white/5 last:border-b-0 group"
                >
                  <div className="flex items-center gap-2.5 text-[#94A3B8]">
                    <spec.icon className="w-4 h-4 shrink-0 text-[#00A859] group-hover:text-[#00FF88] transition-colors" />
                    <span className="font-grotesk font-medium text-xs sm:text-sm text-[#CBD5E1]">
                      {spec.label}:
                    </span>
                  </div>
                  <span className="font-inter font-semibold text-xs sm:text-sm text-right text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Botón de Compra: fondo verde esmeralda sólido (#107C41), esquinas redondeadas (25px) con icono de carrito */}
            <button
              onClick={onOpenBuyModal}
              className="w-full py-4 rounded-[25px] bg-[#107C41] hover:bg-[#00A859] active:scale-[0.99] text-white font-montserrat font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(16,124,65,0.5)] hover:shadow-[0_0_35px_rgba(0,168,89,0.8)] flex items-center justify-center gap-2.5 group"
            >
              <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>COMPRAR AHORA ($34.99 USD)</span>
              <ChevronRight className="w-4 h-4 text-[#00FF88] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Destacado visual a la derecha en pantallas grandes */}
          <div className="hidden lg:flex flex-col items-end justify-center flex-1 pr-6 pointer-events-none select-none text-right">
            <span className="font-bebas text-7xl font-black text-white/10 tracking-widest leading-none">
              PURO
            </span>
            <span className="font-bebas text-7xl font-black text-[#00A859]/20 tracking-widest leading-none -mt-4">
              CARAMELO
            </span>
            <span className="font-mono text-xs text-[#00FF88]/40 tracking-[0.4em] uppercase mt-2">
              DERMO-ACTIVE FORMULA
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
