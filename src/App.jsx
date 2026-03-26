<html lang="es">
];

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

function guardarPronostico(id, a, b) {
  const user = document.getElementById('usuario').value;
  if (!user) return alert('Escribe tu nombre');

  if (!usuarios[user]) usuarios[user] = {};
  usuarios[user][id] = { a: parseInt(a), b: parseInt(b) };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function calcularPuntos(real, user) {
  if (!real || real.a === null) return 0;
  if (real.a === user.a && real.b === user.b) return 3;

  const r = real.a > real.b ? 'A' : real.a < real.b ? 'B' : 'E';
  const u = user.a > user.b ? 'A' : user.a < user.b ? 'B' : 'E';

  return r === u ? 1 : 0;
}

function render() {
  document.getElementById('grupos').innerHTML = '';
  document.getElementById('eliminatorias').innerHTML = '';

  partidos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'partido';

    div.innerHTML = `
      <img src="${p.banderaA}"> ${p.equipoA}
      <input type="number" onchange="guardarPronostico(${p.id}, this.value, this.nextElementSibling.value)">
      -
      <input type="number" onchange="guardarPronostico(${p.id}, this.previousElementSibling.value, this.value)">
      ${p.equipoB} <img src="${p.banderaB}">
      <br>Estadio: ${p.estadio}
    `;

    document.getElementById(p.fase).appendChild(div);
  });
}

function mostrar(id) {
  document.querySelectorAll('.seccion').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'ranking') mostrarRanking();
}

function mostrarRanking() {
  let html = '';

  for (let user in usuarios) {
    let total = 0;

    for (let id in usuarios[user]) {
      const partido = partidos.find(p => p.id == id);
      total += calcularPuntos(partido.resultado, usuarios[user][id]);
    }

    html += `<p>${user}: ${total} puntos</p>`;
  }

  document.getElementById('ranking').innerHTML = html;
}

render();
mostrar('grupos');
</script>

</body>
</html>
