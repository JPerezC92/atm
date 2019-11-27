// trayendo elementos desde el html

let btnExtraer = document.getElementById("extraer");
let mountToExtract = document.getElementById("dinero");

// boton para hacer el calculo de los billetes que se necesitaran
btnExtraer.addEventListener("click", extraerDinero);

class Billetes {
    constructor(valor, cantidad, url) {
        this.imagen = new Image();
        this.valor = valor;
        this.cantidad = cantidad;
        this.imagen.src = url;
    }

    pintarBillete(cantidad) {
        let newDiv = document.createElement("div");
        let newContent = document.createTextNode(document.body.appendChild(this.imagen) + " x " + cantidad);

        newDiv.appendChild(newContent);

        let currentDiv = document.getElementById(contenedor);
        document.body.insertBefore(newDiv, currentDiv);
    }
}

// instancias billetes
let billetes50 = new Billetes(50, 2, "imagenes/50_soles.png");
let billetes20 = new Billetes(20, 3, "imagenes/20_soles.png");
let billetes10 = new Billetes(10, 3, "imagenes/10_soles.png");

console.log(billetes50);
// variables

let arrayInstanciasBilletes = [billetes50, billetes20, billetes10];
let billetesAEntregar = [];
let faltaronBilletes = 0;
let residuo = 0;
let resultado = 0;


function extraerDinero() {
    console.log(mountToExtract.value);
    mountToExtract = mountToExtract.value;

    for (let bi of arrayInstanciasBilletes) {
        resultado = Math.floor(mountToExtract / bi.valor);
        console.log("RESULTADO !" + resultado);
        residuo = mountToExtract % bi.valor;
        console.log("RESIDUO !" + residuo);

        if (resultado > bi.cantidad) {
            faltaronBilletes = resultado - bi.cantidad;
            resultado = resultado - faltaronBilletes;
        }

        billetesAEntregar[bi.valor.toString()] = resultado;

        console.log("RESULTADO !" + resultado);
        console.log("RESIDUO !" + residuo);

        mountToExtract = residuo + (faltaronBilletes * bi.valor);

        console.log("Monto siguiente a extraer" + mountToExtract);

        // dibujando billetes en el html

        bi.pintarBillete(resultado);
        console.log("fin iteracion");
        faltaronBilletes = 0;

    }

    if (mountToExtract > 0) {
        alert("Soy un cajero pobe y ya no tengo dinero :'( ")

        document.getElementById("noMoney").innerHTML = " </br>Me falto dinero, perdon :'c </br></br> ";
    }
}