var x=0;

//IMPORTANTE: Al probar en GitHub hay problemas en la carga de las imagenes (la ruleta demora un cacho en mostrar la nueva imagen entonces te muestra la vieja primero o la biblioteca demorando en cargar todas las imagenes)
//Posible solucion: Hacer un domcontent loaded para todo lo relacionado con imagenes y esas manos para que no demore tanto la cargada y esas boludeces supongo.

function boton(){
    x += 1;
    document.getElementById('conteo').innerHTML=x;
    localStorage.setItem('canguros', JSON.stringify(x));
}

document.addEventListener("DOMContentLoaded", function (e){
    premioJson = localStorage.getItem("canguros");
    x = JSON.parse(premioJson);
    document.getElementById('conteo').innerHTML=x;
});