import React, { useState } from 'react';
import { ShoppingBag, Check, MessageCircle, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DynamicCatalogSection = ({ onOpenBuyModal }) => {
  const { categories, products, config, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState('todos');
  const [addedIds, setAddedIds] = useState({});

  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  // Calcula precio tachado cuando hay descuento
  const getOriginalPrice = (price, discount) => {
    if (!price || !discount) return null;
    return price / (1 - discount / 100);
  };

  return (
    <section id="catalogo" className="relative w-full bg-[#0A0D0C] text-white py-24 px-4 sm:px-8 border-t border-[#107C41]/20">
      <div className="max-w-7xl mx-auto">

        {/* Encabezado del Catálogo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062618] border border-[#00A859]/50 text-[10px] font-mono tracking-widest text-[#00FF88] uppercase mb-2">
              <Zap className="w-3 h-3" />
              COLECCIÓN GEORGE VARIEDADES // MULTI-CATEGORÍA
            </div>
            <h2 className="font-grotesk font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              CATÁLOGO <span className="text-[#00A859]">OFICIAL</span>
            </h2>
          </div>
          <p className="font-inter text-sm sm:text-base text-[#94A3B8] max-w-md">
            Cremas, perfumes, ropa y relojes — cada producto diseñado para definir tu estilo y marcar tu presencia.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'todos' ? products.length : products.filter(p => p.category === cat.id).length;
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
                <span className="text-[10px] opacity-60 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedIds[product.id];
            const hasPrice = product.price !== null && product.price !== undefined;
            const originalPrice = getOriginalPrice(product.price, product.discount);

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-[#111614] border border-white/10 hover:border-[#00A859] hover:shadow-[0_15px_40px_rgba(0,168,89,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Imagen */}
                <div className="relative aspect-[4/3] w-full bg-[#0A0D0C] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image} alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#062618]/90 border border-[#107C41] text-[10px] font-mono font-bold text-[#00FF88] uppercase">
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-mono text-white">
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-[9px] font-mono font-bold text-white">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  {/* Precio flotante */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-montserrat font-extrabold text-[#00FF88]">
                    {hasPrice ? `$${product.price.toFixed(2)} USD` : 'Consultar'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-grotesk font-bold text-lg sm:text-xl text-white group-hover:text-[#00FF88] transition-colors leading-snug mb-2">
                      {product.name}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    {product.specs && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {product.specs.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#CBD5E1]">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Precio + Botón */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#94A3B8] block">PRECIO OFICIAL</span>
                      {hasPrice ? (
                        <div className="flex items-baseline gap-2">
                          <span className="font-montserrat font-black text-lg text-white">
                            ${product.price.toFixed(2)}
                          </span>
                          {originalPrice && (
                            <span className="font-montserrat text-xs text-[#94A3B8] line-through">
                              ${originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="font-montserrat font-bold text-sm text-[#00FF88]">Consultar precio</span>
                      )}
                    </div>

                    {hasPrice ? (
                      <button
                        onClick={() => handleAdd(product)}
                        className={`px-4 py-2.5 rounded-xl font-montserrat font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                          isJustAdded
                            ? 'bg-[#00A859] text-white shadow-[0_0_15px_rgba(0,168,89,0.7)]'
                            : 'bg-[#161E1A] hover:bg-[#107C41] border border-[#107C41]/50 hover:border-[#00FF88] text-[#E2E8F0] hover:text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <><Check className="w-4 h-4 stroke-[3]" /><span>¡AÑADIDO!</span></>
                        ) : (
                          <><ShoppingBag className="w-3.5 h-3.5" /><span>AÑADIR</span></>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={onOpenBuyModal}
                        className="px-4 py-2.5 rounded-xl font-montserrat font-bold text-xs tracking-wider uppercase bg-[#161E1A] hover:bg-[#107C41] border border-[#107C41]/50 hover:border-[#00FF88] text-[#E2E8F0] hover:text-white transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>CONSULTAR</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA inferior — texto dinámico, sin precio hardcodeado */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#062618] via-[#0E1B15] to-[#0A0D0C] border border-[#00A859]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,168,89,0.15)]">
          <div>
            <span className="text-[10px] font-mono text-[#00FF88] tracking-widest uppercase block mb-1">
              ENVÍO EXPRÉS EN PEDIDOS SELECCIONADOS
            </span>
            <h4 className="font-grotesk font-bold text-xl sm:text-2xl text-white">
              {config.ctaBannerTitle || 'Define tu estilo, marca tu esencia. Descubre la colección GEORGE 2.0.'}
            </h4>
          </div>
          <button
            onClick={onOpenBuyModal}
            className="px-8 py-3.5 rounded-full bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,168,89,0.4)] whitespace-nowrap"
          >
            EXPLORAR COLECCIÓN
          </button>
        </div>

      </div>
    </section>
  );
};
