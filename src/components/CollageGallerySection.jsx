import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Eye, ShieldCheck, Flame } from 'lucide-react';

export const CollageGallerySection = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: 'Estudio de Lujo & Esmeraldas',
      subtitle: 'GEORGE 2.2.3 CHICA DIAMONDS',
      img: '/assets/george_223_chica_diamonds.jpg',
      initialRotate: -3.5,
      zIndex: 10,
      aspect: 'aspect-[3/4]',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'CÁMARA LENTA 1/8000s',
      tag: 'ESMERALDA BRUTA',
    },
    {
      id: 2,
      title: 'Fórmula Aplicada en Piel',
      subtitle: 'ABSORCIÓN INMEDIATA POST-RUNNING',
      img: '/assets/arm_cream_1.jpg',
      initialRotate: 2.8,
      zIndex: 12,
      aspect: 'aspect-[4/3]',
      colSpan: 'col-span-1 md:col-span-2',
      badge: 'BIOMECÁNICA',
      tag: 'ANTI-ROCE',
    },
    {
      id: 3,
      title: 'Etiqueta Oficial GEORGE 2.0 Diablo',
      subtitle: 'ESMERALDA • PURO CARAMELO',
      img: '/assets/label_diablo_official.jpg',
      initialRotate: -2.2,
      zIndex: 15,
      aspect: 'aspect-[3/4]',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'DIABLO OFICIAL',
      tag: 'CALIDAD & TRADICIÓN',
    },
    {
      id: 4,
      title: 'Resistencia Extrema al Sudor',
      subtitle: 'ESCUDO TÉRMICO ACTIVO 8H',
      img: '/assets/arm_cream_2.jpg',
      initialRotate: 3.2,
      zIndex: 11,
      aspect: 'aspect-[4/3]',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'TEST MARATÓN',
      tag: 'HUMEDAD CERO',
    },
    {
      id: 5,
      title: 'Colección Angel Mugler',
      subtitle: 'AROMA SOFISTICADO POST-CARRERA',
      img: '/assets/george_22_angel_mugler.jpg',
      initialRotate: -4.0,
      zIndex: 14,
      aspect: 'aspect-[3/4]',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'LIMITED EDITION',
      tag: 'ALTA GAMA',
    },
    {
      id: 6,
      title: 'Trío Mira Pal Norte',
      subtitle: 'PACK ULTRA DISTANCIA 120ML',
      img: '/assets/george_22_mira_pal_norte.jpg',
      initialRotate: 1.8,
      zIndex: 13,
      aspect: 'aspect-[3/4]',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'TRAIL RUNNING',
      tag: 'MONTAÑA & ASFALTO',
    },
    {
      id: 7,
      title: 'Atleta Nocturno & Metrópolis',
      subtitle: 'LUCES DE CIUDAD & ALTA VELOCIDAD',
      img: '/assets/campaign_WhatsApp Image 2026-11-10 at 17.55.25.jpeg',
      initialRotate: -2.5,
      zIndex: 16,
      aspect: 'aspect-square',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'MODA RUNNING',
      tag: 'HYPEBEAST',
    },
    {
      id: 8,
      title: 'Equipo & Concentración',
      subtitle: 'EL RITMO NO SE NEGOCIA',
      img: '/assets/campaign_WhatsApp Image 2026-11-21 at 18.54.18.jpeg',
      initialRotate: 3.0,
      zIndex: 10,
      aspect: 'aspect-square',
      colSpan: 'col-span-1 md:col-span-1',
      badge: 'ASFALTO PURO',
      tag: 'VELOCIDAD',
    },
  ];

  return (
    <section className="relative w-full bg-[#0A0D0C] text-white py-24 px-4 sm:px-8 border-t border-[#107C41]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062618] border border-[#00A859]/50 text-[10px] font-mono tracking-widest text-[#00FF88] uppercase mb-3">
            <Sparkles className="w-3 h-3" />
            EDITORIAL & CAMPAÑA VISUAL // 8K RAW
          </div>
          <h2 className="font-grotesk font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            ATMÓSFERA <span className="text-[#00A859]">GEORGE 2.0</span>
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#94A3B8] mt-3">
            Explora la serie fotográfica oficial: el punto de encuentro entre rendimiento extremo, estética de asfalto y lujo botánico.
          </p>
        </div>

        {/* Sellos Tipográficos Flotantes entre espacios vacíos */}
        <div className="relative">
          {/* Sello 1: PURO CARAMELO */}
          <div className="hidden lg:block absolute -top-8 left-4 z-0 pointer-events-none opacity-25 select-none transform -rotate-12">
            <div className="px-5 py-2 rounded-full border-2 border-dashed border-[#00A859] text-xs font-mono font-black text-[#00FF88] tracking-[0.3em]">
              ★ PURO CARAMELO ★
            </div>
          </div>

          {/* Sello 2: ESMERALDA */}
          <div className="hidden lg:block absolute top-1/3 -right-2 z-0 pointer-events-none opacity-25 select-none transform rotate-12">
            <div className="px-6 py-2.5 rounded-lg border-2 border-[#107C41] text-xs font-mono font-black text-white tracking-[0.35em]">
              ESMERALDA // BIO-ACTIVE
            </div>
          </div>

          {/* Sello 3: ZERO FATIGUE */}
          <div className="hidden lg:block absolute -bottom-6 left-1/3 z-0 pointer-events-none opacity-25 select-none transform -rotate-6">
            <div className="px-5 py-1.5 rounded-full bg-[#062618] border border-[#00FF88] text-[11px] font-mono font-bold text-[#00FF88] tracking-[0.25em]">
              ZERO FATIGUE // RUNNING TECH
            </div>
          </div>

          {/* Grid de Collage Orgánico */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {photos.map((item) => (
              <motion.div
                key={item.id}
                initial={{ rotate: item.initialRotate }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  zIndex: 99,
                  transition: { duration: 0.4, ease: 'easeOut' },
                }}
                className={`relative group cursor-pointer ${item.colSpan}`}
                onClick={() => setActivePhoto(item)}
              >
                {/* Estética de Recorte "Torn Paper": Marco fino blanco hueso (#E0E0E0), sombra profunda y textura */}
                <div 
                  className={`w-full ${item.aspect} bg-[#111614] rounded-lg p-2.5 border-[2px] border-[#E0E0E0] shadow-[0_15px_35px_rgba(0,0,0,0.85)] group-hover:border-[#00FF88] group-hover:shadow-[0_20px_45px_rgba(0,168,89,0.35)] transition-colors duration-300 relative overflow-hidden flex flex-col justify-between`}
                >
                  {/* Foto principal */}
                  <div className="w-full h-full rounded overflow-hidden relative bg-black">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay sutil de grano y viñeta oscura */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Tag superior en la imagen */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[9px] font-mono text-[#00FF88] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                      {item.tag}
                    </div>

                    {/* Información inferior */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] block">
                        {item.subtitle}
                      </span>
                      <h4 className="font-grotesk font-bold text-sm text-white group-hover:text-[#00FF88] transition-colors leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Sello "Torn Paper" simulado en la parte inferior */}
                  <div className="pt-2 px-1 flex items-center justify-between text-[9px] font-mono text-[#94A3B8]">
                    <span>COLLECTION 2026</span>
                    <span className="text-[#00A859] font-bold">{item.badge}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
