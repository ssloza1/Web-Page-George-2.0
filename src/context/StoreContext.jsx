import React, { createContext, useContext, useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
//  CREDENCIALES DE ADMINISTRADOR — Cambiar aquí directamente
// ═══════════════════════════════════════════════════════════════════════════
export const ADMIN_USER = 'admin_george';
export const ADMIN_PASS = 'Esmeralda2026*';

const StoreContext = createContext();

// ─── Categorías por defecto ─────────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { id: 'todos',    name: 'Todos' },
  { id: 'cremas',   name: 'Cremas' },
  { id: 'perfumes', name: 'Perfumes' },
  { id: 'ropa',     name: 'Ropa' },
  { id: 'relojes',  name: 'Relojes' },
];

// ─── Productos por defecto — price: null = "Consultar precio" ───────────────
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'GEORGE 2.0 // Diablo Puro Caramelo',
    category: 'cremas',
    price: null,
    discount: null,
    tag: 'INSIGNIA',
    badge: 'MÁS VENDIDO',
    description: 'Fórmula original Esmeralda Puro Caramelo con extracto bio-activo. Absorción ultra rápida en menos de 45 seg.',
    image: '/assets/label_diablo_official.jpg',
    specs: ['150ml', 'Hidratación Profunda', 'Aroma Puro Caramelo'],
  },
  {
    id: 'prod-2',
    name: 'GEORGE 2.2 // Diablo Performance',
    category: 'cremas',
    price: null,
    discount: null,
    tag: 'INTENSO',
    badge: 'NUEVA FÓRMULA',
    description: 'Potenciada para máxima exigencia. Efecto crio-térmico de acción rápida sobre la piel.',
    image: '/assets/george_22_diablo.jpg',
    specs: ['150ml', 'Efecto Térmico Intenso', 'Fórmula Dermo-activa'],
  },
  {
    id: 'prod-3',
    name: 'GEORGE 2.2 // Angel Mugler Edition',
    category: 'cremas',
    price: null,
    discount: null,
    tag: 'EDICIÓN ESPECIAL',
    badge: 'LUJO',
    description: 'Edición con aroma sofisticado Angel Mugler. Hidratación de larga duración y textura sedosa.',
    image: '/assets/george_22_angel_mugler.jpg',
    specs: ['150ml', 'Aroma Angel Mugler', 'Sedosidad Extrema'],
  },
  {
    id: 'prod-4',
    name: 'GEORGE 2.2 // Mira Pal Norte',
    category: 'cremas',
    price: null,
    discount: null,
    tag: 'DISTINCIÓN',
    badge: 'ELEGANTE',
    description: 'Crema de cuidado avanzado con fragancia que define tu presencia. Piel suave e hidratada todo el día.',
    image: '/assets/george_22_mira_pal_norte.jpg',
    specs: ['150ml', 'Fragancia Duradera', 'Nutrición Profunda'],
  },
  {
    id: 'prod-5',
    name: 'Colección Textil Esmeralda',
    category: 'ropa',
    price: null,
    discount: null,
    tag: 'ESTILO',
    badge: 'NUEVA LÍNEA',
    description: 'Prendas con carácter y distinción. Corte moderno, tela premium con detalles esmeralda.',
    image: '/assets/campaign_WhatsApp Image 2026-11-10 at 17.55.25.jpeg',
    specs: ['Algodón Premium', 'Corte Slim', 'Detalles Esmeralda'],
  },
  {
    id: 'prod-6',
    name: 'Cronógrafo Carbon G2',
    category: 'relojes',
    price: null,
    discount: null,
    tag: 'DISTINCIÓN',
    badge: 'ALTA GAMA',
    description: 'Reloj de distinción con caja de fibra de carbono, bisel esmeralda y mecanismo de precisión.',
    image: '/assets/campaign_WhatsApp Image 2026-11-21 at 18.54.18.jpeg',
    specs: ['Acero 316L', 'Zafiro Anti-rayado', 'Sumergible 50m'],
  },
  {
    id: 'prod-7',
    name: 'Perfume GEORGE // Esmeralda Noir',
    category: 'perfumes',
    price: null,
    discount: null,
    tag: 'AROMA',
    badge: 'EXCLUSIVO',
    description: 'Fragancia oscura y sofisticada. Notas de madera de oud, caramelo y esencias verdes.',
    image: '/assets/campaign_WhatsApp Image 2026-11-21 at 18.54.18  (1).jpeg',
    specs: ['100ml EDP', 'Notas Amaderadas', 'Duración 12h'],
  },
];

// ─── Configuración por defecto — incluye datos de About y Contacto ──────────
const DEFAULT_STORE_CONFIG = {
  heroTagline: 'Deja tu presencia, así no estés. GEORGE 2.0 — Puro Caramelo.',
  heroBrandTitle: 'GEORGE VARIEDADES',
  featuresTitle: 'Lo Que Hace Excepcional a GEORGE 2.0',
  featuresSubtitle: 'Descubre la fórmula de cuidado personal diseñada para quienes definen su estilo.',
  formulaName: 'Extracto Bio-Esmeralda & Puro Caramelo',
  thermalAction: 'Hidratación Profunda de Absorción Rápida',
  resistance: 'Fragancia & Suavidad de Larga Duración',
  netContent: '150 ml / 5.07 fl. oz. (Envase Ergonómico)',
  editionCode: '#GV-ESM-2.0',
  logoTexture: 'carbon',
  ctaBannerTitle: 'Define tu estilo, marca tu esencia. Descubre la colección GEORGE 2.0.',
  // Sobre Nosotros
  aboutHistory: 'En GEORGE VARIEDADES nacimos de una pasión por la elegancia cotidiana. Creemos que el cuidado personal, el aroma que llevas y la ropa que vistes son la primera impresión que dejas — incluso antes de decir una palabra. Tras años de investigación y formulación artesanal, presentamos nuestra línea GEORGE 2.0: cremas de alta calidad, perfumes con carácter, ropa con distinción y relojes que hablan por ti.',
  aboutMission: 'Ofrecer productos de cuidado personal, perfumería, ropa y relojería de la más alta calidad a quienes entienden que el estilo es una forma de vida. Cada producto GEORGE VARIEDADES está diseñado para potenciar tu presencia y acompañarte en cada momento.',
  aboutVision: 'Ser la marca de referencia en América Latina para quienes definen su identidad a través del aroma, el cuidado y la elegancia. Expandir la esencia de GEORGE 2.0 a cada rincón del mundo.',
  aboutPillar1: 'Calidad Artesanal',
  aboutPillar1Desc: 'Ingredientes seleccionados y procesos rigurosos de elaboración.',
  aboutPillar2: 'Elegancia Natural',
  aboutPillar2Desc: 'Fragancias y texturas que resaltan tu esencia auténtica.',
  aboutPillar3: 'Distinción Total',
  aboutPillar3Desc: 'Productos que marcan diferencia en presencia y estilo.',
  // Contacto
  contactEmail: 'hola@georgevariedades.com',
  contactPhone: '+57 300 928 2000',
  contactLocation: 'Medellín / Bogotá / Envíos Globales',
  contactIG: '@georgevariedades',
  contactFB: 'fb.com/georgevariedades',
  contactWA: '+57 300 928 2000',
};

export const StoreProvider = ({ children }) => {
  // ─── Estado de autenticación de administrador ───────────────────────────
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('gv_admin_auth') === 'true';
  });

  const loginAdmin = (user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdminAuth(true);
      sessionStorage.setItem('gv_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuth(false);
    sessionStorage.removeItem('gv_admin_auth');
    setIsAdminOpen(false);
    showToast('Sesión cerrada — Modo Espectador activo');
  };

  // ─── Datos del store ─────────────────────────────────────────────────────
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('gv_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('gv_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('gv_config');
    return saved ? JSON.parse(saved) : DEFAULT_STORE_CONFIG;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('gv_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Guardar en localStorage
  useEffect(() => { localStorage.setItem('gv_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('gv_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('gv_config', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('gv_cart', JSON.stringify(cart)); }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ─── Categorías ──────────────────────────────────────────────────────────
  const addCategory = (name) => {
    if (!name.trim()) return;
    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    if (categories.some((c) => c.id === id)) { showToast('Esa categoría ya existe'); return; }
    setCategories([...categories, { id, name }]);
    showToast(`Categoría "${name}" creada`);
  };

  const deleteCategory = (id) => {
    if (id === 'todos' || id === 'cremas') { showToast('No puedes eliminar las categorías esenciales'); return; }
    setCategories(categories.filter((c) => c.id !== id));
    showToast('Categoría eliminada');
  };

  // ─── Productos ───────────────────────────────────────────────────────────
  const addProduct = (prodData) => {
    const newProd = {
      ...prodData,
      id: `prod-${Date.now()}`,
      price: prodData.price !== '' && prodData.price !== null ? parseFloat(prodData.price) : null,
      discount: prodData.discount !== '' && prodData.discount !== null ? parseFloat(prodData.discount) : null,
      specs: prodData.specs || ['Alta Calidad'],
    };
    setProducts([newProd, ...products]);
    showToast(`Producto "${newProd.name}" agregado`);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
    showToast('Producto actualizado');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast('Producto eliminado');
  };

  // ─── Carrito ─────────────────────────────────────────────────────────────
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.name}" añadido al carrito`);
  };

  const removeFromCart = (id) => { setCart(cart.filter((item) => item.id !== id)); };

  const updateCartQuantity = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  // ─── Configuración general ───────────────────────────────────────────────
  const updateConfig = (newConfig) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Cambios guardados correctamente');
  };

  const exportJSON = () => {
    const data = { categories, products, config };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `george_variedades_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Respaldo JSON descargado');
  };

  const resetToDefaults = () => {
    setCategories(DEFAULT_CATEGORIES);
    setProducts(DEFAULT_PRODUCTS);
    setConfig(DEFAULT_STORE_CONFIG);
    localStorage.removeItem('gv_categories');
    localStorage.removeItem('gv_products');
    localStorage.removeItem('gv_config');
    showToast('Configuración restablecida');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <StoreContext.Provider value={{
      categories, products, config, cart,
      totalCartCount, totalCartPrice,
      isAdminOpen, setIsAdminOpen,
      isAdminAuth, loginAdmin, logoutAdmin,
      toastMessage, showToast,
      addCategory, deleteCategory,
      addProduct, updateProduct, deleteProduct,
      addToCart, removeFromCart, updateCartQuantity,
      updateConfig, exportJSON, resetToDefaults,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
