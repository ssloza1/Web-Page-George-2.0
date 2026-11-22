import React, { useState } from 'react';
import { Activity, Flame, Users, CheckCircle2, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveVideoSection = () => {
  const [joined, setJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleJoinClub = () => {
    setJoined(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00A859', '#00FF88', '#FFFFFF'],
    });
  };

  const avatares = [
    { name: 'Elena', initials: 'EM', bg: 'bg-[#107C41]' },
    { name: 'David', initials: 'DR', bg: 'bg-[#062618]' },
    { name: 'Sara', initials: 'SM', bg: 'bg-[#1E2923]' },
    { name: 'Marcos', initials: 'ML', bg: 'bg-[#107C41]' },
    { name: 'Paula', initials: 'PG', bg: 'bg-[#04180F]' },
  ];

  return (
    <section className="relative w-full min-h-[750px] lg:min-h-[820px] bg-black text-white overflow-hidden flex flex-col justify-between py-16 px-4 sm:px-8 border-t border-[#107C41]/30">
      
      {/* 6.2 Fondo: Vídeo en loop infinito sin sonido con overlay oscuro 35% y viñeta verde esmeralda sutil */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <video
          src="/assets/video_runner_applying.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        {/* Overlay oscuro (opacidad 35%) */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Viñeta verde esmeralda sutil */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#062618]/20 to-[#0A0D0C]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D0C] via-transparent to-[#0A0D0C]" />
      </div>

      {/* Control de Audio Discreto */}
      <div className="max-w-7xl mx-auto w-full flex justify-end z-20">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs transition-colors flex items-center gap-2"
          aria-label="Silenciar / Activar sonido"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#94A3B8]" /> : <Volume2 className="w-4 h-4 text-[#00FF88]" />}
          <span className="font-mono text-[10px] hidden sm:inline">{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
        </button>
      </div>

      {/* Título Principal: "conecta / tu energía" en blanco puro (#FFFFFF), extra-bold (8vw), conecta normal y tu energía en cursiva */}
      <div className="max-w-7xl mx-auto w-full my-auto text-center z-10 py-12">
        <h2 className="font-grotesk font-black text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.9] text-white tracking-tight uppercase select-none">
          conecta <span className="text-white italic font-serif lowercase tracking-normal">/ tu energía</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#00FF88] uppercase mt-4">
          COMUNIDAD GLOBAL DE CORREDORES // GEORGE VARIEDADES
        </p>
      </div>

      {/* Widgets Glassmorphism Inferiores: fondo oscuro translúcido con blur(15px) y borde fino verde esmeralda (#107C41) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 z-10 pt-8">
        
        {/* Widget Izquierdo (Comunidad Activa) */}
        <div 
          className="rounded-2xl p-6 backdrop-blur-[15px] border border-[#107C41]/60 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
          style={{ backgroundColor: 'rgba(10, 13, 12, 0.78)' }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
                <h4 className="font-grotesk font-bold text-xs sm:text-sm text-white tracking-wider uppercase">
                  IMPACTO GLOBAL GEORGE 2.0 (24H)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#00FF88] font-bold">EN VIVO</span>
            </div>

            {/* Mapa vectorial minimalista con puntos brillantes parpadeando */}
            <div className="relative w-full h-24 bg-[#06180F]/50 rounded-xl mb-4 border border-white/5 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full opacity-40" viewBox="0 0 400 120">
                {/* Líneas de contorno mundiales abstractas */}
                <path d="M 30,60 Q 90,20 150,70 T 270,50 T 370,80" fill="none" stroke="#107C41" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 50,40 Q 130,80 220,30 T 350,60" fill="none" stroke="#00A859" strokeWidth="1" strokeDasharray="3 3" />
                {/* Puntos de corredores activos parpadeando */}
                <circle cx="80" cy="45" r="4" fill="#00FF88" className="animate-pulse" />
                <circle cx="160" cy="65" r="5" fill="#00FF88" className="animate-ping" />
                <circle cx="230" cy="35" r="3.5" fill="#00FF88" className="animate-pulse" />
                <circle cx="310" cy="55" r="4" fill="#00FF88" className="animate-ping" />
                <circle cx="360" cy="75" r="3" fill="#00FF88" />
              </svg>
              <span className="absolute bottom-1.5 left-2.5 text-[9px] font-mono text-[#94A3B8]">
                LATAM • NORTEAMÉRICA • EUROPA
              </span>
            </div>
          </div>

          {/* Tres datos requeridos */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block">KILÓMETROS</span>
              <span className="font-grotesk font-bold text-sm sm:text-base text-white">42,890 KM</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block">RECUPERADOS</span>
              <span className="font-grotesk font-bold text-sm sm:text-base text-[#00FF88]">12,432</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block">RITMO MEDIO</span>
              <span className="font-grotesk font-bold text-sm sm:text-base text-white">4:58 /km</span>
            </div>
          </div>
        </div>

        {/* Widget Derecho (Reto Semanal) */}
        <div 
          className="rounded-2xl p-6 backdrop-blur-[15px] border border-[#107C41]/60 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
          style={{ backgroundColor: 'rgba(10, 13, 12, 0.78)' }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#00FF88]" />
                <h4 className="font-grotesk font-bold text-xs sm:text-sm text-white tracking-wider uppercase">
                  ÚNETE AL CLUB ESMERALDA
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8]">RETO 50K</span>
            </div>

            <p className="font-inter text-xs text-[#CBD5E1] mb-4">
              Completa 50 km esta semana aplicando GEORGE 2.0 en cada salida y desbloquea insignias exclusivas y descuentos para la edición 2.2.
            </p>

            {/* Hilera de 5 avatares circulares */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                {avatares.map((av, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full border-2 border-[#0A0D0C] ${av.bg} flex items-center justify-center text-[10px] font-bold text-white shadow`}
                    title={av.name}
                  >
                    {av.initials}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#0A0D0C] bg-[#107C41] flex items-center justify-center text-[9px] font-mono text-white">
                  +1.2k
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#00FF88]">85% COMPLETADO</span>
            </div>

            {/* Barra de Progreso en verde esmeralda al 85% */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-5">
              <div 
                className="h-full bg-gradient-to-r from-[#107C41] via-[#00A859] to-[#00FF88] rounded-full shadow-[0_0_12px_#00FF88]"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          {/* Botón Blanco con Texto Negro: UNIRME AL RETO */}
          <button
            onClick={handleJoinClub}
            disabled={joined}
            className={`w-full py-3.5 rounded-xl font-montserrat font-black text-xs tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
              joined
                ? 'bg-[#00FF88] text-[#0A0D0C] shadow-[0_0_20px_rgba(0,255,136,0.6)]'
                : 'bg-white text-black hover:bg-[#E2E8F0] active:scale-[0.99]'
            }`}
          >
            {joined ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#0A0D0C]" />
                <span>¡YA ESTÁS DENTRO DEL CLUB!</span>
              </>
            ) : (
              <>
                <span>UNIRME AL RETO</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </section>
  );
};
