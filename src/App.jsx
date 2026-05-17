import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import CadastroDiarista from './pages/CadastroDiarista'
import CadastroSolicitante from './pages/CadastroSolicitante'
import Login from './pages/Login'

const PAGES_WITHOUT_NAVBAR = ['/cadastro/', '/login']

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
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
