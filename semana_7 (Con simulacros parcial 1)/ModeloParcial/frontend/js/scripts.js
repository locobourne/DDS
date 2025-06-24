//completar

async function eventos(){
    const $filtro = document.getElementById('filter')
    const filtro = $filtro.value
    let url = 'http://localhost:3001/api/events'

    const $tbody = document.getElementById('tbody')
    if(filtro){
        url = `${url}?lugar=${filtro}` 
     }

    //llamar a la API: 
    const res = await fetch(url)
    const data = await res.json()
    
    //Cargar dinámicamente los datos en el cuerpo de la tabla:
    
    $tbody.innerHTML = ''   
    data.forEach(e => {
        $tbody.innerHTML += `
            <tr>
                <td>${e.nombre}</td>
                <td>${e.lugar}</td>
                <td>${e.fecha}</td>
                <td>${e.enlace?e.enlace:'Sin enlace'}</td>
            </tr>
        `
    });
}