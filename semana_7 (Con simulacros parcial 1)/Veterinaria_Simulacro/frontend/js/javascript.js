async function buscarPacientes() {
    const $filtro = document.getElementById('searchInput')
    const filtro = $filtro.value
    let url = 'http://localhost:3000/api/pacientes'
    
    const $tbody = document.getElementById('patientsTableBody')
    if(filtro){
        if (!isNaN(filtro)) {
            url = `http://localhost:3000/api/pacientes/${filtro}`;
        } else {
            url = `${url}?propietario=${filtro}`;
        }
    }

    const res = await fetch(url)
    const data = await res.json()
    console.log(data);

    $tbody.innerHTML = ''

    if (Array.isArray(data)) {
        data.forEach(e => {
            $tbody.innerHTML += `
                <tr>
                    <td>${e.IdPaciente}</td>
                    <td>${e.NombreMascota}</td>
                    <td>${e.Propietario}</td>
                    <td>${e.Telefono}</td>
                </tr>
            `
        });

    } else {
    $tbody.innerHTML += `
            <tr>
                <td>${data.IdPaciente}</td>
                <td>${data.NombreMascota}</td>
                <td>${data.Propietario}</td>
                <td>${data.Telefono}</td>
            </tr>
        `
    };
}

