import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STATES_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
]

export default function CadastroSolicitante() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '', telefone: '', email: '', senha: '',
    cidade: '', estado: '',
    tipoPessoa: 'fisica',
    cnpj: '',
    nomeEmpresa: '',
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
      setError(authError.message === 'User already registered'
        ? 'Este e-mail já está cadastrado.'
        : authError.message)
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
      cpf: form.cnpj || null,
    })

    if (userError) { setError(userError.message); setLoading(false); return }

    await supabase.from('carteira').insert({ usuario_id: userId, saldo: 0 })

    setLoading(false)

    if (authData.session) {
      navigate('/dashboard')
    } else {
      navigate('/login?confirmacao=1')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-black mb-6" style={{ color: '#1A2744' }}>
            <span>💼</span> QueroTrampo
          </Link>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#1A2744' }}>Preciso de Alguém</h1>
          <p className="text-gray-500 text-sm">Cadastre-se e encontre profissionais disponíveis agora.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-lg" style={{ color: '#1A2744' }}>Seus dados</h2>

            {/* Tipo de pessoa */}
            <div className="flex gap-3">
              {['fisica', 'juridica'].map(tipo => (
                <button
                  key={tipo} type="button"
                  onClick={() => update('tipoPessoa', tipo)}
                  className="flex-1 py-2 rounded-xl border text-sm font-medium transition-all"
                  style={{
                    borderColor: form.tipoPessoa === tipo ? '#FF6B00' : '#e5e7eb',
                    backgroundColor: form.tipoPessoa === tipo ? '#fff7f0' : 'white',
                    color: form.tipoPessoa === tipo ? '#FF6B00' : '#374151',
                  }}
                >
                  {tipo === 'fisica' ? '👤 Pessoa Física' : '🏢 Empresa'}
                </button>
              ))}
            </div>

            {form.tipoPessoa === 'juridica' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da empresa *</label>
                  <input
                    type="text" required value={form.nomeEmpresa}
                    onChange={e => update('nomeEmpresa', e.target.value)}
                    placeholder="Empresa Ltda."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                  <input
                    type="text" value={form.cnpj}
                    onChange={e => update('cnpj', e.target.value)}
                    placeholder="00.000.000/0001-00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {form.tipoPessoa === 'juridica' ? 'Nome do responsável *' : 'Nome completo *'}
              </label>
              <input
                type="text" required value={form.nome}
                onChange={e => update('nome', e.target.value)}
                placeholder="João da Silva"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp *</label>
              <input
                type="tel" required value={form.telefone}
                onChange={e => update('telefone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
              <input
                type="email" required value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="joao@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
              <input
                type="password" required value={form.senha}
                onChange={e => update('senha', e.target.value)}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                <input
                  type="text" required value={form.cidade}
                  onChange={e => update('cidade', e.target.value)}
                  placeholder="São Paulo"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
                <select
                  required value={form.estado}
                  onChange={e => update('estado', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm bg-white"
                >
                  <option value="">UF</option>
                  {STATES_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ backgroundColor: '#1A2744' }}
            >
              {loading ? 'Cadastrando...' : 'Criar Conta 🔍'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Quer trabalhar?{' '}
          <Link to="/cadastro/diarista" className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>
            Cadastre-se como Diarista
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
