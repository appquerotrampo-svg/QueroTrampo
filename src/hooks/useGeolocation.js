import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateSupabase = useCallback(async (lat, lng) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('localizacoes').upsert(
      { usuario_id: user.id, lat, lng, updated_at: new Date().toISOString() },
      { onConflict: 'usuario_id' }
    )
  }, [])

  const request = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocalização não suportada.'); return }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })
        setLoading(false)
        updateSupabase(lat, lng)
      },
      err => { setError(err.message); setLoading(false) },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [updateSupabase])

  // Watch position continuously
  useEffect(() => {
    if (!navigator.geolocation) return
    const id = navigator.geolocation.watchPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        setCoords({ lat, lng })
        updateSupabase(lat, lng)
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 15000 }
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [updateSupabase])

  return { coords, error, loading, request }
}
