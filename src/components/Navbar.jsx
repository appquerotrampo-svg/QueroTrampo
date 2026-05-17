import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()
  const isHome = pathname === '/'

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <nav style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #E5E5E5',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}>
          <span style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#FF6B00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>💼</span>
          <span style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#000',
            letterSpacing: '-0.5px',
          }}>QueroTrampo</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#545454',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'color 150ms',
              }}
                onMouseEnter={e => e.target.style.color = '#000'}
                onMouseLeave={e => e.target.style.color = '#545454'}
              >
                {profile?.nome?.split(' ')[0] ?? 'Minha conta'}
              </Link>
              <button onClick={handleSignOut} className="qt-btn qt-btn-secondary" style={{ padding: '8px 20px', fontSize: '14px', textTransform: 'none', letterSpacing: 0 }}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="qt-btn qt-btn-secondary" style={{ padding: '8px 20px', fontSize: '14px', textTransform: 'none', letterSpacing: 0 }}>
                Entrar
              </Link>
              {isHome && (
                <Link to="/cadastro/diarista" className="qt-btn qt-btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                  Quero Trampar
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
