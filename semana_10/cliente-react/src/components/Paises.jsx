export default function Paises({onPaisChanged}) {
  
    const paises = [
    { nombre: 'Seleccione un país', },
    { nombre: 'Argentina', id: 54 },
    { nombre: 'Brasil', id: 55 },
    { nombre: 'Bolivia', id: 591 },
    { nombre: 'Chile', id: 56 },
    { nombre: 'Colombia', id: 57 },
    { nombre: 'Ecuador', id: 593 },
    { nombre: 'Mexico', id: 52 },
    { nombre: 'Peru', id: 51 },
    { nombre: 'Paraguay', id: 595 },
    { nombre: 'Uruguay', id: 598 },
    { nombre: 'Venezuela', id: 58}]
  
    const opciones = paises.map(pais =>
        <option value={pais.id}>
            {pais.nombre}
        </option>
    );

    return (
        <>
            <select id="selectPaises" name="selectPaises" onChange={onPaisChanged}>
                {opciones}
            </select>
        </>
    )
}
