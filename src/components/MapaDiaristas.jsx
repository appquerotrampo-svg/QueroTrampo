import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '../lib/supabase'
import { SERVICE_CATEGORIES } from '../lib/categories'
import 'leaflet/dist/leaflet.css'

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const userIcon = new L.DivIcon({
  html: `<div style="width:16px;height:16px;background:#FF6B00;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 2px #FF6B00"></div>`,
  className: '', iconAnchor: [8, 8],
})

const diaristIcon = new L.DivIcon({
  html: `<div style="width:14px;height:14px;background:#000;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
  className: '', iconAnchor: [7, 7],
})

function RecenterMap({ coords }) {
  const map = useMap()
  useEffect(() => { if (coords) map.setView([coords.lat, coords.lng], 13) }, [coords, map])
  return null
}

export default function MapaDiaristas({ coords, raioKm = 15 }) {
  const [diaristas, setDiaristas] = useState([])
  const [loading, setLoading] = useState(false)
  const [raio, setRaio] = useState(raioKm)

  useEffect(() => {
    if (!coords) return
    setLoading(true)
    supabase.rpc('diaristas_proximos', {
      user_lat: coords.lat,
      user_lng: coords.lng,
      raio_km: raio,
    }).then(({ data, error }) => {
      if (!error) setDiaristas(data || [])
      setLoading(false)
    })
  }, [coords, raio])

  // Realtime: atualiza marcadores quando diaristas movem
  useEffect(() => {
    const channel = supabase
      .channel('localizacoes-map')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'localizacoes' }, () => {
        if (!coords) return
        supabase.rpc('diaristas_proximos', {
          user_lat: coords.lat,
          user_lng: coords.lng,
          raio_km: raio,
        }).then(({ data }) => { if (data) setDiaristas(data) })
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [coords, raio])

  if (!coords) return (
    <div style={{ backgroundColor: '#F6F6F6', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#ABABAB' }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
      <p style={{ fontSize: '14px' }}>Permita o acesso à localização para ver diaristas próximos</p>
    </div>
  )

  return (
    <div>
      {/* Filtro de raio */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', color: '#545454', fontWeight: 600 }}>Raio:</span>
        {[5, 10, 15, 30].map(r => (
          <button key={r} type="button" onClick={() => setRaio(r)}
            style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
              border: raio === r ? '2px solid #000' : '1.5px solid #E5E5E5',
              backgroundColor: raio === r ? '#000' : '#fff',
              color: raio === r ? '#fff' : '#545454',
              cursor: 'pointer',
            }}>
            {r} km
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#ABABAB' }}>
          {loading ? 'buscando...' : `${diaristas.length} diarista${diaristas.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Mapa */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E5E5', height: '400px' }}>
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          />
          <RecenterMap coords={coords} />

          {/* Usuário atual */}
          <Marker position={[coords.lat, coords.lng]} icon={userIcon}>
            <Popup><strong>Você está aqui</strong></Popup>
          </Marker>

          {/* Círculo de raio */}
          <Circle
            center={[coords.lat, coords.lng]}
            radius={raio * 1000}
            pathOptions={{ color: '#FF6B00', fillColor: '#FF6B00', fillOpacity: 0.04, weight: 1.5, dashArray: '6' }}
          />

          {/* Diaristas */}
          {diaristas.map(d => (
            <Marker key={d.usuario_id} position={[d.lat, d.lng]} icon={diaristIcon}>
              <Popup>
                <div style={{ minWidth: '180px' }}>
                  <p style={{ fontWeight: 800, fontSize: '15px', margin: '0 0 4px' }}>{d.nome}</p>
                  <p style={{ fontSize: '12px', color: '#545454', margin: '0 0 6px' }}>
                    📍 {d.cidade} · {d.distancia_km} km
                  </p>
                  {d.valor_diaria && (
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#FF6B00', margin: '0 0 6px' }}>
                      R$ {d.valor_diaria}/dia
                    </p>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {d.categorias?.slice(0, 3).map(catId => {
                      const cat = SERVICE_CATEGORIES.find(c => c.id === catId)
                      return cat ? (
                        <span key={catId} style={{ fontSize: '11px', background: '#F6F6F6', padding: '2px 6px', borderRadius: '4px' }}>
                          {cat.icon} {cat.label}
                        </span>
                      ) : null
                    })}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                      backgroundColor: d.disponivel ? '#dcfce7' : '#fef2f2',
                      color: d.disponivel ? '#16a34a' : '#dc2626',
                    }}>
                      {d.disponivel ? '● Disponível' : '● Ocupado'}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Lista */}
      {diaristas.length > 0 && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {diaristas.slice(0, 5).map(d => (
            <div key={d.usuario_id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', backgroundColor: '#fff',
              border: '1px solid #E5E5E5', borderRadius: '10px',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>
                {d.nome[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: '14px', margin: 0 }}>{d.nome}</p>
                <p style={{ fontSize: '12px', color: '#ABABAB', margin: 0 }}>{d.cidade} · {d.distancia_km} km de distância</p>
              </div>
              {d.valor_diaria && (
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#FF6B00', flexShrink: 0 }}>
                  R${d.valor_diaria}
                </span>
              )}
              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', flexShrink: 0,
                backgroundColor: d.disponivel ? '#dcfce7' : '#fef2f2',
                color: d.disponivel ? '#16a34a' : '#dc2626',
              }}>
                {d.disponivel ? 'Disponível' : 'Ocupado'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
