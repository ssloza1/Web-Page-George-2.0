import React from 'react';

export const GiantTypography = ({ mouseX = 0, mouseY = 0 }) => {
  // Parallax suave en dirección opuesta al ratón para máxima profundidad
  const offsetX = mouseX * -25;
  const offsetY = mouseY * -15;

  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none flex flex-col items-center justify-center z-0 overflow-hidden"
      style={{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      <div className="w-full flex flex-col items-center justify-center text-center px-4">
        {/* Línea 1: GEORGE */}
        <h1 
          className="font-giant text-[clamp(4.5rem,14vw,11.5rem)] leading-[0.85] font-black uppercase tracking-tight text-transparent select-none whitespace-nowrap"
          style={{
            WebkitTextStroke: '1.5px rgba(226, 232, 240, 0.16)',
            color: 'rgba(255, 255, 255, 0.04)',
            textShadow: '0 0 50px rgba(0, 168, 89, 0.12)',
          }}
        >
          GEORGE
        </h1>

        {/* Línea 2: VARIEDADES */}
        <h2 
          className="font-giant text-[clamp(3.8rem,11.5vw,9.5rem)] leading-[0.85] font-black uppercase tracking-wider text-transparent select-none whitespace-nowrap -mt-2 sm:-mt-4"
          style={{
            WebkitTextStroke: '1.5px rgba(0, 168, 89, 0.22)',
            color: 'rgba(16, 124, 65, 0.05)',
            textShadow: '0 0 60px rgba(16, 124, 65, 0.15)',
          }}
        >
          VARIEDADES
        </h2>

        {/* Detalle decorativo sutil en el fondo de ingeniería y running */}
        <div className="flex items-center gap-6 mt-4 opacity-15">
          <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#00A859]" />
          <span className="font-grotesk text-[10px] tracking-[0.4em] uppercase text-[#E2E8F0]">
            PERFORMANCE RUNNING TECH // 120ML SPORT LAB
          </span>
          <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#00A859]" />
        </div>
      </div>
    </div>
  );
};
