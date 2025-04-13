const reservasAgendadas = [
    {fecha: new Date('2025-04-16'), hora: 10, cancha: 1, nombre: 'Juan Perez' },
    {fecha: new Date('2025-04-16'), hora: 10, cancha: 2, nombre: 'Ana Lopez' },
    {fecha: new Date('2025-04-16'), hora: 11, cancha: 2, nombre: 'Maria Garcia' },
    {fecha: new Date('2025-04-16'), hora: 12, cancha: 2, nombre: 'Carlos Sanchez' },
    {fecha: new Date('2025-04-16'), hora: 12, cancha: 1, nombre: 'Luis Martinez' },
    {fecha: new Date('2025-04-16'), hora: 12, cancha: 1, nombre: 'Laura Ruiz' }
];

function cargarReservas() {
    const tBody = document.getElementById('tbodyReservas');
    tBody.innerHTML = '';
    reservasAgendadas.forEach(reserva => {
        const fila = `
            <tr>
                <td>${formatearFecha(reserva.fecha)}</td>
                <td>${reserva.hora}</td>
                <td>${reserva.cancha}</td>
                <td>${reserva.nombre}</td>
            </tr>
        `;
        tBody.innerHTML += fila;
    })
}

function formatearFecha(fecha) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
}

function agregarReserva(){
    const fechaInput = document.getElementById('inputFecha');
    const horaInput = document.getElementById('inputHora');
    const canchaInput = document.getElementById('inputCancha');
    const jugadorInput = document.getElementById('inputJugador');

    const fechaStr = fechaInput.value;
    const horaStr = horaInput.value;
    const canchaStr = canchaInput.value;
    const jugadorStr = jugadorInput.value.trim();

    if (!fechaStr || !horaStr || !canchaStr || !jugador){
        alert('Todos los campos son requeridos, completalos por favor');
        return;
    }

    const partes = fechaStr.split('-');

    const fechaFormateada = `${partes[0]}-${partes[1]}-${partes[2]}T00:00:00`;
    console.log(fechaFormateada);

    const hora = parseInt(horaStr);
    if (isNaN(hora) || hora < 0 || hora > 24) {
        alert('Por favor, ingrese una hora válida.');
        return;
    }

    const cancha = parseInt(canchaStr);
    if (isNaN(cancha) || cancha < 1 || cancha > 4) {
        alert('Por favor, ingrese una cancha válida.');
        return;
    }

    const fechareserva = new Date(fechaFormateada);

    const reserva = { fecha: fechareserva, hora: horaStr, cancha: canchaStr, nombre: jugador};

    reservasAgendadas.push(reserva);
    cargarReservas();

    fechaInput.value = '';
    horaInput.value = '';
    canchaInput.value = '';
    jugadorInput.value = '';
    fechaInput.focus();
}



document.addEventListener('DOMContentLoaded', cargarReservas);
