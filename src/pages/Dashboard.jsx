import { useState, useEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { SERVICE_CATEGORIES } from '../lib/categories'
import { supabase } from '../lib/supabase'

const MapaDiaristas = lazy(() => import('../components/MapaDiaristas'))

export default function Dashboard() {
  const { profile, signOut, loading } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F6F6' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #FF6B00', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: '#ABABAB', fontSize: '14px' }}>Carregando...</p>
        </div>
      </div>
    )
  }

  const isDiarista = profile?.tipo === 'diarista'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F6F6F6' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Boas-vindas */}
        <div style={{ backgroundColor: '#000', borderRadius: '16px', padding: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#ABABAB', fontSize: '13px', marginBottom: '4px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {isDiarista ? 'Diarista' : 'Solicitante'}
            </p>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', marginBottom: '4px' }}>
              Olá, {profile?.nome?.split(' ')[0]}
            </h1>
            <p style={{ color: '#545454', fontSize: '13px' }}>
              {profile?.cidade}{profile?.estado ? ` — ${profile.estado}` : ''} · {profile?.email}
            </p>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
            {profile?.nome?.[0]?.toUpperCase()}
          </div>
        </div>

        {isDiarista
          ? <DiaristaDashboard profile={profile} />
          : <SolicitanteDashboard profile={profile} />}
      </div>
    </div>
  )
}

function DiaristaDashboard({ profile }) {
  const { coords, error: geoError, loading: geoLoading, request } = useGeolocation()
  const [disponivel, setDisponivel] = useState(profile?.diarista?.disponivel ?? true)

  const toggleDisponivel = async () => {
    const next = !disponivel
    setDisponivel(next)
    await supabase.from('diaristas')
      .update({ disponivel: next, ultimo_ping: new Date().toISOString() })
      .eq('usuario_id', profile.id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF6B00', marginBottom: '4px' }}>
            R${profile?.diarista?.valor_diaria ?? '—'}
          </div>
          <p style={{ fontSize: '13px', color: '#ABABAB' }}>Valor por diária</p>
        </div>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#000', marginBottom: '4px' }}>0</div>
          <p style={{ fontSize: '13px', color: '#ABABAB' }}>Diárias realizadas</p>
        </div>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px', cursor: 'pointer' }} onClick={toggleDisponivel}>
          <div style={{ fontSize: '22px', marginBottom: '4px' }}>{disponivel ? '🟢' : '🔴'}</div>
          <p style={{ fontSize: '13px', color: '#ABABAB' }}>{disponivel ? 'Disponível' : 'Indisponível'}</p>
          <p style={{ fontSize: '11px', color: '#FF6B00', fontWeight: 600, marginTop: '2px' }}>Toque para alterar</p>
        </div>
      </div>

      {/* Localização em tempo real */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '2px' }}>Sua localização</h2>
            <p style={{ fontSize: '13px', color: '#ABABAB' }}>
              {coords ? `📍 ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Não compartilhada'}
            </p>
          </div>
          <button
            onClick={request}
            disabled={geoLoading}
            className="qt-btn qt-btn-primary"
            style={{ fontSize: '13px', padding: '8px 16px' }}>
            {geoLoading ? 'Buscando...' : coords ? 'Atualizar' : 'Compartilhar localização'}
          </button>
        </div>
        {geoError && <p style={{ fontSize: '13px', color: '#dc2626' }}>⚠️ {geoError}</p>}
        {coords && (
          <Suspense fallback={<div style={{ height: '200px', backgroundColor: '#F6F6F6', borderRadius: '8px' }} />}>
            <MapaDiaristas coords={coords} />
          </Suspense>
        )}
        {!coords && (
          <div style={{ backgroundColor: '#F6F6F6', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#ABABAB' }}>Compartilhe sua localização para aparecer no mapa para os solicitantes</p>
          </div>
        )}
      </div>

      {/* Habilidades */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px' }}>Suas habilidades</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(profile?.diarista?.categorias ?? []).map(id => {
            const cat = SERVICE_CATEGORIES.find(c => c.id === id)
            return cat ? (
              <span key={id} style={{ fontSize: '13px', padding: '6px 12px', borderRadius: '20px', fontWeight: 600, backgroundColor: '#F6F6F6', color: '#545454', border: '1px solid #E5E5E5' }}>
                {cat.icon} {cat.label}
              </span>
            ) : null
          })}
        </div>
      </div>
    </div>
  )
}

function SolicitanteDashboard({ profile }) {
  const { coords, error: geoError, loading: geoLoading, request } = useGeolocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Mapa de diaristas próximos */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '2px' }}>Diaristas próximos</h2>
            <p style={{ fontSize: '13px', color: '#ABABAB' }}>
              {coords ? '📍 Mostrando resultados na sua região' : 'Permita a localização para ver diaristas perto de você'}
            </p>
          </div>
          {!coords && (
            <button
              onClick={request}
              disabled={geoLoading}
              className="qt-btn qt-btn-orange"
              style={{ fontSize: '13px', padding: '8px 16px' }}>
              {geoLoading ? 'Buscando...' : '📍 Usar minha localização'}
            </button>
          )}
        </div>
        {geoError && <p style={{ fontSize: '13px', color: '#dc2626', marginBottom: '12px' }}>⚠️ {geoError}</p>}
        <Suspense fallback={<div style={{ height: '300px', backgroundColor: '#F6F6F6', borderRadius: '8px' }} />}>
          <MapaDiaristas
            coords={coords || (profile?.lat && profile?.lng ? { lat: profile.lat, lng: profile.lng } : null)}
          />
        </Suspense>
      </div>
    </div>
  )
}
