import React, { useRef, useEffect } from 'react';

export const CarbonParticles = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180, isMoving: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking con suavizado
    const handleMouseMove = (e) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
      mousePos.current.isMoving = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mousePos.current.targetX = e.touches[0].clientX;
        mousePos.current.targetY = e.touches[0].clientY;
        mousePos.current.isMoving = true;
      }
    };

    const handleMouseLeave = () => {
      mousePos.current.targetX = -1000;
      mousePos.current.targetY = -1000;
      mousePos.current.isMoving = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Clase de Partícula de Fibra de Carbono
    class CarbonFragment {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : (Math.random() < 0.5 ? -20 : h + 20);
        this.originX = this.x;
        this.originY = this.y;
        
        // Tipo: 0 = filamento / fibra, 1 = hexágono geométrico, 2 = micro-polvo esmeralda
        this.type = Math.random() < 0.45 ? 0 : (Math.random() < 0.8 ? 1 : 2);
        
        // Dimensiones
        this.size = this.type === 0 ? Math.random() * 8 + 4 : (this.type === 1 ? Math.random() * 5 + 3 : Math.random() * 2 + 1);
        this.aspect = Math.random() * 2 + 1; // Para fibras estiradas
        
        // Movimiento base flotante
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.35 - 0.15; // Ligero ascenso
        
        // Física de reacción al ratón
        this.accX = 0;
        this.accY = 0;
        this.friction = 0.92;
        
        // Rotación
        this.angle = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.015;
        
        // Opacidad y color
        this.baseAlpha = Math.random() * 0.45 + 0.15;
        this.alpha = this.baseAlpha;
        
        if (this.type === 2) {
          // Destellos esmeralda
          this.color = Math.random() < 0.6 ? '#00A859' : '#00FF88';
        } else {
          // Fibras de carbono grafito y plata metálica
          const shades = ['#33413B', '#1E2923', '#47554F', '#94A3B8', '#107C41'];
          this.color = shades[Math.floor(Math.random() * shades.length)];
        }
      }

      update(w, h, mouse) {
        // Suavizar posición del ratón
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;

        // Vector al ratón
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Física fluida de repulsión interactiva
        if (dist < mouse.radius && dist > 1) {
          const force = (1 - dist / mouse.radius) * 3.5;
          const normalX = dx / dist;
          const normalY = dy / dist;
          
          this.accX += normalX * force;
          this.accY += normalY * force;
          this.alpha = Math.min(0.9, this.baseAlpha + 0.35);
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }

        // Aplicar aceleración y fricción
        this.vx = (this.vx + this.accX) * this.friction;
        this.vy = (this.vy + this.accY) * this.friction;
        this.accX = 0;
        this.accY = 0;

        // Añadir velocidad de deriva
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vRot;

        // Límites de pantalla
        if (this.x < -40 || this.x > w + 40 || this.y < -40 || this.y > h + 40) {
          this.reset(w, h);
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        if (this.type === 1) {
          // Hexágono de fibra de carbono
          const r = this.size;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            const hx = r * Math.cos(a);
            const hy = r * Math.sin(a);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          if (Math.random() < 0.3) {
            ctx.stroke();
          } else {
            ctx.fill();
          }
        } else if (this.type === 0) {
          // Filamento de fibra de carbono (rectángulo estilizado con bisel)
          const length = this.size * this.aspect;
          const thickness = Math.max(1, this.size * 0.25);
          ctx.fillRect(-length / 2, -thickness / 2, length, thickness);
        } else {
          // Partícula de energía esmeralda con halo
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00A859';
        }

        ctx.restore();
      }
    }

    // Inicializar banco de partículas
    let particles = [];
    const particleCount = Math.min(110, Math.floor((width * height) / 14000));

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new CarbonFragment(width, height));
      }
    };

    initParticles();

    // Bucle de renderizado 60fps
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dibujar enlaces tenues entre partículas cercanas (red de carbono)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 75) {
            const linkAlpha = (1 - d / 75) * 0.12;
            ctx.strokeStyle = `rgba(0, 168, 89, ${linkAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Actualizar y renderizar partículas individuales
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height, mousePos.current);
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};
