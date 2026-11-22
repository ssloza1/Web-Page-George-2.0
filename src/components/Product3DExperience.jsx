import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Droplets, Package, X, RotateCcw, Eye, Play, Award } from 'lucide-react';
import { generateTubeTexture } from '../utils/generateTubeTexture';

// Datos requeridos de los 3 Hotspots según especificaciones
const HOTSPOTS_DATA = [
  {
    id: 'formula',
    name: 'Fórmula',
    title: 'Fórmula Termo-Activa Esmeralda',
    description: 'Absorción ultra rápida efecto dual frío/calor para recuperación muscular acelerada post-running.',
    icon: Sparkles,
    tag: 'FÓRMULA TERMO-ACTIVA',
    accentColor: '#00A859',
    position3D: new THREE.Vector3(0, 0.15, 1.16),
  },
  {
    id: 'textura',
    name: 'Textura',
    title: 'Hidratación Antifricción Puro Caramelo',
    description: 'Hidratación dérmica profunda no grasa, resistente al sudor extremo y lluvia hasta 8 horas continuas.',
    icon: Droplets,
    tag: 'HIDRATACIÓN ANTIFRICCIÓN',
    accentColor: '#00FF88',
    position3D: new THREE.Vector3(0, 1.85, 0.55),
  },
  {
    id: 'envase',
    name: 'Envase',
    title: 'Diseño Ergonómico Ultra Ligero 150ml',
    description: 'Tubo ligero y comprimible de 150ml, dosificación precisa antidesperdicio para cinturón o chaleco de trail.',
    icon: Package,
    tag: 'DISEÑO ULTRA LIGERO',
    accentColor: '#107C41',
    position3D: new THREE.Vector3(0, -2.45, 1.2),
  },
];

export const Product3DExperience = ({ 
  mouseNorm = { x: 0, y: 0 }, 
  onOpenVideoModal, 
  onOpenAppModal,
  onOpenBuyModal
}) => {
  const mountRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [screenHotspots, setScreenHotspots] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  // Referencias para interacción Three.js
  const tubeGroupRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const lightsRef = useRef({ dynamicLight: null });
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Escena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Cámara con encuadre heroico y primer plano exactamente como en la referencia
    const isMobileInit = width < 640;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobileInit ? 9.2 : 8.5);
    cameraRef.current = camera;

    // 3. Renderer con soporte WebGL de alta fidelidad
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Luces de Estudio (Spotlight + Rim Light Metálica + Luz Dinámica de Cursor)
    const ambientLight = new THREE.AmbientLight(0x0a1f14, 2.0);
    scene.add(ambientLight);

    // Spotlight Verde Esmeralda posterior (estudio)
    const backSpotlight = new THREE.PointLight(0x00A859, 4.5, 20);
    backSpotlight.position.set(0, 0, -4.0);
    scene.add(backSpotlight);

    // Luz frontal suave blanca (Key light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 4, 6);
    scene.add(keyLight);

    // Luz de borde metálico (Rim light)
    const rimLight = new THREE.DirectionalLight(0x107C41, 2.5);
    rimLight.position.set(-4, -2, 2);
    scene.add(rimLight);

    // Luz dinámica que persigue el cursor para reflejo especular en el tubo
    const dynamicLight = new THREE.PointLight(0xffffff, 2.2, 12);
    dynamicLight.position.set(0, 0, 5);
    scene.add(dynamicLight);
    lightsRef.current.dynamicLight = dynamicLight;

    // 5. Grupo del Tubo Cosmético GEORGE 2.0
    const tubeGroup = new THREE.Group();
    scene.add(tubeGroup);
    tubeGroupRef.current = tubeGroup;

    // Posición inicial y leve ángulo dramático
    tubeGroup.rotation.y = 0.05;
    tubeGroup.rotation.z = -0.06;

    // Textura procedural ultra nítida con el diseño exacto GEORGE 2.0
    const textureCanvas = generateTubeTexture();
    const tubeTexture = new THREE.CanvasTexture(textureCanvas);
    tubeTexture.colorSpace = THREE.SRGBColorSpace;
    tubeTexture.wrapS = THREE.RepeatWrapping;
    tubeTexture.repeat.set(1, 1);
    tubeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Material plástico satinado de lujo con reflejo especular
    const tubeMaterial = new THREE.MeshPhysicalMaterial({
      map: tubeTexture,
      roughness: 0.28,
      metalness: 0.06,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
      reflectivity: 0.6,
    });

    // Construcción de la geometría realística del tubo cosmético:
    // Un cilindro en la base que se aplana progresivamente hacia la parte superior (crimped seam)
    const tubeHeight = 4.8;
    const radialSegments = 64;
    const heightSegments = 50;
    const baseRadius = 1.12;

    const tubeGeom = new THREE.CylinderGeometry(
      baseRadius, 
      baseRadius, 
      tubeHeight, 
      radialSegments, 
      heightSegments, 
      true
    );

    // Modificación de vértices para dar forma auténtica de tubo de crema
    const pos = tubeGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const normY = (y + tubeHeight / 2) / tubeHeight; // 0 en la base, 1 en la cúspide

      if (normY > 0.45) {
        // Aplastamiento progresivo en el eje Z (se vuelve plano) y ensanchamiento en eje X
        const pinch = (normY - 0.45) / 0.55;
        const pinchZ = Math.pow(pinch, 1.4);
        
        const z = pos.getZ(i);
        const x = pos.getX(i);

        // Aplanar en Z
        pos.setZ(i, z * Math.max(0.06, 1 - pinchZ * 0.94));
        // Ensanchar en X
        pos.setX(i, x * (1 + pinch * 0.38));
      }
    }
    tubeGeom.computeVertexNormals();

    const tubeMesh = new THREE.Mesh(tubeGeom, tubeMaterial);
    tubeMesh.position.y = 0.2;
    tubeGroup.add(tubeMesh);

    // Borde de sellado superior corrugado (Crimp Seal)
    const crimpGeom = new THREE.BoxGeometry(3.1, 0.28, 0.12);
    const crimpMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.1,
      roughness: 0.35,
    });
    const crimpMesh = new THREE.Mesh(crimpGeom, crimpMat);
    crimpMesh.position.y = 0.2 + tubeHeight / 2 + 0.14;
    tubeGroup.add(crimpMesh);

    // Tapa dosificadora inferior (Cap)
    const capGroup = new THREE.Group();
    capGroup.position.y = 0.2 - tubeHeight / 2;

    // Anillo cromado / metálico de lujo
    const ringGeom = new THREE.CylinderGeometry(baseRadius * 1.02, baseRadius * 1.02, 0.12, 48);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ringMesh = new THREE.Mesh(ringGeom, chromeMat);
    ringMesh.position.y = -0.06;
    capGroup.add(ringMesh);

    // Cuerpo de la tapa dosificadora (flip-top blanca)
    const capBodyGeom = new THREE.CylinderGeometry(baseRadius * 0.98, baseRadius * 0.94, 0.75, 48);
    const capBodyMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.05,
    });
    const capBodyMesh = new THREE.Mesh(capBodyGeom, capBodyMat);
    capBodyMesh.position.y = -0.48;
    capGroup.add(capBodyMesh);

    // Borde biselado de la tapa
    const capBaseGeom = new THREE.CylinderGeometry(baseRadius * 0.94, baseRadius * 0.88, 0.25, 48);
    const capBaseMesh = new THREE.Mesh(capBaseGeom, capBodyMat);
    capBaseMesh.position.y = -0.92;
    capGroup.add(capBaseMesh);

    tubeGroup.add(capGroup);

    // 6. Proyección interactiva de Hotspots 3D a Coordenadas 2D de Pantalla
    const updateHotspotCoords = () => {
      const containerRect = container.getBoundingClientRect();
      const coords = HOTSPOTS_DATA.map((h) => {
        // Clonar la posición 3D relativa y transformarla al espacio de mundo
        const worldPos = h.position3D.clone();
        worldPos.applyMatrix4(tubeGroup.matrixWorld);

        // Proyectar vector a coordenadas de pantalla (-1 a 1)
        const projected = worldPos.clone().project(camera);

        // Convertir a píxeles dentro del contenedor
        const x = ((projected.x + 1) * width) / 2;
        const y = ((-projected.y + 1) * height) / 2;
        const isVisible = projected.z < 1 && worldPos.z > -1.5; // Sólo si mira hacia la cámara

        return {
          ...h,
          screenX: x,
          screenY: y,
          isVisible,
        };
      });

      setScreenHotspots(coords);
    };

    // 7. Eventos de arrastre manual e interacción
    const onMouseDown = (e) => {
      dragRef.current.isDown = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.rotX = dragRef.current.targetRotX;
      dragRef.current.rotY = dragRef.current.targetRotY;
      setIsDragging(true);
    };

    const onMouseMoveWindow = (e) => {
      if (!dragRef.current.isDown) return;
      const deltaX = (e.clientX - dragRef.current.startX) * 0.008;
      const deltaY = (e.clientY - dragRef.current.startY) * 0.008;
      dragRef.current.targetRotY = dragRef.current.rotY + deltaX;
      dragRef.current.targetRotX = Math.max(-0.6, Math.min(0.6, dragRef.current.rotX + deltaY));
    };

    const onMouseUpWindow = () => {
      dragRef.current.isDown = false;
      setIsDragging(false);
    };

    // Touch events para rotación fluida en dispositivos móviles
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        dragRef.current.isDown = true;
        dragRef.current.startX = e.touches[0].clientX;
        dragRef.current.startY = e.touches[0].clientY;
        dragRef.current.rotX = dragRef.current.targetRotX;
        dragRef.current.rotY = dragRef.current.targetRotY;
        setIsDragging(true);
      }
    };

    const onTouchMove = (e) => {
      if (!dragRef.current.isDown || e.touches.length !== 1) return;
      const deltaX = (e.touches[0].clientX - dragRef.current.startX) * 0.009;
      const deltaY = (e.touches[0].clientY - dragRef.current.startY) * 0.009;
      dragRef.current.targetRotY = dragRef.current.rotY + deltaX;
      dragRef.current.targetRotX = Math.max(-0.6, Math.min(0.6, dragRef.current.rotX + deltaY));
    };

    const onTouchEnd = () => {
      dragRef.current.isDown = false;
      setIsDragging(false);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMoveWindow);
    window.addEventListener('mouseup', onMouseUpWindow);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Manejo de Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.position.z = newW < 640 ? 9.2 : 8.5;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 8. Bucle de Renderizado 60FPS
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Flotación sutil y oscilante
      const floatY = Math.sin(elapsed * 1.6) * 0.08;
      tubeGroup.position.y = floatY;

      // Rotación continua si está activo autoRotate
      if (autoRotate) {
        dragRef.current.targetRotY += 0.012;
      }

      // Parallax e inclinación suavizada con el ratón
      const mouseInfluenceX = mouseNorm.x * 0.4;
      const mouseInfluenceY = mouseNorm.y * -0.28;

      const finalTargetY = dragRef.current.targetRotY + mouseInfluenceX;
      const finalTargetX = dragRef.current.targetRotX + mouseInfluenceY;

      // Lerp suave para giro de 60fps
      tubeGroup.rotation.y += (finalTargetY - tubeGroup.rotation.y) * 0.08;
      tubeGroup.rotation.x += (finalTargetX - tubeGroup.rotation.x) * 0.08;

      // Actualizar luz dinámica siguiendo al ratón para brillo especular
      if (dynamicLight) {
        dynamicLight.position.x = mouseNorm.x * 4;
        dynamicLight.position.y = -mouseNorm.y * 3 + 1;
      }

      // Renderizar
      renderer.render(scene, camera);

      // Actualizar hotspots proyectados
      updateHotspotCoords();

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMoveWindow);
      window.removeEventListener('mouseup', onMouseUpWindow);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      tubeGeom.dispose();
      tubeMaterial.dispose();
      tubeTexture.dispose();
      renderer.dispose();
    };
  }, [autoRotate, mouseNorm.x, mouseNorm.y]);

  const handleResetView = () => {
    dragRef.current.targetRotX = 0;
    dragRef.current.targetRotY = 0;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none z-20">
      {/* Contenedor del Canvas Three.js */}
      <div 
        ref={mountRef} 
        className={`w-full h-full cursor-grab active:cursor-grabbing relative flex items-center justify-center transition-opacity duration-500`}
        style={{ minHeight: '520px' }}
      />

      {/* Halo de foco de estudio detrás del tubo */}
      <div className="absolute pointer-events-none w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-radial from-[#107C41]/35 via-[#062618]/25 to-transparent blur-3xl -z-10" />

      {/* Puntos Interactivos (Hotspots) en Tiempo Real Proyectados */}
      {screenHotspots.map((spot) => {
        if (!spot.isVisible) return null;
        const isActive = activeHotspot?.id === spot.id;

        return (
          <div
            key={spot.id}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${spot.screenX}px`,
              top: `${spot.screenY}px`,
              pointerEvents: 'auto',
            }}
          >
            {/* Botón de Pulso */}
            <button
              onClick={() => setActiveHotspot(isActive ? null : spot)}
              className="group relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
              aria-label={`Ver información de ${spot.name}`}
            >
              {/* Anillo de pulso con halo verde esmeralda */}
              <span className="absolute inset-0 rounded-full bg-[#00A859] opacity-75 animate-ping" />
              <span className="absolute -inset-1.5 rounded-full border border-[#00FF88]/60 animate-pulse" />
              
              {/* Círculo central blanco */}
              <span className="relative w-4 h-4 rounded-full bg-white border-2 border-[#107C41] shadow-[0_0_12px_#00FF88] flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#062618]" />
              </span>

              {/* Etiqueta flotante sutil al pasar cursor */}
              <span className="absolute left-full ml-3 px-2 py-0.5 rounded bg-[#0A0D0C]/90 border border-[#107C41]/50 text-[10px] font-mono tracking-widest text-[#E2E8F0] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                [{spot.name.toUpperCase()}]
              </span>
            </button>

            {/* Popover / Tooltip Desplegable (Glassmorphism Oscuro con Borde Verde) */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 10 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                  className="absolute z-50 mt-3 sm:mt-0 sm:left-10 sm:-top-16 w-72 sm:w-80 p-4 rounded-xl bg-[#0A0D0C]/92 backdrop-blur-2xl border border-[#00A859] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,168,89,0.25)] text-left"
                >
                  {/* Encabezado del Popover */}
                  <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#107C41]/30 border border-[#00A859]/50 text-[#00FF88]">
                        <spot.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-wider text-[#00A859] font-bold block uppercase">
                          {spot.tag}
                        </span>
                        <h4 className="font-grotesk font-bold text-[15px] leading-tight text-white">
                          {spot.title}
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(null);
                      }}
                      className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Cerrar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Descripción Clave */}
                  <p className="font-inter font-normal text-[13px] leading-relaxed text-[#E2E8F0] mb-3">
                    {spot.description}
                  </p>

                  {/* Acciones contextuales */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    {spot.id === 'textura' ? (
                      <button
                        onClick={onOpenVideoModal}
                        className="flex items-center gap-1.5 text-[11px] font-montserrat font-bold text-[#00FF88] hover:underline"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Ver textura en video
                      </button>
                    ) : spot.id === 'formula' ? (
                      <button
                        onClick={onOpenAppModal}
                        className="flex items-center gap-1.5 text-[11px] font-montserrat font-bold text-[#00FF88] hover:underline"
                      >
                        <Award className="w-3 h-3" />
                        Ver prueba en piel
                      </button>
                    ) : (
                      <button
                        onClick={onOpenBuyModal}
                        className="flex items-center gap-1.5 text-[11px] font-montserrat font-bold text-[#00FF88] hover:underline"
                      >
                        <Package className="w-3 h-3" />
                        Adquirir edición 150ml
                      </button>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">PUNTO #{HOTSPOTS_DATA.findIndex(h => h.id === spot.id) + 1}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Barra flotante de Controles 3D (Recentrar, Auto-rotar, Tip de arrastre) */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0D0C]/80 backdrop-blur-md border border-white/10 text-[11px] font-grotesk text-[#94A3B8] shadow-lg pointer-events-auto">
        <span className="hidden sm:inline">Arrastra para rotar 360°</span>
        <span className="hidden sm:inline opacity-30">•</span>
        <button
          onClick={handleResetView}
          className="flex items-center gap-1 hover:text-white px-1.5 py-0.5 rounded transition-colors"
          title="Recentrar vista frontal"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Recentrar</span>
        </button>
        <span className="opacity-30">•</span>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${autoRotate ? 'text-[#00FF88] font-bold' : 'hover:text-white'}`}
          title="Giro automático continuo"
        >
          <Eye className="w-3 h-3" />
          <span>{autoRotate ? 'Detener Giro' : 'Auto Giro'}</span>
        </button>
      </div>
    </div>
  );
};
