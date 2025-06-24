console.log('saludando desde desafio01');

const seedrandom = require('seedrandom');

const rng = seedrandom(1763519);

let array01 = [];

for (let i = 0; i < 1000000; i++){

    array01.push(rng.int32());

}

function posyneg(numeros) {
    let contpositivos = 0;
    let contnegativos = 0;

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] >= 0){
            contpositivos++;
        } else {
            contnegativos++;
        }
    }

    return { positivos: contpositivos, negativos: contnegativos};
}

function div7(numeros) {
    let contpor7 = 0;

    for (let i = 0; i < numeros.length; i++) {
        const resto = numeros[i] % 7;

        if (resto === 0 || resto === 3|| resto === 5 || resto === 6) {
            contpor7++;
        }
    }

    return contpor7;
}


// Un arreglo de contadores que indique la cantidad de números según su anteúltimo dígito (el de las decenas) 
// coincida con el índice. De esta manera el número 2134 debe contarse en la posición 3 del arreglo, el número 32405 en la posición 0 del arreglo y así sucesivamente. 
// Evidentemente el arreglo va a ser de 10 contadores con índices del 0 al 9 y deberá ser cargado usando llaves y valores separados por comas.
function punto3(numeros) {
    let cont0 = 0;
    let cont1 = 0;
    let cont2 = 0;
    let cont3 = 0;
    let cont4 = 0;
    let cont5 = 0;
    let cont6 = 0;
    let cont7 = 0;
    let cont8 = 0;
    let cont9 = 0;

    for (let i = 0; i < numeros.length; i++) {
        let aux = Math.abs(numeros[i]);
        let anteultimonum = Math.floor(aux / 10) % 10;

        switch (anteultimonum){
            case 0: cont0++; break;
            case 1: cont1++; break;
            case 2: cont2++; break;
            case 3: cont3++; break;
            case 4: cont4++; break;
            case 5: cont5++; break;
            case 6: cont6++; break;
            case 7: cont7++; break;
            case 8: cont8++; break;
            case 9: cont9++; break;

        }
    }
    let array = [cont0, cont1, cont2, cont3, cont4, cont5, cont6, cont7, cont8, cont9];
    return array;
}


function posicionmenor(numeros) {
    if (numeros.length === 0) return undefined;
    let contposicion = 0;
    let menor = numeros[0];

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < menor){
            menor = numeros[i]
            contposicion = i 
        }
        
    }

    return { menor: menor, posicion: contposicion + 1 };
}


function signoanterior(numeros) {
    let contsingos = 0;
    for (let i = 0; i < numeros.length; i++) {
        const actual = numeros[i]
        const anterior = numeros[i-1]
        if ((anterior >= 0 && actual >= 0) || (anterior < 0 && actual < 0)){
            contsingos++;
        }
        
    }

    return contsingos;
}


function prom6digit(numeros) {
    let cont = 0;
    let acum = 0;
    for (let i = 0; i < numeros.length; i++) {
        let num = Math.abs(numeros[i]);
        if (num.toString().length === 6){
            acum += numeros[i]
            cont++;
        }
        
    }
    let prom = Math.round(acum / cont);
    return prom;
}





let resultado01 = posyneg(array01);
console.log(`Positivos: ${resultado01.positivos}`);
console.log(`Negativos: ${resultado01.negativos}`);


let resultado02 = div7(array01);
console.log(`Cantidad con resto 0, 3, 5 o 6 al dividir por 7: ${resultado02}`);


let resultado03 = punto3(array01)
console.log(resultado03);

let resultado04 = posicionmenor(array01);
console.log(`El menor numero es: ${resultado04.menor}`);
console.log(`Y su posicion es: ${resultado04.posicion}`);

let resultado05 = signoanterior(array01)
console.log(`Cantidad de numeros con el mismo signo que el anterior: ${resultado05}`);

let resultado06 = prom6digit(array01)
console.log(`El promedio es: ${resultado06}`);
