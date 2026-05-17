import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { SERVICE_CATEGORIES } from '../lib/categories'

const MapaDiaristas = lazy(() => import('../components/MapaDiaristas'))

// ── Layout ──────────────────────────────────────────────────────────────────
export default function Admin() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const links = [
    { to: '/admin', label: 'Visão Geral', icon: '📊', end: true },
    { to: '/admin/diaristas', label: 'Diaristas', icon: '🔨' },
    { to: '/admin/solicitantes', label: 'Solicitantes', icon: '🏢' },
    { to: '/admin/chamados', label: 'Chamados', icon: '📋' },
    { to: '/admin/mapa', label: 'Mapa Geral', icon: '🗺️' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F6F6F6', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '220px' : '64px', flexShrink: 0,
        backgroundColor: '#000', display: 'flex', flexDirection: 'column',
        transition: 'width 200ms ease', overflow: 'hidden',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>💼</div>
          {sidebarOpen && <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>Admin</span>}
          <button onClick={() => setSidebarOpen(v => !v)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#545454', cursor: 'pointer', fontSize: '18px', flexShrink: 0 }}>
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav style={{ padding: '12px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 8px', borderRadius: '8px',
                textDecoration: 'none', fontSize: '14px', fontWeight: 600,
                color: isActive ? '#fff' : '#545454',
                backgroundColor: isActive ? '#FF6B00' : 'transparent',
                whiteSpace: 'nowrap', overflow: 'hidden',
              })}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{l.icon}</span>
              {sidebarOpen && l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid #1a1a1a' }}>
          <button onClick={() => navigate('/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 8px', borderRadius: '8px', background: 'none', border: 'none', color: '#545454', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>↩</span>
            {sidebarOpen && 'Sair do Admin'}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="diaristas" element={<AdminDiaristas />} />
          <Route path="solicitantes" element={<AdminSolicitantes />} />
          <Route path="chamados" element={<AdminChamados />} />
          <Route path="mapa" element={<AdminMapa />} />
        </Routes>
      </main>
    </div>
  )
}

// ── Componentes auxiliares ────────────────────────────────────────────────
function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '4px' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: '14px', color: '#ABABAB' }}>{subtitle}</p>}
    </div>
  )
}

function StatCard({ label, value, sub, color = '#000' }) {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '20px' }}>
      <div style={{ fontSize: '32px', fontWeight: 900, color, marginBottom: '4px' }}>{value}</div>
      <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>{label}</p>
      {sub && <p style={{ fontSize: '12px', color: '#ABABAB' }}>{sub}</p>}
    </div>
  )
}

function Badge({ children, color = '#545454', bg = '#F6F6F6' }) {
  return (
    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', backgroundColor: bg, color }}>
      {children}
    </span>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────
function AdminOverview() {
  const [stats, setStats] = useState({ total: 0, diaristas: 0, solicitantes: 0, disponiveis: 0, saldo: 0, chamados: 0 })

  useEffect(() => {
    async function load() {
      const [{ count: total }, { count: diaristas }, { count: solicitantes }, { count: disponiveis }, { data: carteiras }, { count: chamados }] = await Promise.all([
        supabase.from('usuarios').select('*', { count: 'exact', head: true }),
        supabase.from('usuarios').select('*', { count: 'exact', head: true }).eq('tipo', 'diarista'),
        supabase.from('usuarios').select('*', { count: 'exact', head: true }).eq('tipo', 'solicitante'),
        supabase.from('diaristas').select('*', { count: 'exact', head: true }).eq('disponivel', true),
        supabase.from('carteira').select('saldo'),
        supabase.from('chamados').select('*', { count: 'exact', head: true }),
      ])
      const saldo = carteiras?.reduce((acc, c) => acc + Number(c.saldo || 0), 0) ?? 0
      setStats({ total: total ?? 0, diaristas: diaristas ?? 0, solicitantes: solicitantes ?? 0, disponiveis: disponiveis ?? 0, saldo, chamados: chamados ?? 0 })
    }
    load()
  }, [])

  return (
    <div>
      <PageHeader title="Visão Geral" subtitle="Resumo da plataforma em tempo real" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
        <StatCard label="Usuários totais" value={stats.total} />
        <StatCard label="Diaristas" value={stats.diaristas} color="#FF6B00" />
        <StatCard label="Solicitantes" value={stats.solicitantes} color="#1A2744" />
        <StatCard label="Disponíveis agora" value={stats.disponiveis} color="#16a34a" />
        <StatCard label="Chamados" value={stats.chamados} />
        <StatCard label="Saldo total em carteiras" value={`R$ ${stats.saldo.toFixed(2)}`} color="#FF6B00" />
      </div>

      <RecentUsers />
    </div>
  )
}

function RecentUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    supabase.from('usuarios').select('*').order('created_at', { ascending: false }).limit(10)
      .then(({ data }) => setUsers(data || []))
  }, [])

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E5E5', fontWeight: 800, fontSize: '15px' }}>
        Cadastros recentes
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#F6F6F6' }}>
            {['Nome', 'E-mail', 'Tipo', 'Cidade', 'Status', 'Cadastro'].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#ABABAB', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} style={{ borderTop: '1px solid #F6F6F6' }}>
              <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700 }}>{u.nome}</td>
              <td style={{ padding: '12px 16px', fontSize: '13px', color: '#545454' }}>{u.email}</td>
              <td style={{ padding: '12px 16px' }}>
                <Badge color={u.tipo === 'diarista' ? '#FF6B00' : '#1A2744'} bg={u.tipo === 'diarista' ? '#fff7f0' : '#f0f4ff'}>
                  {u.tipo}
                </Badge>
              </td>
              <td style={{ padding: '12px 16px', fontSize: '13px', color: '#545454' }}>{u.cidade || '—'} {u.estado ? `- ${u.estado}` : ''}</td>
              <td style={{ padding: '12px 16px' }}>
                <Badge color={u.status === 'ativo' ? '#16a34a' : '#dc2626'} bg={u.status === 'ativo' ? '#dcfce7' : '#fef2f2'}>
                  {u.status || 'ativo'}
                </Badge>
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#ABABAB' }}>
                {new Date(u.created_at).toLocaleDateString('pt-BR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Diaristas ─────────────────────────────────────────────────────────────
function AdminDiaristas() {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('usuarios')
      .select('*, diaristas(*)')
      .eq('tipo', 'diarista')
      .order('created_at', { ascending: false })
    setList(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const toggleStatus = async (u) => {
    const next = u.status === 'ativo' ? 'suspenso' : 'ativo'
    await supabase.from('usuarios').update({ status: next }).eq('id', u.id)
    load()
  }

  const filtered = list.filter(u => {
    const matchSearch = u.nome?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.cidade?.toLowerCase().includes(search.toLowerCase())
    if (filter === 'disponiveis') return matchSearch && u.diaristas?.disponivel
    if (filter === 'suspensos') return matchSearch && u.status === 'suspenso'
    return matchSearch
  })

  return (
    <div>
      <PageHeader title="Diaristas" subtitle={`${list.length} cadastrados`} />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome, e-mail ou cidade..."
          className="qt-input" style={{ flex: 1, minWidth: '200px' }} />
        {['todos', 'disponiveis', 'suspensos'].map(f => (
          <button key={f} type="button" onClick={() => setFilter(f)}
            style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              border: filter === f ? '2px solid #000' : '1.5px solid #E5E5E5',
              backgroundColor: filter === f ? '#000' : '#fff',
              color: filter === f ? '#fff' : '#545454' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F6F6F6' }}>
              {['Nome', 'Cidade', 'Categorias', 'Valor/dia', 'Disponível', 'Status', 'Ações'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#ABABAB', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#ABABAB' }}>Carregando...</td></tr>
            ) : filtered.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #F6F6F6' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{u.nome}</div>
                  <div style={{ fontSize: '12px', color: '#ABABAB' }}>{u.email}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#545454' }}>{u.cidade || '—'} {u.estado ? `(${u.estado})` : ''}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px' }}>
                    {u.diaristas?.categorias?.slice(0, 3).map(id => {
                      const cat = SERVICE_CATEGORIES.find(c => c.id === id)
                      return cat ? <Badge key={id}>{cat.icon} {cat.label}</Badge> : null
                    })}
                    {(u.diaristas?.categorias?.length ?? 0) > 3 && (
                      <Badge>+{u.diaristas.categorias.length - 3}</Badge>
                    )}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700, color: '#FF6B00' }}>
                  {u.diaristas?.valor_diaria ? `R$${u.diaristas.valor_diaria}` : '—'}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge color={u.diaristas?.disponivel ? '#16a34a' : '#dc2626'} bg={u.diaristas?.disponivel ? '#dcfce7' : '#fef2f2'}>
                    {u.diaristas?.disponivel ? 'Sim' : 'Não'}
                  </Badge>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge color={u.status === 'ativo' ? '#16a34a' : '#dc2626'} bg={u.status === 'ativo' ? '#dcfce7' : '#fef2f2'}>
                    {u.status || 'ativo'}
                  </Badge>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggleStatus(u)}
                    style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', border: '1.5px solid #E5E5E5', backgroundColor: '#fff', color: u.status === 'ativo' ? '#dc2626' : '#16a34a' }}>
                    {u.status === 'ativo' ? 'Suspender' : 'Reativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Solicitantes ──────────────────────────────────────────────────────────
function AdminSolicitantes() {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase.from('usuarios').select('*').eq('tipo', 'solicitante').order('created_at', { ascending: false })
      .then(({ data }) => setList(data || []))
  }, [])

  const filtered = list.filter(u =>
    u.nome?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.cidade?.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStatus = async (u) => {
    const next = u.status === 'ativo' ? 'suspenso' : 'ativo'
    await supabase.from('usuarios').update({ status: next }).eq('id', u.id)
    setList(l => l.map(x => x.id === u.id ? { ...x, status: next } : x))
  }

  return (
    <div>
      <PageHeader title="Solicitantes" subtitle={`${list.length} cadastrados`} />
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nome, e-mail ou cidade..."
        className="qt-input" style={{ marginBottom: '16px', maxWidth: '400px', display: 'block' }} />

      <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F6F6F6' }}>
              {['Nome', 'E-mail', 'Telefone', 'Cidade', 'Status', 'Cadastro', 'Ações'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#ABABAB', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #F6F6F6' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: '14px' }}>{u.nome}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#545454' }}>{u.email}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#545454' }}>{u.telefone || '—'}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#545454' }}>{u.cidade || '—'} {u.estado ? `(${u.estado})` : ''}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge color={u.status === 'ativo' ? '#16a34a' : '#dc2626'} bg={u.status === 'ativo' ? '#dcfce7' : '#fef2f2'}>
                    {u.status || 'ativo'}
                  </Badge>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#ABABAB' }}>{new Date(u.created_at).toLocaleDateString('pt-BR')}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggleStatus(u)}
                    style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', border: '1.5px solid #E5E5E5', backgroundColor: '#fff', color: u.status === 'ativo' ? '#dc2626' : '#16a34a' }}>
                    {u.status === 'ativo' ? 'Suspender' : 'Reativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Chamados ──────────────────────────────────────────────────────────────
function AdminChamados() {
  const [list, setList] = useState([])
  const [filter, setFilter] = useState('todos')

  const load = () => {
    supabase.from('chamados')
      .select('*, solicitante:usuarios!chamados_solicitante_id_fkey(nome, email), diarista:usuarios!chamados_diarista_id_fkey(nome)')
      .order('created_at', { ascending: false })
      .then(({ data }) => setList(data || []))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await supabase.from('chamados').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    load()
  }

  const STATUS_COLORS = {
    aberto: { color: '#1A2744', bg: '#f0f4ff' },
    em_andamento: { color: '#d97706', bg: '#fffbeb' },
    concluido: { color: '#16a34a', bg: '#dcfce7' },
    cancelado: { color: '#dc2626', bg: '#fef2f2' },
  }

  const filtered = filter === 'todos' ? list : list.filter(c => c.status === filter)

  return (
    <div>
      <PageHeader title="Chamados" subtitle={`${list.length} no total`} />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['todos', 'aberto', 'em_andamento', 'concluido', 'cancelado'].map(f => (
          <button key={f} type="button" onClick={() => setFilter(f)}
            style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              border: filter === f ? '2px solid #000' : '1.5px solid #E5E5E5',
              backgroundColor: filter === f ? '#000' : '#fff',
              color: filter === f ? '#fff' : '#545454' }}>
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '48px', textAlign: 'center', color: '#ABABAB' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
          <p>Nenhum chamado ainda</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(c => {
            const sc = STATUS_COLORS[c.status] || STATUS_COLORS.aberto
            const cat = SERVICE_CATEGORIES.find(x => x.id === c.categoria)
            return (
              <div key={c.id} style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '24px' }}>{cat?.icon || '🔧'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>{cat?.label || c.categoria}</div>
                  <div style={{ fontSize: '12px', color: '#ABABAB' }}>
                    Solicitante: {c.solicitante?.nome || '—'} · Diarista: {c.diarista?.nome || 'Não atribuído'} · {c.cidade || '—'}
                  </div>
                  {c.descricao && <div style={{ fontSize: '13px', color: '#545454', marginTop: '4px' }}>{c.descricao}</div>}
                </div>
                {c.valor && <div style={{ fontSize: '16px', fontWeight: 800, color: '#FF6B00', flexShrink: 0 }}>R${c.valor}</div>}
                <Badge color={sc.color} bg={sc.bg}>{c.status.replace('_', ' ')}</Badge>
                <select value={c.status}
                  onChange={e => updateStatus(c.id, e.target.value)}
                  style={{ fontSize: '13px', padding: '6px 8px', borderRadius: '6px', border: '1.5px solid #E5E5E5', cursor: 'pointer', flexShrink: 0 }}>
                  <option value="aberto">Aberto</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Mapa Geral ────────────────────────────────────────────────────────────
function AdminMapa() {
  const [center] = useState({ lat: -15.7801, lng: -47.9292 }) // Brasília como default
  const [diaristas, setDiaristas] = useState([])

  useEffect(() => {
    supabase.from('usuarios')
      .select('*, diaristas(*), localizacoes(*)')
      .eq('tipo', 'diarista')
      .not('lat', 'is', null)
      .then(({ data }) => setDiaristas(data || []))
  }, [])

  return (
    <div>
      <PageHeader title="Mapa Geral" subtitle="Localização de todos os diaristas cadastrados" />
      <Suspense fallback={<div style={{ height: '500px', backgroundColor: '#F6F6F6', borderRadius: '12px' }} />}>
        <MapaDiaristas coords={center} raioKm={5000} />
      </Suspense>
    </div>
  )
}
