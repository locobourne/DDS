const seedrandom = require('seedrandom');
const rng = seedrandom(1763519);

const TOTAL = 1000000;
let numeros = [];
let positivos = 0;
let negativos = 0;
let resto_7 = 0;
let mismo_signo_anterior = 0;
let anteultimo_digito = {
  0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
  5: 0, 6: 0, 7: 0, 8: 0, 9: 0
};

let menor_valor = Infinity;
let posicion_menor = -1;

let suma_6_digitos = 0;
let conteo_6_digitos = 0;

for (let i = 0; i < TOTAL; i++) {
  let n = rng.int32();
  numeros.push(n);

  // Positivos / negativos
  if (n >= 0) positivos++;
  else negativos++;

  // resto al dividir por 7
  let r = Math.abs(n % 7);
  if (r === 0 || r === 3 || r === 5 || r === 6) {
    resto_7++;
  }

  // anteúltimo dígito
  let absN = Math.abs(n);
  if (absN >= 10) {
    let decenas = Math.floor((absN % 100) / 10);
    anteultimo_digito[decenas]++;
  }

  // menor valor y su posición
  if (n < menor_valor) {
    menor_valor = n;
    posicion_menor = i + 1;
  }

  // mismo signo que el anterior
  if (i > 0) {
    if ((n >= 0 && numeros[i - 1] >= 0) || (n < 0 && numeros[i - 1] < 0)) {
      mismo_signo_anterior++;
    }
  }

  // promedio de números con 6 dígitos exactos
  if (absN >= 100000 && absN <= 999999) {
    suma_6_digitos += n;
    conteo_6_digitos++;
  }
}

let promedio_6_digitos = conteo_6_digitos > 0
  ? Math.round(suma_6_digitos / conteo_6_digitos)
  : 0;

// Resultados
console.log("Positivos:", positivos);
console.log("Negativos:", negativos);
console.log("Resto 0, 3, 5 o 6 al dividir por 7:", resto_7);
console.log("Anteúltimo dígito:", anteultimo_digito);
console.log("Menor valor:", menor_valor);
console.log("Posición del menor valor:", posicion_menor);
console.log("Cantidad con mismo signo que el anterior:", mismo_signo_anterior);
console.log("Promedio entero de números con 6 dígitos:", promedio_6_digitos);
