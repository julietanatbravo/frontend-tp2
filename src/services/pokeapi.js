import { getMultiplier } from '../utils/effectiveness'

const API_URL = 'https://pokeapi.co/api/v2'
// Pokémon de la 1.ª a la 9.ª generación
const TOTAL_POKEMON = 1025

// Las relaciones de un tipo no cambian, así que se guardan para no repetir pedidos
const typeCache = new Map()

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`La PokéAPI respondió ${response.status}`)
  return response.json()
}

function randomId() {
  return Math.floor(Math.random() * TOTAL_POKEMON) + 1
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// "mr-mime" → "Mr Mime"
function formatName(name) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function fetchPokemon(id, signal) {
  const data = await fetchJson(`${API_URL}/pokemon/${id}`, signal)
  return {
    id: data.id,
    name: formatName(data.species.name),
    image: data.sprites.other['official-artwork'].front_default ?? data.sprites.front_default,
    types: data.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
  }
}

export async function fetchTypeRelations(type, signal) {
  if (typeCache.has(type)) return typeCache.get(type)

  const data = await fetchJson(`${API_URL}/type/${type}`, signal)
  const names = (list) => list.map((t) => t.name)
  const relations = {
    double: names(data.damage_relations.double_damage_to),
    half: names(data.damage_relations.half_damage_to),
    none: names(data.damage_relations.no_damage_to),
  }
  typeCache.set(type, relations)
  return relations
}

// Arma una ronda: dos Pokémon distintos y el multiplicador del ataque de uno al otro
export async function createRound(signal) {
  const attackerId = randomId()
  let defenderId = randomId()
  while (defenderId === attackerId) defenderId = randomId()

  const [attacker, defender] = await Promise.all([
    fetchPokemon(attackerId, signal),
    fetchPokemon(defenderId, signal),
  ])

  const attackType = pickRandom(attacker.types)
  const relations = await fetchTypeRelations(attackType, signal)

  const breakdown = defender.types.map((type) => ({
    type,
    multiplier: getMultiplier(relations, type),
  }))
  const multiplier = breakdown.reduce((total, b) => total * b.multiplier, 1)

  return { attacker, defender, attackType, breakdown, multiplier }
}
