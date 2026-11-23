import React, { useState } from 'react';
import { Edit3, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const CategoryCard = ({ category, title, eyebrow, onOpenBuyModal, dark = false }) => {
  const { products, isAdminAuth, setIsAdminOpen, addToCart, deleteProduct } = useStore();
  const [gender, setGender] = useState('hombre');
  const normalize = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

  const sectionCategory = normalize(category);
  const filtered = products.filter((product) => {
    const productCategory = normalize(product.category);
    const productGender = normalize(product.gender);
    const categoryMatches = productCategory === sectionCategory
      || (sectionCategory === 'cremas' && ['crema', 'cremas'].includes(productCategory))
      || (sectionCategory === 'perfumes' && ['perfume', 'perfumes'].includes(productCategory))
      || (sectionCategory === 'ropa' && ['ropa', 'vestimenta'].includes(productCategory))
      || (sectionCategory === 'relojes' && ['reloj', 'relojes'].includes(productCategory));
    if (!categoryMatches) return false;
    if (sectionCategory === 'cremas') return true;
    if (!productGender) return true;
    return productGender === gender || ['unisex', 'todos', 'all'].includes(productGender);
  });
  const isEmpty = filtered.length === 0;
  const isCream = category === 'cremas';

  return (
    <section id={category} className={`py-20 sm:py-28 px-4 sm:px-8 ${dark ? 'bg-[#0A0A0A] text-white scrolly-dark' : 'bg-white text-[#0A0A0A]'}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-current/15 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className={`mb-3 text-[10px] font-bold tracking-[0.28em] ${dark ? 'text-white/55' : 'text-black/45'}`}>{eyebrow}</p>
            <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">{title}</h2>
          </div>
          {!isCream && (
            <div className="flex gap-3">
              {['hombre', 'mujer'].map((item) => (
                <button key={item} onClick={() => setGender(item)} className={`border px-5 py-3 text-[11px] font-black tracking-[0.18em] uppercase transition-all ${gender === item ? (dark ? 'border-white bg-white text-black' : 'border-black bg-black text-white') : 'border-current/20 hover:-translate-y-1'}`}>
                  {item}
                </button>
              ))}
            </div>
          )}
          {isCream && isAdminAuth && (
            <button onClick={() => setIsAdminOpen(true)} className="flex items-center gap-2 border border-current/25 px-5 py-3 text-[10px] font-black uppercase tracking-widest">
              <Plus className="h-4 w-4" /> Agregar producto
            </button>
          )}
        </div>

        {!isCream && (
          <div className="mb-10 grid grid-cols-2 gap-4 sm:max-w-3xl">
            {[
              ['hombre', '/assets/logo-hombres.png'],
              ['mujer', '/assets/logo-mujeres.png'],
            ].map(([item, image]) => (
              <button key={item} onClick={() => setGender(item)} className={`gender-card ${gender === item ? 'gender-card-active' : ''}`}>
                <img src={image} alt={item} className="h-24 w-full object-contain sm:h-36" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        )}

        {isEmpty ? (
          <div className="border border-dashed border-current/25 px-6 py-16 text-center">
            <p className="mx-auto max-w-xl text-lg font-medium opacity-70">
              Próximamente nuevos lanzamientos exclusivos de GEORGE VARIEDADES en esta categoría.
            </p>
            {isAdminAuth && (
              <button onClick={() => setIsAdminOpen(true)} className="mx-auto mt-7 flex h-28 w-full max-w-md flex-col items-center justify-center border border-current/30 transition-transform hover:-translate-y-1">
                <Plus className="mb-2 h-8 w-8" />
                <span className="text-xs font-bold uppercase tracking-widest">Agregar producto en esta categoría / género</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <article key={product.id} className={`group border ${dark ? 'border-white/15 bg-black' : 'border-black/10 bg-white'} relative overflow-hidden`}>
                <div className={`relative aspect-[4/5] flex items-center justify-center p-5 ${dark ? 'bg-[#111]' : 'bg-[#F6F6F4]'}`}>
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
                  {product.discount && <span className="absolute left-4 top-4 bg-black px-3 py-1 text-[9px] font-bold text-white">-{product.discount}%</span>}
                  {isAdminAuth && (
                    <div className="absolute right-3 top-3 flex gap-2">
                      <button onClick={() => setIsAdminOpen(true)} className="rounded-full bg-white p-2 text-black shadow" title="Editar"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => deleteProduct(product.id)} className="rounded-full bg-white p-2 text-black shadow" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="min-h-12 text-base font-bold leading-tight">{product.name}</h3>
                  <p className="mt-2 min-h-10 text-xs leading-relaxed opacity-55">{product.description}</p>
                  <div className="mt-5 flex items-end justify-between border-t border-current/10 pt-4">
                    <div>
                      {product.price ? (
                        <div className="flex items-baseline gap-2">
                          {product.originalPrice && <span className="text-xs opacity-50 line-through">${Number(product.originalPrice).toFixed(2)}</span>}
                          <span className="text-lg font-black">${Number(product.price).toFixed(2)}</span>
                        </div>
                      ) : <span className="text-xs font-bold">Consultar</span>}
                    </div>
                    <button onClick={() => product.price ? addToCart(product) : onOpenBuyModal()} className="bg-black px-4 py-2.5 text-[10px] font-bold tracking-widest text-white transition-colors hover:bg-[#107C41]">
                      AGREGAR
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const DynamicCatalogCards = ({ onOpenBuyModal }) => {
  const { categories } = useStore();
  const visibleCategories = categories.filter((category) => {
    const id = String(category.id || '').trim().toLowerCase();
    return id && id !== 'todos';
  });

  return (
    <>
      {visibleCategories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category.id}
          title={String(category.name || category.id).toUpperCase()}
          eyebrow="COLECCIÓN GEORGE VARIEDADES"
          onOpenBuyModal={onOpenBuyModal}
          dark={index % 2 === 1}
        />
      ))}
    </>
  );
};

export const DynamicCatalogSection = ({ onOpenBuyModal }) => (
  <DynamicCatalogCards onOpenBuyModal={onOpenBuyModal} />
);
