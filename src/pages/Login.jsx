import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const confirmacaoPendente = searchParams.get('confirmacao') === '1'

  const [form, setForm] = useState({ email: '', senha: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.senha,
    })

    if (signInError) {
      const msg = signInError.message
      if (msg.includes('Email not confirmed'))
        setError('Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.')
      else if (msg.includes('Invalid login credentials'))
        setError('E-mail ou senha incorretos.')
      else
        setError(msg)
      setLoading(false)
      return
    }

    navigate('/dashboard')
  }

  async function handleForgotPassword() {
    if (!form.email) { setError('Digite seu e-mail acima primeiro.'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(form.email)
    if (error) { setError(error.message); return }
    setError('')
    alert(`Link de redefinição enviado para ${form.email}`)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F6F6F6', display: 'flex' }}>
      {/* Left panel */}
      <div style={{
        flex: 1, backgroundColor: '#000', padding: '48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: '100vh',
      }}
        className="hidden md:flex"
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>QueroTrampo</span>
        </Link>
        <div>
          <p style={{ fontSize: '32px', fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '16px' }}>
            "Faço diárias de faxina<br />3x por semana."
          </p>
          <p style={{ color: '#ABABAB', fontSize: '15px' }}>João P. · Diarista em Rio Branco</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: '100%', maxWidth: '480px', backgroundColor: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '48px 40px', minHeight: '100vh',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '48px' }}
          className="md:hidden">
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💼</div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#000' }}>QueroTrampo</span>
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>Entrar na conta</h1>
        <p style={{ fontSize: '15px', color: '#545454', marginBottom: '32px' }}>
          Não tem conta?{' '}
          <Link to="/cadastro/diarista" style={{ color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>Cadastre-se</Link>
        </p>

        {confirmacaoPendente && (
          <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '14px 16px', marginBottom: '24px', fontSize: '14px', color: '#0369a1' }}>
            📧 Cadastro realizado! Confirme seu e-mail para ativar a conta.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="qt-label">E-mail</label>
            <input type="email" required value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="seu@email.com"
              className="qt-input" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="qt-label" style={{ marginBottom: 0 }}>Senha</label>
              <button type="button" onClick={handleForgotPassword}
                style={{ fontSize: '13px', color: '#FF6B00', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Esqueci a senha
              </button>
            </div>
            <input type="password" required value={form.senha}
              onChange={e => update('senha', e.target.value)}
              placeholder="Sua senha"
              className="qt-input" />
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="qt-btn qt-btn-primary qt-btn-full" style={{ marginTop: '8px' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #E5E5E5', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#ABABAB' }}>
            Precisa de serviço?{' '}
            <Link to="/cadastro/solicitante" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>
              Cadastre-se como Solicitante
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
