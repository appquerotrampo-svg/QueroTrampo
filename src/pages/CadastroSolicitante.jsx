import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CitySearch from '../components/CitySearch'

export default function CadastroSolicitante() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '', telefone: '', email: '', senha: '',
    cidade: '', estado: '', ibgeId: null, lat: null, lng: null,
    tipoPessoa: 'fisica', cnpj: '', nomeEmpresa: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.senha,
      options: { data: { nome: form.nome } },
    })

    if (authError) {
      setError(authError.message === 'User already registered' ? 'Este e-mail já está cadastrado.' : authError.message)
      setLoading(false)
      return
    }

    const userId = authData.user.id

    const { error: userError } = await supabase.from('usuarios').insert({
      id: userId,
      nome: form.tipoPessoa === 'juridica' ? form.nomeEmpresa : form.nome,
      email: form.email,
      telefone: form.telefone,
      tipo: 'solicitante',
      cidade: form.cidade,
      estado: form.estado,
      ibge_id: form.ibgeId,
      lat: form.lat,
      lng: form.lng,
      cpf: form.cnpj || null,
    })

    if (userError) { setError(userError.message); setLoading(false); return }
    await supabase.from('carteira').insert({ usuario_id: userId, saldo: 0 })
    setLoading(false)
    if (authData.session) navigate('/dashboard')
    else navigate('/login?confirmacao=1')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F6F6F6', display: 'flex' }}>
      {/* Left panel */}
      <div style={{ flex: 1, backgroundColor: '#1A2744', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        className="hidden md:flex">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>QueroTrampo</span>
        </Link>
        <div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#FF6B00', lineHeight: 1, marginBottom: '16px' }}>🔍</div>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Encontre quem você precisa hoje.
          </p>
          <p style={{ color: '#8899bb', fontSize: '15px', lineHeight: 1.6 }}>
            30 categorias de serviço. Profissionais disponíveis agora, na sua cidade.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ width: '100%', maxWidth: '520px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', minHeight: '100vh', overflowY: 'auto' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '40px' }}
          className="md:hidden">
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💼</div>
          <span style={{ fontSize: '16px', fontWeight: 800 }}>QueroTrampo</span>
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>Preciso de alguém</h1>
        <p style={{ fontSize: '15px', color: '#545454', marginBottom: '32px' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Tipo de pessoa */}
          <div>
            <label className="qt-label">Tipo de cadastro</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { value: 'fisica', label: '👤 Pessoa Física' },
                { value: 'juridica', label: '🏢 Empresa' },
              ].map(opt => (
                <button key={opt.value} type="button" onClick={() => update('tipoPessoa', opt.value)}
                  style={{
                    padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                    border: form.tipoPessoa === opt.value ? '2px solid #000' : '1.5px solid #E5E5E5',
                    backgroundColor: form.tipoPessoa === opt.value ? '#000' : '#fff',
                    color: form.tipoPessoa === opt.value ? '#fff' : '#545454',
                    cursor: 'pointer', transition: 'all 150ms',
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {form.tipoPessoa === 'juridica' && (
            <>
              <div>
                <label className="qt-label">Nome da empresa</label>
                <input type="text" required value={form.nomeEmpresa}
                  onChange={e => update('nomeEmpresa', e.target.value)}
                  placeholder="Empresa Ltda." className="qt-input" />
              </div>
              <div>
                <label className="qt-label">CNPJ</label>
                <input type="text" value={form.cnpj}
                  onChange={e => update('cnpj', e.target.value)}
                  placeholder="00.000.000/0001-00" className="qt-input" />
              </div>
            </>
          )}

          <div>
            <label className="qt-label">{form.tipoPessoa === 'juridica' ? 'Nome do responsável' : 'Nome completo'}</label>
            <input type="text" required value={form.nome}
              onChange={e => update('nome', e.target.value)}
              placeholder="João da Silva" className="qt-input" />
          </div>

          <div>
            <label className="qt-label">WhatsApp</label>
            <input type="tel" required value={form.telefone}
              onChange={e => update('telefone', e.target.value)}
              placeholder="(11) 99999-9999" className="qt-input" />
          </div>

          <div>
            <label className="qt-label">E-mail</label>
            <input type="email" required value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="seu@email.com" className="qt-input" />
          </div>

          <div>
            <label className="qt-label">Senha</label>
            <input type="password" required value={form.senha}
              onChange={e => update('senha', e.target.value)}
              placeholder="Mínimo 6 caracteres" minLength={6} className="qt-input" />
          </div>

          <div>
            <label className="qt-label">Cidade</label>
            <CitySearch
              required
              value={form.cidade ? { nome: form.cidade, estado: form.estado } : null}
              onChange={city => {
                if (city) {
                  update('cidade', city.nome)
                  update('estado', city.estado)
                  update('ibgeId', city.id)
                  update('lat', city.lat)
                  update('lng', city.lng)
                } else {
                  update('cidade', '')
                  update('estado', '')
                  update('ibgeId', null)
                  update('lat', null)
                  update('lng', null)
                }
              }}
            />
            {form.estado && (
              <p style={{ fontSize: '12px', color: '#ABABAB', marginTop: '6px' }}>
                📍 {form.cidade} — {form.estado}
              </p>
            )}
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="qt-btn qt-btn-primary qt-btn-full" style={{ marginTop: '8px' }}>
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '13px', color: '#ABABAB', textAlign: 'center' }}>
          Quer trabalhar?{' '}
          <Link to="/cadastro/diarista" style={{ color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>
            Cadastre-se como Diarista
          </Link>
        </p>
      </div>
    </div>
  )
}
