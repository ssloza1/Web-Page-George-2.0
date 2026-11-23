import React, { useEffect, useState } from 'react';
import { Lock, Volume2, VolumeX } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { DynamicCatalogSection } from './components/DynamicCatalogSection';
import { AdminCMSDrawer } from './components/AdminCMSDrawer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { QuickBuyModal } from './components/QuickBuyModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';

function MainShop() {
  const { config, isAdminAuth, logoutAdmin, updateConfig, toastMessage } = useStore();
  const [loginOpen, setLoginOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' && !isAdminAuth) setLoginOpen(true);
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [isAdminAuth]);

  const editText = (field, value) => {
    if (isAdminAuth) updateConfig({ [field]: value });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0A0A0A]">
      {isAdminAuth && (
        <div className="fixed left-1/2 top-[74px] z-[55] -translate-x-1/2 rounded-full bg-[#107C41] px-5 py-2 text-[10px] font-black tracking-[0.16em] text-white shadow-xl">
          MODO EDICIÓN ACTIVO
        </div>
      )}

      <Navbar
        onOpenBuyModal={() => setBuyOpen(true)}
        onOpenAboutModal={() => setAboutOpen(true)}
        onOpenContactModal={() => setContactOpen(true)}
      />

      <main>
        <section id="inicio" className="relative min-h-[820px] overflow-hidden bg-[#F7F7F4] px-4 pb-10 pt-24 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex h-[250px] items-center justify-center sm:h-[300px]">
              <img
                src="/assets/george-22-oficial.jpeg"
                alt="Logo oficial GEORGE 2.2"
                className="aspect-square h-[230px] w-[230px] overflow-hidden rounded-full object-cover object-center drop-shadow-[0_18px_28px_rgba(0,0,0,.12)] sm:h-[280px] sm:w-[280px]"
              />
            </div>

            <div className="grid min-h-[390px] overflow-hidden rounded-none border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,.08)] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex items-center px-6 py-10 sm:px-12 lg:px-16">
                <div className="max-w-xl">
                  <p className="mb-6 text-[10px] font-black tracking-[0.3em] text-black/45">ESENCIA / IDENTIDAD / PRESENCIA</p>
                  <div
                    suppressContentEditableWarning
                    contentEditable={isAdminAuth}
                    onBlur={(e) => editText('heroManifesto', e.currentTarget.innerText)}
                    className={`border-l-2 border-[#107C41] pl-5 text-lg leading-[1.55] sm:text-[22px] ${isAdminAuth ? 'cursor-text outline-dashed outline-1 outline-[#107C41]/40' : ''}`}
                  >
                    {config.heroManifesto}
                  </div>
                </div>
              </div>

              <div className="relative min-h-[330px] overflow-hidden border-t border-black/10 bg-black lg:border-l lg:border-t-0">
                <video
                  src="/assets/entregando-cremas.mp4"
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/55 px-5 py-4 text-white backdrop-blur-sm">
                  <p className="text-[9px] font-black tracking-[0.16em]">Producto Entregado — GEORGE 2.2 en manos de nuestra gente</p>
                  <button onClick={() => setMuted(!muted)} className="text-white" aria-label="Controlar sonido">
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scrolly-section relative px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-[0.28em] opacity-60">NUESTRA ESENCIA</p>
              <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                TU ESTILO.<br />TU AROMA.<br /><span className="italic">TU PRESENCIA.</span>
              </h1>
            </div>
            <div className="border-l border-current/20 pl-6 sm:pl-10">
              <p className="max-w-xl text-lg leading-relaxed sm:text-2xl">
                GEORGE 2.2 convierte el cuidado personal en una firma. Crema, esencia y carácter: una sola huella hecha a tu medida.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-current/20 pt-5">
                <div><b className="block text-xl">120 ml</b><span className="text-[9px] tracking-widest opacity-60">CONTENIDO</span></div>
                <div><b className="block text-xl">24h</b><span className="text-[9px] tracking-widest opacity-60">PRESENCIA</span></div>
                <div><b className="block text-xl">G2.2</b><span className="text-[9px] tracking-widest opacity-60">EDICIÓN</span></div>
              </div>
            </div>
          </div>
        </section>

        <DynamicCatalogSection onOpenBuyModal={() => setBuyOpen(true)} />

        <section id="nosotros" className="bg-[#F3F3EF] px-4 py-24 sm:px-8">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-5 text-[10px] font-bold tracking-[0.28em] text-black/45">SOBRE NOSOTROS</p>
            <div className="grid gap-12 border-t border-black/15 pt-8 md:grid-cols-3">
              {[
                ['Misión', 'aboutMission', config.aboutMission],
                ['Visión', 'aboutVision', config.aboutVision],
                ['Historia', 'aboutHistory', config.aboutHistory],
              ].map(([title, field, value]) => (
                <article key={field}>
                  <h3 className="mb-5 text-sm font-black tracking-[0.18em]">{title.toUpperCase()}</h3>
                  <p
                    suppressContentEditableWarning
                    contentEditable={isAdminAuth}
                    onBlur={(e) => editText(field, e.currentTarget.innerText)}
                    className={`text-sm leading-7 text-black/65 ${isAdminAuth ? 'outline-dashed outline-1 outline-[#107C41]/40' : ''}`}
                  >
                    {value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-white px-4 py-20 sm:px-8">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 border-t border-black/15 pt-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.28em] text-black/45">CONTACTO</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">CONVERSEMOS.</h2>
            </div>
            <div className="text-sm leading-7 sm:text-right">
              <p>{config.contactEmail}</p>
              <a href={`https://wa.me/${(config.contactPhone || config.contactWA || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="underline decoration-black/20">
                {config.contactPhone}
              </a>
              <p>{config.contactLocation}</p>
              {config.contactMessage && <p className="mt-2 max-w-sm text-black/55 sm:ml-auto">{config.contactMessage}</p>}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 text-[10px] tracking-wider sm:flex-row">
          <p>© {new Date().getFullYear()} GEORGE VARIEDADES</p>
          <div className="flex items-center gap-5">
            <span>PRIVACIDAD</span>
            {!isAdminAuth && (
              <button onClick={() => setLoginOpen(true)} className="flex items-center gap-2 text-black/45 hover:text-black">
                <Lock className="h-3 w-3" /> Acceso Administrador
              </button>
            )}
            {isAdminAuth && <button onClick={logoutAdmin} className="font-bold">Cerrar sesión</button>}
          </div>
        </div>
      </footer>

      <AdminCMSDrawer />
      <AdminLoginModal isOpen={loginOpen} onClose={() => { setLoginOpen(false); window.history.replaceState(null, '', window.location.pathname); }} />
      <QuickBuyModal isOpen={buyOpen} onClose={() => setBuyOpen(false)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {toastMessage && <div className="fixed right-5 top-24 z-[80] rounded-full bg-black px-5 py-3 text-xs font-bold text-white shadow-xl">{toastMessage}</div>}
    </div>
  );
}

export function App() {
  return <StoreProvider><MainShop /></StoreProvider>;
}

export default App;
