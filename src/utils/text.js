// Minúsculas y sin tildes, para que "te para tres" encuentre "Té para Tres"
export function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// "1990-08-07" → "7 de agosto de 1990"
export function formatDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Apple carga "1 de enero" cuando solo conoce el año del disco: en ese caso se muestra solo el año
export function formatReleaseDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  if (month === '01' && day === '01') return year
  return formatDate(isoDate)
}

// 213 → "3:33"
export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}
