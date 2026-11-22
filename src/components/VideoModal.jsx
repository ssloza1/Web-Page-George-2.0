import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

export const VideoModal = ({ isOpen, onClose, onOpenBuyModal }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

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
          {/* Header del Modal */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#062618]/60">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-grotesk font-bold text-base sm:text-lg text-white tracking-wide">
                TEXTURA & EMULSIÓN EN ACCIÓN // GEORGE 2.0
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

          {/* Cuerpo del Video */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
            <video
              ref={videoRef}
              src="/assets/cream_splash.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Overlay de controles de video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6 pointer-events-none">
              <div className="flex items-center gap-3 pointer-events-auto">
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-[#107C41] text-white hover:bg-[#00A859] transition-colors shadow-lg"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors border border-white/20"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="text-right pointer-events-auto">
                <span className="text-xs font-mono text-[#00FF88] block">LABORATORIO DE VISCOSIDAD RUNNING</span>
                <span className="text-sm font-grotesk font-semibold text-white">Fluidez Crio-Térmica Hidrófoba</span>
              </div>
            </div>
          </div>

          {/* Ficha Técnica de la Textura */}
          <div className="p-6 bg-[#0E1512] border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00FF88] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-grotesk font-bold text-sm text-white">Emulsión Ultra Sedosa</h5>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Penetración dérmica en menos de 45 segundos sin residuo graso ni manchas en la ropa deportiva.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A859] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-grotesk font-bold text-sm text-white">Óleo de Caramelo & Esmeralda</h5>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Crea una película protectora flexible contra rozaduras entre muslos, axilas y plantas de los pies.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <button
                onClick={() => { onClose(); onOpenBuyModal(); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#107C41] to-[#00A859] hover:from-[#00A859] hover:to-[#00FF88] text-white font-montserrat font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,168,89,0.3)] transition-all"
              >
                Comprar GEORGE 2.0 ($34.99)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
