import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, X, Plus, Trash2, Edit3, Upload,
  Download, RotateCcw, Check, Layers, Package,
  FileText, Palette, Info, Phone, LogOut
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LOGO_TEXTURES } from './LogoG2';

export const AdminCMSDrawer = () => {
  const {
    isAdminOpen, setIsAdminOpen,
    isAdminAuth, logoutAdmin,
    categories, products, config,
    addCategory, deleteCategory,
    addProduct, updateProduct, deleteProduct,
    updateConfig, exportJSON, resetToDefaults, showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState('products');
  const [newCatName, setNewCatName] = useState('');

  // ─── Formulario Producto ────────────────────────────────────────────────
  const [editingId, setEditingId] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '', category: 'cremas',
    price: '', discount: '',
    description: '', image: '', badge: '', tag: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // ─── Formulario Textos Hero ─────────────────────────────────────────────
  const [textForm, setTextForm] = useState({
    heroTagline: config.heroTagline || '',
    heroBrandTitle: config.heroBrandTitle || '',
    featuresTitle: config.featuresTitle || '',
    ctaBannerTitle: config.ctaBannerTitle || '',
    formulaName: config.formulaName || '',
    thermalAction: config.thermalAction || '',
    resistance: config.resistance || '',
    netContent: config.netContent || '',
    editionCode: config.editionCode || '',
  });

  // ─── Formulario Sobre Nosotros ──────────────────────────────────────────
  const [aboutForm, setAboutForm] = useState({
    aboutHistory: config.aboutHistory || '',
    aboutMission: config.aboutMission || '',
    aboutVision: config.aboutVision || '',
    aboutPillar1: config.aboutPillar1 || '',
    aboutPillar1Desc: config.aboutPillar1Desc || '',
    aboutPillar2: config.aboutPillar2 || '',
    aboutPillar2Desc: config.aboutPillar2Desc || '',
    aboutPillar3: config.aboutPillar3 || '',
    aboutPillar3Desc: config.aboutPillar3Desc || '',
  });

  // ─── Formulario Contacto ────────────────────────────────────────────────
  const [contactForm, setContactForm] = useState({
    contactEmail: config.contactEmail || '',
    contactPhone: config.contactPhone || '',
    contactLocation: config.contactLocation || '',
    contactIG: config.contactIG || '',
    contactFB: config.contactFB || '',
    contactWA: config.contactWA || '',
  });

  // ─── Imagen ─────────────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProdForm((prev) => ({ ...prev, image: reader.result }));
      showToast('Imagen cargada');
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = (prod) => {
    setEditingId(prod.id);
    setProdForm({
      name: prod.name, category: prod.category,
      price: prod.price !== null ? prod.price.toString() : '',
      discount: prod.discount !== null ? prod.discount.toString() : '',
      description: prod.description,
      image: prod.image, badge: prod.badge || '', tag: prod.tag || '',
    });
    setImagePreview(prod.image);
    setActiveTab('products');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setProdForm({ name: '', category: 'cremas', price: '', discount: '', description: '', image: '', badge: '', tag: '' });
    setImagePreview('');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodForm.name.trim()) { showToast('Ingresa el nombre del producto'); return; }
    const payload = {
      name: prodForm.name, category: prodForm.category,
      price: prodForm.price !== '' ? parseFloat(prodForm.price) : null,
      discount: prodForm.discount !== '' ? parseFloat(prodForm.discount) : null,
      description: prodForm.description,
      image: prodForm.image || '/assets/george_223_chica_diamonds.jpg',
      badge: prodForm.badge, tag: prodForm.tag,
    };
    editingId ? updateProduct(editingId, payload) : addProduct(payload);
    handleCancelEdit();
  };

  // ─── Helper campos de formulario ────────────────────────────────────────
  const InputField = ({ label, value, onChange, placeholder, type = 'text', textarea = false }) => (
    <div>
      <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none resize-none" />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none" />
      )}
    </div>
  );

  if (!isAdminAuth) return null;

  const TABS = [
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'categories', label: 'Categorías', icon: Layers },
    { id: 'texts', label: 'Portada', icon: FileText },
    { id: 'about', label: 'Nosotros', icon: Info },
    { id: 'contact', label: 'Contacto', icon: Phone },
    { id: 'brand', label: 'Logo G2', icon: Palette },
  ];

  return (
    <>
      {/* Botón Flotante — solo visible para admin autenticado */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0A0D0C]/90 hover:bg-[#107C41] border border-[#107C41]/70 hover:border-[#00FF88] text-white text-xs font-montserrat font-bold tracking-wider shadow-[0_5px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(0,168,89,0.5)] transition-all duration-300"
          title="Abrir Panel de Administración"
        >
          <div className="p-1 rounded-full bg-[#107C41] group-hover:bg-[#00A859] transition-colors">
            <Settings className="w-3.5 h-3.5 text-white animate-spin-slow" />
          </div>
          <span className="hidden sm:inline">Administrar Tienda</span>
          <span className="sm:hidden">CMS</span>
        </button>
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-[#0A0D0C]/90 hover:bg-red-900/60 border border-red-800/40 hover:border-red-500 text-red-400 hover:text-white text-xs font-mono transition-all"
          title="Cerrar Sesión Admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>

      {/* Drawer Lateral */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 flex justify-start bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative w-full max-w-lg h-full bg-[#0E1411] border-r border-[#107C41]/50 shadow-[20px_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
            >
              {/* Encabezado */}
              <div className="p-5 border-b border-white/10 bg-[#062618]/80 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#107C41] border border-[#00FF88] flex items-center justify-center font-bebas text-lg text-white">
                    CMS
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-sm text-white">PANEL DE ADMINISTRACIÓN</h3>
                    <span className="text-[10px] font-mono text-[#00FF88]">GEORGE VARIEDADES // MODO EDICIÓN</span>
                  </div>
                </div>
                <button onClick={() => setIsAdminOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pestañas */}
              <div className="flex border-b border-white/10 bg-[#0A0D0C] overflow-x-auto no-scrollbar shrink-0">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 py-2.5 px-2 text-[10px] font-montserrat font-bold flex flex-col items-center gap-1 whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === id
                        ? 'border-[#00FF88] text-[#00FF88] bg-[#161E1A]'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Contenido con scroll */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">

                {/* ══ TAB 1: PRODUCTOS ══ */}
                {activeTab === 'products' && (
                  <div className="space-y-5">
                    <form onSubmit={handleSaveProduct} className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-mono font-bold text-[#00FF88] uppercase">
                          {editingId ? 'EDITAR PRODUCTO' : '+ NUEVO PRODUCTO'}
                        </span>
                        {editingId && (
                          <button type="button" onClick={handleCancelEdit} className="text-[10px] text-slate-400 hover:text-white underline">
                            Cancelar
                          </button>
                        )}
                      </div>

                      <InputField label="NOMBRE DEL PRODUCTO" value={prodForm.name}
                        onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                        placeholder="Ej. GEORGE 2.0 // Esmeralda" />

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">CATEGORÍA</label>
                          <select value={prodForm.category}
                            onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none">
                            {categories.filter(c => c.id !== 'todos').map((cat) => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">PRECIO (dejar vacío = Consultar)</label>
                          <input type="number" step="0.01" value={prodForm.price}
                            onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                            placeholder="Consultar precio"
                            className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">
                          DESCUENTO % (dejar vacío = sin descuento)
                        </label>
                        <input type="number" step="1" min="0" max="100" value={prodForm.discount}
                          onChange={(e) => setProdForm({ ...prodForm, discount: e.target.value })}
                          placeholder="Ej. 20 (significa 20% de descuento)"
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none" />
                        {prodForm.price && prodForm.discount && (
                          <p className="text-[10px] text-[#00FF88] mt-1">
                            Precio tachado: ${(parseFloat(prodForm.price) / (1 - parseFloat(prodForm.discount) / 100)).toFixed(2)} → Precio final: ${parseFloat(prodForm.price).toFixed(2)}
                          </p>
                        )}
                      </div>

                      <InputField label="DESCRIPCIÓN" value={prodForm.description}
                        onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                        placeholder="Beneficios y características..." textarea />

                      <div>
                        <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">IMAGEN</label>
                        <div className="flex gap-2 mb-2">
                          <input type="text" value={prodForm.image}
                            onChange={(e) => { setProdForm({ ...prodForm, image: e.target.value }); setImagePreview(e.target.value); }}
                            placeholder="URL de imagen o sube archivo"
                            className="flex-1 px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none" />
                          <button type="button" onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-2 rounded-lg bg-[#107C41] hover:bg-[#00A859] text-white text-xs font-semibold flex items-center gap-1.5 shrink-0">
                            <Upload className="w-3.5 h-3.5" /><span>Subir</span>
                          </button>
                          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        </div>
                        {imagePreview && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#00FF88]/50 bg-black p-0.5">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <InputField label="BADGE" value={prodForm.badge}
                          onChange={(e) => setProdForm({ ...prodForm, badge: e.target.value })}
                          placeholder="Ej. NUEVO" />
                        <InputField label="TAG" value={prodForm.tag}
                          onChange={(e) => setProdForm({ ...prodForm, tag: e.target.value })}
                          placeholder="Ej. EXCLUSIVO" />
                      </div>

                      <button type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#107C41] to-[#00A859] hover:from-[#00A859] hover:to-[#00FF88] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all">
                        {editingId ? 'Guardar Cambios' : 'Crear Producto'}
                      </button>
                    </form>

                    {/* Lista de productos */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
                        CATÁLOGO ACTUAL ({products.length} productos)
                      </span>
                      {products.map((p) => {
                        const priceLabel = p.price !== null
                          ? `$${p.price.toFixed(2)}${p.discount ? ` (-${p.discount}%)` : ''}`
                          : 'Consultar';
                        return (
                          <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-[#121715] border border-white/5 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-black border border-white/10 overflow-hidden shrink-0">
                                <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-grotesk font-bold text-xs text-white truncate">{p.name}</div>
                                <div className="text-[10px] font-mono text-[#00FF88]">{priceLabel} • {categories.find(c => c.id === p.category)?.name}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button onClick={() => handleStartEdit(p)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ══ TAB 2: CATEGORÍAS ══ */}
                {activeTab === 'categories' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">+ NUEVA CATEGORÍA</span>
                      <div className="flex gap-2">
                        <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
                          placeholder="Ej. Perfumes, Relojes..."
                          className="flex-1 px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none" />
                        <button type="button" onClick={() => { addCategory(newCatName); setNewCatName(''); }}
                          className="px-4 py-2 rounded-lg bg-[#107C41] hover:bg-[#00A859] text-white text-xs font-montserrat font-bold uppercase transition-all">
                          Crear
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">CATEGORÍAS ACTIVAS</span>
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between p-3 rounded-xl bg-[#121715] border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                            <span className="text-xs font-grotesk font-bold text-white">{cat.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">({cat.id})</span>
                          </div>
                          {cat.id !== 'todos' && cat.id !== 'cremas' && (
                            <button onClick={() => deleteCategory(cat.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ══ TAB 3: PORTADA Y FRASES ══ */}
                {activeTab === 'texts' && (
                  <form onSubmit={(e) => { e.preventDefault(); updateConfig(textForm); }} className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">FRASE HERO Y BRANDING</span>
                      <InputField label="FRASE MOTIVACIONAL HERO (debajo del 3D)" value={textForm.heroTagline}
                        onChange={(e) => setTextForm({ ...textForm, heroTagline: e.target.value })}
                        placeholder="Deja tu presencia, así no estés..." />
                      <InputField label="TÍTULO MARCA" value={textForm.heroBrandTitle}
                        onChange={(e) => setTextForm({ ...textForm, heroBrandTitle: e.target.value })}
                        placeholder="GEORGE VARIEDADES" />
                      <InputField label="TÍTULO SECCIÓN CARACTERÍSTICAS" value={textForm.featuresTitle}
                        onChange={(e) => setTextForm({ ...textForm, featuresTitle: e.target.value })}
                        placeholder="Lo Que Hace Excepcional a GEORGE 2.0" />
                      <InputField label="TÍTULO BANNER CTA INFERIOR" value={textForm.ctaBannerTitle}
                        onChange={(e) => setTextForm({ ...textForm, ctaBannerTitle: e.target.value })}
                        placeholder="Define tu estilo, marca tu esencia..." />
                    </div>
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">ESPECIFICACIONES TÉCNICAS</span>
                      <InputField label="FÓRMULA ACTIVA" value={textForm.formulaName}
                        onChange={(e) => setTextForm({ ...textForm, formulaName: e.target.value })} placeholder="Extracto Bio-Esmeralda" />
                      <InputField label="ACCIÓN PRINCIPAL" value={textForm.thermalAction}
                        onChange={(e) => setTextForm({ ...textForm, thermalAction: e.target.value })} placeholder="Hidratación Profunda" />
                      <InputField label="RESISTENCIA / DURABILIDAD" value={textForm.resistance}
                        onChange={(e) => setTextForm({ ...textForm, resistance: e.target.value })} placeholder="Fragancia Larga Duración" />
                      <InputField label="CONTENIDO NETO" value={textForm.netContent}
                        onChange={(e) => setTextForm({ ...textForm, netContent: e.target.value })} placeholder="150 ml / 5.07 fl.oz" />
                      <InputField label="CÓDIGO DE EDICIÓN" value={textForm.editionCode}
                        onChange={(e) => setTextForm({ ...textForm, editionCode: e.target.value })} placeholder="#GV-ESM-2.0" />
                    </div>
                    <button type="submit"
                      className="w-full py-3 rounded-xl bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all">
                      Guardar Frases y Portada
                    </button>
                  </form>
                )}

                {/* ══ TAB 4: SOBRE NOSOTROS ══ */}
                {activeTab === 'about' && (
                  <form onSubmit={(e) => { e.preventDefault(); updateConfig(aboutForm); }} className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">HISTORIA DE LA MARCA</span>
                      <InputField label="HISTORIA" value={aboutForm.aboutHistory}
                        onChange={(e) => setAboutForm({ ...aboutForm, aboutHistory: e.target.value })}
                        placeholder="Historia de GEORGE VARIEDADES..." textarea />
                    </div>
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">MISIÓN Y VISIÓN</span>
                      <InputField label="MISIÓN" value={aboutForm.aboutMission}
                        onChange={(e) => setAboutForm({ ...aboutForm, aboutMission: e.target.value })}
                        placeholder="Nuestra misión..." textarea />
                      <InputField label="VISIÓN" value={aboutForm.aboutVision}
                        onChange={(e) => setAboutForm({ ...aboutForm, aboutVision: e.target.value })}
                        placeholder="Nuestra visión..." textarea />
                    </div>
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">3 PILARES DE LA MARCA</span>
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="space-y-2">
                          <InputField label={`PILAR ${n} — TÍTULO`} value={aboutForm[`aboutPillar${n}`]}
                            onChange={(e) => setAboutForm({ ...aboutForm, [`aboutPillar${n}`]: e.target.value })}
                            placeholder={`Título Pilar ${n}`} />
                          <InputField label={`PILAR ${n} — DESCRIPCIÓN`} value={aboutForm[`aboutPillar${n}Desc`]}
                            onChange={(e) => setAboutForm({ ...aboutForm, [`aboutPillar${n}Desc`]: e.target.value })}
                            placeholder={`Descripción Pilar ${n}`} />
                        </div>
                      ))}
                    </div>
                    <button type="submit"
                      className="w-full py-3 rounded-xl bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all">
                      Guardar Sobre Nosotros
                    </button>
                  </form>
                )}

                {/* ══ TAB 5: CONTACTO ══ */}
                {activeTab === 'contact' && (
                  <form onSubmit={(e) => { e.preventDefault(); updateConfig(contactForm); }} className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">INFORMACIÓN DE CONTACTO</span>
                      <InputField label="CORREO ELECTRÓNICO" value={contactForm.contactEmail}
                        onChange={(e) => setContactForm({ ...contactForm, contactEmail: e.target.value })}
                        placeholder="hola@georgevariedades.com" />
                      <InputField label="TELÉFONO / WHATSAPP" value={contactForm.contactPhone}
                        onChange={(e) => setContactForm({ ...contactForm, contactPhone: e.target.value })}
                        placeholder="+57 300 928 2000" />
                      <InputField label="UBICACIÓN / COBERTURA DE ENVÍOS" value={contactForm.contactLocation}
                        onChange={(e) => setContactForm({ ...contactForm, contactLocation: e.target.value })}
                        placeholder="Medellín / Bogotá / Envíos Globales" />
                    </div>
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">REDES SOCIALES</span>
                      <InputField label="INSTAGRAM" value={contactForm.contactIG}
                        onChange={(e) => setContactForm({ ...contactForm, contactIG: e.target.value })}
                        placeholder="@georgevariedades" />
                      <InputField label="FACEBOOK" value={contactForm.contactFB}
                        onChange={(e) => setContactForm({ ...contactForm, contactFB: e.target.value })}
                        placeholder="fb.com/georgevariedades" />
                      <InputField label="WHATSAPP (número directo)" value={contactForm.contactWA}
                        onChange={(e) => setContactForm({ ...contactForm, contactWA: e.target.value })}
                        placeholder="+57 300 928 2000" />
                    </div>
                    <button type="submit"
                      className="w-full py-3 rounded-xl bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all">
                      Guardar Información de Contacto
                    </button>
                  </form>
                )}

                {/* ══ TAB 6: LOGO G2 ══ */}
                {activeTab === 'brand' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">ACABADO DEL LOGO G2</span>
                    <p className="text-xs text-[#94A3B8]">Cambia el tratamiento visual del monograma G2 en toda la tienda:</p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {LOGO_TEXTURES.map((tex) => (
                        <div key={tex.id}
                          onClick={() => updateConfig({ logoTexture: tex.id })}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            config.logoTexture === tex.id
                              ? 'bg-[#062618] border-[#00FF88] shadow-[0_0_15px_rgba(0,168,89,0.3)]'
                              : 'bg-[#121715] border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div>
                            <span className="font-grotesk font-bold text-xs text-white block">{tex.name}</span>
                            <span className="text-[10px] text-[#94A3B8]">{tex.desc}</span>
                          </div>
                          {config.logoTexture === tex.id && <Check className="w-4 h-4 text-[#00FF88]" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Footer acciones globales */}
              <div className="p-4 border-t border-white/10 bg-[#0A0D0C] flex items-center justify-between gap-3 shrink-0">
                <button type="button" onClick={resetToDefaults}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white text-xs font-mono transition-colors">
                  <RotateCcw className="w-3 h-3" /><span>Restablecer</span>
                </button>
                <button type="button" onClick={exportJSON}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#107C41] hover:bg-[#00A859] text-white text-xs font-montserrat font-bold transition-all">
                  <Download className="w-3.5 h-3.5" /><span>Exportar JSON</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
