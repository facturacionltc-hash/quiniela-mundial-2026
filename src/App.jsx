import { useState } from 'react';
import { LogOut } from 'lucide-react';

const CODIGOS_VALIDOS = ['MUNDIAL2026', 'QUINIELAOK', 'FUTBOL123'];

const BANDERAS = {
  'Argentina': '🇦🇷', 'Uruguay': '🇺🇾', 'Paraguay': '🇵🇾', 'Bolivia': '🇧🇴',
  'Brasil': '🇧🇷', 'Colombia': '🇨🇴', 'Ecuador': '🇪🇨', 'Perú': '🇵🇪', 'Venezuela': '🇻🇪',
  'Chile': '🇨🇱', 'Costa Rica': '🇨🇷', 'Panamá': '🇵🇦', 'El Salvador': '🇸🇻', 'Honduras': '🇭🇳', 'Nicaragua': '🇳🇮', 'Guatemala': '🇬🇹',
  'Estados Unidos': '🇺🇸', 'Canadá': '🇨🇦', 'México': '🇲🇽',
  'España': '🇪🇸', 'Italia': '🇮🇹', 'Alemania': '🇩🇪', 'Francia': '🇫🇷', 'Portugal': '🇵🇹', 'Holanda': '🇳🇱', 'Bélgica': '🇧🇪',
  'Croacia': '🇭🇷', 'Dinamarca': '🇩🇰', 'Suecia': '🇸🇪', 'Noruega': '🇳🇴', 'Inglaterra': '🇬🇧', 'Escocia': '🇬🇧', 'Gales': '🇬🇧',
  'Suiza': '🇨🇭', 'Austria': '🇦🇹', 'República Checa': '🇨🇿', 'Hungría': '🇭🇺', 'Rumania': '🇷🇴', 'Serbia': '🇷🇸', 'Ucrania': '🇺🇦',
  'Marruecos': '🇲🇦', 'Senegal': '🇸🇳', 'Camerún': '🇨🇲', 'Ghana': '🇬🇭', 'Túnez': '🇹🇳', 'Argelia': '🇩🇿', 'Egipto': '🇪🇬',
  'Japón': '🇯🇵', 'Corea del Sur': '🇰🇷', 'Arabia Saudita': '🇸🇦', 'Irán': '🇮🇷', 'Irak': '🇮🇶', 'Uzbekistán': '🇺🇿', 'Singapur': '🇸🇬',
  'Australia': '🇦🇺', 'Nueva Zelanda': '🇳🇿'
};

// GRUPOS MUNDIAL 2026 (12 GRUPOS x 4 EQUIPOS)
const GRUPOS_DATA = {
  A: { nombre: 'Grupo A', equipos: ['Argentina', 'Uruguay', 'Paraguay', 'Bolivia'] },
  B: { nombre: 'Grupo B', equipos: ['Brasil', 'Colombia', 'Ecuador', 'Perú'] },
  C: { nombre: 'Grupo C', equipos: ['Venezuela', 'Chile', 'Costa Rica', 'Panamá'] },
  D: { nombre: 'Grupo D', equipos: ['El Salvador', 'Honduras', 'Nicaragua', 'Guatemala'] },
  E: { nombre: 'Grupo E', equipos: ['Estados Unidos', 'Canadá', 'México', 'Jamaica'] },
  F: { nombre: 'Grupo F', equipos: ['España', 'Italia', 'Alemania', 'Francia'] },
  G: { nombre: 'Grupo G', equipos: ['Portugal', 'Holanda', 'Bélgica', 'Croacia'] },
  H: { nombre: 'Grupo H', equipos: ['Dinamarca', 'Suecia', 'Noruega', 'Inglaterra'] },
  I: { nombre: 'Grupo I', equipos: ['Suiza', 'Austria', 'República Checa', 'Hungría'] },
  J: { nombre: 'Grupo J', equipos: ['Rumania', 'Serbia', 'Ucrania', 'Polonia'] },
  K: { nombre: 'Grupo K', equipos: ['Marruecos', 'Senegal', 'Camerún', 'Ghana'] },
  L: { nombre: 'Grupo L', equipos: ['Japón', 'Corea del Sur', 'Arabia Saudita', 'Irán'] },
};

export default function TorneoMundialista() {
  const [page, setPage] = useState('invitacion');
  const [user, setUser] = useState(null);
  const [fase, setFase] = useState('grupos');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [codigoError, setCodigoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [guardadas, setGuardadas] = useState(false);
  
  const [prediccionesGrupos, setPrediccionesGrupos] = useState({});
  const [eliminacionesPreds, setEliminacionesPreds] = useState({});

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
      setEliminacionesPreds(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
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

  // PÁGINA QUINIELA
  if (page === 'quiniela') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d4a1a 0%, #0f5c1f 100%)', padding: '20px', fontFamily: 'system-ui' }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
          
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #1a6d2a' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', margin: 0 }}>⚽ TORNEO MUNDIALISTA FIFA 2026</h1>
              <p style={{ color: '#a8d5ba', fontSize: '13px', margin: '4px 0 0 0' }}>Local Trading Colombia • {user?.nombre}</p>
            </div>
            <button onClick={handleLogout} style={{ background: '#f85149', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>🚪 Salir</button>
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            {[
              { id: 'grupos', label: '📊 FASE GRUPOS (12 GRUPOS)' },
              { id: 'eliminacion', label: '🏆 FASE ELIMINACIÓN' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFase(tab.id)}
                style={{
                  background: fase === tab.id ? '#4ade80' : 'transparent',
                  color: fase === tab.id ? '#0a0a0a' : '#a8d5ba',
                  border: fase === tab.id ? 'none' : '1px solid #1a6d2a',
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '16px', marginBottom: '100px' }}>
                {Object.entries(GRUPOS_DATA).map(([key, grupo]) => (
                  <div key={key} style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', border: '0.5px solid #333' }}>
                    <div style={{ background: '#2d5a2d', padding: '14px', borderBottom: '1px solid #333' }}>
                      <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: 0 }}>{grupo.nombre}</h2>
                    </div>
                    
                    <div style={{ padding: '12px' }}>
                      {grupo.equipos.map((equipo, idx) => (
                        <div key={idx} style={{ marginBottom: '10px', padding: '10px', background: '#252525', borderRadius: '4px', border: '0.5px solid #333' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '20px' }}>{BANDERAS[equipo] || '⚽'}</span>
                            <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600', flex: 1 }}>{equipo}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                            <input
                              type="number"
                              min="0"
                              max="99"
                              placeholder="PTS"
                              value={prediccionesGrupos[`${key}_${idx}_pts`] ?? ''}
                              onChange={(e) => handlePrediccion(`${key}_${idx}_pts`, 'value', e.target.value)}
                              style={{ width: '50px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px' }}
                            />
                            <input
                              type="number"
                              min="0"
                              max="9"
                              placeholder="G"
                              value={prediccionesGrupos[`${key}_${idx}_g`] ?? ''}
                              onChange={(e) => handlePrediccion(`${key}_${idx}_g`, 'value', e.target.value)}
                              style={{ width: '40px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px' }}
                            />
                            <input
                              type="number"
                              min="0"
                              max="9"
                              placeholder="E"
                              value={prediccionesGrupos[`${key}_${idx}_e`] ?? ''}
                              onChange={(e) => handlePrediccion(`${key}_${idx}_e`, 'value', e.target.value)}
                              style={{ width: '40px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px' }}
                            />
                            <input
                              type="number"
                              min="0"
                              max="9"
                              placeholder="P"
                              value={prediccionesGrupos[`${key}_${idx}_p`] ?? ''}
                              onChange={(e) => handlePrediccion(`${key}_${idx}_p`, 'value', e.target.value)}
                              style={{ width: '40px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FASE ELIMINACIÓN */}
          {fase === 'eliminacion' && (
            <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '100px' }}>
              <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '20px' }}>🏆 FASE ELIMINACIÓN</h2>
              
              <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '20px', border: '0.5px solid #333' }}>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: '#4ade80', fontSize: '16px', marginBottom: '16px' }}>16avos de Final</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                    {[
                      { id: '16a_1', e1: 'Argentina', e2: 'Perú' },
                      { id: '16a_2', e1: 'Brasil', e2: 'Colombia' },
                      { id: '16a_3', e1: 'España', e2: 'Francia' },
                      { id: '16a_4', e1: 'Alemania', e2: 'Bélgica' },
                      { id: '16a_5', e1: 'Portugal', e2: 'Croacia' },
                      { id: '16a_6', e1: 'Holanda', e2: 'Senegal' },
                      { id: '16a_7', e1: 'Italia', e2: 'Japón' },
                      { id: '16a_8', e1: 'México', e2: 'Marr uecos' },
                    ].map(partido => (
                      <div key={partido.id} style={{ background: '#252525', padding: '12px', borderRadius: '6px', border: '0.5px solid #333' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{BANDERAS[partido.e1] || '⚽'}</span>
                          <span style={{ color: '#fff', fontSize: '11px', flex: 1 }}>{partido.e1}</span>
                          <input
                            type="number"
                            min="0"
                            max="9"
                            placeholder="0"
                            value={eliminacionesPreds[`${partido.id}_e1`] ?? ''}
                            onChange={(e) => handlePrediccion(`${partido.id}_e1`, 'value', e.target.value)}
                            style={{ width: '32px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px', fontWeight: '600' }}
                          />
                          <span style={{ color: '#888', fontSize: '10px' }}>-</span>
                          <input
                            type="number"
                            min="0"
                            max="9"
                            placeholder="0"
                            value={eliminacionesPreds[`${partido.id}_e2`] ?? ''}
                            onChange={(e) => handlePrediccion(`${partido.id}_e2`, 'value', e.target.value)}
                            style={{ width: '32px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px', fontWeight: '600' }}
                          />
                          <span style={{ fontSize: '16px' }}>{BANDERAS[partido.e2] || '⚽'}</span>
                          <span style={{ color: '#fff', fontSize: '11px', flex: 1, textAlign: 'right' }}>{partido.e2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: '#4ade80', fontSize: '16px', marginBottom: '16px' }}>Cuartos de Final</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                    {[
                      { id: 'cf_1', e1: 'Argentina', e2: 'Brasil' },
                      { id: 'cf_2', e1: 'España', e2: 'Alemania' },
                      { id: 'cf_3', e1: 'Portugal', e2: 'Holanda' },
                      { id: 'cf_4', e1: 'Italia', e2: 'México' },
                    ].map(partido => (
                      <div key={partido.id} style={{ background: '#252525', padding: '12px', borderRadius: '6px', border: '0.5px solid #333' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{BANDERAS[partido.e1] || '⚽'}</span>
                          <span style={{ color: '#fff', fontSize: '11px', flex: 1 }}>{partido.e1}</span>
                          <input type="number" min="0" max="9" placeholder="0" value={eliminacionesPreds[`${partido.id}_e1`] ?? ''} onChange={(e) => handlePrediccion(`${partido.id}_e1`, 'value', e.target.value)} style={{ width: '32px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px', fontWeight: '600' }} />
                          <span style={{ color: '#888', fontSize: '10px' }}>-</span>
                          <input type="number" min="0" max="9" placeholder="0" value={eliminacionesPreds[`${partido.id}_e2`] ?? ''} onChange={(e) => handlePrediccion(`${partido.id}_e2`, 'value', e.target.value)} style={{ width: '32px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px', fontWeight: '600' }} />
                          <span style={{ fontSize: '16px' }}>{BANDERAS[partido.e2] || '⚽'}</span>
                          <span style={{ color: '#fff', fontSize: '11px', flex: 1, textAlign: 'right' }}>{partido.e2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: '#4ade80', fontSize: '16px', marginBottom: '16px' }}>Semifinales</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                    {[
                      { id: 'sf_1', e1: 'Argentina', e2: 'España' },
                      { id: 'sf_2', e1: 'Portugal', e2: 'Italia' },
                    ].map(partido => (
                      <div key={partido.id} style={{ background: '#252525', padding: '12px', borderRadius: '6px', border: '0.5px solid #333' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{BANDERAS[partido.e1] || '⚽'}</span>
                          <span style={{ color: '#fff', fontSize: '11px', flex: 1 }}>{partido.e1}</span>
                          <input type="number" min="0" max="9" placeholder="0" value={eliminacionesPreds[`${partido.id}_e1`] ?? ''} onChange={(e) => handlePrediccion(`${partido.id}_e1`, 'value', e.target.value)} style={{ width: '32px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px', fontWeight: '600' }} />
                          <span style={{ color: '#888', fontSize: '10px' }}>-</span>
                          <input type="number" min="0" max="9" placeholder="0" value={eliminacionesPreds[`${partido.id}_e2`] ?? ''} onChange={(e) => handlePrediccion(`${partido.id}_e2`, 'value', e.target.value)} style={{ width: '32px', height: '24px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '10px', fontWeight: '600' }} />
                          <span style={{ fontSize: '16px' }}>{BANDERAS[partido.e2] || '⚽'}</span>
                          <span style={{ color: '#fff', fontSize: '11px', flex: 1, textAlign: 'right' }}>{partido.e2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#4ade80', fontSize: '16px', marginBottom: '16px' }}>🏆 FINAL</h3>
                  <div style={{ background: '#252525', padding: '16px', borderRadius: '6px', border: '0.5px solid #333', maxWidth: '400px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{BANDERAS['Argentina'] || '⚽'}</span>
                      <span style={{ color: '#fff', fontSize: '12px', flex: 1, fontWeight: '600' }}>Argentina</span>
                      <input type="number" min="0" max="9" placeholder="0" value={eliminacionesPreds['final_e1'] ?? ''} onChange={(e) => handlePrediccion('final_e1', 'value', e.target.value)} style={{ width: '36px', height: '28px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '12px', fontWeight: '600' }} />
                      <span style={{ color: '#888', fontSize: '11px' }}>-</span>
                      <input type="number" min="0" max="9" placeholder="0" value={eliminacionesPreds['final_e2'] ?? ''} onChange={(e) => handlePrediccion('final_e2', 'value', e.target.value)} style={{ width: '36px', height: '28px', background: '#2a2a2a', border: '1px solid #444', color: '#4ade80', textAlign: 'center', borderRadius: '3px', fontSize: '12px', fontWeight: '600' }} />
                      <span style={{ fontSize: '20px' }}>{BANDERAS['Francia'] || '⚽'}</span>
                      <span style={{ color: '#fff', fontSize: '12px', flex: 1, textAlign: 'right', fontWeight: '600' }}>Francia</span>
                    </div>
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
