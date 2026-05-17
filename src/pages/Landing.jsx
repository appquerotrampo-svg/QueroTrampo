import { Link } from 'react-router-dom'
import { SERVICE_CATEGORIES } from '../lib/categories'

const HOW_IT_WORKS_WORKER = [
  { step: '1', title: 'Crie seu perfil', desc: 'Cadastre suas habilidades e disponibilidade em menos de 2 minutos.' },
  { step: '2', title: 'Receba chamados', desc: 'Solicitantes da sua região te encontram e fazem uma proposta.' },
  { step: '3', title: 'Trabalhe e receba', desc: 'Combine direto, trabalhe no dia e receba na hora.' },
]

const HOW_IT_WORKS_CLIENT = [
  { step: '1', title: 'Descreva o serviço', desc: 'Diga o que precisa, onde e quando. É rápido.' },
  { step: '2', title: 'Escolha o profissional', desc: 'Veja os disponíveis perto de você com avaliações reais.' },
  { step: '3', title: 'Pronto!', desc: 'Confirme, acompanhe e avalie depois.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A2744 0%, #0f1a35 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 text-center relative z-10">
          <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase"
            style={{ backgroundColor: '#FF6B00' }}>
            Novo no Brasil
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Dinheiro rápido,<br />
            <span style={{ color: '#FF6B00' }}>trabalho na hora.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Conectamos quem precisa de serviço com quem precisa de dinheiro — hoje, agora, sem enrolação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cadastro/diarista"
              className="px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#FF6B00', boxShadow: '0 8px 30px rgba(255,107,0,0.4)' }}
            >
              💼 Quero Trampar
            </Link>
            <Link
              to="/cadastro/solicitante"
              className="px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all hover:bg-white hover:text-gray-900"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
            >
              🔍 Preciso de Alguém
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">Grátis para cadastrar. Sem mensalidade.</p>
        </div>

        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: '#FF6B00' }} />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-5 bg-white" />
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '30+', label: 'Categorias de serviço' },
              { value: '0%', label: 'Custo para se cadastrar' },
              { value: '100%', label: 'Direto com o profissional' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-black" style={{ color: '#FF6B00' }}>{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2" style={{ color: '#1A2744' }}>
          Que tipo de trampo você precisa?
        </h2>
        <p className="text-gray-500 text-center mb-10">30 categorias de serviço disponíveis</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {SERVICE_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 border border-transparent hover:border-orange-200 cursor-pointer transition-all group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-orange-600 text-center leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS - WORKER */}
      <section className="py-16" style={{ backgroundColor: '#1A2744' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block" style={{ backgroundColor: '#FF6B00', color: 'white' }}>
              Para quem quer trabalhar
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
              Ganhe dinheiro hoje mesmo
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_WORKER.map(item => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black text-white mx-auto mb-4"
                  style={{ backgroundColor: '#FF6B00' }}
                >
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/cadastro/diarista"
              className="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF6B00' }}
            >
              Cadastrar como Diarista
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - CLIENT */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block bg-blue-100 text-blue-800">
              Para quem precisa de serviço
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-3" style={{ color: '#1A2744' }}>
              Resolve em minutos
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_CLIENT.map(item => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black text-white mx-auto mb-4"
                  style={{ backgroundColor: '#1A2744' }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1A2744' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/cadastro/solicitante"
              className="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#1A2744' }}
            >
              Cadastrar como Solicitante
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">💼</span>
            <span className="font-bold text-gray-600">QueroTrampo</span>
          </div>
          <p>Dinheiro rápido, trabalho na hora.</p>
        </div>
      </footer>
    </div>
  )
}
