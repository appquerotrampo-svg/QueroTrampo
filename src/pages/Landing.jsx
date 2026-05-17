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

const DEPOIMENTOS = [
  {
    texto: 'Precisei de um garçom para meu evento e encontrei em 15 minutos!',
    nome: 'Maria S.',
    cidade: 'Manaus',
    emoji: '🎉',
  },
  {
    texto: 'Faço diárias de faxina 3x por semana, ganho mais que no emprego fixo.',
    nome: 'João P.',
    cidade: 'Rio Branco',
    emoji: '🧹',
  },
  {
    texto: 'Contratei um pedreiro urgente, veio em 2 horas. Salvou minha obra!',
    nome: 'Carlos M.',
    cidade: 'Belém',
    emoji: '🧱',
  },
]

function IconApple() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M3.18 23.76c.31.17.65.24 1 .24.44 0 .87-.12 1.24-.35l12.74-7.27-2.88-2.88-12.1 10.26zm-1.96-20.3C1.08 3.83 1 4.22 1 4.63v14.74c0 .41.08.8.22 1.17l.11.1 8.26-8.26v-.19L1.33 3.35l-.11.11zM20.85 10.3l-2.72-1.55-3.23 3.23 3.23 3.22 2.75-1.56c.78-.44.78-1.9-.03-2.34zM4.18.35L16.92 7.62l-2.88 2.88L1.94.24C2.31.01 2.77-.07 3.18.08l1 .27z"/>
    </svg>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A2744 0%, #0f1a35 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center relative z-10">
          <div
            className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase"
            style={{ backgroundColor: '#FF6B00' }}
          >
            Novo no Brasil
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Dinheiro rápido,<br />
            <span style={{ color: '#FF6B00' }}>trabalho na hora.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10">
            Conectamos quem precisa de serviço com quem precisa de dinheiro — hoje, agora, sem enrolação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
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

      {/* DEPOIMENTOS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block"
              style={{ backgroundColor: '#fff7f0', color: '#FF6B00' }}
            >
              Quem já usou
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-3" style={{ color: '#1A2744' }}>
              O que estão falando
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DEPOIMENTOS.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="text-3xl">{d.emoji}</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  "{d.texto}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: '#1A2744' }}
                  >
                    {d.nome[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#1A2744' }}>{d.nome}</p>
                    <p className="text-gray-400 text-xs">{d.cidade}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className="text-sm" style={{ color: '#FF6B00' }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* APP STORES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block"
            style={{ backgroundColor: '#1A2744', color: 'white' }}
          >
            Em breve
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-3 mb-3" style={{ color: '#1A2744' }}>
            Disponível em breve no seu celular
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            O app do QueroTrampo está chegando. Cadastre-se agora pelo site e seja notificado no lançamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled
              className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white cursor-not-allowed opacity-60 transition-all"
              style={{ backgroundColor: '#000' }}
            >
              <IconApple />
              <div className="text-left">
                <div className="text-xs opacity-70 leading-none mb-0.5">Disponível em breve na</div>
                <div className="text-base font-bold leading-none">App Store</div>
              </div>
            </button>
            <button
              disabled
              className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white cursor-not-allowed opacity-60 transition-all"
              style={{ backgroundColor: '#000' }}
            >
              <IconGoogle />
              <div className="text-left">
                <div className="text-xs opacity-70 leading-none mb-0.5">Disponível em breve no</div>
                <div className="text-base font-bold leading-none">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1A2744' }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 text-xl font-black text-white mb-3">
                <span>💼</span> QueroTrampo
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dinheiro rápido, trabalho na hora.<br />
                Conectando diaristas e solicitantes em todo o Brasil.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Empresa</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Sobre nós', href: '#' },
                  { label: 'Como funciona', href: '#' },
                  { label: 'Contato', href: 'mailto:contato@querotrampo.com.br' },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Termos de Uso', href: '#' },
                  { label: 'Política de Privacidade', href: '#' },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} QueroTrampo. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link to="/cadastro/diarista"
                className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#FF6B00' }}>
                Quero Trampar
              </Link>
              <Link to="/cadastro/solicitante"
                className="text-xs font-bold px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-colors">
                Preciso de Alguém
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
