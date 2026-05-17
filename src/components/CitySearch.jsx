import { useState, useEffect, useRef } from 'react'

export default function CitySearch({ value, onChange, required, placeholder = 'Digite sua cidade...' }) {
  const [query, setQuery] = useState(value?.nome || '')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounce = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handler = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = (q) => {
    clearTimeout(debounce.current)
    if (q.length < 2) { setResults([]); setOpen(false); return }
    setLoading(true)
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`
        )
        const data = await res.json()
        const filtered = data
          .filter(m => m.nome.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 8)
          .map(m => ({
            id: m.id,
            nome: m.nome,
            estado: m['microrregiao']['mesorregiao']['UF']['sigla'],
            lat: null,
            lng: null,
          }))
        setResults(filtered)
        setOpen(filtered.length > 0)
      } catch { setResults([]) }
      setLoading(false)
    }, 300)
  }

  const select = async (city) => {
    setQuery(`${city.nome} - ${city.estado}`)
    setOpen(false)

    // Geocode via Nominatim to get coordinates
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city.nome)}&state=${city.estado}&country=Brazil&format=json&limit=1`,
        { headers: { 'Accept-Language': 'pt-BR' } }
      )
      const data = await res.json()
      if (data[0]) {
        city.lat = parseFloat(data[0].lat)
        city.lng = parseFloat(data[0].lon)
      }
    } catch { /* coordinates optional */ }

    onChange(city)
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        type="text"
        required={required}
        value={query}
        placeholder={placeholder}
        className="qt-input"
        autoComplete="off"
        onChange={e => {
          setQuery(e.target.value)
          if (!e.target.value) onChange(null)
          search(e.target.value)
        }}
        onFocus={() => results.length > 0 && setOpen(true)}
      />
      {loading && (
        <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#ABABAB' }}>
          buscando...
        </span>
      )}
      {open && (
        <ul style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          backgroundColor: '#fff', border: '1.5px solid #E5E5E5',
          borderRadius: '8px', zIndex: 100, margin: 0, padding: 0,
          listStyle: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          maxHeight: '240px', overflowY: 'auto',
        }}>
          {results.map(city => (
            <li key={city.id}
              onMouseDown={() => select(city)}
              style={{
                padding: '12px 16px', cursor: 'pointer', fontSize: '14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid #F6F6F6',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F6F6F6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <span style={{ fontWeight: 600 }}>{city.nome}</span>
              <span style={{ fontSize: '12px', color: '#ABABAB', fontWeight: 600 }}>{city.estado}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
