import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════════════════
//  CREDENCIALES DE ADMINISTRADOR — Cambiar aquí directamente
// ═══════════════════════════════════════════════════════════════════════════
export const ADMIN_USER = 'admin_george';
export const ADMIN_PASS = 'Esmeralda2026*';

const StoreContext = createContext();

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qdwirqwxuqoeyzwilcrt.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd2lycXd4dXFvZXl6d2lsY3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NDQ4NTIsImV4cCI6MjExMTAyMDg1Mn0.QqSjQ5fh2i7rILN-JiuEquCs0Z87ej_QcBDw1uzznSs';
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

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
    name: 'GEORGE 2.0 // DIABLA Puro Caramelo',
    category: 'cremas',
    price: null,
    discount: null,
    tag: 'INSIGNIA',
    badge: 'MÁS VENDIDO',
    description: 'Fórmula original Esmeralda Puro Caramelo con extracto bio-activo. Absorción ultra rápida en menos de 45 seg.',
    image: '/assets/george-22-oficial.jpeg',
    specs: ['120 ml', 'Hidratación Profunda', 'Aroma Puro Caramelo'],
  },
  {
    id: 'prod-2',
    name: 'GEORGE 2.2 // DIABLA',
    category: 'cremas',
    price: null,
    discount: null,
    tag: 'INTENSO',
    badge: 'NUEVA FÓRMULA',
    description: 'Potenciada para máxima exigencia. Efecto crio-térmico de acción rápida sobre la piel.',
    image: '/assets/george_22_diablo.jpg',
    specs: ['120 ml', 'Efecto Térmico Intenso', 'Fórmula Dermo-activa'],
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
    specs: ['120 ml', 'Aroma Angel Mugler', 'Sedosidad Extrema'],
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
    specs: ['120 ml', 'Fragancia Duradera', 'Nutrición Profunda'],
  },
];

// ─── Configuración por defecto — incluye datos de About y Contacto ──────────
const DEFAULT_STORE_CONFIG = {
  heroManifesto: 'Buscando siempre dejar mi huella en el mundo, quiero empezar con un producto que es mío; algo que haga que tanto hombres como mujeres se sientan identificados, que se sientan seguros de ser ellos mismos y seguros de que aquí hay más que entregar para mi gente.',
  heroTagline: 'Deja tu presencia, así no estés. GEORGE 2.0 — Puro Caramelo.',
  heroBrandTitle: 'GEORGE VARIEDADES',
  featuresTitle: 'Lo Que Hace Excepcional a GEORGE 2.0',
  featuresSubtitle: 'Descubre la fórmula de cuidado personal diseñada para quienes definen su estilo.',
  formulaName: 'Extracto Bio-Esmeralda & Puro Caramelo',
  thermalAction: 'Hidratación Profunda de Absorción Rápida',
  resistance: 'Fragancia & Suavidad de Larga Duración',
  netContent: '120 ml / 4.06 fl. oz. (Envase Ergonómico)',
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
  contactMessage: 'Atendemos consultas y pedidos por correo o WhatsApp. Nuestro equipo te orientará sobre disponibilidad y envíos.',
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
  const [publishStatus, setPublishStatus] = useState('');
  const [publishError, setPublishError] = useState('');
  const [isCloudConfigured, setIsCloudConfigured] = useState(Boolean(supabase));

  const applyPublishedState = (published) => {
    if (!published) return;
    if (Array.isArray(published.categories)) setCategories(published.categories);
    if (Array.isArray(published.products)) setProducts(published.products);
    if (published.config && typeof published.config === 'object') setConfig(published.config);
  };

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    const loadPublishedState = async () => {
      try {
        const { data, error } = await supabase
          .from('site_state')
          .select('categories, products, config')
          .eq('id', 'main')
          .maybeSingle();
        if (error) throw error;
        if (active && data) applyPublishedState(data);
      } catch (error) {
        if (active) {
          setPublishError(`No se pudo cargar la nube: ${error?.message || 'Error de conexion'}`);
        }
      }
    };

    loadPublishedState();

    const channel = supabase
      .channel('site_state_live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_state', filter: 'id=eq.main' }, (payload) => {
        if (payload.new) applyPublishedState(payload.new);
      })
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Respaldo local seguro para todos los cambios.
  useEffect(() => {
    try {
      localStorage.setItem('gv_categories', JSON.stringify(categories));
      localStorage.setItem('gv_products', JSON.stringify(products));
      localStorage.setItem('gv_config', JSON.stringify(config));
      localStorage.setItem('gv_cart', JSON.stringify(cart));
    } catch (error) {
      setPublishError(`No se pudo guardar el respaldo local: ${error?.message || 'Almacenamiento insuficiente'}`);
    }
  }, [categories, products, config, cart]);

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

  const publishChanges = async (nextState) => {
    setPublishError('');
    const snapshot = nextState ? {
      categories: nextState.categories ?? categories,
      products: nextState.products ?? products,
      config: nextState.config ?? config,
    } : { categories, products, config };

    if (!supabase) {
      try {
        localStorage.setItem('gv_categories', JSON.stringify(snapshot.categories));
        localStorage.setItem('gv_products', JSON.stringify(snapshot.products));
        localStorage.setItem('gv_config', JSON.stringify(snapshot.config));
        setPublishStatus('Cambios publicados localmente');
        showToast('Modo Local activo: cambios guardados en este dispositivo');
      } catch (error) {
        const message = `Error al guardar localmente: ${error?.message || 'Almacenamiento insuficiente'}`;
        setPublishError(message);
        throw new Error(message);
      }
      return;
    }

    setPublishStatus('Guardando en la nube...');
    try {
      const payload = { id: 'main', ...snapshot, updated_at: new Date().toISOString() };
      const { error } = await supabase.from('site_state').upsert(payload, { onConflict: 'id' });
      if (error) throw error;
      setPublishStatus('Cambios publicados para todos los usuarios');
      showToast('Cambios publicados para todos los usuarios');
    } catch (error) {
      const message = `Error al publicar en la nube: ${error?.message || 'No fue posible conectar con Supabase'}`;
      setPublishStatus('');
      setPublishError(message);
      throw new Error(message);
    }
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
      updateConfig, exportJSON, resetToDefaults, publishChanges,
      publishStatus, publishError, setPublishError, isCloudConfigured,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
