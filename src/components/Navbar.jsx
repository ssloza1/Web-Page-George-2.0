import React, { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar = ({ onOpenBuyModal, onOpenAboutModal, onOpenContactModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { categories, totalCartCount } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['INICIO', '#inicio'],
    ...categories
      .filter((category) => String(category.id || '').trim().toLowerCase() !== 'todos')
      .map((category) => [String(category.name || category.id).toUpperCase(), `#${category.id}`]),
    ['SOBRE NOSOTROS', '#nosotros'],
    ['CONTACTO', '#contacto'],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6 py-3">
      <div className={`mx-auto max-w-[1400px] border-b px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all ${scrolled ? 'bg-white/95 border-black/10 shadow-[0_8px_30px_rgba(0,0,0,.06)] backdrop-blur-xl' : 'bg-white/85 border-black/5 backdrop-blur-md'}`}>
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/assets/george-22-oficial.jpeg" alt="George Variedades" className="h-11 w-11 rounded-full object-cover border border-black/10" />
          <span className="hidden sm:block text-[13px] font-black tracking-[0.16em] text-black">GEORGE VARIEDADES</span>
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="editorial-nav">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onOpenBuyModal} aria-label="Ver carrito" className="relative p-2 text-black">
            <ShoppingBag className="h-5 w-5" />
            {totalCartCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">{totalCartCount}</span>}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 text-black lg:hidden" aria-label="Abrir menú">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-3 mt-2 grid grid-cols-2 gap-4 border border-black/10 bg-white p-5 shadow-xl lg:hidden">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="text-[11px] font-bold tracking-[0.12em] text-black">{label}</a>
          ))}
        </div>
      )}
    </header>
  );
};
