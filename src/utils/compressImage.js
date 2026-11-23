export const compressImage = (file) => new Promise((resolve, reject) => {
  if (!file || !file.type?.startsWith('image/')) {
    reject(new Error('El archivo seleccionado no es una imagen valida.'));
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    try {
      const maxSize = 800;
      const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      if (!context) throw new Error('No se pudo preparar el procesador de imagen.');
      context.drawImage(image, 0, 0, width, height);

      const preferredType = 'image/webp';
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(objectUrl);
        if (!blob) {
          reject(new Error('No se pudo comprimir la imagen.'));
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('No se pudo leer la imagen comprimida.'));
        reader.readAsDataURL(blob);
      }, preferredType, 0.75);
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      reject(error instanceof Error ? error : new Error('Error desconocido al comprimir la imagen.'));
    }
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error('La imagen no pudo abrirse en este dispositivo.'));
  };
  image.src = objectUrl;
});
