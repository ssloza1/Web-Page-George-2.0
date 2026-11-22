import React from 'react';
import { Play, Sparkles, ShieldCheck, Flame, ChevronRight, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroBottom = ({ onOpenVideoModal, onOpenAppModal, onOpenBuyModal }) => {
  const { config } = useStore();

  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-2 pb-8 flex flex-col items-center text-center">
      
      {/* Insignia: EDICIÓN ESPECIAL // MODELO GEORGE 2.0 */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#062618]/90 border border-[#00A859]/60 shadow-[0_0_20px_rgba(0,168,89,0.25)] mb-3">
        <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
        <span className="font-grotesk font-semibold text-[11px] sm:text-[12px] tracking-[0.22em] text-[#E2E8F0] uppercase">
          EDICIÓN ESPECIAL // MODELO GEORGE 2.0
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#107C41] text-white font-mono font-bold">
          150 ML
        </span>
      </div>

      {/* Frase Motivacional — editable desde CMS */}
      <h3 className="font-montserrat font-light text-[clamp(1.15rem,2.2vw,1.65rem)] leading-snug text-white tracking-wide max-w-3xl mb-5">
        {config.heroTagline ? (
          <span>{config.heroTagline}</span>
        ) : (
          <>
            Deja tu presencia, así no estés.{' '}
            <span className="text-[#00A859] font-bold drop-shadow-[0_0_12px_rgba(0,168,89,0.5)]">
              GEORGE 2.0
            </span>{' '}
            —{' '}
            <span className="text-white font-semibold">Puro Caramelo.</span>
          </>
        )}
      </h3>

      {/* Micro-métricas de Estilo y Presencia */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-5">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0A0D0C]/70 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#00FF88]" />
          <div className="text-left">
            <div className="text-[10px] font-mono text-[#94A3B8]">ABSORCIÓN</div>
            <div className="text-xs font-grotesk font-bold text-white">{'<'} 45 SEG</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0A0D0C]/70 border border-white/10 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-[#00A859]" />
          <div className="text-left">
            <div className="text-[10px] font-mono text-[#94A3B8]">CUIDADO</div>
            <div className="text-xs font-grotesk font-bold text-white">PIEL NUTRITIVA</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0A0D0C]/70 border border-white/10 backdrop-blur-md">
          <Flame className="w-4 h-4 text-[#00FF88]" />
          <div className="text-left">
            <div className="text-[10px] font-mono text-[#94A3B8]">EFECTO</div>
            <div className="text-xs font-grotesk font-bold text-white">DUAL FRÍO/CALOR</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0A0D0C]/70 border border-white/10 backdrop-blur-md">
          <Zap className="w-4 h-4 text-[#00A859]" />
          <div className="text-left">
            <div className="text-[10px] font-mono text-[#94A3B8]">FÓRMULA</div>
            <div className="text-xs font-grotesk font-bold text-white">BIO-ESMERALDA</div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onOpenVideoModal}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#161E1A]/90 hover:bg-[#107C41]/30 border border-[#107C41]/50 hover:border-[#00FF88] text-xs font-montserrat font-semibold tracking-wider text-[#E2E8F0] hover:text-white transition-all shadow-md"
        >
          <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </div>
          <span>VER TEXTURA EN VIDEO</span>
        </button>

        <button
          onClick={onOpenAppModal}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#161E1A]/90 hover:bg-[#107C41]/30 border border-[#107C41]/50 hover:border-[#00FF88] text-xs font-montserrat font-semibold tracking-wider text-[#E2E8F0] hover:text-white transition-all shadow-md"
        >
          <span>VER EN PIEL</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#00A859]" />
        </button>

        <button
          onClick={onOpenBuyModal}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#107C41] to-[#00A859] text-white text-xs font-montserrat font-bold tracking-wider shadow-[0_0_20px_rgba(0,168,89,0.35)] hover:shadow-[0_0_30px_rgba(0,168,89,0.6)] hover:scale-105 transition-all"
        >
          <Zap className="w-3.5 h-3.5 text-white" />
          <span>EXPLORAR COLECCIÓN</span>
        </button>
      </div>

    </div>
  );
};
