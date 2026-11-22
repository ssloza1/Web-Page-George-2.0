import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { GiantTypography } from './components/GiantTypography';
import { CarbonParticles } from './components/CarbonParticles';
import { Product3DExperience } from './components/Product3DExperience';
import { HeroBottom } from './components/HeroBottom';
import { ProductFeaturesSection } from './components/ProductFeaturesSection';
import { CollageGallerySection } from './components/CollageGallerySection';
import { DynamicCatalogSection } from './components/DynamicCatalogSection';
import { InteractiveVideoSection } from './components/InteractiveVideoSection';
import { AdminCMSDrawer } from './components/AdminCMSDrawer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LogoG2 } from './components/LogoG2';
import { Lock } from 'lucide-react';

// Modales
import { VideoModal } from './components/VideoModal';
import { ApplicationModal } from './components/ApplicationModal';
import { QuickBuyModal } from './components/QuickBuyModal';
import { MenuModal } from './components/MenuModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';

function MainShop() {
  const { config, toastMessage, totalCartCount, isAdminAuth } = useStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Modales públicos
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Modal de login admin
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Detectar hash #admin en la URL
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' && !isAdminAuth) {
        setIsLoginModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [isAdminAuth]);

  return (
    <div className="relative min-h-screen w-full bg-[#0A0D0C] text-white selection:bg-[#00A859] selection:text-white overflow-x-hidden">

      {/* Fondos globales */}
      <div className="fixed inset-0 pointer-events-none -z-20 transition-all duration-700"
        style={{ background: 'radial-gradient(circle at 50% 48%, #062618 0%, #04180F 42%, #0A0D0C 85%)' }} />
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(0,168,89,0.18)_0%,rgba(6,38,24,0.08)_50%,transparent_75%)]" />
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-25 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Navbar */}
      <Navbar
        onOpenBuyModal={() => setIsBuyModalOpen(true)}
        onOpenMenuModal={() => setIsMenuModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* HERO SECTION */}
      <main className="relative w-full flex flex-col items-center justify-center pt-24 sm:pt-28 pb-6 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[580px] sm:min-h-[660px]">
          <GiantTypography mouseX={mousePos.x} mouseY={mousePos.y} />
          <CarbonParticles />
          <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center z-20">
            <Product3DExperience
              mouseNorm={mousePos}
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
              onOpenAppModal={() => setIsAppModalOpen(true)}
              onOpenBuyModal={() => setIsBuyModalOpen(true)}
            />
          </div>
          <HeroBottom
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onOpenAppModal={() => setIsAppModalOpen(true)}
            onOpenBuyModal={() => setIsBuyModalOpen(true)}
          />
        </div>
      </main>

      {/* Secciones */}
      <ProductFeaturesSection onOpenBuyModal={() => setIsBuyModalOpen(true)} />
      <CollageGallerySection />
      <DynamicCatalogSection onOpenBuyModal={() => setIsBuyModalOpen(true)} />
      <InteractiveVideoSection />

      {/* FOOTER */}
      <footer className="relative w-full bg-[#070A09] border-t border-[#107C41]/30 py-16 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <LogoG2 texture={config.logoTexture || 'carbon'} size={36} />
              <div className="flex flex-col">
                <span className="font-montserrat font-extrabold text-sm tracking-[0.18em] text-white uppercase">
                  {config.heroBrandTitle || 'GEORGE VARIEDADES'}
                </span>
                <span className="font-mono text-[9px] text-[#00A859] tracking-widest uppercase">
                  ESTILO · PRESENCIA · ELEGANCIA
                </span>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Cremas, perfumes, ropa y relojes de distinción. Línea Esmeralda &amp; Puro Caramelo — deja tu presencia, así no estés.
            </p>
          </div>

          <div>
            <h5 className="font-grotesk font-bold text-xs tracking-widest text-[#00FF88] uppercase mb-4">
              LÍNEA INSIGNIA
            </h5>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li className="hover:text-white cursor-pointer" onClick={() => setIsBuyModalOpen(true)}>GEORGE 2.0 — Puro Caramelo</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsBuyModalOpen(true)}>GEORGE 2.2 Diablo</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsBuyModalOpen(true)}>GEORGE 2.2 Angel Mugler</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsBuyModalOpen(true)}>Esmeralda Noir Perfume</li>
            </ul>
          </div>

          <div>
            <h5 className="font-grotesk font-bold text-xs tracking-widest text-[#00FF88] uppercase mb-4">
              EXPLORAR
            </h5>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li className="hover:text-white cursor-pointer" onClick={() => setIsMenuModalOpen(true)}>Catálogo Completo</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsAboutModalOpen(true)}>Sobre Nosotros</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsContactModalOpen(true)}>Contacto &amp; Pedidos</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>Ver en Video</li>
            </ul>
          </div>

          <div>
            <h5 className="font-grotesk font-bold text-xs tracking-widest text-[#00FF88] uppercase mb-4">
              ATENCIÓN AL CLIENTE
            </h5>
            <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">
              {config.contactLocation || 'Despacho express a nivel nacional e internacional.'} Garantía de calidad en cada producto.
            </p>
            <div className="p-3 rounded-xl bg-[#121715] border border-white/10 text-xs font-mono text-[#00FF88]">
              #GV-ESM-2026 // ALL RIGHTS RESERVED
            </div>
          </div>

        </div>

        {/* Footer bottom bar — candado de acceso admin (discreto) */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© {new Date().getFullYear()} GEORGE VARIEDADES. El estilo habla por ti.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Términos</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Privacidad</span>
            <span>•</span>
            {/* Candado discreto de acceso admin — solo visible si no está autenticado */}
            {!isAdminAuth && (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-1 rounded text-slate-700 hover:text-slate-400 transition-colors"
                title="Acceso administrador"
                aria-label="Acceso administrador"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Panel Admin CMS (solo se renderiza si está autenticado) */}
      <AdminCMSDrawer />

      {/* Modal de Login Admin */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => { setIsLoginModalOpen(false); window.history.replaceState(null, '', window.location.pathname); }}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[60] px-4 py-2.5 rounded-xl bg-[#062618]/95 backdrop-blur-md border border-[#00FF88] text-white text-xs font-grotesk font-bold shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(0,255,136,0.3)] flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modales públicos */}
      <QuickBuyModal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} onOpenBuyModal={() => setIsBuyModalOpen(true)} />
      <ApplicationModal isOpen={isAppModalOpen} onClose={() => setIsAppModalOpen(false)} onOpenBuyModal={() => setIsBuyModalOpen(true)} />
      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} onSelectProduct={() => setIsBuyModalOpen(true)} />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

    </div>
  );
}

export function App() {
  return (
    <StoreProvider>
      <MainShop />
    </StoreProvider>
  );
}

export default App;
