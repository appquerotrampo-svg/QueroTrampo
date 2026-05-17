import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SERVICE_CATEGORIES } from '../lib/categories'
import { supabase } from '../lib/supabase'
import CitySearch from '../components/CitySearch'

const STEP_LABELS = ['Dados pessoais', 'Habilidades', 'Perfil']

export default function CadastroDiarista() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nome: '', telefone: '', email: '', senha: '',
    cidade: '', estado: '', ibgeId: null, lat: null, lng: null,
    categorias: [], valorDiaria: '', bio: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const toggleCategory = (id) => setForm(f => ({
    ...f,
    categorias: f.categorias.includes(id)
      ? f.categorias.filter(c => c !== id)
      : [...f.categorias, id],
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.categorias.length === 0) { setError('Selecione pelo menos uma categoria.'); return }
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
      id: userId, nome: form.nome, email: form.email,
      telefone: form.telefone, tipo: 'diarista',
      cidade: form.cidade, estado: form.estado,
      ibge_id: form.ibgeId, lat: form.lat, lng: form.lng,
    })
    if (userError) { setError(userError.message); setLoading(false); return }

    const { error: diaError } = await supabase.from('diaristas').insert({
      usuario_id: userId, categorias: form.categorias,
      valor_diaria: parseFloat(form.valorDiaria) || null,
      bio: form.bio || null,
    })
    if (diaError) { setError(diaError.message); setLoading(false); return }

    await supabase.from('carteira').insert({ usuario_id: userId, saldo: 0 })
    setLoading(false)
    if (authData.session) navigate('/dashboard')
    else setStep('confirmacao')
  }

  /* ── Tela de confirmação de e-mail ── */
  if (step === 'confirmacao') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F6F6F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: '12px', padding: '48px', maxWidth: '440px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>📧</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '12px' }}>Confirme seu e-mail</h2>
          <p style={{ fontSize: '15px', color: '#545454', lineHeight: 1.6, marginBottom: '32px' }}>
            Enviamos um link de confirmação para <strong>{form.email}</strong>.<br />
            Clique no link para ativar sua conta e começar a trabalhar.
          </p>
          <Link to="/login" className="qt-btn qt-btn-primary qt-btn-full">
            Ir para o Login
          </Link>
        </div>
      </div>
    )
  }

  /* ── Formulário ── */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F6F6F6', display: 'flex' }}>

      {/* Left panel */}
      <div style={{ flex: 1, backgroundColor: '#FF6B00', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        className="hidden md:flex">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>QueroTrampo</span>
        </Link>
        <div>
          <div style={{ fontSize: '64px', fontWeight: 900, color: '#fff', opacity: 0.15, lineHeight: 1, marginBottom: '8px' }}>$</div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '16px' }}>
            Dinheiro rápido,<br />trabalho na hora.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>
            Crie seu perfil grátis e comece a receber chamados hoje.
          </p>
          {/* Mini depoimento */}
          <div style={{ marginTop: '40px', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#fff', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
              "Faço diárias 3x por semana e ganho mais que no emprego fixo."
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>João P. · Diarista em Rio Branco</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ width: '100%', maxWidth: '540px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', minHeight: '100vh', overflowY: 'auto' }}>

        {/* Mobile logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '40px' }}
          className="md:hidden">
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💼</div>
          <span style={{ fontSize: '16px', fontWeight: 800 }}>QueroTrampo</span>
        </Link>

        {/* Step header */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FF6B00' }}>
            Passo {typeof step === 'number' ? step : 3} de 3
          </span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>
          {step === 1 && 'Seus dados'}
          {step === 2 && 'Suas habilidades'}
          {step === 3 && 'Seu perfil profissional'}
        </h1>
        <p style={{ fontSize: '15px', color: '#545454', marginBottom: '32px' }}>
          {step === 1 && <>Já tem conta? <Link to="/login" style={{ color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>Entrar</Link></>}
          {step === 2 && 'Selecione todas as categorias em que você trabalha.'}
          {step === 3 && 'Defina seu valor e conte um pouco sobre você.'}
        </p>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1, height: '4px', borderRadius: '4px',
              backgroundColor: s <= step ? '#000' : '#E5E5E5',
              transition: 'background-color 300ms ease',
            }} />
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div>
                <label className="qt-label">Nome completo</label>
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
              <button type="button" className="qt-btn qt-btn-primary qt-btn-full"
                onClick={() => {
                  if (form.nome && form.telefone && form.email && form.senha && form.cidade) setStep(2)
                  else setError('Preencha todos os campos.')
                }}>
                Continuar
              </button>
              {error && <p style={{ fontSize: '13px', color: '#dc2626', textAlign: 'center' }}>{error}</p>}
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                {SERVICE_CATEGORIES.map(cat => {
                  const sel = form.categorias.includes(cat.id)
                  return (
                    <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                        border: sel ? '2px solid #000' : '1.5px solid #E5E5E5',
                        backgroundColor: sel ? '#000' : '#fff',
                        color: sel ? '#fff' : '#545454',
                        cursor: 'pointer', transition: 'all 150ms', textAlign: 'left',
                      }}>
                      <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                      <span style={{ lineHeight: 1.3 }}>{cat.label}</span>
                    </button>
                  )
                })}
              </div>
              {error && <p style={{ fontSize: '13px', color: '#dc2626' }}>{error}</p>}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => { setStep(1); setError('') }}
                  className="qt-btn qt-btn-secondary" style={{ flex: 1 }}>
                  Voltar
                </button>
                <button type="button" className="qt-btn qt-btn-primary" style={{ flex: 2 }}
                  onClick={() => {
                    if (form.categorias.length === 0) { setError('Selecione pelo menos uma categoria.'); return }
                    setError(''); setStep(3)
                  }}>
                  Continuar
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <div>
                <label className="qt-label">Valor por diária (R$)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ABABAB', fontWeight: 600, fontSize: '15px' }}>R$</span>
                  <input type="number" required value={form.valorDiaria}
                    onChange={e => update('valorDiaria', e.target.value)}
                    placeholder="150" min="1"
                    className="qt-input" style={{ paddingLeft: '44px' }} />
                </div>
                <p style={{ fontSize: '12px', color: '#ABABAB', marginTop: '6px' }}>Quanto você cobra por dia de trabalho</p>
              </div>
              <div>
                <label className="qt-label">Fale sobre você</label>
                <textarea value={form.bio}
                  onChange={e => update('bio', e.target.value)}
                  placeholder="Ex: 5 anos de experiência como pedreiro, trabalho com qualidade e pontualidade..."
                  rows={4}
                  className="qt-input" style={{ resize: 'none', lineHeight: 1.6 }} />
              </div>
              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', color: '#dc2626' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => { setStep(2); setError('') }}
                  className="qt-btn qt-btn-secondary" style={{ flex: 1 }}>
                  Voltar
                </button>
                <button type="submit" disabled={loading}
                  className="qt-btn qt-btn-orange" style={{ flex: 2 }}>
                  {loading ? 'Cadastrando...' : 'Criar perfil'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
