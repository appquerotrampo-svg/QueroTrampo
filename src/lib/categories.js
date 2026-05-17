export const SEGMENTS = [
  { id: 'residencial',     label: 'Residencial & Doméstico',   icon: '🏠', color: '#FF6B00' },
  { id: 'construcao',      label: 'Construção & Reforma',       icon: '🔨', color: '#92400e' },
  { id: 'saude',           label: 'Saúde & Bem-estar',          icon: '❤️', color: '#dc2626' },
  { id: 'beleza',          label: 'Beleza & Estética',          icon: '💇', color: '#db2777' },
  { id: 'alimentacao',     label: 'Alimentação',                icon: '🍽️', color: '#d97706' },
  { id: 'eventos',         label: 'Eventos',                    icon: '🎉', color: '#7c3aed' },
  { id: 'tecnicos',        label: 'Técnicos & Autônomos',       icon: '🔧', color: '#0369a1' },
  { id: 'educacao',        label: 'Educação & Ensino',          icon: '📚', color: '#059669' },
  { id: 'profissionais',   label: 'Serviços Profissionais',     icon: '⚖️', color: '#1A2744' },
  { id: 'transporte',      label: 'Transporte & Entrega',       icon: '🚗', color: '#374151' },
  { id: 'estabelecimento', label: 'Estabelecimentos',           icon: '🏪', color: '#6b7280' },
]

export const SERVICE_CATEGORIES = [
  // ── Residencial & Doméstico ───────────────────────────────────────────
  { id: 'diarista',            label: 'Diarista',               icon: '🧹', segment: 'residencial' },
  { id: 'faxineira',           label: 'Faxineira',              icon: '🪣', segment: 'residencial' },
  { id: 'cozinheira',          label: 'Cozinheira',             icon: '👩‍🍳', segment: 'residencial' },
  { id: 'babysitter',          label: 'Babysitter',             icon: '👶', segment: 'residencial' },
  { id: 'cuidador_idosos',     label: 'Cuidador de Idosos',     icon: '🧓', segment: 'residencial' },
  { id: 'passadeira',          label: 'Passadeira',             icon: '👔', segment: 'residencial' },
  { id: 'jardineiro',          label: 'Jardineiro',             icon: '🌿', segment: 'residencial' },
  { id: 'piscineiro',          label: 'Piscineiro',             icon: '🏊', segment: 'residencial' },
  { id: 'montagem_moveis',     label: 'Montagem de Móveis',     icon: '🪑', segment: 'residencial' },
  { id: 'mudanca',             label: 'Mudança / Frete',        icon: '📦', segment: 'residencial' },
  { id: 'chaveiro',            label: 'Chaveiro',               icon: '🔑', segment: 'residencial' },
  { id: 'desentupidor',        label: 'Desentupidor',           icon: '🚿', segment: 'residencial' },
  { id: 'lavanderia',          label: 'Lavanderia',             icon: '🫧', segment: 'residencial' },
  { id: 'auxiliar_cozinha',    label: 'Auxiliar de Cozinha',    icon: '🥘', segment: 'residencial' },

  // ── Construção & Reforma ──────────────────────────────────────────────
  { id: 'pedreiro',            label: 'Pedreiro',               icon: '🧱', segment: 'construcao' },
  { id: 'eletricista',         label: 'Eletricista',            icon: '⚡', segment: 'construcao' },
  { id: 'encanador',           label: 'Encanador',              icon: '🔩', segment: 'construcao' },
  { id: 'pintor',              label: 'Pintor',                 icon: '🖌️', segment: 'construcao' },
  { id: 'marceneiro',          label: 'Marceneiro',             icon: '🪵', segment: 'construcao' },
  { id: 'serralheiro',         label: 'Serralheiro',            icon: '⚙️', segment: 'construcao' },
  { id: 'gesseiro',            label: 'Gesseiro',               icon: '🏗️', segment: 'construcao' },
  { id: 'azulejista',          label: 'Azulejista',             icon: '🟦', segment: 'construcao' },
  { id: 'carpinteiro',         label: 'Carpinteiro',            icon: '🪚', segment: 'construcao' },
  { id: 'mestre_obras',        label: 'Mestre de Obras',        icon: '👷', segment: 'construcao' },
  { id: 'impermeabilizacao',   label: 'Impermeabilização',      icon: '💧', segment: 'construcao' },
  { id: 'dedetizacao',         label: 'Dedetização',            icon: '🪲', segment: 'construcao' },
  { id: 'vidraceiro',          label: 'Vidraceiro',             icon: '🪟', segment: 'construcao' },
  { id: 'tapeceiro',           label: 'Tapeceiro',              icon: '🛋️', segment: 'construcao' },
  { id: 'ajudante_obra',       label: 'Ajudante de Obra',       icon: '🦺', segment: 'construcao' },
  { id: 'soldador',            label: 'Soldador',               icon: '🔥', segment: 'construcao' },

  // ── Saúde & Bem-estar ─────────────────────────────────────────────────
  { id: 'enfermeiro',          label: 'Enfermeiro Domiciliar',  icon: '💉', segment: 'saude' },
  { id: 'fisioterapeuta',      label: 'Fisioterapeuta',         icon: '🦴', segment: 'saude' },
  { id: 'massoterapeuta',      label: 'Massoterapeuta',         icon: '💆', segment: 'saude' },
  { id: 'nutricionista',       label: 'Nutricionista',          icon: '🥗', segment: 'saude' },
  { id: 'personal_trainer',    label: 'Personal Trainer',       icon: '🏋️', segment: 'saude' },
  { id: 'psicologo',           label: 'Psicólogo',              icon: '🧠', segment: 'saude' },
  { id: 'veterinario',         label: 'Veterinário Domiciliar', icon: '🐾', segment: 'saude' },
  { id: 'medico',              label: 'Médico (Consulta)',      icon: '👨‍⚕️', segment: 'saude' },
  { id: 'dentista',            label: 'Dentista',               icon: '🦷', segment: 'saude' },
  { id: 'cuidador_saude',      label: 'Cuidador de Saúde',      icon: '🩺', segment: 'saude' },

  // ── Beleza & Estética ─────────────────────────────────────────────────
  { id: 'cabeleireiro',        label: 'Cabeleireiro(a)',        icon: '✂️', segment: 'beleza' },
  { id: 'manicure',            label: 'Manicure / Pedicure',    icon: '💅', segment: 'beleza' },
  { id: 'barbeiro',            label: 'Barbeiro',               icon: '💈', segment: 'beleza' },
  { id: 'maquiador',           label: 'Maquiador(a)',           icon: '💄', segment: 'beleza' },
  { id: 'esteticista',         label: 'Esteticista',            icon: '🧖', segment: 'beleza' },
  { id: 'depilacao',           label: 'Depilação',              icon: '🪒', segment: 'beleza' },
  { id: 'design_sobrancelha',  label: 'Design de Sobrancelha',  icon: '👁️', segment: 'beleza' },

  // ── Alimentação ───────────────────────────────────────────────────────
  { id: 'chef_casa',           label: 'Chef em Casa',           icon: '👨‍🍳', segment: 'alimentacao' },
  { id: 'marmiteiro',          label: 'Marmiteiro(a)',          icon: '🍱', segment: 'alimentacao' },
  { id: 'confeiteiro',         label: 'Confeiteiro / Doceiro',  icon: '🎂', segment: 'alimentacao' },
  { id: 'churrasqueiro',       label: 'Churrasqueiro',          icon: '🥩', segment: 'alimentacao' },
  { id: 'barman',              label: 'Barman / Bartender',     icon: '🍹', segment: 'alimentacao' },
  { id: 'garcom',              label: 'Garçom / Garçonete',     icon: '🍽️', segment: 'alimentacao' },
  { id: 'buffet',              label: 'Buffet / Catering',      icon: '🥘', segment: 'alimentacao' },
  { id: 'salgadeiro',          label: 'Salgadeiro(a)',          icon: '🥟', segment: 'alimentacao' },
  { id: 'chapeiro',            label: 'Chapeiro',               icon: '🍔', segment: 'alimentacao' },
  { id: 'acougueiro',          label: 'Açougueiro',             icon: '🔪', segment: 'alimentacao' },

  // ── Eventos ───────────────────────────────────────────────────────────
  { id: 'dj',                  label: 'DJ',                     icon: '🎧', segment: 'eventos' },
  { id: 'fotografo',           label: 'Fotógrafo',              icon: '📷', segment: 'eventos' },
  { id: 'videomaker',          label: 'Videomaker',             icon: '🎬', segment: 'eventos' },
  { id: 'animador_festa',      label: 'Animador de Festa',      icon: '🎪', segment: 'eventos' },
  { id: 'decorador',           label: 'Decorador(a)',           icon: '🎀', segment: 'eventos' },
  { id: 'som_iluminacao',      label: 'Som e Iluminação',       icon: '🔊', segment: 'eventos' },
  { id: 'mestre_cerimonia',    label: 'Mestre de Cerimônia',    icon: '🎤', segment: 'eventos' },
  { id: 'seguranca_evento',    label: 'Segurança de Evento',    icon: '🦺', segment: 'eventos' },
  { id: 'recreador',           label: 'Recreador Infantil',     icon: '🧸', segment: 'eventos' },

  // ── Técnicos & Autônomos ──────────────────────────────────────────────
  { id: 'ar_condicionado',     label: 'Técnico de AC',          icon: '❄️', segment: 'tecnicos' },
  { id: 'informatica',         label: 'Técnico de Informática', icon: '💻', segment: 'tecnicos' },
  { id: 'mecanico',            label: 'Mecânico',               icon: '🔧', segment: 'tecnicos' },
  { id: 'borracheiro',         label: 'Borracheiro',            icon: '🛞', segment: 'tecnicos' },
  { id: 'eletrotecnico',       label: 'Eletrotécnico',          icon: '🔌', segment: 'tecnicos' },
  { id: 'tecnico_celular',     label: 'Técnico de Celular',     icon: '📱', segment: 'tecnicos' },
  { id: 'antena_cftv',         label: 'Antena / CFTV',          icon: '📡', segment: 'tecnicos' },
  { id: 'vigia',               label: 'Vigia / Porteiro',       icon: '👁️', segment: 'tecnicos' },
  { id: 'repositor',           label: 'Repositor',              icon: '🏪', segment: 'tecnicos' },
  { id: 'operador_caixa',      label: 'Operador de Caixa',      icon: '💰', segment: 'tecnicos' },
  { id: 'embalador',           label: 'Embalador',              icon: '📦', segment: 'tecnicos' },

  // ── Educação & Ensino ─────────────────────────────────────────────────
  { id: 'professor_particular', label: 'Professor Particular',  icon: '📖', segment: 'educacao' },
  { id: 'musica',              label: 'Instrutor de Música',     icon: '🎵', segment: 'educacao' },
  { id: 'idiomas',             label: 'Aulas de Idiomas',        icon: '🌍', segment: 'educacao' },
  { id: 'informatica_aulas',   label: 'Aulas de Informática',    icon: '🖥️', segment: 'educacao' },
  { id: 'reforco_escolar',     label: 'Reforço Escolar',         icon: '✏️', segment: 'educacao' },
  { id: 'artes',               label: 'Aulas de Artes',          icon: '🎨', segment: 'educacao' },

  // ── Serviços Profissionais ────────────────────────────────────────────
  { id: 'advogado',            label: 'Advogado',               icon: '⚖️', segment: 'profissionais' },
  { id: 'contador',            label: 'Contador',               icon: '🧾', segment: 'profissionais' },
  { id: 'designer',            label: 'Designer Gráfico',       icon: '🖼️', segment: 'profissionais' },
  { id: 'tradutor',            label: 'Tradutor',               icon: '📝', segment: 'profissionais' },
  { id: 'arquiteto',           label: 'Arquiteto',              icon: '📐', segment: 'profissionais' },
  { id: 'engenheiro',          label: 'Engenheiro',             icon: '🏛️', segment: 'profissionais' },
  { id: 'corretor',            label: 'Corretor de Imóveis',    icon: '🏘️', segment: 'profissionais' },
  { id: 'seguranca_priv',      label: 'Segurança Privado',      icon: '🛡️', segment: 'profissionais' },

  // ── Transporte & Entrega ──────────────────────────────────────────────
  { id: 'motorista',           label: 'Motorista Particular',   icon: '🚙', segment: 'transporte' },
  { id: 'mototaxi',            label: 'Mototaxista',            icon: '🏍️', segment: 'transporte' },
  { id: 'entregador',          label: 'Entregador',             icon: '📬', segment: 'transporte' },
  { id: 'frete',               label: 'Frete / Mudança',        icon: '🚛', segment: 'transporte' },
  { id: 'guincho',             label: 'Guincho',                icon: '🔗', segment: 'transporte' },
  { id: 'chapa',               label: 'Chapa',                  icon: '💪', segment: 'transporte' },

  // ── Estabelecimentos ──────────────────────────────────────────────────
  { id: 'restaurante',         label: 'Restaurante',            icon: '🍴', segment: 'estabelecimento' },
  { id: 'padaria',             label: 'Padaria',                icon: '🥖', segment: 'estabelecimento' },
  { id: 'mercado',             label: 'Mercado / Supermercado', icon: '🛒', segment: 'estabelecimento' },
  { id: 'farmacia',            label: 'Farmácia',               icon: '💊', segment: 'estabelecimento' },
  { id: 'posto_gasolina',      label: 'Posto de Gasolina',      icon: '⛽', segment: 'estabelecimento' },
  { id: 'pet_shop',            label: 'Pet Shop',               icon: '🐶', segment: 'estabelecimento' },
  { id: 'bar',                 label: 'Bar',                    icon: '🍺', segment: 'estabelecimento' },
  { id: 'salao_beleza',        label: 'Salão de Beleza',        icon: '💇', segment: 'estabelecimento' },
  { id: 'loja_conveniencia',   label: 'Loja de Conveniência',   icon: '🏬', segment: 'estabelecimento' },
  { id: 'academia',            label: 'Academia',               icon: '🏋️', segment: 'estabelecimento' },
  { id: 'clinica',             label: 'Clínica',                icon: '🏥', segment: 'estabelecimento' },
  { id: 'oficina',             label: 'Oficina Mecânica',       icon: '🔩', segment: 'estabelecimento' },
]

export const getCategoriesBySegment = (segmentId) =>
  SERVICE_CATEGORIES.filter(c => c.segment === segmentId)

export const getCategoryById = (id) =>
  SERVICE_CATEGORIES.find(c => c.id === id)

export const getSegmentById = (id) =>
  SEGMENTS.find(s => s.id === id)
