// Tamanho máximo do avatar gerado (px). Mantém a imagem pequena para
// caber no campo photoURL do Firebase Auth como string Base64.
const OUTPUT_SIZE = 160;
const OUTPUT_QUALITY = 0.6; // JPEG 0~1 — 0.6 gera ~10-15 KB em Base64

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () =>
      reject(new Error('Nao foi possivel carregar a imagem selecionada.')),
    );
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

/**
 * Recorta a imagem de acordo com os pixels informados pelo react-easy-crop
 * e retorna um Data URL (Base64) pronto para ser salvo no Firebase Auth
 * como photoURL — sem necessidade de Firebase Storage.
 *
 * @param {string} imageSrc  – data URL da imagem original (FileReader result)
 * @param {object} pixelCrop – { x, y, width, height } em pixels
 * @returns {Promise<string>} – data URL Base64 da imagem recortada e redimensionada
 */
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

  // Recorta na dimensão de saída fixa — redimensiona automaticamente
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';

  // Preenche o fundo com preto (evita fundo transparente no JPEG)
  context.fillStyle = '#000000';
  context.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  context.drawImage(
    image,
    Math.floor(pixelCrop.x),
    Math.floor(pixelCrop.y),
    Math.floor(pixelCrop.width),
    Math.floor(pixelCrop.height),
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE,
  );

  // Retorna diretamente como Data URL — sem Blob, sem Storage
  const dataUrl = canvas.toDataURL('image/jpeg', OUTPUT_QUALITY);

  if (!dataUrl || dataUrl === 'data:,') {
    throw new Error('Falha ao gerar o recorte da imagem.');
  }

  return dataUrl;
}
