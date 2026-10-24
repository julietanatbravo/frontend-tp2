import { useEffect, useState } from 'react'
import { createRound } from '../services/pokeapi'

// Maneja los estados de la consulta: 'loading' | 'error' | 'ready'
export function usePokemonRound() {
  const [state, setState] = useState({ status: 'loading', round: null })
  const [requestId, setRequestId] = useState(0)

  useEffect(() => {
    // Si se pide otra ronda antes de que termine esta, se cancela la anterior
    const controller = new AbortController()

    createRound(controller.signal)
      .then((round) => setState({ status: 'ready', round }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ status: 'error', round: null })
      })

    return () => controller.abort()
  }, [requestId])

  const nextRound = () => {
    setState({ status: 'loading', round: null })
    setRequestId((id) => id + 1)
  }

  return { ...state, nextRound }
}
