import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, Filter, ChevronRight, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DynamicCatalogSection = ({ onOpenBuyModal }) => {
  const { categories, products, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState('todos');
  const [addedIds, setAddedIds] = useState({});

  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="catalogo" className="relative w-full bg-[#0A0D0C] text-white py-24 px-4 sm:px-8 border-t border-[#107C41]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado del Catálogo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062618] border border-[#00A859]/50 text-[10px] font-mono tracking-widest text-[#00FF88] uppercase mb-2">
              <Zap className="w-3 h-3" />
              COLECCIÓN DE ALTO RENDIMIENTO // MULTI-CATEGORÍA
            </div>
            <h2 className="font-grotesk font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              CATÁLOGO <span className="text-[#00A859]">OFICIAL</span>
            </h2>
          </div>
          <p className="font-inter text-sm sm:text-base text-[#94A3B8] max-w-md">
            Desde la fórmula dermo-deportiva GEORGE 2.0 hasta indumentaria técnica y accesorios diseñados para optimizar cada zancada.
          </p>
        </div>

        {/* 1. Barra de Filtros Tipo Cápsula en la parte superior */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-montserrat font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#107C41] text-white border border-[#00FF88] shadow-[0_0_20px_rgba(0,168,89,0.5)] scale-105'
                    : 'bg-[#111614] text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />}
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-60 font-mono">
                  ({cat.id === 'todos' ? products.length : products.filter(p => p.category === cat.id).length})
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Cuadrícula Elegante Dark Luxury (Grid 3 cols escritorio, 1 col móvil) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedIds[product.id];

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-[#111614] border border-white/10 hover:border-[#00A859] hover:shadow-[0_15px_40px_rgba(0,168,89,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Imagen del Producto con aspect ratio y zoom sutil */}
                <div className="relative aspect-[4/3] w-full bg-[#0A0D0C] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badge de Categoría y Tag */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#062618]/90 border border-[#107C41] text-[10px] font-mono font-bold text-[#00FF88] uppercase">
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-mono text-white">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Precio Flotante */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-montserrat font-extrabold text-[#00FF88]">
                    ${product.price.toFixed(2)} USD
                  </div>
                </div>

                {/* Contenido / Información */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-grotesk font-bold text-lg sm:text-xl text-white group-hover:text-[#00FF88] transition-colors leading-snug mb-2">
                      {product.name}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* Especificaciones / Chips */}
                    {product.specs && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {product.specs.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#CBD5E1]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Barra de Precios y Botón de Añadir al Carrito */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#94A3B8] block">PRECIO OFICIAL</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-montserrat font-black text-lg text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.regularPrice && (
                          <span className="font-montserrat text-xs text-[#94A3B8] line-through">
                            ${product.regularPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`px-4 py-2.5 rounded-xl font-montserrat font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                        isJustAdded
                          ? 'bg-[#00A859] text-white shadow-[0_0_15px_rgba(0,168,89,0.7)]'
                          : 'bg-[#161E1A] hover:bg-[#107C41] border border-[#107C41]/50 hover:border-[#00FF88] text-[#E2E8F0] hover:text-white shadow-md'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>¡AÑADIDO!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>AÑADIR</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner inferior de Compra Rápida para GEORGE 2.0 */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#062618] via-[#0E1B15] to-[#0A0D0C] border border-[#00A859]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,168,89,0.15)]">
          <div>
            <span className="text-[10px] font-mono text-[#00FF88] tracking-widest uppercase block mb-1">
              ENVÍO EXPRÉS GRATUITO EN PEDIDOS SUPERIORES A $50 USD
            </span>
            <h4 className="font-grotesk font-bold text-xl sm:text-2xl text-white">
              ¿Listo para dominar el asfalto con GEORGE 2.0?
            </h4>
          </div>
          <button
            onClick={onOpenBuyModal}
            className="px-8 py-3.5 rounded-full bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,168,89,0.4)] whitespace-nowrap"
          >
            COMPRAR FÓRMULA INSIGNIA ($34.99)
          </button>
        </div>

      </div>
    </section>
  );
};
