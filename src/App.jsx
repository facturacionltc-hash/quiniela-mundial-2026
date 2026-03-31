import { useState } from 'react';
import { LogOut } from 'lucide-react';

const CODIGOS_VALIDOS = ['MUNDIAL2026', 'QUINIELAOK', 'FUTBOL123'];

const BANDERAS = {
  'México': '🇲🇽', 'Sudáfrica': '🇿🇦', 'Corea del Sur': '🇰🇷', 'Repechaje UEFA': '🇪🇺',
  'Canadá': '🇨🇦', 'Suiza': '🇨🇭', 'Catar': '🇶🇦', 'Italia': '🇮🇹',
  'Brasil': '🇧🇷', 'Marruecos': '🇲🇦', 'Haití': '🇭🇹',
  'Estados Unidos': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Turquía': '🇹🇷',
  'Alemania': '🇩🇪', 'Curazao': '🇨🇼', 'Costa de Marfil': '🇨🇮', 'Ecuador': '🇪🇨',
  'Países Bajos': '🇳🇱', 'Japón': '🇯🇵', 'Túnez': '🇹🇳',
  'Bélgica': '🇧🇪', 'Egipto': '🇪🇬', 'Irán': '🇮🇷',
  'España': '🇪🇸', 'Arabia Saudita': '🇸🇦', 'Uruguay': '🇺🇾',
  'Francia': '🇫🇷', 'Senegal': '🇸🇳', 'Irak': '🇮🇶', 'Bolivia': '🇧🇴',
  'Argentina': '🇦🇷', 'Austria': '🇦🇹', 'Argelia': '🇩🇿', 'Jordania': '🇯🇴',
  'Portugal': '🇵🇹', 'Colombia': '🇨🇴', 'Uzbekistán': '🇺🇿',
  'Inglaterra': '🇬🇧', 'Croacia': '🇭🇷', 'Panamá': '🇵🇦', 'Ghana': '🇬🇭',
  'Holanda': '🇳🇱', 'Dinamarca': '🇩🇰', 'Perú': '🇵🇪', 'Costa Rica': '🇨🇷',
  'Senegal': '🇸🇳', 'Suecia': '🇸🇪', 'Ucrania': '🇺🇦', 'Serbia': '🇷🇸',
  'Noruega': '🇳🇴', 'Camerún': '🇨🇲', 'Nueva Zelanda': '🇳🇿'
};

// Datos de los grupos con tabla de posiciones
const GRUPOS_DATA = {
  A: {
    nombre: 'Grupo A',
    equipos: [
      { equipo: 'Argentina', pts: 9, pj: 3, g: 3, e: 0, p: 0, dg: 7 },
      { equipo: 'Polonia', pts: 6, pj: 3, g: 2, e: 0, p: 1, dg: 3 },
      { equipo: 'México', pts: 3, pj: 3, g: 1, e: 0, p: 2, dg: -4 },
      { equipo: 'Arabia Saudita', pts: 0, pj: 3, g: 0, e: 0, p: 3, dg: -6 },
    ],
    partidos: [
      { id: 1, e1: 'Argentina', e2: 'Arabia Saudita' },
      { id: 2, e1: 'Polonia', e2: 'México' },
    ]
  },
  B: {
    nombre: 'Grupo B',
    equipos: [
      { equipo: 'España', pts: 7, pj: 3, g: 2, e: 1, p: 0, dg: 5 },
      { equipo: 'Alemania', pts: 6, pj: 3, g: 2, e: 0, p: 1, dg: 2 },
      { equipo: 'Japón', pts: 4, pj: 3, g: 1, e: 1, p: 1, dg: 0 },
      { equipo: 'Costa Rica', pts: 1, pj: 3, g: 0, e: 1, p: 2, dg: -7 },
    ],
    partidos: [
      { id: 3, e1: 'España', e2: 'Alemania' },
      { id: 4, e1: 'Japón', e2: 'Costa Rica' },
    ]
  },
  C: {
    nombre: 'Grupo C',
    equipos: [
      { equipo: 'Brasil', pts: 9, pj: 3, g: 3, e: 0, p: 0, dg: 8 },
      { equipo: 'Francia', pts: 6, pj: 3, g: 2, e: 0, p: 1, dg: 3 },
      { equipo: 'Dinamarca', pts: 3, pj: 3, g: 1, e: 0, p: 2, dg: -5 },
      { equipo: 'Perú', pts: 1, pj: 3, g: 0, e: 1, p: 2, dg: -6 },
    ],
    partidos: [
      { id: 5, e1: 'Brasil', e2: 'Perú' },
      { id: 6, e1: 'Francia', e2: 'Dinamarca' },
    ]
  },
  D: {
    nombre: 'Grupo D',
    equipos: [
      { equipo: 'Holanda', pts: 7, pj: 3, g: 2, e: 1, p: 0, dg: 4 },
      { equipo: 'Senegal', pts: 4, pj: 3, g: 1, e: 1, p: 1, dg: 1 },
      { equipo: 'Inglaterra', pts: 3, pj: 3, g: 1, e: 0, p: 2, dg: -2 },
      { equipo: 'Irán', pts: 1, pj: 3, g: 0, e: 1, p: 2, dg: -3 },
    ],
    partidos: [
      { id: 7, e1: 'Holanda', e2: 'Irán' },
      { id: 8, e1: 'Senegal', e2: 'Inglaterra' },
    ]
  },
  E: {
    nombre: 'Grupo E',
    equipos: [
      { equipo: 'Bélgica', pts: 9, pj: 3, g: 3, e: 0, p: 0, dg: 6 },
      { equipo: 'Croacia', pts: 4, pj: 3, g: 1, e: 1, p: 1, dg: 0 },
      { equipo: 'Marruecos', pts: 4, pj: 3, g: 1, e: 1, p: 1, dg: 0 },
      { equipo: 'Canadá', pts: 0, pj: 3, g: 0, e: 0, p: 3, dg: -6 },
    ],
    partidos: [
      { id: 9, e1: 'Bélgica', e2: 'Canadá' },
      { id: 10, e1: 'Croacia', e2: 'Marruecos' },
    ]
  },
  F: {
    nombre: 'Grupo F',
    equipos: [
      { equipo: 'Uruguay', pts: 9, pj: 3, g: 3, e: 0, p: 0, dg: 5 },
      { equipo: 'Suiza', pts: 3, pj: 3, g: 1, e: 0, p: 2, dg: 0 },
      { equipo: 'Corea del Sur', pts: 3, pj: 3, g: 1, e: 0, p: 2, dg: -1 },
      { equipo: 'Ghana', pts: 0, pj: 3, g: 0, e: 0, p: 3, dg: -4 },
    ],
    partidos: [
      { id: 11, e1: 'Uruguay', e2: 'Ghana' },
      { id: 12, e1: 'Suiza', e2: 'Corea del Sur' },
    ]
  },
  G: {
    nombre: 'Grupo G',
    equipos: [
      { equipo: 'Portugal', pts: 7, pj: 3, g: 2, e: 1, p: 0, dg: 4 },
      { equipo: 'Suecia', pts: 4, pj: 3, g: 1, e: 1, p: 1, dg: 1 },
      { equipo: 'Ucrania', pts: 4, pj: 3, g: 1, e: 1, p: 1, dg: -1 },
      { equipo: 'Serbia', pts: 1, pj: 3, g: 0, e: 1, p: 2, dg: -4 },
    ],
    partidos: [
      { id: 13, e1: 'Portugal', e2: 'Serbia' },
      { id: 14, e1: 'Suecia', e2: 'Ucrania' },
    ]
  },
  H: {
    nombre: 'Grupo H',
    equipos: [
      { equipo: 'Noruega', pts: 7, pj: 3, g: 2, e: 1, p: 0, dg: 3 },
      { equipo: 'Italia', pts: 6, pj: 3, g: 2, e: 0, p: 1, dg: 2 },
      { equipo: 'Camerún', pts: 3, pj: 3, g: 1, e: 0, p: 2, dg: -2 },
      { equipo: 'Nueva Zelanda', pts: 1, pj: 3, g: 0, e: 1, p: 2, dg: -3 },
    ],
    partidos: [
      { id: 15, e1: 'Noruega', e2: 'Nueva Zelanda' },
      { id: 16, e1: 'Italia', e2: 'Camerún' },
    ]
  },
};

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

export default function TorneoMundialista() {
  const [page, setPage] = useState('invitacion');
  const [user, setUser] = useState(null);
  const [fase, setFase] = useState('grupos');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [codigoError, setCodigoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guardadas, setGuardadas] = useState(false);
  
  const [prediccionesGrupos, setPrediccionesGrupos] = useState({});
  const [prediccionesKnockout, setPrediccionesKnockout] = useState({});

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

  // PÁGINA QUINIELA - DASHBOARD PRINCIPAL
  if (page === 'quiniela') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d4a1a 0%, #0f5c1f 100%)', padding: '20px', fontFamily: 'system-ui' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', margin: 0 }}>⚽ TORNEO MUNDIALISTA FIFA 2026</h1>
              <p style={{ color: '#a8d5ba', fontSize: '13px', margin: '4px 0 0 0' }}>Local Trading Colombia • {user?.nombre}</p>
            </div>
            <button onClick={handleLogout} style={{ background: '#f85149', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>🚪 Salir</button>
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #1a6d2a', paddingBottom: '16px' }}>
            {[
              { id: 'grupos', label: '📊 GRUPOS' },
              { id: 'knockout', label: '🏆 KNOCKOUT' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFase(tab.id)}
                style={{
                  background: fase === tab.id ? '#4ade80' : 'transparent',
                  color: fase === tab.id ? '#0a0a0a' : '#a8d5ba',
                  border: 'none',
                  padding: '10px 20px',
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

          {/* FASE GRUPOS - GRID DASHBOARD */}
          {fase === 'grupos' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px', marginBottom: '100px' }}>
                
                {Object.entries(GRUPOS_DATA).map(([key, grupo]) => (
                  <div key={key} style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', border: '0.5px solid #333' }}>
                    
                    {/* Header del grupo */}
                    <div style={{ background: '#2d5a2d', padding: '12px 14px', borderBottom: '1px solid #333' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: 0 }}>{grupo.nombre}</h2>
                        <div style={{ width: '60px', height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: '75%', height: '100%', background: '#4ade80' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tabla de posiciones */}
                    <div style={{ padding: '12px', borderBottom: '1px solid #333', overflowX: 'auto' }}>
                      <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #444' }}>
                            <th style={{ textAlign: 'left', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px' }}>EQUIPO</th>
                            <th style={{ textAlign: 'center', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px', width: '24px' }}>PTS</th>
                            <th style={{ textAlign: 'center', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px', width: '20px' }}>PJ</th>
                            <th style={{ textAlign: 'center', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px', width: '18px' }}>G</th>
                            <th style={{ textAlign: 'center', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px', width: '18px' }}>E</th>
                            <th style={{ textAlign: 'center', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px', width: '18px' }}>P</th>
                            <th style={{ textAlign: 'center', padding: '6px 0', color: '#888', fontWeight: '400', fontSize: '9px', width: '20px' }}>DG</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grupo.equipos.map((team, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #2a2a2a', background: idx === 0 ? '#252525' : 'transparent' }}>
                              <td style={{ padding: '7px 0', color: '#fff', fontSize: '10px' }}>{BANDERAS[team.equipo] || '⚽'} {team.equipo}</td>
                              <td style={{ textAlign: 'center', color: team.pts > 0 ? '#4ade80' : '#ccc', fontWeight: '600', fontSize: '10px' }}>{team.pts}</td>
                              <td style={{ textAlign: 'center', color: '#ccc', fontSize: '10px' }}>{team.pj}</td>
                              <td style={{ textAlign: 'center', color: '#ccc', fontSize: '10px' }}>{team.g}</td>
                              <td style={{ textAlign: 'center', color: '#ccc', fontSize: '10px' }}>{team.e}</td>
                              <td style={{ textAlign: 'center', color: '#ccc', fontSize: '10px' }}>{team.p}</td>
                              <td style={{ textAlign: 'center', color: team.dg > 0 ? '#4ade80' : team.dg < 0 ? '#f87171' : '#ccc', fontWeight: '600', fontSize: '10px' }}>
                                {team.dg > 0 ? '+' : ''}{team.dg}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Partidos para predicción */}
                    <div style={{ padding: '10px' }}>
                      <div style={{ fontSize: '9px', color: '#888', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>PREDICCIONES</div>
                      {grupo.partidos.map(partido => (
                        <div key={partido.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                          <span style={{ color: '#fff', fontSize: '10px', flex: 1, minWidth: '50px' }}>
                            {BANDERAS[partido.e1] || '⚽'} {partido.e1.substring(0, 4)}
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="9"
                            value={prediccionesGrupos[partido.id]?.goles_e1 ?? ''}
                            onChange={(e) => handlePrediccion(partido.id, 'goles_e1', e.target.value)}
                            style={{
                              width: '28px',
                              height: '22px',
                              background: '#2a2a2a',
                              border: '1px solid #444',
                              color: '#4ade80',
                              textAlign: 'center',
                              fontSize: '10px',
                              fontWeight: '600',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ color: '#888', fontSize: '9px' }}>-</span>
                          <input
                            type="number"
                            min="0"
                            max="9"
                            value={prediccionesGrupos[partido.id]?.goles_e2 ?? ''}
                            onChange={(e) => handlePrediccion(partido.id, 'goles_e2', e.target.value)}
                            style={{
                              width: '28px',
                              height: '22px',
                              background: '#2a2a2a',
                              border: '1px solid #444',
                              color: '#4ade80',
                              textAlign: 'center',
                              fontSize: '10px',
                              fontWeight: '600',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ color: '#fff', fontSize: '10px', flex: 1, textAlign: 'right', minWidth: '50px' }}>
                            {partido.e2.substring(0, 4)} {BANDERAS[partido.e2] || '⚽'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FASE KNOCKOUT */}
          {fase === 'knockout' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '20px' }}>🏆 FASE KNOCKOUT</h2>
              
              <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
                {PARTIDOS_KNOCKOUT.map(partido => (
                  <div key={partido.id} style={{ background: '#1a1a1a', border: '0.5px solid #333', borderRadius: '8px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#a8d5ba' }}>16avos de Final</span>
                      <span style={{ fontSize: '11px', color: '#888' }}>{partido.fecha}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff', flex: 1 }}>
                        {BANDERAS[partido.equipo1] || '⚽'} {partido.equipo1}
                      </span>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="number"
                          min="0"
                          max="9"
                          value={prediccionesKnockout[partido.id]?.goles_e1 ?? ''}
                          onChange={(e) => handlePrediccion(partido.id, 'goles_e1', e.target.value)}
                          style={{
                            width: '32px',
                            height: '28px',
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            color: '#4ade80',
                            textAlign: 'center',
                            fontSize: '13px',
                            fontWeight: '600',
                            borderRadius: '4px'
                          }}
                        />
                        <span style={{ color: '#888', fontSize: '11px' }}>-</span>
                        <input
                          type="number"
                          min="0"
                          max="9"
                          value={prediccionesKnockout[partido.id]?.goles_e2 ?? ''}
                          onChange={(e) => handlePrediccion(partido.id, 'goles_e2', e.target.value)}
                          style={{
                            width: '32px',
                            height: '28px',
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            color: '#4ade80',
                            textAlign: 'center',
                            fontSize: '13px',
                            fontWeight: '600',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff', flex: 1, textAlign: 'right' }}>
                        {partido.equipo2} {BANDERAS[partido.equipo2] || '⚽'}
                      </span>
                    </div>
                  </div>
                ))}
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
                background: '#4ade80',
                border: 'none',
                color: '#0a0a0a',
                padding: '14px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '0 8px 16px rgba(74, 222, 128, 0.3)'
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
