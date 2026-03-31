import { useState } from 'react';
import { LogOut } from 'lucide-react';

// ⚙️ CONFIGURACIÓN
const CODIGOS_VALIDOS = ['MUNDIAL2026', 'QUINIELAOK', 'FUTBOL123'];

// 🌍 BANDERAS POR PAÍS (Grandes y visibles)
const BANDERAS = {
  'México': '🇲🇽', 'Sudáfrica': '🇿🇦', 'Corea del Sur': '🇰🇷', 'Repechaje UEFA': '🇪🇺',
  'Canadá': '🇨🇦', 'Suiza': '🇨🇭', 'Catar': '🇶🇦', 'Italia': '🇮🇹', 'Gales': 'Cymru', 'Bosnia': '🇧🇦',
  'Brasil': '🇧🇷', 'Marruecos': '🇲🇦', 'Haití': '🇭🇹', 'Escocia': 'stk',
  'Estados Unidos': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Turquía': '🇹🇷', 'Rumania': '🇷🇴',
  'Alemania': '🇩🇪', 'Curazao': '🇨🇼', 'Costa de Marfil': '🇨🇮', 'Ecuador': '🇪🇨',
  'Países Bajos': '🇳🇱', 'Japón': '🇯🇵', 'Túnez': '🇹🇳',
  'Bélgica': '🇧🇪', 'Egipto': '🇪🇬', 'Irán': '🇮🇷', 'Nueva Zelanda': '🇳🇿',
  'España': '🇪🇸', 'Arabia Saudita': '🇸🇦', 'Uruguay': '🇺🇾', 'Cabo Verde': '🇨🇻',
  'Francia': '🇫🇷', 'Senegal': '🇸🇳', 'Noruega': '🇳🇴', 'Irak': '🇮🇶', 'Bolivia': '🇧🇴', 'Surinam': '🇸🇷',
  'Argentina': '🇦🇷', 'Austria': '🇦🇹', 'Argelia': '🇩🇿', 'Jordania': '🇯🇴',
  'Portugal': '🇵🇹', 'Colombia': '🇨🇴', 'Uzbekistán': '🇺🇿', 'Palestina': '🇵🇸',
  'Inglaterra': '🇬🇧', 'Croacia': '🇭🇷', 'Panamá': '🇵🇦', 'Ghana': '🇬🇭'
};

// 📊 PARTIDOS FASE GRUPOS
const PARTIDOS_GRUPOS = [
  { id: 1, grupo: 'A', equipo1: 'México', equipo2: 'Sudáfrica', fecha: '2026-06-11', hora_local: '14:00' },
  { id: 2, grupo: 'A', equipo1: 'Corea del Sur', equipo2: 'Repechaje UEFA', fecha: '2026-06-11', hora_local: '21:00' },
  { id: 3, grupo: 'A', equipo1: 'Sudáfrica', equipo2: 'Repechaje UEFA', fecha: '2026-06-18', hora_local: '11:00' },
  { id: 4, grupo: 'A', equipo1: 'México', equipo2: 'Corea del Sur', fecha: '2026-06-18', hora_local: '20:00' },
  { id: 5, grupo: 'A', equipo1: 'Repechaje UEFA', equipo2: 'Corea del Sur', fecha: '2026-06-24', hora_local: '20:00' },
  { id: 6, grupo: 'A', equipo1: 'Sudáfrica', equipo2: 'México', fecha: '2026-06-24', hora_local: '20:00' },
  
  { id: 7, grupo: 'B', equipo1: 'Canadá', equipo2: 'Italia', fecha: '2026-06-12', hora_local: '16:00' },
  { id: 8, grupo: 'B', equipo1: 'Suiza', equipo2: 'Catar', fecha: '2026-06-12', hora_local: '18:00' },
  { id: 9, grupo: 'B', equipo1: 'Suiza', equipo2: 'Italia', fecha: '2026-06-19', hora_local: '12:00' },
  { id: 10, grupo: 'B', equipo1: 'Catar', equipo2: 'Canadá', fecha: '2026-06-19', hora_local: '23:00' },
  { id: 11, grupo: 'B', equipo1: 'Italia', equipo2: 'Catar', fecha: '2026-06-25', hora_local: '14:00' },
  { id: 12, grupo: 'B', equipo1: 'Canadá', equipo2: 'Suiza', fecha: '2026-06-25', hora_local: '20:00' },
  
  { id: 13, grupo: 'C', equipo1: 'Brasil', equipo2: 'Marruecos', fecha: '2026-06-12', hora_local: '17:00' },
  { id: 14, grupo: 'C', equipo1: 'Haití', equipo2: 'Escocia', fecha: '2026-06-12', hora_local: '20:00' },
  { id: 15, grupo: 'C', equipo1: 'Brasil', equipo2: 'Escocia', fecha: '2026-06-20', hora_local: '17:00' },
  { id: 16, grupo: 'C', equipo1: 'Marruecos', equipo2: 'Haití', fecha: '2026-06-20', hora_local: '14:00' },
  { id: 17, grupo: 'C', equipo1: 'Haití', equipo2: 'Brasil', fecha: '2026-06-26', hora_local: '20:00' },
  { id: 18, grupo: 'C', equipo1: 'Escocia', equipo2: 'Marruecos', fecha: '2026-06-26', hora_local: '20:00' },
];

// 🏆 PARTIDOS KNOCKOUT
const PARTIDOS_KNOCKOUT = [
  { id: 73, fase: '16avos', equipo1: 'Brasil', equipo2: 'México', fecha: '2026-06-28' },
  { id: 74, fase: '16avos', equipo1: 'Argentina', equipo2: 'Francia', fecha: '2026-06-28' },
  { id: 75, fase: '16avos', equipo1: 'España', equipo2: 'Portugal', fecha: '2026-06-29' },
  { id: 76, fase: '16avos', equipo1: 'Alemania', equipo2: 'Países Bajos', fecha: '2026-06-29' },
  { id: 77, fase: '16avos', equipo1: 'Inglaterra', equipo2: 'Senegal', fecha: '2026-06-30' },
  { id: 78, fase: '16avos', equipo1: 'Italia', equipo2: 'Estados Unidos', fecha: '2026-06-30' },
  { id: 79, fase: '16avos', equipo1: 'Bélgica', equipo2: 'Japón', fecha: '2026-07-01' },
  { id: 80, fase: '16avos', equipo1: 'Colombia', equipo2: 'Suiza', fecha: '2026-07-01' },
];

// 📋 EQUIPOS PARA CLASIFICACIÓN (Fase Grupos)
const TODOS_EQUIPOS_GRUPOS = ['México', 'Corea del Sur', 'Sudáfrica', 'Canadá', 'Italia', 'Suiza', 'Catar', 'Brasil', 'Marruecos', 'Haití', 'Escocia', 'Estados Unidos', 'Paraguay', 'Australia', 'Turquía', 'Alemania', 'Curazao', 'Ecuador', 'Países Bajos', 'Japón', 'Túnez'];

export default function TorneoMundialista() {
  const [page, setPage] = useState('invitacion');
  const [user, setUser] = useState(null);
  const [fase, setFase] = useState('grupos');
  const [subPestana, setSubPestana] = useState('predicciones'); // 'predicciones' o 'clasificacion'
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [codigoError, setCodigoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guardadas, setGuardadas] = useState(false);
  const [expandedGrupo, setExpandedGrupo] = useState('A');
  
  // Estado de predicciones (SOLO GOLES)
  const [prediccionesGrupos, setPrediccionesGrupos] = useState({});
  const [prediccionesKnockout, setPrediccionesKnockout] = useState({});
  
  // Estado de clasificación
  const [equiposPasan, setEquiposPasan] = useState({});
  const [mejoresTerceros, setMejoresTerceros] = useState({});
  
  // Rankings
  const [rankingGrupos] = useState([
    { nombre: 'Juan Pérez', puntos: 256 },
    { nombre: 'María García', puntos: 242 },
    { nombre: 'Carlos López', puntos: 235 },
  ]);
  
  const [rankingKnockout] = useState([
    { nombre: 'Juan Pérez', puntos: 85 },
    { nombre: 'Carlos López', puntos: 78 },
    { nombre: 'María García', puntos: 72 },
  ]);
  
  const [rankingConsolidado] = useState([
    { nombre: 'Juan Pérez', puntos: 341, bonificacion: 20 },
    { nombre: 'María García', puntos: 314, bonificacion: 15 },
    { nombre: 'Carlos López', puntos: 313, bonificacion: 10 },
  ]);

  const validarCodigo = (e) => {
    e.preventDefault();
    setCodigoError('');
    if (CODIGOS_VALIDOS.includes(codigoIngresado.toUpperCase())) {
      setPage('auth');
      setCodigoIngresado('');
    } else {
      setCodigoError('❌ Código inválido');
      setCodigoIngresado('');
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ nombre: 'Usuario Demo' });
      setPage('quiniela');
      setLoading(false);
    }, 500);
  };

  const handlePrediccion = (id, field, value) => {
    if (fase === 'grupos') {
      setPrediccionesGrupos(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
    } else {
      setPrediccionesKnockout(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
    }
    setGuardadas(false);
  };

  const handleEquipoPasa = (equipo) => {
    setEquiposPasan(prev => ({ ...prev, [equipo]: !prev[equipo] }));
  };

  const handleMejorTercero = (equipo) => {
    setMejoresTerceros(prev => ({ ...prev, [equipo]: !prev[equipo] }));
  };

  const handleLogout = () => {
    setUser(null);
    setPage('invitacion');
  };

  // PÁGINA INVITACIÓN
  if (page === 'invitacion') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a1628 0%, #1a2847 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui' }}>
        <div style={{ background: '#1a2847', border: '2px solid #f0a500', borderRadius: '16px', padding: '40px', maxWidth: '550px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚽</div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f0a500', margin: 0 }}>TORNEO MUNDIALISTA FIFA 2026</h1>
            <p style={{ color: '#8b949e', margin: '12px 0 0 0', fontSize: '13px' }}>Local Trading Colombia</p>
          </div>

          <div style={{ background: '#0d1117', padding: '20px', borderRadius: '12px', marginBottom: '20px', borderLeft: '4px solid #58a6ff' }}>
            <div style={{ fontSize: '13px', color: '#8b949e', marginBottom: '8px' }}>📌 CÓDIGO DE INVITACIÓN</div>
            <div style={{ fontSize: '12px', color: '#6e7681' }}>Solicita acceso a: admin@localtrading.com</div>
          </div>

          <form onSubmit={validarCodigo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              placeholder="Ej: MUNDIAL2026"
              value={codigoIngresado}
              onChange={(e) => setCodigoIngresado(e.target.value.toUpperCase())}
              required
              style={{ background: '#161b22', border: codigoError ? '2px solid #f85149' : '1px solid #30363d', color: '#e6edf3', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', width: '100%' }}
            />
            {codigoError && <div style={{ background: '#f85149', color: 'white', padding: '12px', borderRadius: '6px', fontSize: '12px', textAlign: 'center' }}>{codigoError}</div>}
            <button type="submit" style={{ background: '#f0a500', border: 'none', color: '#0f0c1f', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>✓ VERIFICAR</button>
          </form>

          <div style={{ marginTop: '20px', padding: '16px', background: '#21262d', borderRadius: '8px', borderLeft: '4px solid #3fb950' }}>
            <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>💡 CÓDIGO DE DEMO:</div>
            <div style={{ fontSize: '11px', color: '#e6edf3', fontFamily: 'monospace' }}>MUNDIAL2026</div>
          </div>
        </div>
      </div>
    );
  }

  // PÁGINA AUTENTICACIÓN
  if (page === 'auth') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a1628 0%, #1a2847 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui' }}>
        <div style={{ background: '#1a2847', border: '1px solid #2d1f4a', borderRadius: '16px', padding: '40px', maxWidth: '500px', width: '100%' }}>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Tu nombre" required style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            <input type="email" placeholder="Email" required style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Contraseña" required style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            <button type="submit" disabled={loading} style={{ background: '#f0a500', border: 'none', color: '#0f0c1f', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Cargando...' : 'Ingresar'}
            </button>
          </form>
          <button onClick={() => setPage('invitacion')} style={{ background: 'none', border: 'none', color: '#f85149', cursor: 'pointer', fontSize: '12px', marginTop: '16px', width: '100%' }}>
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  // PÁGINA QUINIELA
  if (page === 'quiniela') {
    const grupos = {};
    PARTIDOS_GRUPOS.forEach(p => {
      if (!grupos[p.grupo]) grupos[p.grupo] = [];
      grupos[p.grupo].push(p);
    });

    return (
      <div style={{ minHeight: '100vh', background: '#0d1117', color: '#e6edf3', padding: '20px', fontFamily: 'system-ui' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #30363d' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#f0a500', margin: 0 }}>⚽ TORNEO MUNDIALISTA FIFA 2026</h1>
              <p style={{ color: '#8b949e', fontSize: '13px', margin: '4px 0 0 0' }}>Local Trading Colombia • {user?.nombre}</p>
            </div>
            <button onClick={handleLogout} style={{ background: '#f85149', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>🚪 Salir</button>
          </div>

          {/* 3 PESTAÑAS PRINCIPALES */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #30363d', paddingBottom: '16px', flexWrap: 'wrap' }}>
            {[
              { id: 'grupos', label: '📌 FASE GRUPOS' },
              { id: 'knockout', label: '🏆 FASE KNOCKOUT' },
              { id: 'consolidado', label: '🥇 CONSOLIDADO' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setFase(tab.id); setSubPestana('predicciones'); }}
                style={{
                  background: fase === tab.id ? '#f0a500' : '#161b22',
                  color: fase === tab.id ? '#0f0c1f' : '#8b949e',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {guardadas && (
            <div style={{ background: '#1f6feb', color: 'white', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '13px' }}>
              ✅ Predicciones guardadas correctamente
            </div>
          )}

          {/* FASE GRUPOS */}
          {fase === 'grupos' && (
            <div>
              {/* SUB-PESTAÑAS: Predicciones y Clasificación */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button
                  onClick={() => setSubPestana('predicciones')}
                  style={{
                    background: subPestana === 'predicciones' ? '#58a6ff' : '#161b22',
                    color: subPestana === 'predicciones' ? 'white' : '#8b949e',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}
                >
                  ⚽ PREDICCIONES
                </button>
                <button
                  onClick={() => setSubPestana('clasificacion')}
                  style={{
                    background: subPestana === 'clasificacion' ? '#58a6ff' : '#161b22',
                    color: subPestana === 'clasificacion' ? 'white' : '#8b949e',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}
                >
                  🏆 CLASIFICACIÓN
                </button>
              </div>

              {/* SUB-PESTAÑA: PREDICCIONES */}
              {subPestana === 'predicciones' && (
                <div>
                  <h2 style={{ color: '#f0a500', marginBottom: '20px', fontSize: '20px' }}>⚽ PREDICCIONES FASE GRUPOS</h2>
                  
                  {/* Selector de grupos */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(g => (
                      <button
                        key={g}
                        onClick={() => setExpandedGrupo(g)}
                        style={{
                          background: expandedGrupo === g ? '#f0a500' : '#161b22',
                          color: expandedGrupo === g ? '#0f0c1f' : '#8b949e',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '13px'
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  {/* Partidos - SOLO CON 2 CELDAS: GOLES E1 Y GOLES E2 */}
                  <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
                    {grupos[expandedGrupo]?.map(partido => (
                      <div key={partido.id} style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '16px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '24px' }}>{BANDERAS[partido.equipo1] || '⚽'}</span>
                            <span>{partido.equipo1}</span>
                            <span style={{ color: '#8b949e' }}>vs</span>
                            <span>{partido.equipo2}</span>
                            <span style={{ fontSize: '24px' }}>{BANDERAS[partido.equipo2] || '⚽'}</span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>
                            {partido.fecha} • {partido.hora_local}
                          </div>
                        </div>

                        {/* SOLO 2 INPUTS: GOLES */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>GOLES {partido.equipo1}</label>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              placeholder="0"
                              value={prediccionesGrupos[partido.id]?.m_e1 ?? ''}
                              onChange={(e) => handlePrediccion(partido.id, 'm_e1', e.target.value)}
                              style={{ background: '#0d1117', border: '2px solid #30363d', color: '#f0a500', padding: '12px', borderRadius: '6px', fontSize: '18px', fontWeight: '600', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                            />
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <label style={{ fontSize: '11px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>GOLES {partido.equipo2}</label>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              placeholder="0"
                              value={prediccionesGrupos[partido.id]?.m_e2 ?? ''}
                              onChange={(e) => handlePrediccion(partido.id, 'm_e2', e.target.value)}
                              style={{ background: '#0d1117', border: '2px solid #30363d', color: '#f0a500', padding: '12px', borderRadius: '6px', fontSize: '18px', fontWeight: '600', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ranking Grupos */}
                  <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginBottom: '100px' }}>
                    <h3 style={{ color: '#f0a500', marginBottom: '16px' }}>🥇 RANKING FASE GRUPOS</h3>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {rankingGrupos.map((r, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#0d1117', borderRadius: '6px' }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#e6edf3' }}>
                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} {r.nombre}
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3fb950' }}>{r.puntos} pts</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-PESTAÑA: CLASIFICACIÓN */}
              {subPestana === 'clasificacion' && (
                <div>
                  <h2 style={{ color: '#f0a500', marginBottom: '20px', fontSize: '20px' }}>🏆 CLASIFICACIÓN FASE GRUPOS</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '100px' }}>
                    {/* EQUIPOS QUE PASAN */}
                    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
                      <h3 style={{ color: '#3fb950', marginBottom: '16px', fontSize: '16px' }}>✅ EQUIPOS QUE PASAN A OCTAVOS</h3>
                      <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '16px' }}>Selecciona 2 equipos por grupo</p>
                      
                      <div style={{ display: 'grid', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                        {TODOS_EQUIPOS_GRUPOS.map((equipo, idx) => (
                          <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#0d1117', borderRadius: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={equiposPasan[equipo] || false}
                              onChange={() => handleEquipoPasa(equipo)}
                              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '24px' }}>{BANDERAS[equipo] || '⚽'}</span>
                            <span style={{ color: '#e6edf3', fontSize: '14px' }}>{equipo}</span>
                          </label>
                        ))}
                      </div>
                      <div style={{ marginTop: '12px', fontSize: '12px', color: '#8b949e' }}>
                        Seleccionados: {Object.values(equiposPasan).filter(Boolean).length}
                      </div>
                    </div>

                    {/* MEJORES TERCEROS */}
                    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
                      <h3 style={{ color: '#58a6ff', marginBottom: '16px', fontSize: '16px' }}>⭐ MEJORES TERCEROS</h3>
                      <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '16px' }}>Selecciona 8 equipos</p>
                      
                      <div style={{ display: 'grid', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                        {TODOS_EQUIPOS_GRUPOS.map((equipo, idx) => (
                          <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#0d1117', borderRadius: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={mejoresTerceros[equipo] || false}
                              onChange={() => handleMejorTercero(equipo)}
                              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                              disabled={Object.values(mejoresTerceros).filter(Boolean).length >= 8 && !mejoresTerceros[equipo]}
                            />
                            <span style={{ fontSize: '24px' }}>{BANDERAS[equipo] || '⚽'}</span>
                            <span style={{ color: '#e6edf3', fontSize: '14px' }}>{equipo}</span>
                          </label>
                        ))}
                      </div>
                      <div style={{ marginTop: '12px', fontSize: '12px', color: '#8b949e' }}>
                        Seleccionados: {Object.values(mejoresTerceros).filter(Boolean).length} / 8
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FASE KNOCKOUT */}
          {fase === 'knockout' && (
            <div>
              <h2 style={{ color: '#f0a500', marginBottom: '20px', fontSize: '20px' }}>🏆 FASE KNOCKOUT</h2>
              
              <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
                {PARTIDOS_KNOCKOUT.map(partido => (
                  <div key={partido.id} style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                        <span style={{ fontSize: '24px' }}>{BANDERAS[partido.equipo1] || '⚽'}</span>
                        {partido.equipo1}
                      </span>
                      <span style={{ color: '#8b949e', margin: '0 8px' }}>vs</span>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
                        {partido.equipo2}
                        <span style={{ fontSize: '24px' }}>{BANDERAS[partido.equipo2] || '⚽'}</span>
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '11px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>GOLES</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={prediccionesKnockout[partido.id]?.m_e1 ?? ''}
                          onChange={(e) => handlePrediccion(partido.id, 'm_e1', e.target.value)}
                          style={{ background: '#0d1117', border: '2px solid #30363d', color: '#f0a500', padding: '12px', borderRadius: '6px', fontSize: '18px', fontWeight: '600', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '11px', color: '#8b949e', display: 'block', marginBottom: '6px' }}>GOLES</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={prediccionesKnockout[partido.id]?.m_e2 ?? ''}
                          onChange={(e) => handlePrediccion(partido.id, 'm_e2', e.target.value)}
                          style={{ background: '#0d1117', border: '2px solid #30363d', color: '#f0a500', padding: '12px', borderRadius: '6px', fontSize: '18px', fontWeight: '600', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ranking Knockout */}
              <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginBottom: '100px' }}>
                <h3 style={{ color: '#f0a500', marginBottom: '16px' }}>🥇 RANKING FASE KNOCKOUT</h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {rankingKnockout.map((r, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#0d1117', borderRadius: '6px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#e6edf3' }}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} {r.nombre}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#58a6ff' }}>{r.puntos} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONSOLIDADO FINAL */}
          {fase === 'consolidado' && (
            <div>
              <h2 style={{ color: '#f0a500', marginBottom: '20px', fontSize: '20px' }}>🥇 RANKING CONSOLIDADO FINAL</h2>
              <p style={{ color: '#8b949e', marginBottom: '20px', fontSize: '13px' }}>Suma: Fase Grupos + Fase Knockout + Bonificaciones</p>

              <div style={{ background: '#161b22', border: '2px solid #f0a500', borderRadius: '8px', padding: '24px', marginBottom: '30px' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {rankingConsolidado.map((r, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#0d1117', borderRadius: '8px', borderLeft: `4px solid ${idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32'}` }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#e6edf3' }}>
                          {idx === 0 ? '🥇 1ER PUESTO' : idx === 1 ? '🥈 2DO PUESTO' : '🥉 3ER PUESTO'}: {r.nombre}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>Bonificación: +{r.bonificacion} pts</div>
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f0a500' }}>
                        {r.puntos + r.bonificacion} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sistema de puntos */}
              <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginBottom: '100px' }}>
                <h3 style={{ color: '#f0a500', marginBottom: '16px' }}>📊 DESGLOSE DE PUNTOS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  <div style={{ background: '#0d1117', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #f0a500' }}>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>Marcador exacto</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f0a500' }}>3 pts</div>
                  </div>
                  <div style={{ background: '#0d1117', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #58a6ff' }}>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>Ganador/Empate</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#58a6ff' }}>1 pt</div>
                  </div>
                  <div style={{ background: '#0d1117', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #3fb950' }}>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>Equipo pasa</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3fb950' }}>5 pts</div>
                  </div>
                  <div style={{ background: '#0d1117', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #a371f7' }}>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>1er puesto</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#a371f7' }}>+20 pts</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón guardar flotante */}
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <button
              onClick={() => {
                setGuardadas(true);
                setTimeout(() => setGuardadas(false), 2000);
              }}
              style={{
                background: '#3fb950',
                border: 'none',
                color: 'white',
                padding: '14px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '0 8px 16px rgba(63, 185, 80, 0.3)'
              }}
            >
              💾 GUARDAR
            </button>
          </div>
        </div>
      </div>
    );
  }
}

