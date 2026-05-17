import { Link } from 'react-router-dom'
import { SEGMENTS, getCategoriesBySegment } from '../lib/categories'

const STEPS_WORKER = [
  { n: '01', title: 'Crie seu perfil', desc: 'Cadastre habilidades e disponibilidade em menos de 2 minutos. Zero burocracia.' },
  { n: '02', title: 'Receba chamados', desc: 'Solicitantes da sua região te encontram e fazem propostas na hora.' },
  { n: '03', title: 'Trabalhe e receba', desc: 'Combine direto, trabalhe no dia e receba na hora. Simples assim.' },
]

const STEPS_CLIENT = [
  { n: '01', title: 'Descreva o serviço', desc: 'Diga o que precisa, onde e quando. Leva menos de 1 minuto.' },
  { n: '02', title: 'Escolha o profissional', desc: 'Veja os disponíveis perto de você com avaliações reais de outros clientes.' },
  { n: '03', title: 'Confirme e pronto', desc: 'Acompanhe em tempo real e avalie depois. Tudo no app.' },
]

const DEPOIMENTOS = [
  { texto: 'Precisei de um garçom para meu evento e encontrei em 15 minutos!', nome: 'Maria S.', cidade: 'Manaus', categoria: 'Garçom' },
  { texto: 'Faço diárias de faxina 3x por semana, ganho mais que no emprego fixo.', nome: 'João P.', cidade: 'Rio Branco', categoria: 'Diarista' },
  { texto: 'Contratei um pedreiro urgente, veio em 2 horas. Salvou minha obra!', nome: 'Carlos M.', cidade: 'Belém', categoria: 'Pedreiro' },
]

function IconApple() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function IconGoogle() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M3.18 23.76c.31.17.65.24 1 .24.44 0 .87-.12 1.24-.35l12.74-7.27-2.88-2.88-12.1 10.26zm-1.96-20.3C1.08 3.83 1 4.22 1 4.63v14.74c0 .41.08.8.22 1.17l.11.1 8.26-8.26v-.19L1.33 3.35l-.11.11zM20.85 10.3l-2.72-1.55-3.23 3.23 3.23 3.22 2.75-1.56c.78-.44.78-1.9-.03-2.34zM4.18.35L16.92 7.62l-2.88 2.88L1.94.24C2.31.01 2.77-.07 3.18.08l1 .27z" />
    </svg>
  )
}

/* ---- Shared styles ---- */
const S = {
  maxW: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  sectionLabel: {
    fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: '#FF6B00',
    display: 'inline-block', marginBottom: '16px',
  },
  h2: {
    fontSize: 'clamp(32px, 5vw, 40px)', fontWeight: 800,
    letterSpacing: '-1px', lineHeight: 1.1, color: '#000',
  },
  sub: { fontSize: '18px', color: '#545454', lineHeight: 1.6, marginTop: '16px' },
}

export default function Landing() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#F6F6F6', overflow: 'hidden' }}>
        <div style={{ ...S.maxW, padding: '80px 24px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <span style={S.sectionLabel}>Novo no Brasil</span>
              <h1 style={{
                fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 900,
                letterSpacing: '-2px', lineHeight: 1.0, color: '#000',
              }}>
                Dinheiro rápido,<br />
                <span style={{ color: '#FF6B00' }}>trabalho</span><br />
                na hora.
              </h1>
              <p style={{ ...S.sub, maxWidth: '440px', marginTop: '24px' }}>
                Conectamos quem precisa de serviço com quem precisa de dinheiro — hoje, agora, sem enrolação.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
                <Link to="/cadastro/diarista" className="qt-btn qt-btn-orange">
                  💼 Quero Trampar
                </Link>
                <Link to="/cadastro/solicitante" className="qt-btn qt-btn-secondary">
                  Preciso de Alguém
                </Link>
              </div>
              <p style={{ fontSize: '13px', color: '#ABABAB', marginTop: '20px' }}>
                Grátis para cadastrar — sem mensalidade
              </p>
            </div>

            {/* Right — mock cards */}
            <div style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Background circle */}
              <div style={{
                position: 'absolute', width: '320px', height: '320px',
                borderRadius: '50%', backgroundColor: '#FF6B00', opacity: 0.06,
              }} />

              {/* Card 1 */}
              <div className="qt-card" style={{
                position: 'absolute', top: '20px', left: '20px', width: '220px',
                padding: '16px', zIndex: 2,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '15px' }}>J</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>João Silva</div>
                    <div style={{ fontSize: '12px', color: '#545454' }}>Pedreiro</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#545454' }}>★★★★★ <span style={{ fontWeight: 600 }}>5.0</span></span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#05C46B', backgroundColor: '#e8faf2', padding: '3px 8px', borderRadius: '20px' }}>● Disponível</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="qt-card" style={{
                position: 'absolute', bottom: '40px', right: '10px', width: '220px',
                padding: '16px', zIndex: 2,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1A2744', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '15px' }}>A</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Ana Costa</div>
                    <div style={{ fontSize: '12px', color: '#545454' }}>Faxina</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#545454' }}>★★★★★ <span style={{ fontWeight: 600 }}>4.9</span></span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#05C46B', backgroundColor: '#e8faf2', padding: '3px 8px', borderRadius: '20px' }}>● Disponível</span>
                </div>
              </div>

              {/* Center badge */}
              <div style={{
                width: '96px', height: '96px', borderRadius: '50%',
                backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '40px', zIndex: 1,
                boxShadow: '0 16px 40px rgba(255,107,0,0.3)',
              }}>💼</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ ...S.maxW, padding: '48px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', textAlign: 'center' }}>
            {[
              { value: '100+', label: 'Categorias de serviço' },
              { value: 'R$0', label: 'Para se cadastrar' },
              { value: '100%', label: 'Direto com o profissional' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', color: '#FF6B00', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '14px', color: '#545454', marginTop: '8px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS POR SEGMENTO ── */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div style={S.maxW}>
          <div style={{ marginBottom: '48px' }}>
            <span style={S.sectionLabel}>Serviços</span>
            <h2 style={S.h2}>Que tipo de trampo<br />você precisa?</h2>
            <p style={{ ...S.sub, maxWidth: '480px' }}>100+ categorias em 11 segmentos. Do pedreiro ao advogado.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {SEGMENTS.map(seg => {
              const cats = getCategoriesBySegment(seg.id)
              return (
                <div key={seg.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '20px' }}>{seg.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: seg.color }}>
                      {seg.label}
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5', marginLeft: '8px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
                    {cats.map(cat => (
                      <div key={cat.id} className="qt-card" style={{
                        padding: '12px', textAlign: 'center', cursor: 'pointer',
                        transition: 'all 150ms ease',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = seg.color; e.currentTarget.style.backgroundColor = `${seg.color}10` }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.backgroundColor = '#fff' }}
                      >
                        <div style={{ fontSize: '24px', marginBottom: '6px' }}>{cat.icon}</div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#000', lineHeight: 1.3 }}>{cat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section style={{ backgroundColor: '#F6F6F6', padding: '80px 0' }}>
        <div style={S.maxW}>
          <div style={{ marginBottom: '48px' }}>
            <span style={S.sectionLabel}>Depoimentos</span>
            <h2 style={S.h2}>Quem já usou,<br />aprovou.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {DEPOIMENTOS.map((d, i) => (
              <div key={i} className="qt-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#FF6B00', fontSize: '16px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '16px', color: '#000', lineHeight: 1.6, flex: 1 }}>
                  "{d.texto}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E5E5E5' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: '#000', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '15px',
                  }}>{d.nome[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{d.nome}</div>
                    <div style={{ fontSize: '13px', color: '#ABABAB' }}>{d.categoria} · {d.cidade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA — DIARISTA ── */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div style={S.maxW}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <span style={S.sectionLabel}>Para Diaristas</span>
              <h2 style={S.h2}>Ganhe dinheiro hoje mesmo.</h2>
              <p style={{ ...S.sub, marginTop: '16px', marginBottom: '32px' }}>Crie seu perfil grátis e comece a receber chamados na sua região.</p>
              <Link to="/cadastro/diarista" className="qt-btn qt-btn-orange">
                Cadastrar agora
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {STEPS_WORKER.map(item => (
                <div key={item.n} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '40px', fontWeight: 900, color: '#FF6B00', letterSpacing: '-2px', lineHeight: 1, minWidth: '56px' }}>{item.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '6px' }}>{item.title}</div>
                    <div style={{ color: '#545454', fontSize: '15px', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA — SOLICITANTE ── */}
      <section style={{ backgroundColor: '#F6F6F6', padding: '80px 0' }}>
        <div style={S.maxW}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {STEPS_CLIENT.map(item => (
                <div key={item.n} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '40px', fontWeight: 900, color: '#1A2744', letterSpacing: '-2px', lineHeight: 1, minWidth: '56px' }}>{item.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '6px' }}>{item.title}</div>
                    <div style={{ color: '#545454', fontSize: '15px', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <span style={{ ...S.sectionLabel, color: '#1A2744' }}>Para Solicitantes</span>
              <h2 style={S.h2}>Resolve em minutos.</h2>
              <p style={{ ...S.sub, marginTop: '16px', marginBottom: '32px' }}>Encontre o profissional certo, na hora certa, sem complicação.</p>
              <Link to="/cadastro/solicitante" className="qt-btn qt-btn-primary">
                Encontrar profissional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP STORES ── */}
      <section style={{ backgroundColor: '#000', padding: '80px 0' }}>
        <div style={{ ...S.maxW, textAlign: 'center' }}>
          <span style={{ ...S.sectionLabel, color: '#FF6B00' }}>Em breve</span>
          <h2 style={{ ...S.h2, color: '#fff', marginBottom: '16px' }}>
            Disponível em breve<br />no seu celular.
          </h2>
          <p style={{ fontSize: '16px', color: '#ABABAB', marginBottom: '40px', maxWidth: '440px', margin: '16px auto 40px' }}>
            Cadastre-se agora pelo site e seja notificado no lançamento do app.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: <IconApple />, store: 'App Store', sub: 'Disponível em breve na' },
              { icon: <IconGoogle />, store: 'Google Play', sub: 'Disponível em breve no' },
            ].map(btn => (
              <button key={btn.store} disabled style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 24px', borderRadius: '8px',
                backgroundColor: '#1a1a1a', border: '1px solid #333',
                color: '#fff', cursor: 'not-allowed', opacity: 0.7,
              }}>
                {btn.icon}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#888', lineHeight: 1 }}>{btn.sub}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.4 }}>{btn.store}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E5E5', padding: '48px 0 32px' }}>
        <div style={S.maxW}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
                <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>QueroTrampo</span>
              </div>
              <p style={{ fontSize: '15px', color: '#545454', lineHeight: 1.6, maxWidth: '280px' }}>
                Dinheiro rápido, trabalho na hora. Conectando diaristas e solicitantes em todo o Brasil.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ABABAB', marginBottom: '20px' }}>Empresa</div>
              {['Sobre nós', 'Como funciona', 'Contato'].map(l => (
                <div key={l} style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ fontSize: '15px', color: '#545454', textDecoration: 'none', transition: 'color 150ms' }}
                    onMouseEnter={e => e.target.style.color = '#000'}
                    onMouseLeave={e => e.target.style.color = '#545454'}>
                    {l}
                  </a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ABABAB', marginBottom: '20px' }}>Legal</div>
              {['Termos de Uso', 'Política de Privacidade'].map(l => (
                <div key={l} style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ fontSize: '15px', color: '#545454', textDecoration: 'none', transition: 'color 150ms' }}
                    onMouseEnter={e => e.target.style.color = '#000'}
                    onMouseLeave={e => e.target.style.color = '#545454'}>
                    {l}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #E5E5E5', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontSize: '13px', color: '#ABABAB' }}>© {new Date().getFullYear()} QueroTrampo. Todos os direitos reservados.</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/cadastro/diarista" className="qt-btn qt-btn-orange" style={{ padding: '8px 20px', fontSize: '13px' }}>Quero Trampar</Link>
              <Link to="/cadastro/solicitante" className="qt-btn qt-btn-secondary" style={{ padding: '8px 20px', fontSize: '13px' }}>Preciso de Alguém</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
