import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, X, Plus, Trash2, Edit3, Image as ImageIcon, 
  Upload, Download, RotateCcw, Check, Layers, Package, FileText, Palette
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LOGO_TEXTURES } from './LogoG2';

export const AdminCMSDrawer = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    categories,
    products,
    config,
    addCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateConfig,
    exportJSON,
    resetToDefaults,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'categories' | 'products' | 'texts' | 'brand'
  const [newCatName, setNewCatName] = useState('');

  // Formulario de Producto (Crear / Editar)
  const [editingId, setEditingId] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'cremas',
    price: '',
    description: '',
    image: '',
    badge: '',
    tag: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // Formulario de Textos
  const [textForm, setTextForm] = useState({
    heroTagline: config.heroTagline || '',
    heroBrandTitle: config.heroBrandTitle || '',
    featuresTitle: config.featuresTitle || '',
    featuresSubtitle: config.featuresSubtitle || '',
    formulaName: config.formulaName || '',
    thermalAction: config.thermalAction || '',
    resistance: config.resistance || '',
    netContent: config.netContent || '',
    editionCode: config.editionCode || '',
  });

  // Manejador de subida de imagen a Base64
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setProdForm((prev) => ({ ...prev, image: base64 }));
      showToast('Imagen cargada correctamente');
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = (prod) => {
    setEditingId(prod.id);
    setProdForm({
      name: prod.name,
      category: prod.category,
      price: prod.price.toString(),
      description: prod.description,
      image: prod.image,
      badge: prod.badge || '',
      tag: prod.tag || '',
    });
    setImagePreview(prod.image);
    setActiveTab('products');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setProdForm({
      name: '',
      category: categories[1]?.id || 'cremas',
      price: '',
      description: '',
      image: '',
      badge: '',
      tag: '',
    });
    setImagePreview('');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodForm.name.trim()) {
      showToast('Ingresa el nombre del producto');
      return;
    }

    const payload = {
      name: prodForm.name,
      category: prodForm.category,
      price: parseFloat(prodForm.price) || 29.99,
      description: prodForm.description,
      image: prodForm.image || '/assets/george_223_chica_diamonds.jpg',
      badge: prodForm.badge,
      tag: prodForm.tag,
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }

    handleCancelEdit();
  };

  const handleSaveTexts = (e) => {
    e.preventDefault();
    updateConfig(textForm);
  };

  return (
    <>
      {/* 2. Botón de Acceso al Modo Edición: En la esquina inferior izquierda flotante */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0A0D0C]/90 hover:bg-[#107C41] border border-[#107C41]/70 hover:border-[#00FF88] text-white text-xs font-montserrat font-bold tracking-wider shadow-[0_5px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(0,168,89,0.5)] transition-all duration-300"
          title="Abrir Panel de Administración y Editor de Contenido"
        >
          <div className="p-1 rounded-full bg-[#107C41] group-hover:bg-[#00A859] transition-colors">
            <Settings className="w-3.5 h-3.5 text-white animate-spin-slow" />
          </div>
          <span className="hidden sm:inline">Administrar Tienda</span>
          <span className="sm:hidden">CMS</span>
        </button>
      </div>

      {/* Panel Lateral Deslizante (Drawer) */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 flex justify-start bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative w-full max-w-lg h-full bg-[#0E1411] border-r border-[#107C41]/50 shadow-[20px_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
            >
              {/* Encabezado del Panel */}
              <div className="p-5 border-b border-white/10 bg-[#062618]/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#107C41] border border-[#00FF88] flex items-center justify-center font-bebas text-lg text-white">
                    CMS
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-base text-white">
                      PANEL DE ADMINISTRACIÓN
                    </h3>
                    <span className="text-[10px] font-mono text-[#00FF88] block">
                      GEORGE VARIEDADES // MODO EDICIÓN EN VIVO
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pestañas de Navegación del Panel */}
              <div className="flex border-b border-white/10 bg-[#0A0D0C] overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex-1 py-3 px-3 text-xs font-montserrat font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === 'products'
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#161E1A]'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Productos</span>
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className={`flex-1 py-3 px-3 text-xs font-montserrat font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === 'categories'
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#161E1A]'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Categorías</span>
                </button>

                <button
                  onClick={() => setActiveTab('texts')}
                  className={`flex-1 py-3 px-3 text-xs font-montserrat font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === 'texts'
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#161E1A]'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Textos / Specs</span>
                </button>

                <button
                  onClick={() => setActiveTab('brand')}
                  className={`flex-1 py-3 px-3 text-xs font-montserrat font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === 'brand'
                      ? 'border-[#00FF88] text-[#00FF88] bg-[#161E1A]'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Logo G2</span>
                </button>
              </div>

              {/* Contenido Dinámico con Scroll */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* 1. PESTAÑA: PRODUCTOS */}
                {activeTab === 'products' && (
                  <div className="space-y-6">
                    <form onSubmit={handleSaveProduct} className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-mono font-bold text-[#00FF88] uppercase">
                          {editingId ? 'EDITAR PRODUCTO' : '+ AGREGAR NUEVO PRODUCTO'}
                        </span>
                        {editingId && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="text-[10px] text-slate-400 hover:text-white underline"
                          >
                            Cancelar Edición
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">NOMBRE DEL MODELO</label>
                        <input
                          type="text"
                          required
                          value={prodForm.name}
                          onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                          placeholder="Ej. GEORGE 2.0 // Esmeralda Puro Caramelo"
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">CATEGORÍA</label>
                          <select
                            value={prodForm.category}
                            onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                          >
                            {categories.filter(c => c.id !== 'todos').map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">PRECIO ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={prodForm.price}
                            onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                            placeholder="34.99"
                            className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">DESCRIPCIÓN / BENEFICIOS</label>
                        <textarea
                          rows={2}
                          value={prodForm.description}
                          onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                          placeholder="Fórmula de choque muscular con efecto dual frío/calor..."
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>

                      {/* Carga de Imagen (Subir archivo local o pegar URL) */}
                      <div>
                        <label className="text-[11px] font-mono text-[#94A3B8] block mb-1">IMAGEN DEL PRODUCTO</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={prodForm.image}
                            onChange={(e) => {
                              setProdForm({ ...prodForm, image: e.target.value });
                              setImagePreview(e.target.value);
                            }}
                            placeholder="Pega URL o sube archivo abajo"
                            className="flex-1 px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-2 rounded-lg bg-[#107C41] hover:bg-[#00A859] text-white text-xs font-semibold flex items-center gap-1.5 shrink-0"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Subir</span>
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>

                        {imagePreview && (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#00FF88]/50 bg-black p-1">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#107C41] to-[#00A859] hover:from-[#00A859] hover:to-[#00FF88] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                      >
                        {editingId ? 'Guardar Cambios de Producto' : 'Crear Producto'}
                      </button>
                    </form>

                    {/* Lista de productos actuales */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
                        CATÁLOGO ACTUAL ({products.length} PRODUCTOS)
                      </span>
                      {products.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#121715] border border-white/5 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-black border border-white/10 overflow-hidden flex items-center justify-center p-0.5">
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <div className="font-grotesk font-bold text-xs text-white">{p.name}</div>
                              <div className="text-[10px] font-mono text-[#00FF88]">${p.price.toFixed(2)} USD • {categories.find(c => c.id === p.category)?.name}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                              title="Editar"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. PESTAÑA: CATEGORÍAS */}
                {activeTab === 'categories' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">
                        + CREAR NUEVA CATEGORÍA
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          placeholder="Ej. Calzado, Electrolitos..."
                          className="flex-1 px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            addCategory(newCatName);
                            setNewCatName('');
                          }}
                          className="px-4 py-2 rounded-lg bg-[#107C41] hover:bg-[#00A859] text-white text-xs font-montserrat font-bold uppercase transition-all"
                        >
                          Crear
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
                        CATEGORÍAS ACTIVAS
                      </span>
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#121715] border border-white/5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                            <span className="text-xs font-grotesk font-bold text-white">{cat.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">({cat.id})</span>
                          </div>

                          {cat.id !== 'todos' && cat.id !== 'cremas' && (
                            <button
                              onClick={() => deleteCategory(cat.id)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Eliminar categoría"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. PESTAÑA: TEXTOS Y ESPECIFICACIONES */}
                {activeTab === 'texts' && (
                  <form onSubmit={handleSaveTexts} className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">
                        TEXTOS HERO Y BRANDING
                      </span>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">FRASE MOTIVACIONAL HERO</label>
                        <input
                          type="text"
                          value={textForm.heroTagline}
                          onChange={(e) => setTextForm({ ...textForm, heroTagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">TÍTULO SECCIÓN CARACTERÍSTICAS</label>
                        <input
                          type="text"
                          value={textForm.featuresTitle}
                          onChange={(e) => setTextForm({ ...textForm, featuresTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121715] border border-white/10 space-y-3">
                      <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">
                        TABLA DE ESPECIFICACIONES GEORGE 2.0
                      </span>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">FÓRMULA ACTIVA</label>
                        <input
                          type="text"
                          value={textForm.formulaName}
                          onChange={(e) => setTextForm({ ...textForm, formulaName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">ACCIÓN TÉRMICA</label>
                        <input
                          type="text"
                          value={textForm.thermalAction}
                          onChange={(e) => setTextForm({ ...textForm, thermalAction: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">RESISTENCIA</label>
                        <input
                          type="text"
                          value={textForm.resistance}
                          onChange={(e) => setTextForm({ ...textForm, resistance: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">CONTENIDO NETO</label>
                        <input
                          type="text"
                          value={textForm.netContent}
                          onChange={(e) => setTextForm({ ...textForm, netContent: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">CÓDIGO DE EDICIÓN</label>
                        <input
                          type="text"
                          value={textForm.editionCode}
                          onChange={(e) => setTextForm({ ...textForm, editionCode: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0A0D0C] border border-white/15 text-xs text-white focus:border-[#00FF88] outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#107C41] hover:bg-[#00A859] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      Guardar Cambios de Textos
                    </button>
                  </form>
                )}

                {/* 4. PESTAÑA: VARIACIONES DEL LOGO */}
                {activeTab === 'brand' && (
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold text-[#00FF88] uppercase block">
                      SELECCIONA EL ACABADO DEL LOGO G2
                    </span>
                    <p className="text-xs text-[#94A3B8]">
                      Cambia en tiempo real el tratamiento de material del monograma G2 en toda la tienda:
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {LOGO_TEXTURES.map((tex) => (
                        <div
                          key={tex.id}
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
                          {config.logoTexture === tex.id && (
                            <Check className="w-4 h-4 text-[#00FF88]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Footer con Acciones Globales: Exportar JSON, Restablecer */}
              <div className="p-4 border-t border-white/10 bg-[#0A0D0C] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer</span>
                </button>

                <button
                  type="button"
                  onClick={exportJSON}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#107C41] hover:bg-[#00A859] text-white text-xs font-montserrat font-bold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar JSON</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
