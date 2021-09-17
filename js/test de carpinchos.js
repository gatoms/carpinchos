//Test

var pregunta1 = "0"; 
var pregunta2 = "0"; 
var pregunta3 = "0";
function respuesta1(valor) 
{pregunta1 = valor}; 
function respuesta2(valor) 
{pregunta2 = valor}; 
function respuesta3(valor) 
{pregunta3 = valor}; 


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
    mensaje="SOBRESALIENTE. Bien cabeza"} 
    if(indiceacierto<100&&indiceacierto>=75) 
    {
    conteo(2)
    mensaje="NOTABLE. very good"} 
    if(indiceacierto<75&&indiceacierto>=50)
    {
    conteo(1)
    mensaje="BIEN. okay"} 
    if(indiceacierto<50&&indiceacierto>=25)
    {
    conteo(0)
    mensaje="JUSTILLO. vamo arriba"} 
    if(indiceacierto<25)
    {
    conteoNeg()
    mensaje="DESASTROSO. bruh"} 
    if(contestadas==0)
    {
    mensaje="Contesta las preguntas gato"} 

    alert("Puntaje: "+puntuacion+"." +  "\n\nEl numero maximo de puntos que podia conseguir era de " + puntosmaximos + ".\n\nHa dejado sin contestar "+ nocontesta+".\n\nSu porcentaje de aciertos es de "+indiceacierto+"%.\n\n"+mensaje+". ")
}