// Generador de textura de alta definición para el tubo 3D GEORGE 2.0
// Integra la etiqueta oficial exacta "ESMERALDA - PURO CARAMELO - GEORGE 2.0 - DIABLO"
export function generateTubeTexture(onTextureLoaded) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Fondo blanco satinado cosmético de lujo
  ctx.fillStyle = '#FAFAFA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sutil gradiente de sombra para profundidad cilíndrica natural
  const tubeGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  tubeGrad.addColorStop(0, '#E2E8F0');
  tubeGrad.addColorStop(0.12, '#FFFFFF');
  tubeGrad.addColorStop(0.5, '#F8FAFC');
  tubeGrad.addColorStop(0.88, '#FFFFFF');
  tubeGrad.addColorStop(1, '#E2E8F0');
  ctx.fillStyle = tubeGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Líneas de sellado superior (crimped tube seal)
  ctx.fillStyle = '#CBD5E1';
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.fillRect(x, 0, 8, 48);
  }
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(0, 46, canvas.width, 4);

  // Dimensiones y posición de la etiqueta en el frente del tubo
  const labelW = 440;
  const labelH = 740;
  const labelX = (canvas.width - labelW) / 2;
  const labelY = 160;

  // 3. Renderizado inmediato vectorial del diseño oficial exacto mientras carga la imagen
  const drawVectorLabel = () => {
    ctx.save();

    // Sombra suave proyectada por la etiqueta sobre el tubo plástico
    ctx.shadowColor = 'rgba(6, 38, 24, 0.4)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;

    // Fondo Verde Esmeralda Profundo
    const r = 28;
    ctx.beginPath();
    ctx.moveTo(labelX + r, labelY);
    ctx.lineTo(labelX + labelW - r, labelY);
    ctx.quadraticCurveTo(labelX + labelW, labelY, labelX + labelW, labelY + r);
    ctx.lineTo(labelX + labelW, labelY + labelH - r);
    ctx.quadraticCurveTo(labelX + labelW, labelY + labelH, labelX + labelW - r, labelY + labelH);
    ctx.lineTo(labelX + r, labelY + labelH);
    ctx.quadraticCurveTo(labelX, labelY + labelH, labelX, labelY + labelH - r);
    ctx.lineTo(labelX, labelY + r);
    ctx.quadraticCurveTo(labelX, labelY, labelX + r, labelY);
    ctx.closePath();
    ctx.fillStyle = '#0F5132'; // Verde esmeralda profundo de la etiqueta oficial
    ctx.fill();
    ctx.restore();

    // Doble línea de borde blanca/crema
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(labelX + 8, labelY + 8, labelW - 16, labelH - 16);

    const cX = labelX + labelW / 2;

    // Arco blanco superior (semicírculo)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cX, labelY + 220, 160, Math.PI, 0, false);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Texto curvado "ESMERALDA" en marrón oscuro
    ctx.save();
    ctx.font = '900 38px "Montserrat", sans-serif';
    ctx.fillStyle = '#3E2415'; // Marrón característico
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ESMERALDA', cX, labelY + 115);

    // Hojas verdes a los costados
    ctx.fillStyle = '#0F5132';
    ctx.font = '32px sans-serif';
    ctx.fillText('🌿', cX - 110, labelY + 185);
    ctx.fillText('🌿', cX + 110, labelY + 185);

    // Texto: PURO CARAMELO
    ctx.font = '900 28px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#062618';
    ctx.fillText('PURO CARAMELO', cX, labelY + 235);

    // Título monumental: GEORGE 2.0 con trazo blanco
    ctx.font = '900 58px "Anton", sans-serif';
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeText('GEORGE 2.0', cX, labelY + 320);
    ctx.fillStyle = '#5A2A18'; // Relleno marrón
    ctx.fillText('GEORGE 2.0', cX, labelY + 320);

    // Cartela curva roja DIABLO
    ctx.save();
    ctx.translate(cX, labelY + 410);
    ctx.rotate(-0.03);
    ctx.font = '900 64px "Anton", sans-serif';
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeText('DIABLO', 0, 0);
    ctx.fillStyle = '#991B1B'; // Rojo carmesí
    ctx.fillText('DIABLO', 0, 0);
    ctx.restore();

    // Textos inferiores de calidad y origen
    ctx.font = '700 16px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('CALIDAD', cX, labelY + 540);
    ctx.font = '600 13px "Inter", sans-serif';
    ctx.fillText('SABOR Y TRADICION NATURAL', cX, labelY + 580);
    ctx.font = '700 15px "Space Grotesk", sans-serif';
    ctx.fillText('ORIGINAL', cX, labelY + 625);

    ctx.restore();
  };

  // Dibujar vector de inmediato
  drawVectorLabel();

  // 4. Cargar la imagen oficial de alta resolución y sobreponerla con máxima nitidez
  const img = new Image();
  img.src = '/assets/label_diablo_official.jpg';
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    // Limpiar zona de la etiqueta
    ctx.save();
    
    // Aplicar sombra
    ctx.shadowColor = 'rgba(6, 38, 24, 0.45)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;

    // Dibujar la imagen oficial recortada con bordes redondeados
    const r = 26;
    ctx.beginPath();
    ctx.moveTo(labelX + r, labelY);
    ctx.lineTo(labelX + labelW - r, labelY);
    ctx.quadraticCurveTo(labelX + labelW, labelY, labelX + labelW, labelY + r);
    ctx.lineTo(labelX + labelW, labelY + labelH - r);
    ctx.quadraticCurveTo(labelX + labelW, labelY + labelH, labelX + labelW - r, labelY + labelH);
    ctx.lineTo(labelX + r, labelY + labelH);
    ctx.quadraticCurveTo(labelX, labelY + labelH, labelX, labelY + labelH - r);
    ctx.lineTo(labelX, labelY + r);
    ctx.quadraticCurveTo(labelX, labelY, labelX + r, labelY);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, labelX, labelY, labelW, labelH);
    ctx.restore();

    // Notificar a Three.js que la textura fue actualizada
    if (onTextureLoaded) {
      onTextureLoaded();
    }
  };

  return canvas;
}
