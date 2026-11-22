import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

// Datos iniciales de fábrica
const DEFAULT_CATEGORIES = [
  { id: 'todos', name: 'Todos' },
  { id: 'cremas', name: 'Cremas' },
  { id: 'ropa', name: 'Ropa Running' },
  { id: 'relojes', name: 'Relojes' },
  { id: 'accesorios', name: 'Accesorios' },
];

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'GEORGE 2.0 // Esmeralda Puro Caramelo',
    category: 'cremas',
    price: 34.99,
    regularPrice: 42.00,
    tag: 'INSIGNIA',
    badge: 'MÁS VENDIDO',
    description: 'Fórmula de choque muscular con efecto dual frío/calor y extracto de esmeralda. Absorción en menos de 45 seg.',
    image: '/assets/george_223_chica_diamonds.jpg',
    specs: ['150ml', 'Antifricción', 'Efecto Crio-Térmico'],
  },
  {
    id: 'prod-2',
    name: 'GEORGE 2.2 // Diablo Performance',
    category: 'cremas',
    price: 37.50,
    regularPrice: 45.00,
    tag: 'INTENSO',
    badge: 'NUEVA FÓRMULA',
    description: 'Potenciada para entrenamientos de máxima exigencia y cuestas empinadas. Calentamiento muscular acelerado.',
    image: '/assets/george_22_diablo.jpg',
    specs: ['150ml', 'Efecto Térmico Intenso', 'Anti-Calambres'],
  },
  {
    id: 'prod-3',
    name: 'GEORGE 2.2 // Angel Mugler Edition',
    category: 'cremas',
    price: 39.99,
    regularPrice: 48.00,
    tag: 'EDICIÓN ESPECIAL',
    badge: 'LUJO',
    description: 'Edición con aroma sofisticado Angel Mugler y extracto relajante post-maratón.',
    image: '/assets/george_22_angel_mugler.jpg',
    specs: ['150ml', 'Aroma Angel Mugler', 'Sedosidad Extrema'],
  },
  {
    id: 'prod-4',
    name: 'GEORGE 2.2 // Mira Pal Norte',
    category: 'cremas',
    price: 36.00,
    regularPrice: 44.00,
    tag: 'RESISTENCIA',
    badge: 'ULTRA RUNNER',
    description: 'Pack de larga distancia con protección dermo-respirable para ultra maratón y trail running.',
    image: '/assets/george_22_mira_pal_norte.jpg',
    specs: ['150ml', 'Resistente a Lluvia y Sudor', 'Anti-Roce'],
  },
  {
    id: 'prod-5',
    name: 'Camiseta Técnica Aero-Esmeralda',
    category: 'ropa',
    price: 49.00,
    regularPrice: 65.00,
    tag: 'TEXTIL PRO',
    badge: 'ULTRALIGERA',
    description: 'Tejido técnico transpirable microperforado en corte ergonómico con fibras de carbón y detalles esmeralda.',
    image: '/assets/campaign_WhatsApp Image 2026-11-10 at 17.55.25.jpeg',
    specs: ['Peso: 78g', 'Secado Rápido', 'Costuras Planas'],
  },
  {
    id: 'prod-6',
    name: 'Cronógrafo Carbon G2 GPS',
    category: 'relojes',
    price: 189.00,
    regularPrice: 230.00,
    tag: 'HARDWARE',
    badge: 'ALTA PRECISIÓN',
    description: 'Caja de fibra de carbono forjada, sensor de pulso óptico, bisel esmeralda y métricas de zancada en tiempo real.',
    image: '/assets/campaign_WhatsApp Image 2026-11-21 at 18.54.18.jpeg',
    specs: ['GPS Dual', 'Batería 40h Carrera', 'Sumergible 50m'],
  },
  {
    id: 'prod-7',
    name: 'Cinturón Ergonómico G2 Trail',
    category: 'accesorios',
    price: 29.90,
    regularPrice: 38.00,
    tag: 'ACCESORIO',
    badge: 'PRÁCTICO',
    description: 'Cinturón elástico antideslizante con compartimento termoaislado a medida para el tubo GEORGE 2.0.',
    image: '/assets/campaign_WhatsApp Image 2026-11-21 at 18.54.18  (1).jpeg',
    specs: ['Cero Rebote', 'Bolsillo Impermeable', 'Reflectivo 360°'],
  },
];

const DEFAULT_STORE_CONFIG = {
  heroTagline: 'Rompe tus límites con cada zancada. GEORGE 2.0 — Puro Caramelo.',
  heroBrandTitle: 'GEORGE VARIEDADES',
  featuresTitle: 'Lo Que Hace Excepcional a GEORGE 2.0',
  featuresSubtitle: 'Explora la fórmula de recuperación y rendimiento diseñada para atletas que no se detienen.',
  formulaName: 'Extracto Bio-Esmeralda & Puro Caramelo',
  thermalAction: 'Efecto Dual Frío/Calor de Absorción Rápida',
  resistance: 'Antifricción & Sudor Extremo (8 Horas)',
  netContent: '150 ml / 5.07 fl. oz. (Envase Ergonómico)',
  editionCode: '#GV-ESM-2.0',
  logoTexture: 'carbon', // 'white', 'carbon', 'asphalt', 'mesh', 'neon', 'volcanic', 'chrome'
};

export const StoreProvider = ({ children }) => {
  // Cargar de localStorage o defaults
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
    return saved ? JSON.parse(saved) : [{ ...DEFAULT_PRODUCTS[0], quantity: 1 }];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('gv_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('gv_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gv_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('gv_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Funciones de Categorías
  const addCategory = (name) => {
    if (!name.trim()) return;
    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    if (categories.some((c) => c.id === id)) {
      showToast('Esa categoría ya existe');
      return;
    }
    const newCat = { id, name };
    setCategories([...categories, newCat]);
    showToast(`Categoría "${name}" creada`);
  };

  const deleteCategory = (id) => {
    if (id === 'todos' || id === 'cremas') {
      showToast('No puedes eliminar las categorías esenciales');
      return;
    }
    setCategories(categories.filter((c) => c.id !== id));
    showToast('Categoría eliminada');
  };

  // Funciones de Productos
  const addProduct = (prodData) => {
    const newProd = {
      ...prodData,
      id: `prod-${Date.now()}`,
      price: parseFloat(prodData.price) || 29.99,
      regularPrice: (parseFloat(prodData.price) || 29.99) * 1.25,
      specs: prodData.specs || ['150ml', 'Alto Rendimiento'],
    };
    setProducts([newProd, ...products]);
    showToast(`Producto "${newProd.name}" agregado con éxito`);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
    showToast('Producto actualizado');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast('Producto eliminado');
  };

  // Funciones de Carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`"${product.name}" añadido al carrito`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  // Configuración general
  const updateConfig = (newConfig) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Ajustes guardados correctamente');
  };

  const exportJSON = () => {
    const data = { categories, products, config };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `george_variedades_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Copia de respaldo JSON descargada');
  };

  const resetToDefaults = () => {
    setCategories(DEFAULT_CATEGORIES);
    setProducts(DEFAULT_PRODUCTS);
    setConfig(DEFAULT_STORE_CONFIG);
    localStorage.removeItem('gv_categories');
    localStorage.removeItem('gv_products');
    localStorage.removeItem('gv_config');
    showToast('Configuración restablecida a valores de fábrica');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        config,
        cart,
        totalCartCount,
        totalCartPrice,
        isAdminOpen,
        setIsAdminOpen,
        toastMessage,
        showToast,
        addCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateConfig,
        exportJSON,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
