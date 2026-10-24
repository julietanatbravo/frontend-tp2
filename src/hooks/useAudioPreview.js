import { useEffect, useRef, useState } from 'react'

// Un solo reproductor para toda la lista: al poner otra canción, la anterior se corta.
// status de la canción actual: 'idle' | 'loading' | 'playing' | 'paused' | 'error'
export function useAudioPreview() {
  const audioRef = useRef(null)
  // Audio ya descargado de cada canción (id → URL local), para no bajarlo dos veces
  const urlCacheRef = useRef(new Map())
  // Identifica el último pedido: si se elige otra canción mientras una carga, la vieja se descarta
  const requestRef = useRef(0)
  const [currentId, setCurrentId] = useState(null)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = new Audio()
    const urlCache = urlCacheRef.current
    audioRef.current = audio

    const handleTimeUpdate = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const handleEnded = () => {
      setStatus('idle')
      setProgress(0)
    }
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    // Al salir de la página, el audio se detiene y se libera la memoria
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      urlCache.forEach((url) => URL.revokeObjectURL(url))
      urlCache.clear()
    }
  }, [])

  // El servidor de Apple declara los previews como "audio/x-m4p", un tipo que algunos
  // navegadores (como Firefox) rechazan. Se descarga el audio y se reetiqueta como audio/mp4.
  async function getPlayableUrl(song) {
    const cache = urlCacheRef.current
    if (cache.has(song.id)) return cache.get(song.id)

    const response = await fetch(song.preview)
    if (!response.ok) throw new Error(`El preview respondió ${response.status}`)
    const blob = new Blob([await response.arrayBuffer()], { type: 'audio/mp4' })
    const url = URL.createObjectURL(blob)
    cache.set(song.id, url)
    return url
  }

  const toggle = async (song) => {
    const audio = audioRef.current
    const isCurrent = currentId === song.id

    if (isCurrent && status === 'loading') return
    if (isCurrent && status === 'playing') {
      audio.pause()
      setStatus('paused')
      return
    }
    if (isCurrent && status === 'paused') {
      setStatus('playing')
      audio.play().catch(() => setStatus('error'))
      return
    }

    // Canción nueva, reintento después de un error o volver a escuchar una que terminó
    const request = ++requestRef.current
    audio.pause()
    setCurrentId(song.id)
    setProgress(0)
    setStatus('loading')

    try {
      const url = await getPlayableUrl(song)
      if (request !== requestRef.current) return
      audio.src = url
      await audio.play()
      if (request === requestRef.current) setStatus('playing')
    } catch {
      if (request === requestRef.current) setStatus('error')
    }
  }

  return { currentId, status, progress, toggle }
}
