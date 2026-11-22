// Generador de textura procedural en Canvas 2D de alta resolución (2048x1024)
// Diseñado para envolver perfectamente el tubo 3D con la estética exacta de la referencia oficial
export function generateTubeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Fondo blanco satinado del tubo
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sutil gradiente de sombra para profundidad cilíndrica natural
  const tubeGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  tubeGrad.addColorStop(0, '#E2E8F0');
  tubeGrad.addColorStop(0.15, '#FFFFFF');
  tubeGrad.addColorStop(0.5, '#F8FAFC');
  tubeGrad.addColorStop(0.85, '#FFFFFF');
  tubeGrad.addColorStop(1, '#E2E8F0');
  ctx.fillStyle = tubeGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Líneas de sellado superior (crimped tube seal) en la parte superior de la textura
  ctx.fillStyle = '#CBD5E1';
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.fillRect(x, 0, 8, 48);
  }
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(0, 46, canvas.width, 4);

  // 3. ETIQUETA PRINCIPAL EN EL FRENTE (Centro de la textura: x ~ 1024)
  const labelW = 760;
  const labelH = 620;
  const labelX = (canvas.width - labelW) / 2;
  const labelY = 220;

  // Sombra proyectada suave de la etiqueta
  ctx.save();
  ctx.shadowColor = 'rgba(6, 38, 24, 0.45)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;

  // Base de la etiqueta: Verde Esmeralda Profundo con degradado
  const labelGrad = ctx.createLinearGradient(labelX, labelY, labelX + labelW, labelY + labelH);
  labelGrad.addColorStop(0, '#04170E');
  labelGrad.addColorStop(0.3, '#062618');
  labelGrad.addColorStop(0.6, '#107C41');
  labelGrad.addColorStop(1, '#00A859');

  // Forma de etiqueta con esquinas ornamentales redondeadas
  const r = 36;
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
  ctx.fillStyle = labelGrad;
  ctx.fill();
  ctx.restore();

  // Borde exterior dorado/plateado ornamental
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Borde interior con filigrana esmeralda brillante
  ctx.strokeStyle = '#00FF88';
  ctx.lineWidth = 2;
  ctx.strokeRect(labelX + 16, labelY + 16, labelW - 32, labelH - 32);

  // Puntos decorativos en esquinas de la etiqueta
  const corners = [
    [labelX + 28, labelY + 28],
    [labelX + labelW - 28, labelY + 28],
    [labelX + 28, labelY + labelH - 28],
    [labelX + labelW - 28, labelY + labelH - 28]
  ];
  ctx.fillStyle = '#FFFFFF';
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Emblema Central: Arco y Óvalo "ESMERALDA"
  const centerX = labelX + labelW / 2;
  
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Texto: "★ ESMERALDA ★"
  ctx.font = '900 52px "Montserrat", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 8;
  ctx.fillText('★  ESMERALDA  ★', centerX, labelY + 80);

  // Línea divisoria fina plateada
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 180, labelY + 120);
  ctx.lineTo(centerX + 180, labelY + 120);
  ctx.stroke();

  // Subtítulo: "PURO CARAMELO"
  ctx.font = '700 36px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('PURO CARAMELO', centerX, labelY + 165);

  // Escudo central para "GEORGE 2.0"
  const shieldW = 440;
  const shieldH = 170;
  const shieldX = centerX - shieldW / 2;
  const shieldY = labelY + 215;

  ctx.fillStyle = '#062618';
  ctx.strokeStyle = '#00FF88';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(shieldX, shieldY, shieldW, shieldH, 20) : ctx.rect(shieldX, shieldY, shieldW, shieldH);
  ctx.fill();
  ctx.stroke();

  // Texto Gigante: "GEORGE 2.0"
  ctx.font = '900 76px "Anton", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 255, 136, 0.6)';
  ctx.shadowBlur = 18;
  ctx.fillText('GEORGE 2.0', centerX, shieldY + 95);

  // Placa Inferior Roja: "CHICA // RUNNING"
  const tagW = 280;
  const tagH = 50;
  const tagX = centerX - tagW / 2;
  const tagY = labelY + 420;

  ctx.fillStyle = '#D92D20';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(tagX, tagY, tagW, tagH, 25) : ctx.rect(tagX, tagY, tagW, tagH);
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 28px "Montserrat", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowBlur = 4;
  ctx.fillText('CHICA // RUNNING', centerX, tagY + 28);

  // Información Técnica Inferior
  ctx.font = '600 20px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('150 ML // 5.1 FL.OZ  •  DERMA-SPORT RECOVERY', centerX, labelY + 515);

  ctx.font = '500 15px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(226, 232, 240, 0.7)';
  ctx.fillText('FÓRMULA CRIO-TÉRMICA ANTIFRICCIÓN DE ALTO IMPACTO', centerX, labelY + 555);

  ctx.restore();

  // Cara trasera del tubo
  const backCenterX = 350;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#334155';
  ctx.font = '700 22px "Space Grotesk", sans-serif';
  ctx.fillText('GEORGE 2.0 SPORT RECOVERY LAB', backCenterX, 320);
  ctx.font = '500 14px "Inter", sans-serif';
  ctx.fillText('Modo de uso: Aplicar antes y después de cada sesión de running.', backCenterX, 370);
  ctx.fillText('Ingredientes: Esmeralda Bio-Activa, Óleo de Caramelo, Mentol, Magnesio.', backCenterX, 400);
  ctx.fillText('Hecho para atletas de alto rendimiento.', backCenterX, 430);
  ctx.restore();

  return canvas;
}
