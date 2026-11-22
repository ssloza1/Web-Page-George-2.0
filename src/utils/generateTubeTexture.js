// Textura procedural Canvas 2D — Diseño DIABLO / ESMERALDA
// Fondo verde oscuro, círculo blanco superior con ESMERALDA + hojas,
// PURO CARAMELO, GEORGE 2.0, badge DIABLO rojo, pie de página

export function generateTubeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // ─── 1. FONDO BLANCO SATINADO DEL TUBO ───────────────────────────────────
  const tubeGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  tubeGrad.addColorStop(0, '#D6E4D8');
  tubeGrad.addColorStop(0.12, '#FFFFFF');
  tubeGrad.addColorStop(0.5, '#F5FAF6');
  tubeGrad.addColorStop(0.88, '#FFFFFF');
  tubeGrad.addColorStop(1, '#D6E4D8');
  ctx.fillStyle = tubeGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Crimped seal superior
  ctx.fillStyle = '#B0C4B8';
  for (let x = 0; x < canvas.width; x += 20) {
    ctx.fillRect(x, 0, 10, 40);
  }
  ctx.fillStyle = '#8FA89A';
  ctx.fillRect(0, 38, canvas.width, 5);

  // ─── 2. ETIQUETA PRINCIPAL ────────────────────────────────────────────────
  const labelW = 740;
  const labelH = 660;
  const labelX = (canvas.width - labelW) / 2;
  const labelY = 180;
  const centerX = labelX + labelW / 2;
  const r = 40;

  // Sombra de la etiqueta
  ctx.save();
  ctx.shadowColor = 'rgba(0, 30, 10, 0.55)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 14;

  // Fondo verde oscuro principal
  function drawLabel(fill) {
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
    ctx.fillStyle = fill;
    ctx.fill();
  }

  const bgGrad = ctx.createLinearGradient(labelX, labelY, labelX + labelW, labelY + labelH);
  bgGrad.addColorStop(0, '#1A4A28');
  bgGrad.addColorStop(0.4, '#1E5C30');
  bgGrad.addColorStop(1, '#14401F');
  drawLabel(bgGrad);
  ctx.restore();

  // Borde exterior blanco/marfil
  ctx.save();
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
  ctx.strokeStyle = '#E8F5EC';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();

  // ─── 3. CÍRCULO BLANCO SUPERIOR (zona ESMERALDA + hojas) ─────────────────
  const circleR = 190;
  const circleCY = labelY + 230;

  // Círculo blanco con borde verde oscuro
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, circleCY, circleR, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.strokeStyle = '#1A4A28';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();

  // ─── TEXTO "ESMERALDA" curvado en arco superior ───────────────────────────
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dibuja texto a lo largo de un arco (curva superior del círculo)
  const arcText = 'ESMERALDA';
  const arcR = 148;
  const arcStartAngle = -Math.PI * 0.72;
  const arcEndAngle = -Math.PI * 0.28;
  const arcStep = (arcEndAngle - arcStartAngle) / (arcText.length - 1);

  ctx.font = '900 42px "Arial Black", sans-serif';
  ctx.fillStyle = '#1A3D22';

  for (let i = 0; i < arcText.length; i++) {
    const angle = arcStartAngle + i * arcStep;
    const charX = centerX + arcR * Math.cos(angle);
    const charY = circleCY + arcR * Math.sin(angle);
    ctx.save();
    ctx.translate(charX, charY);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(arcText[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();

  // ─── HOJAS DECORATIVAS (izquierda y derecha del círculo) ──────────────────
  function drawLeaf(x, y, flipX) {
    ctx.save();
    ctx.translate(x, y);
    if (flipX) ctx.scale(-1, 1);
    ctx.fillStyle = '#2D7A3A';
    ctx.beginPath();
    // Hoja simple con bezier
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-30, -20, -50, -60, -20, -90);
    ctx.bezierCurveTo(10, -60, 20, -20, 0, 0);
    ctx.fill();
    // Nervio central
    ctx.strokeStyle = '#1A4A28';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -50);
    ctx.stroke();
    ctx.restore();
  }

  drawLeaf(centerX - 110, circleCY - 60, false);
  drawLeaf(centerX + 110, circleCY - 60, true);

  // ─── TEXTO "PURO CARAMELO" dentro del círculo ─────────────────────────────
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '700 32px "Arial", sans-serif';
  ctx.fillStyle = '#1A4A28';
  ctx.fillText('PURO CARAMELO', centerX, circleCY + 60);
  ctx.restore();

  // ─── 4. FRANJA MARRÓN OSCURO (separación entre círculo y zona GEORGE 2.0) ─
  const stripY = labelY + 420;
  const stripH = 10;
  ctx.fillStyle = '#5C2D2D';
  ctx.fillRect(labelX + 20, stripY, labelW - 40, stripH);

  // ─── 5. TEXTO GRANDE "GEORGE 2.0" ─────────────────────────────────────────
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Sombra interior tipo letra con relleno blanco + contorno marrón oscuro
  const georgeY = labelY + 490;

  // Sombra
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;

  ctx.font = '900 100px "Arial Black", sans-serif';
  // Relleno crema/blanco
  ctx.fillStyle = '#F5EDD8';
  ctx.fillText('GEORGE 2.0', centerX, georgeY);

  // Contorno marrón vino
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = '#5C2020';
  ctx.lineWidth = 4;
  ctx.strokeText('GEORGE 2.0', centerX, georgeY);

  ctx.restore();

  // ─── 6. BADGE ROJO "DIABLO" ───────────────────────────────────────────────
  const badgeW = 300;
  const badgeH = 68;
  const badgeX = centerX - badgeW / 2;
  const badgeY = labelY + 555;
  const badgeR = 34;

  ctx.save();
  // Sombra del badge
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 6;

  // Fondo rojo del badge
  const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
  badgeGrad.addColorStop(0, '#E03030');
  badgeGrad.addColorStop(1, '#9B1515');
  ctx.beginPath();
  ctx.moveTo(badgeX + badgeR, badgeY);
  ctx.lineTo(badgeX + badgeW - badgeR, badgeY);
  ctx.quadraticCurveTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + badgeR);
  ctx.lineTo(badgeX + badgeW, badgeY + badgeH - badgeR);
  ctx.quadraticCurveTo(badgeX + badgeW, badgeY + badgeH, badgeX + badgeW - badgeR, badgeY + badgeH);
  ctx.lineTo(badgeX + badgeR, badgeY + badgeH);
  ctx.quadraticCurveTo(badgeX, badgeY + badgeH, badgeX, badgeY + badgeH - badgeR);
  ctx.lineTo(badgeX, badgeY + badgeR);
  ctx.quadraticCurveTo(badgeX, badgeY, badgeX + badgeR, badgeY);
  ctx.closePath();
  ctx.fillStyle = badgeGrad;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // Texto "DIABLO"
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 48px "Arial Black", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 6;
  ctx.fillText('DIABLO', centerX, badgeY + badgeH / 2);
  ctx.restore();

  // ─── 7. PIE DE ETIQUETA ───────────────────────────────────────────────────
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const footerY1 = labelY + 645;
  const footerY2 = labelY + 678;
  const footerY3 = labelY + 710;

  // Línea divisoria
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(labelX + 60, footerY1 - 20);
  ctx.lineTo(labelX + labelW - 60, footerY1 - 20);
  ctx.stroke();

  ctx.font = '700 22px "Arial", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.90)';
  ctx.letterSpacing = '3px';
  ctx.fillText('CALIDAD', centerX, footerY1);

  ctx.font = '500 19px "Arial", sans-serif';
  ctx.fillStyle = 'rgba(220,240,225,0.80)';
  ctx.fillText('SABOR Y TRADICION NATURAL', centerX, footerY2);

  ctx.font = '700 20px "Arial", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.90)';
  ctx.fillText('ORIGINAL', centerX, footerY3);

  ctx.restore();

  // ─── 8. CARA TRASERA DEL TUBO ─────────────────────────────────────────────
  const backX = 350;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#3A5A42';
  ctx.font = '700 20px "Arial", sans-serif';
  ctx.fillText('GEORGE VARIEDADES', backX, 300);
  ctx.font = '500 13px "Arial", sans-serif';
  ctx.fillStyle = '#4A6A52';
  ctx.fillText('Modo de uso: Aplicar generosamente.', backX, 350);
  ctx.fillText('Calidad • Sabor • Tradición Natural', backX, 380);
  ctx.fillText('Hecho con ingredientes selectos.', backX, 410);
  ctx.restore();

  return canvas;
}
