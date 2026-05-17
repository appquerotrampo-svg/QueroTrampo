import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SERVICE_CATEGORIES } from '../lib/categories'

const STATES_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
]

export default function CadastroDiarista() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nome: '', telefone: '', email: '', senha: '',
    cidade: '', estado: '', cep: '',
    categorias: [],
    valorDiaria: '', bio: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const toggleCategory = (id) => {
    setForm(f => ({
      ...f,
      categorias: f.categorias.includes(id)
        ? f.categorias.filter(c => c !== id)
        : [...f.categorias, id],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.categorias.length === 0) {
      setError('Selecione pelo menos uma categoria de serviço.')
      return
    }
    setLoading(true)
    setError('')
    // TODO: Supabase auth + insert
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-black mb-6" style={{ color: '#1A2744' }}>
            <span>💼</span> QueroTrampo
          </Link>
          <h1 className="text-2xl font-black mb-1" style={{ color: '#1A2744' }}>Quero Trampar!</h1>
          <p className="text-gray-500 text-sm">Crie seu perfil e comece a receber chamados hoje.</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                style={{
                  backgroundColor: s <= step ? '#FF6B00' : '#e5e7eb',
                  color: s <= step ? 'white' : '#9ca3af',
                }}
              >
                {s}
              </div>
              {s < 3 && <div className="w-8 h-0.5" style={{ backgroundColor: s < step ? '#FF6B00' : '#e5e7eb' }} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            {/* STEP 1: Dados pessoais */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-bold text-lg mb-4" style={{ color: '#1A2744' }}>Seus dados</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                  <input
                    type="text" required value={form.nome}
                    onChange={e => update('nome', e.target.value)}
                    placeholder="João da Silva"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#FF6B00' }}
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

                <button
                  type="button"
                  onClick={() => { if (form.nome && form.telefone && form.email && form.senha && form.cidade && form.estado) setStep(2) }}
                  className="w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#FF6B00' }}
                >
                  Continuar →
                </button>
              </div>
            )}

            {/* STEP 2: Categorias */}
            {step === 2 && (
              <div>
                <h2 className="font-bold text-lg mb-1" style={{ color: '#1A2744' }}>O que você sabe fazer?</h2>
                <p className="text-sm text-gray-500 mb-4">Selecione todas as suas habilidades.</p>

                <div className="grid grid-cols-2 gap-2 mb-6 max-h-80 overflow-y-auto pr-1">
                  {SERVICE_CATEGORIES.map(cat => {
                    const selected = form.categorias.includes(cat.id)
                    return (
                      <button
                        key={cat.id} type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all text-left"
                        style={{
                          borderColor: selected ? '#FF6B00' : '#e5e7eb',
                          backgroundColor: selected ? '#fff7f0' : 'white',
                          color: selected ? '#FF6B00' : '#374151',
                        }}
                      >
                        <span>{cat.icon}</span>
                        <span className="leading-tight">{cat.label}</span>
                      </button>
                    )
                  })}
                </div>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50">
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (form.categorias.length === 0) { setError('Selecione pelo menos uma categoria.'); return }
                      setError('')
                      setStep(3)
                    }}
                    className="flex-1 py-3 rounded-xl font-bold text-white hover:opacity-90"
                    style={{ backgroundColor: '#FF6B00' }}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Valor e bio */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-bold text-lg mb-4" style={{ color: '#1A2744' }}>Seu perfil profissional</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor por diária (R$) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
                    <input
                      type="number" required value={form.valorDiaria}
                      onChange={e => update('valorDiaria', e.target.value)}
                      placeholder="150"
                      min="1"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Quanto você cobra por dia de trabalho</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fale sobre você</label>
                  <textarea
                    value={form.bio}
                    onChange={e => update('bio', e.target.value)}
                    placeholder="Ex: Tenho 5 anos de experiência como pedreiro, trabalho com qualidade e pontualidade..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm resize-none"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50">
                    ← Voltar
                  </button>
                  <button
                    type="submit" disabled={loading}
                    className="flex-1 py-3 rounded-xl font-bold text-white hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: '#FF6B00' }}
                  >
                    {loading ? 'Cadastrando...' : 'Criar Perfil 🚀'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
