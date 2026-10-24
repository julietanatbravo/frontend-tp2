// Minúsculas y sin tildes, para que "te para tres" encuentre "Té para Tres"
export function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// 213 → "3:33"
export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}
