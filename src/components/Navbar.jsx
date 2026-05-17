import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold" style={{ color: '#1A2744' }}>
          <span className="text-2xl">💼</span>
          <span>QueroTrampo</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium px-4 py-2 rounded-lg border transition-colors"
            style={{ borderColor: '#FF6B00', color: '#FF6B00' }}
            onMouseEnter={e => { e.target.style.backgroundColor = '#FF6B00'; e.target.style.color = '#fff' }}
            onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#FF6B00' }}
          >
            Entrar
          </Link>
          {isHome && (
            <Link
              to="/cadastro/diarista"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#FF6B00' }}
            >
              Quero Trampar
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
