var cajaP=document.getElementById('cajaPremio');
var botonRul = document.getElementById('rulbot');
var variablePremio = ''
const url = 'https://gatoms.github.io/panaderia/carpinchos.json'
const ultimos = []

//IMPORTANTE: Al probar en GitHub hay problemas en la carga de las imagenes (la ruleta demora un cacho en mostrar la nueva imagen entonces te muestra la vieja primero o la biblioteca demorando en cargar todas las imagenes)
//Posible solucion: Hacer un domcontent loaded para todo lo relacionado con imagenes y esas manos para que no demore tanto la cargada y esas boludeces supongo.

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
        elFetch();
    }else{
        alert('no tenes monedas cabeza')
    }
}

/*Funcion vieja que hacia el display y elFetch(), cambie elFetch a una function aparte, y el display en html
function premio(){
    cajaP.style.display = 'block';
}*/

function elFetch(){
    fetch(url).then(respuesta=>respuesta.json()).then(datos=>{
        var rareza = Math.floor(Math.random()*68);
        document.getElementById('premiesito').setAttribute('src', datos[rareza].srcImg);
        ultimos.push(datos[rareza])
    });
}

//Cerrar de la ruleta
function cerrar(){
    cajaP.style.display = 'none';
    botonRul.disabled=false;
}

//Cerrar de la biblioteca (modal de los ultimos)(si empieza a haber conflicto entre los modal probar de cambiar cajaP por cajapremio)
function cerrar2(){
    cajaP.style.display = 'none';
}

//Cerrar de la biblioteca (modal de los premios guardados)
function cerrar3(){
    guardadoPremio.style.display = 'none';
}

//Guarda las imagenes descargadas del fetch al jugar la ruleta que se guardaron en el array ultimos.
function guardarPremio(){
    let premioJson = JSON.stringify(ultimos);
    sessionStorage.setItem('ultimos', premioJson);
    window.location.href = 'biblioteca.html';
}

/*Funcion vieja de cerrar
function cerrarGuardar(){
    cerrar();
    let premio = document.getElementById('premiesito').src;
    ultimos.push(premio);
}*/

//Funcion que muestra el premio clickeado de la biblioteca (para los guardados en el session storage)
function mostrar(id){
    cajaP.style.display= 'block';
    var coso=document.getElementById(id);
    document.getElementById('ultimoClickeado').src = coso.src
}

//Idem mostrar pero para los elementos de la biblioteca de premios guardados. (se podria modificar para que sea la misma funcion)
function mostrarGuardado(id){
    guardadoPremio.style.display= 'block';
    var coso = document.getElementById(id);
    document.getElementById('guardadoClickeado').src = coso.src;
}

function mostrarPremio(){
    if (sessionStorage.getItem("ultimos")) {
        premioJson = sessionStorage.getItem("ultimos");
        mis_datos = JSON.parse(premioJson);
        for (let i = 0; i < mis_datos.length; i++) {
            //document.getElementById('ultimosPremios').innerHTML += mis_datos[i]
            var imag = document.createElement('img');
            imag.id = 'ultimo' + i;
            imag.setAttribute('onclick', 'mostrar(this.id)');
            imag.setAttribute('class', 'chiquitas')
            document.getElementById('ultimosPremios').appendChild(imag);
            document.getElementById('ultimo' + i).src = mis_datos[i].srcImg;
        }
    }else{
        document.getElementById('ultimosPremios').innerHTML= 'no hay nada flaco'
    }
}

function actualizar(){
    let premioJson = JSON.stringify(ultimos);
    localStorage.setItem('guardados', premioJson);
}

function filtrado(valor){
    return valor.rareza === '1';
};

function filtrado2(valor){
    //let premio = document.getElementById('ultimoClickeado').src; //Esto devuelve el //file:C de carpinchos.
    let a = valor.srcImg;    //Esto devuelve el carpinchos/2.jpg que tengo en el objeto.
    //En el if hacemos un string compare para ver si el primer string incluye el segundo dentro, por que no son exactamente iguales, solo la parte de carpinchos/numero.jpg
    //Hace falta agregar para la rareza que tengo en filtrado 1 y esas manos
    if(variablePremio.includes(a)){
        return true
    }else{
        return false
    }
}

function aPremiosGuardados(){
    premioJson = sessionStorage.getItem("ultimos");
    mis_datos = JSON.parse(premioJson);
    variablePremio = document.getElementById('ultimoClickeado').src;
    var guardar = mis_datos.find(filtrado2);
    ultimos.push(guardar);
    actualizar();
}

function mostrarGuardados(){
    var div=document.getElementById('premiosGuardados');
    div.remove();
    var div2= document.createElement('div');
    div2.id = 'premiosGuardados';
    document.getElementById('cuerpo').appendChild(div2);
    if(localStorage.getItem('guardados')){
        premioJson = localStorage.getItem('guardados');
        mis_datos = JSON.parse(premioJson);
        for (let i = 0; i < mis_datos.length; i++) {
            var imag = document.createElement('img');
            imag.id = 'guardado' + i;
            imag.setAttribute('onclick', 'mostrarGuardado(this.id)');
            imag.setAttribute('class', 'chiquitas')
            document.getElementById('premiosGuardados').appendChild(imag);
            document.getElementById('guardado' + i).src = mis_datos[i].srcImg;
            //document.getElementById('premiosGuardados').innerHTML+= '   ';
        }
    }else{
        document.getElementById('premiosGuardados').innerHTML = 'No hay Premios guardados';
    }
}

function borrarPremio(){
    guardadoPremio.style.display = 'none';
    //var borro = document.getElementById(aBorrar);
    //borro.remove()
    variablePremio = document.getElementById('guardadoClickeado').src;
    //var source = document.getElementById('guardadoClickeado').src;
    //var index = ultimos.indexOf(variablePremio);
    var index = ultimos.findIndex(filtrado2)
    if (index > -1){
        ultimos.splice(index, 1);
    };
    actualizar();
    mostrarGuardados()
}


function cerrarGuardarPremio(){
    aPremiosGuardados();
    mostrarGuardados();
    cajaP.style.display = 'none';
}

function cargarPremiosGuardados(){
    misPremiosJson = localStorage.getItem('guardados');
    misPremios = JSON.parse(misPremiosJson);
    //ultimos.push(misPremios) Esto causa problemas (me guardaba el objeto entero dentro del array con cada f5), usamos un for para cargar los datos del localstorage de a uno al array.
    for (let i = 0; i < misPremios.length; i++) {
        ultimos.push(misPremios[i]) 
    }
}

function cargar(){
    mostrarPremio()
    cargarPremiosGuardados();
    mostrarGuardados();
}



/*Esto va quedando, ahora hay que agregar en linea 62 (el for) para que agregue una etiqueta de imagen para
cada una de las imagenes del array (y conviene un limite de 10 o 20 imagenes).
Despues hay que agregar el Modal que aparezca cuando clickeo una imagen, y que esta tenga la opcion de guardar
Lo mismo apra las de premios guardados.*/

/*Usar un array para interactuar con los premios guardados, en ves de usar el localstorage directamente, lo que 
se podria hacer es usar una funcion que auto actualiza al local storage, o que cada una de las funciones
que interactuan con el array de los premios guardados tambien llame a una funcio nque actualiza al local storage*/

/*IMPORTANTE
El prolema que estoy teniendo ahora mismo es el preemplazo de la imagen original del local storage ocn una nueva
al refrezcar la pagina, posible solucion (y creacion de limite):
crear un objeto/array que ya tenga definidos sus 5 puestos, el contenido de dicho peusto es una
variable, la cual tendra el valor que le asigne con la imagen que quiera guardar.
Esto hace que siempre haya un objeto de 5 espacios (por ejemplo) auqneu esten vacios, y simplemente
creamos una funcion que rellene esos espacios.*/


/*02/09
Problema: Hay que guardar al objeto entero al hacer click en guardar premio
Que hacer?(posible solucion): Usar la rareza como segundo filtro para poder diferenciar a los objetos con el mismo srcImg,
con filter buscar entre el session storage los que tengan el mismo srcImg y ademas la misma rareza, guardar 1 de ellos, se guardara en el local storage.

Otra posible solucion: la otra seria darle una clase a las imagenes dependiendo de la rareza, ya en la ruleta, y que dependiendo de la clase que tenga, se haga un objeto 
con la rareza y el srcImg. Esto me parece mas entreverado que simplemente hacer lo de arriba.



Otra cosa aparte: lo que queria hacer de crear un array con los indices de los objetos que salieron en la ruleta, y llamarlos
despues en la biblioteca con un fetch es una cagada, no se va a guardar la rareza que le apliquemos
a el objeto se perdera (o nos va a complicar) cuando lo llamemos en la biblioteca.

La solucion es seguir como voy ahora, guardar el objeto entero, y despues ver como guardarlo cuando toquemos eso.
*/ 








/*function guardarPremio(){
    let premio = {premio: document.getElementById('premiesito').src}
    let premioJson = JSON.stringify(premio);
    sessionStorage.setItem("premio", premioJson);
} */


//Hay que hacer lo del premio
/*La idea en un principio seria crear un JSON que tendra un nombre, rareza e imagen.
La imagen sera lo que se va a mostrar y eso.*/

/*La forma trucha de hacerlo seria crear un array u objeto que tenga a las imagenes y que despues
lo llamo usando un math random que me va a dar una imagen al azar. */

//Cartel premio (modal)

//JSON ya hecho https://gatoms.github.io/panaderia/carpinchos.json

/*Lo de la biblioteca, ahora mismo el funcionamiento lo tengo como:
guardo una imagen en el local storage, despues la llamo y la guardo en un array (ultimos)
y despues las personas podran llamar a ese array para guardarse los datos en un nuevo localStorage
que sera su biblioteca de premios guardados.*/

//capaz que es mas facil en ves de guardar en un objeto primero, guardar en un array de una, que luego
//lo metemos en un lcoal storage

/*function mostrarGuardados(){
    if(localStorage.getItem('guardados')){
        premioJson = localStorage.getItem('guardados');
        mis_datos = JSON.parse(premioJson);
        for (let i = 0; i < mis_datos.length; i++) {
            var imag = document.createElement('img');
            imag.id = 'guardado' + i;
            imag.setAttribute('onclick', 'mostrar(this.id)');
            document.getElementById('premiosGuardados').appendChild(imag);
            document.getElementById('guardado' + i).src = mis_datos[i];
            
        }
    }else{
        document.getElementById('premiosGuardados').innerHTML = 'No hay Premios guardados';
    }
}*/

