import React from 'react';

export const LOGO_TEXTURES = [
  { id: 'carbon', name: 'Fibra de Carbono', desc: 'Carbono forjado con vetas de resina esmeralda' },
  { id: 'white', name: 'Mate Blanco Puro', desc: 'Geometría minimalista de corte diamante' },
  { id: 'asphalt', name: 'Asfalto Mojado', desc: 'Pavimento mojado con reflejos de lluvia nocturna' },
  { id: 'mesh', name: 'Malla Running', desc: 'Tejido técnico microperforado transpirable' },
  { id: 'neon', name: 'Neón Verde Esmeralda', desc: 'Tubos de plasma eléctrico #00A859' },
  { id: 'volcanic', name: 'Roca Volcánica', desc: 'Basalto poroso con cristales de esmeralda bruta' },
  { id: 'chrome', name: 'Cromo Líquido', desc: 'Mercurio líquido reflectivo de alta tensión' },
];

export const LogoG2 = ({ texture = 'carbon', size = 40, className = '' }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      title={`Logo G2 - Textura: ${LOGO_TEXTURES.find(t => t.id === texture)?.name || texture}`}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* 1. Fibra de Carbono: Forged carbon pattern con vetas esmeralda */}
          <pattern id="g2-carbon-pattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#141917" />
            <polygon points="0,0 6,3 3,9 0,6" fill="#1e2723" />
            <polygon points="6,3 12,0 9,6 6,3" fill="#28352f" />
            <polygon points="3,9 9,6 12,12 6,9" fill="#0f1512" />
            <polygon points="0,6 3,9 6,12 0,12" fill="#107C41" opacity="0.45" />
            <line x1="0" y1="0" x2="12" y2="12" stroke="#00FF88" strokeWidth="0.5" opacity="0.4" />
          </pattern>

          {/* 2. Asfalto Mojado */}
          <radialGradient id="g2-asphalt-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#4A5568" />
            <stop offset="60%" stopColor="#2D3748" />
            <stop offset="100%" stopColor="#062618" />
          </radialGradient>

          {/* 3. Neón Verde Esmeralda */}
          <filter id="g2-neon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 4. Cromo Líquido / Mercurio */}
          <linearGradient id="g2-chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#107C41" />
            <stop offset="75%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#00FF88" />
          </linearGradient>

          {/* 5. Malla Running */}
          <pattern id="g2-mesh-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#1a201c" />
            <circle cx="3" cy="3" r="1.5" fill="#0A0D0C" />
            <circle cx="3" cy="3" r="0.8" fill="#00A859" opacity="0.7" />
          </pattern>

          {/* 6. Roca Volcánica */}
          <linearGradient id="g2-volcanic-grad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#1A202C" />
            <stop offset="45%" stopColor="#2D3748" />
            <stop offset="55%" stopColor="#00A859" />
            <stop offset="100%" stopColor="#062618" />
          </linearGradient>
        </defs>

        {/* Marco Geométrico Corte Diamante Esmeralda */}
        <polygon 
          points="50,6 88,24 88,76 50,94 12,76 12,24" 
          fill={
            texture === 'white' ? '#0A0D0C' :
            texture === 'carbon' ? '#090D0B' :
            texture === 'neon' ? 'rgba(6,38,24,0.7)' :
            texture === 'chrome' ? 'rgba(10,13,12,0.85)' : '#0A0D0C'
          }
          stroke={
            texture === 'white' ? '#FFFFFF' :
            texture === 'carbon' ? '#107C41' :
            texture === 'asphalt' ? '#718096' :
            texture === 'mesh' ? '#00A859' :
            texture === 'neon' ? '#00FF88' :
            texture === 'volcanic' ? '#2D3748' :
            '#E2E8F0'
          }
          strokeWidth={texture === 'neon' ? '2.5' : '3'}
          filter={texture === 'neon' ? 'url(#g2-neon-glow)' : undefined}
        />

        {/* Facetas interiores del diamante esmeralda */}
        <line x1="50" y1="6" x2="50" y2="20" stroke={texture === 'neon' ? '#00FF88' : '#107C41'} strokeWidth="1.2" opacity="0.6" />
        <line x1="12" y1="24" x2="26" y2="34" stroke={texture === 'neon' ? '#00FF88' : '#107C41'} strokeWidth="1.2" opacity="0.6" />
        <line x1="88" y1="24" x2="74" y2="34" stroke={texture === 'neon' ? '#00FF88' : '#107C41'} strokeWidth="1.2" opacity="0.6" />

        {/* Monograma Geométrico Central "G2" en ángulo ascendente */}
        <g 
          transform="translate(50, 52) rotate(-5) translate(-50, -52)"
          filter={texture === 'neon' ? 'url(#g2-neon-glow)' : undefined}
        >
          {/* Letra G Monumental */}
          <path
            d="M 44 32 L 28 32 C 22 32 18 36 18 42 L 18 58 C 18 64 22 68 28 68 L 42 68 C 47 68 50 65 50 60 L 50 50 L 34 50 L 34 56 L 42 56 L 42 60 L 26 60 L 26 40 L 44 40 Z"
            fill={
              texture === 'white' ? '#FFFFFF' :
              texture === 'carbon' ? 'url(#g2-carbon-pattern)' :
              texture === 'asphalt' ? 'url(#g2-asphalt-grad)' :
              texture === 'mesh' ? 'url(#g2-mesh-pattern)' :
              texture === 'neon' ? '#FFFFFF' :
              texture === 'volcanic' ? 'url(#g2-volcanic-grad)' :
              'url(#g2-chrome-grad)'
            }
            stroke={
              texture === 'neon' ? '#00FF88' :
              texture === 'carbon' ? '#00A859' :
              texture === 'white' ? 'none' : '#E2E8F0'
            }
            strokeWidth={texture === 'neon' ? '1.5' : '0.8'}
          />

          {/* Número 2 Dinámico y Ascendente */}
          <path
            d="M 52 38 C 52 33 56 30 62 30 C 69 30 74 34 74 40 C 74 46 68 52 62 58 L 74 58 L 74 66 L 52 66 L 52 60 L 64 48 C 66 46 68 43 68 40 C 68 37 66 35 62 35 C 58 35 56 37 56 40 Z"
            fill={
              texture === 'white' ? '#FFFFFF' :
              texture === 'carbon' ? 'url(#g2-carbon-pattern)' :
              texture === 'asphalt' ? 'url(#g2-asphalt-grad)' :
              texture === 'mesh' ? 'url(#g2-mesh-pattern)' :
              texture === 'neon' ? '#FFFFFF' :
              texture === 'volcanic' ? 'url(#g2-volcanic-grad)' :
              'url(#g2-chrome-grad)'
            }
            stroke={
              texture === 'neon' ? '#00FF88' :
              texture === 'carbon' ? '#00FF88' :
              texture === 'white' ? 'none' : '#00A859'
            }
            strokeWidth={texture === 'neon' ? '1.5' : '0.8'}
          />
        </g>
      </svg>
    </div>
  );
};
