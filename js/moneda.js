var monedas=0;
var ide = 0;

function conteo(cant){
    monedas += cant;
    document.getElementById('monederoR').innerHTML=monedas;
    localStorage.setItem('monedero', JSON.stringify(monedas));
    //Hacer un atributo unico para la moneda especifica que clickeamos, el cual se va a luego usar para eliminarse a si misma
}

function conteoNeg(){
    monedas -= 1;
    document.getElementById('monederoR').innerHTML=monedas;
    localStorage.setItem('monedero', JSON.stringify(monedas));
}

function eliminacion(ident){
    var coso = document.getElementById(ident);
    document.getElementById('section').removeChild(coso);
    document.getElementById('pickup').play();
    conteo(2);
}

function moneyy(){
    ide += 1;
    var money = document.createElement('img');
    document.getElementById('section').appendChild(money);
    money.setAttribute('src', 'moneda.png');
    money.setAttribute('class', 'logo');
    money.setAttribute('id', ide);
    money.setAttribute('onclick', 'eliminacion(this.id)');

    const moneda = document.getElementById(ide);
    
    let xPosition = Math.floor(Math.random()*800);
    let yPosition = 10;
    let xSpeed = 4;
    let ySpeed = 4;

    function update(){
        moneda.style.left = xPosition + 'px';
        moneda.style.top = yPosition + 'px';
    }

    setInterval(()=>{
        if(xPosition + moneda.clientWidth >= window.innerWidth || xPosition <= 0){
        xSpeed = -xSpeed;
        }
        if(yPosition + moneda.clientHeight >= window.innerHeight || yPosition <=0){
        ySpeed = -ySpeed;
        }

        xPosition += xSpeed;
        yPosition += ySpeed;
        update();
    },1000/60);
}

document.addEventListener("DOMContentLoaded", function (e){
    jason = localStorage.getItem("monedero");
    monedas = JSON.parse(jason);
    document.getElementById('monederoR').innerHTML=monedas;
});
