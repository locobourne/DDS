import { readFileSync } from 'fs';

const data = readFileSync('./personas.json', 'utf-8');

const personas = JSON.parse(data);

//console.log(personas)



const totalPersonas = personas.length;
console.log(totalPersonas)


// Calcular el promedio entero de las edades de todas las personas del archivo

function promedioPersonas(personas) {

    let acumulador = 0;

    personas.forEach(persona => {
        acumulador += persona.edad
    });
    const promedioEdades = Math.round(acumulador / personas.length);
    return promedioEdades;
}

const promedio = promedioPersonas(personas);
console.log("El promedio de las edades es:", promedio);


// Informar el Nombre y Apellido de la persona más joven del conjunto 
// (si hubiere más de una persona con esa misma edad debe informar la primera que aparezca en el archivo).

function personaMasJoven(personas) {

    let masJoven = personas[0]

    personas.forEach(persona => {
        if (persona.edad < masJoven.edad)
            masJoven = persona
    });
    return masJoven;
}

const maschico = personaMasJoven(personas);
console.log("El mas joven es:", maschico.nombre, maschico.apellido);


//Informar los Nombres separados por coma ", " de todas las personas con apellido GOMEZ, ordenados alfabéticamente.

function losGomez(personas) {

    let esGomez = [];

    personas.forEach(persona => {
        if (persona.apellido === 'GOMEZ')
            esGomez.push(persona)
    });
    esGomez.sort((a, b) => a.nombre.localeCompare(b.nombre));
    const nombres = esGomez.map(p => p.nombre).join(', ');
    return nombres;
}

const gomezOrdenados = losGomez(personas);
console.log("Personas con apellido GOMEZ ordenados alfabeticamente: ", gomezOrdenados);


//Suma de las edades de aquellas personas cuyo nombre tenga una longitud par y el  apellido una longitud impar.

function sumaEdades(personas) {

    let acum = 0;
    personas.forEach(persona => {
        let largoNombre = persona.nombre.length
        let largoApellido = persona.apellido.length
        if (largoNombre % 2 === 0 && largoApellido % 2 !== 0)
            acum += persona.edad
    });
    return acum;
}

const sumEdades = sumaEdades(personas);
console.log("Suma de las edades de aquellas personas con nombre par y apellido longitud impar es:", sumEdades);


//Construir una funcionalidad que genere un objeto en su notación JSON que contenga los siguientes atributos o propiedades:
//- mayores: cantidad de personas con edad > 18
//- menores: cantidad de personas con edad <= 18
//- primeraMitad: cantidad de personas cuyo apellido comienza con A-L
//- segundaMitad: cantidad de personas cuyo apellido comienza con M-Z


function mitadJson(personas) {

    let mayores = 0
    let menores = 0
    let primeraMitad = 0
    let segundaMitad = 0

    personas.forEach(persona => {
        const primeraLetra = persona.apellido[0];
        if (persona.edad > 18 ){
            mayores++
        }else{
            menores++
        }
        if (primeraLetra >= 'A' && primeraLetra <= 'L'){
            primeraMitad++
        }else{
            segundaMitad++
        }
    });

    const jsonDatos = {
        mayores: mayores,
        menores: menores,
        primeraMitad: primeraMitad,
        segundaMitad: segundaMitad,

    };
    console.log('Resumen JSON:', JSON.stringify(jsonDatos, null, 2));
}


const Json = mitadJson(personas);


// Construir una funcionalidad que genere un objeto en su notación JSON que contenga los siguientes atributos, cuyos valores deben ser la cantidad de personas 
// correspondientes a cada apellido:
//  - CASTILLO
//  - DIAZ
//  - FERRER
//  - PINO
//  - ROMERO

function apellidos(personas) {

    let castillo = 0
    let diaz = 0
    let ferrer = 0
    let pino = 0
    let romero = 0

    personas.forEach(persona => {
        if (persona.apellido === 'CASTILLO')
            castillo++
        if (persona.apellido === 'DIAZ')
            diaz++
        if (persona.apellido === 'FERRER')
            ferrer++
        if (persona.apellido === 'PINO')
            pino++
        if (persona.apellido === 'ROMERO')
            romero++
    });

    const jsonDatos = {
        CASTILLO: castillo,
        DIAZ: diaz,
        FERRER: ferrer,
        PINO: pino,
        ROMERO: romero,

    };
    console.log('Resumen JSON:', JSON.stringify(jsonDatos, null, 2));
}

const losApellidos = apellidos(personas);