
function RecuperarReservas(nombreJugador){
    const tabla =  document.getElementById('tbodyReservas')
    
    var URL = "";

    if(nombreJugador == '')
        URL = "http://localhost:3000/reservas";
    else    
        URL = "http://localhost:3000/reservas?jugador=" + nombreJugador;

    fetch(URL).then(res =>{
        return res.json()
            }).then( data =>{
                tabla.innerHTML="";
                data.forEach(e => {
                    const fecha = new Date(e.fechaReserva);
                    const row = `<tr>
                        <td>${e.idReserva}</td>
                        <td>${fecha.getFullYear() + '/' + (fecha.getMonth() + 1) + '/' 
                            + fecha.getDate() + ' - ' + fecha.getHours()}</td>
                        <td>${e.nombreJugador}</td>
                        <td>${e.numeroCancha}</td>
                        <td>${e.cantidadHoras}</td>
                        <td>${e.pagada ? "SI" : "NO"}</td>
                        <td>${e.importe ? e.importe.toLocaleString('es-AR', 
                            { style: 'currency', currency: 'ARS' }) : ""}</td>
                    </tr>`
                    tabla.innerHTML += row
                }
            );
        }
    ) 
}