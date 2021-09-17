//Test

var pregunta1 = "0"; 
var pregunta2 = "0"; 
var pregunta3 = "0";
const test = [];
function respuesta1(valor) 
{pregunta1 = valor}; 
function respuesta2(valor) 
{pregunta2 = valor}; 
function respuesta3(valor) 
{pregunta3 = valor}; 

function guardarTest(puntaje){
    test.push(puntaje);
    let a = JSON.stringify(test);
    localStorage.setItem('puntajesTest', a);
}

function stars(xd){
    document.getElementById('promedioTest').innerHTML = ''
    for (let i = 0; i < xd; i++) {
        document.getElementById('promedioTest').innerHTML += '<span class="fa fa-star checked">★</span>';
    }
    for (let i = 0; i < (5-xd); i++) {
        document.getElementById('promedioTest').innerHTML += '<span class="fa fa-star">★</span>'
    }
}

function promedioTest(){
    let promedio = 0;
    let total = 0;
    for (let i = 0; i < test.length; i++) {
        const element = test[i];
        total += element; 
    };
    promedio = Math.round(total/test.length);
    stars(promedio);
    document.getElementById('cantidadTest').innerHTML = test.length;
}

function testChequeo(){
    puntuacion=0; 
    nocontesta=0; 
    contestadas=0; 
    puntosmaximos=0; 

    if(pregunta1!= "0" )
    {
    contestadas=contestadas+1
    puntosmaximos=puntosmaximos+2
    if(pregunta1 == "1") {puntuacion=puntuacion+0}
    if(pregunta1 == "2") {puntuacion=puntuacion-1}
    if(pregunta1 == "3") {puntuacion=puntuacion+2}
    }else {nocontesta=nocontesta+1} 

    if(pregunta2 != "0")
    {
    contestadas=contestadas+1
    puntosmaximos=puntosmaximos+1
    if(pregunta2 == "1") {puntuacion=puntuacion+1}
    if(pregunta2 == "2") {puntuacion=puntuacion+0}
    if(pregunta2 == "3") {puntuacion=puntuacion+0}
    }else {nocontesta=nocontesta+1}

    if(pregunta3!= "0" )
    {
    contestadas=contestadas+1
    puntosmaximos=puntosmaximos+2
    if(pregunta3 == "1") {puntuacion=puntuacion+0}
    if(pregunta3 == "2") {puntuacion=puntuacion+2}
    if(pregunta3 == "3") {puntuacion=puntuacion-1}
    }else {nocontesta=nocontesta+1}

    //Evaluacion

    if (puntosmaximos!=0) 
    {indiceacierto=Math.round(100*(puntuacion/puntosmaximos))
    } 
    else{indiceacierto=0} 


    if(indiceacierto==100) 
    {
    conteo(10)
    guardarTest(5)
    mensaje="SOBRESALIENTE. Bien cabeza"} 
    if(indiceacierto<100&&indiceacierto>=75) 
    {
    conteo(2)
    guardarTest(4)
    mensaje="NOTABLE. very good"} 
    if(indiceacierto<75&&indiceacierto>=50)
    {
    conteo(1)
    guardarTest(3)
    mensaje="BIEN. okay"} 
    if(indiceacierto<50&&indiceacierto>=25)
    {
    conteo(0)
    guardarTest(2)
    mensaje="JUSTILLO. vamo arriba"} 
    if(indiceacierto<25)
    {
    conteoNeg()
    guardarTest(1)
    mensaje="DESASTROSO. bruh"} 
    if(contestadas==0)
    {
    mensaje="Contesta las preguntas gato"} 


    promedioTest()
    alert("Puntaje: "+puntuacion+"." +  "\n\nEl numero maximo de puntos que podia conseguir era de " + puntosmaximos + ".\n\nHa dejado sin contestar "+ nocontesta+".\n\nSu porcentaje de aciertos es de "+indiceacierto+"%.\n\n"+mensaje+". ")
};


document.addEventListener('DOMContentLoaded', function(){
    let a = localStorage.getItem('puntajesTest');
    b = JSON.parse(a);
    for (let i = 0; i < b.length; i++) {
        test.push(b[i]);
    };
    promedioTest()
});


