import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // TODO: Supabase signInWithPassword
    setTimeout(() => {
      setLoading(false)
      setError('Credenciais inválidas. (Supabase ainda não configurado)')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-black mb-6" style={{ color: '#1A2744' }}>
            <span>💼</span> QueroTrampo
          </Link>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#1A2744' }}>Bem-vindo de volta</h1>
          <p className="text-gray-500 text-sm">Entre na sua conta para continuar.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email" required value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <button type="button" className="text-xs hover:underline" style={{ color: '#FF6B00' }}>
                  Esqueci a senha
                </button>
              </div>
              <input
                type="password" required value={form.senha}
                onChange={e => update('senha', e.target.value)}
                placeholder="Sua senha"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#FF6B00' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center space-y-2 text-sm text-gray-500">
          <p>
            Quer trabalhar?{' '}
            <Link to="/cadastro/diarista" className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>
              Cadastre-se como Diarista
            </Link>
          </p>
          <p>
            Precisa de serviço?{' '}
            <Link to="/cadastro/solicitante" className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>
              Cadastre-se como Solicitante
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
