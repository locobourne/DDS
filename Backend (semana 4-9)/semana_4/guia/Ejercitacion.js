function esPrimo(numero) {
  if (numero === 2) return true;
  if (numero < 2 || numero % 2 === 0) return false;

  const limite = Math.sqrt(numero);
  for (let i = 3; i <= limite; i += 2) {
    if (numero % i === 0) return false;
  }

  return true;
}


function generarPrimos(hasta) {
  const primos = [];
  for (let i = 2; i <= hasta; i++) {
    if (esPrimo(i)) {
      primos.push(i);
    }
  }
  return primos;
}

console.log(generarPrimos(10));


function trabajarConPrimos(n) {
  const primos = [];
  let i = 2;

  while (primos.length < n) {
    if (esPrimo(i)) {
      primos.push(i);
    }
    i++;
  }

  const cuadrados = primos.map(p => p * p);
  const suma = primos.reduce((acc, p) => acc + p, 0);
  const todosMayoresQueCinco = primos.every(p => p > 5);

  console.log("Primos:", primos);
  console.log("Cuadrados:", cuadrados);
  console.log("Suma:", suma);
  console.log("Todos mayores que 5:", todosMayoresQueCinco);
}

trabajarConPrimos(5);