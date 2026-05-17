import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { SERVICE_CATEGORIES } from '../lib/categories'

export default function Dashboard() {
  const { profile, signOut, loading } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"
            style={{ borderColor: '#FF6B00', borderTopColor: 'transparent' }} />
          <p className="text-gray-500 text-sm">Carregando...</p>
        </div>
      </div>
    )
  }

  const isDiarista = profile?.tipo === 'diarista'
  const categoriasLabel = profile?.tipo === 'diarista'
    ? SERVICE_CATEGORIES.filter(c => profile?.diarista?.categorias?.includes(c.id))
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl" style={{ color: '#1A2744' }}>
            <span>💼</span> QueroTrampo
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Boas-vindas */}
        <div
          className="rounded-2xl p-6 mb-6 text-white"
          style={{ background: 'linear-gradient(135deg, #1A2744 0%, #0f1a35 100%)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">
                {isDiarista ? 'Diarista' : 'Solicitante'}
              </p>
              <h1 className="text-2xl font-black">
                Olá, {profile?.nome?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-300 text-sm mt-1">{profile?.cidade} · {profile?.email}</p>
            </div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black"
              style={{ backgroundColor: '#FF6B00' }}
            >
              {profile?.nome?.[0]?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Cards por tipo */}
        {isDiarista ? <DiaristaDashboard profile={profile} /> : <SolicitanteDashboard />}
      </div>
    </div>
  )
}

function DiaristaDashboard({ profile }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="text-3xl font-black mb-1" style={{ color: '#FF6B00' }}>
          R$ {Number(profile?.valor_diaria || 0).toFixed(2)}
        </div>
        <p className="text-gray-500 text-sm">Valor por diária</p>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="text-3xl font-black mb-1" style={{ color: '#FF6B00' }}>
          {profile?.total_diarias ?? 0}
        </div>
        <p className="text-gray-500 text-sm">Diárias realizadas</p>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-3xl font-black" style={{ color: '#FF6B00' }}>
            {profile?.disponivel ? '✅' : '⏸️'}
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          {profile?.disponivel ? 'Disponível para trabalhar' : 'Indisponível no momento'}
        </p>
      </div>

      <div className="md:col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">Suas habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {(profile?.categorias ?? []).map(id => {
            const cat = SERVICE_CATEGORIES.find(c => c.id === id)
            return cat ? (
              <span key={id} className="text-sm px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: '#fff7f0', color: '#FF6B00', border: '1px solid #FF6B00' }}>
                {cat.icon} {cat.label}
              </span>
            ) : null
          })}
        </div>
      </div>

      <div className="md:col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
        <p className="text-4xl mb-2">🚧</p>
        <p className="font-bold text-gray-600">Feed de chamados em breve</p>
        <p className="text-gray-400 text-sm mt-1">Você receberá notificações de solicitantes da sua região aqui.</p>
      </div>
    </div>
  )
}

function SolicitanteDashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
          style={{ backgroundColor: '#fff7f0' }}>
          🔍
        </div>
        <h3 className="font-bold text-lg mb-1" style={{ color: '#1A2744' }}>Buscar Diarista</h3>
        <p className="text-gray-500 text-sm">Encontre profissionais disponíveis perto de você agora.</p>
        <button className="mt-4 px-5 py-2 rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: '#FF6B00', opacity: 0.5, cursor: 'not-allowed' }}>
          Em breve
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
          style={{ backgroundColor: '#f0f4ff' }}>
          📋
        </div>
        <h3 className="font-bold text-lg mb-1" style={{ color: '#1A2744' }}>Meus Chamados</h3>
        <p className="text-gray-500 text-sm">Acompanhe o status dos seus pedidos de serviço.</p>
        <button className="mt-4 px-5 py-2 rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: '#1A2744', opacity: 0.5, cursor: 'not-allowed' }}>
          Em breve
        </button>
      </div>
    </div>
  )
}
