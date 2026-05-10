function toggleMenu(){

const menu = document.querySelector(".menu");

menu.classList.toggle("active");

}

/* GUARDAR PRONOSTICO */

function guardarPronostico(){

const brasil =
document.getElementById("brasil").value;

const argentina =
document.getElementById("argentina").value;

localStorage.setItem("brasil", brasil);

localStorage.setItem("argentina", argentina);

alert("Pronóstico guardado ⚽");

}

/* CARGAR DATOS */

window.onload = function(){

if(localStorage.getItem("brasil")){

document.getElementById("brasil").value =
localStorage.getItem("brasil");

}

if(localStorage.getItem("argentina")){

document.getElementById("argentina").value =
localStorage.getItem("argentina");

}

}
