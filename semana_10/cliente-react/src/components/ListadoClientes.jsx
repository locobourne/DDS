export default function ListadoClientes({clientes}) {
    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Apellido</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">País</th>
                        <th scope="col">Código de país</th>
                        <th scope="col">Numero de teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente, index) => (
                    <tr key={index}>
                        <td>{cliente.apellido}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.pais}</td>
                        <td>{cliente.codigo}</td>
                        <td>{cliente.numeroTelefono}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}