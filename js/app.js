function toggleMenu() {

const menu = document.querySelector(".menu");

menu.classList.toggle("active");

}

const matches = [

{
group:"Grupo A",
team1:"🇧🇷 Brasil",
team2:"🇦🇷 Argentina",
date:"15 Junio 2026",
time:"7:00 PM"
},

{
group:"Grupo A",
team1:"🇨🇴 Colombia",
team2:"🇪🇸 España",
date:"16 Junio 2026",
time:"4:00 PM"
},

{
group:"Grupo B",
team1:"🇫🇷 Francia",
team2:"🇩🇪 Alemania",
date:"17 Junio 2026",
time:"6:00 PM"
},

{
group:"Grupo B",
team1:"🇵🇹 Portugal",
team2:"🇺🇾 Uruguay",
date:"18 Junio 2026",
time:"8:00 PM"
}

];

const container =
document.getElementById("matches-container");

if(container){

matches.forEach((match,index)=>{

container.innerHTML += `

<div class="match-card">

<h2>${match.group}</h2>

<div class="teams">

<div class="team">
${match.team1}
</div>

<div class="score-inputs">

<input type="number"
id="team1-${index}"
min="0"
value="0">

<span>x</span>

<input type="number"
id="team2-${index}"
min="0"
value="0">

</div>

<div class="team">
${match.team2}
</div>

</div>

<div class="match-info">
📅 ${match.date} — ⏰ ${match.time}
</div>

<button onclick="savePrediction(${index})">
Guardar Pronóstico
</button>

</div>

`;

});

}

function savePrediction(index){

const team1 =
document.getElementById(`team1-${index}`).value;

const team2 =
document.getElementById(`team2-${index}`).value;

localStorage.setItem(
`match-${index}`,
JSON.stringify({
team1,
team2
})
);

alert("Pronóstico guardado ⚽");

}

window.onload = function(){

matches.forEach((match,index)=>{

const saved =
localStorage.getItem(`match-${index}`);

if(saved){

const data = JSON.parse(saved);

document.getElementById(`team1-${index}`).value =
data.team1;

document.getElementById(`team2-${index}`).value =
data.team2;

}

});

}
