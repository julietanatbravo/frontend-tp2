// Multiplicadores posibles de un ataque contra un Pokémon de uno o dos tipos
export const MULTIPLIERS = [
  { value: 0, symbol: '×0', label: 'No le afecta' },
  { value: 0.25, symbol: '×¼', label: 'Muy poco eficaz' },
  { value: 0.5, symbol: '×½', label: 'Poco eficaz' },
  { value: 1, symbol: '×1', label: 'Normal' },
  { value: 2, symbol: '×2', label: 'Súper eficaz' },
  { value: 4, symbol: '×4', label: 'Extremadamente eficaz' },
]

export function formatMultiplier(value) {
  return MULTIPLIERS.find((m) => m.value === value)?.symbol ?? `×${value}`
}

// relations: { double, half, none } con los nombres de los tipos afectados
export function getMultiplier(relations, defenseType) {
  if (relations.none.includes(defenseType)) return 0
  if (relations.double.includes(defenseType)) return 2
  if (relations.half.includes(defenseType)) return 0.5
  return 1
}
