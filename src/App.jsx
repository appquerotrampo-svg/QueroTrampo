import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import CadastroDiarista from './pages/CadastroDiarista'
import CadastroSolicitante from './pages/CadastroSolicitante'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const PAGES_WITHOUT_NAVBAR = ['/cadastro/', '/login', '/dashboard']

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const { pathname } = useLocation()
  const showNavbar = !PAGES_WITHOUT_NAVBAR.some(p => pathname.startsWith(p))

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro/diarista" element={<CadastroDiarista />} />
        <Route path="/cadastro/solicitante" element={<CadastroSolicitante />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
