import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Zap } from 'lucide-react';
import { LogoG2 } from './LogoG2';
import { useStore } from '../context/StoreContext';

export const Navbar = ({ onOpenBuyModal, onOpenAboutModal, onOpenContactModal, onOpenMenuModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCartCount, config } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-full px-5 py-2.5 transition-all duration-300 flex items-center justify-between ${
        scrolled 
          ? 'bg-[#0A0D0C]/85 backdrop-blur-xl border border-[#107C41]/40 shadow-[0_10px_35px_rgba(0,0,0,0.7)]' 
          : 'bg-[#0A0D0C]/40 backdrop-blur-md border border-[#107C41]/20'
      }`}>
        
        {/* Header Izquierdo: Logo circular verde G2 + texto GEORGE VARIEDADES */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <LogoG2 texture={config.logoTexture || 'carbon'} size={38} className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-montserrat font-extrabold text-sm sm:text-base tracking-[0.18em] text-white uppercase group-hover:text-[#00A859] transition-colors">
              {config.heroBrandTitle || 'GEORGE VARIEDADES'}
            </span>
            <span className="font-montserrat text-[9px] font-semibold tracking-[0.25em] text-[#94A3B8] -mt-1 uppercase">
              RUNNING & CARE LAB
            </span>
          </div>
        </div>

        {/* Header Centro: Tres enlaces minimalistas: MENÚ, SOBRE NOSOTROS y CONTACTO */}
        <nav className="hidden md:flex items-center space-x-10">
          <button 
            onClick={onOpenMenuModal}
            className="font-montserrat font-semibold text-[13px] tracking-[0.15em] text-[#E2E8F0]/80 hover:text-white uppercase transition-all duration-200 relative group py-1"
          >
            MENÚ
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#107C41] to-[#00A859] group-hover:w-full transition-all duration-300 rounded-full" />
          </button>

          <a 
            href="#catalogo"
            className="font-montserrat font-semibold text-[13px] tracking-[0.15em] text-[#E2E8F0]/80 hover:text-white uppercase transition-all duration-200 relative group py-1"
          >
            CATÁLOGO
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#107C41] to-[#00A859] group-hover:w-full transition-all duration-300 rounded-full" />
          </a>

          <button 
            onClick={onOpenAboutModal}
            className="font-montserrat font-semibold text-[13px] tracking-[0.15em] text-[#E2E8F0]/80 hover:text-white uppercase transition-all duration-200 relative group py-1"
          >
            SOBRE NOSOTROS
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#107C41] to-[#00A859] group-hover:w-full transition-all duration-300 rounded-full" />
          </button>

          <button 
            onClick={onOpenContactModal}
            className="font-montserrat font-semibold text-[13px] tracking-[0.15em] text-[#E2E8F0]/80 hover:text-white uppercase transition-all duration-200 relative group py-1"
          >
            CONTACTO
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#107C41] to-[#00A859] group-hover:w-full transition-all duration-300 rounded-full" />
          </button>
        </nav>

        {/* Header Derecho: Icono de carrito con contador + botón destacado tipo cápsula verde esmeralda */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenBuyModal}
            aria-label="Ver carrito"
            className="relative p-2 rounded-full text-[#E2E8F0] hover:text-white hover:bg-white/5 transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-[#E2E8F0]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00A859] text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Botón Píldora: "COMPRAR AHORA" con icono de rayo */}
          <button
            onClick={onOpenBuyModal}
            className="relative group overflow-hidden rounded-full px-5 sm:px-6 py-2.5 bg-[#107C41] border border-[#00A859] shadow-[0_0_20px_rgba(16,124,65,0.45)] hover:shadow-[0_0_30px_rgba(0,168,89,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <Zap className="w-3.5 h-3.5 text-white/90 animate-pulse hidden sm:inline-block" />
            <span className="relative font-montserrat font-bold text-[13px] sm:text-[14px] tracking-[0.1em] text-white uppercase whitespace-nowrap">
              COMPRAR AHORA
            </span>
          </button>

          {/* Botón Móvil Menú */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-[#0A0D0C]/95 backdrop-blur-2xl border border-[#107C41]/50 p-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenMenuModal(); }}
            className="text-left font-montserrat font-semibold text-sm tracking-[0.15em] text-[#E2E8F0] hover:text-[#00A859] py-2 border-b border-white/10 uppercase"
          >
            MENÚ
          </button>
          <a
            href="#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left font-montserrat font-semibold text-sm tracking-[0.15em] text-[#E2E8F0] hover:text-[#00A859] py-2 border-b border-white/10 uppercase"
          >
            CATÁLOGO
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenAboutModal(); }}
            className="text-left font-montserrat font-semibold text-sm tracking-[0.15em] text-[#E2E8F0] hover:text-[#00A859] py-2 border-b border-white/10 uppercase"
          >
            SOBRE NOSOTROS
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenContactModal(); }}
            className="text-left font-montserrat font-semibold text-sm tracking-[0.15em] text-[#E2E8F0] hover:text-[#00A859] py-2 border-b border-white/10 uppercase"
          >
            CONTACTO
          </button>
          <div className="pt-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenBuyModal(); }}
              className="w-full py-3 rounded-full bg-[#107C41] border border-[#00A859] font-montserrat font-bold text-sm tracking-[0.1em] text-white uppercase text-center shadow-[0_0_20px_rgba(0,168,89,0.4)]"
            >
              ACCEDER A COMPRA
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
