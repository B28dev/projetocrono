function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(new Error('Nao foi possivel carregar a imagem selecionada.')));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

export default async function getCroppedImg(imageSrc, pixelCrop) {
  if (!imageSrc || !pixelCrop) {
    throw new Error('Dados de recorte invalidos.');
  }

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas indisponivel no navegador.');
  }

  const safeWidth = Math.max(1, Math.floor(pixelCrop.width));
  const safeHeight = Math.max(1, Math.floor(pixelCrop.height));

  canvas.width = safeWidth;
  canvas.height = safeHeight;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    safeWidth,
    safeHeight,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Falha ao gerar o recorte da imagem.'));
          return;
        }

        resolve(blob);
      },
      'image/jpeg',
      0.92,
    );
  });
}
