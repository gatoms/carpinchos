var x=0;
var cajaP=document.getElementById('cajaPremio');
var botonRul = document.getElementById('rulbot');
const url = 'https://gatoms.github.io/panaderia/carpinchos.json'


function boton(){
    x += 1;
    document.getElementById('conteo').innerHTML=x;
}

var video = document.getElementById('videito');

function reproducir(){
    if (video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function ruleta(){
    if(monedas>0){
        video.play() && conteoNeg();
        (botonRul.disabled=true);
    }else{
        alert('no tenes monedas cabeza')
    }
}

function premio(){
    cajaP.style.display = 'block';
    fetch(url).then(respuesta=>respuesta.json()).then(datos=>{
        var rareza = Math.floor(Math.random()*24);
        document.getElementById('premiesito').setAttribute('src', datos[rareza].srcImg);
    });
}

function cerrar(){
    cajaP.style.display = 'none';
    botonRul.disabled=false;
}


//Hay que hacer lo del premio
/*La idea en un principio seria crear un JSON que tendra un nombre, rareza e imagen.
La imagen sera lo que se va a mostrar y eso.*/

/*La forma trucha de hacerlo seria crear un array u objeto que tenga a las imagenes y que despues
lo llamo usando un math random que me va a dar una imagen al azar. */

//Cartel premio (modal)

//JSON ya hecho https://gatoms.github.io/panaderia/carpinchos.json



