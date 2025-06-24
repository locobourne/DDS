import axios from 'axios'
import { useState } from 'react'

export default function Tabla({ setAccion, items, setItems, setItem }) {
    const [filtro, setFiltro] = useState('')

    //Manejadores de eventos:
    const handleNuevoClick = () => {
        setAccion('A')
    }

    const handleEditarClick = (item) => {
        setItem(item)
        setAccion('M')
    }



    const getTipo = (codigo) => {
        const tipos = [
            { id: 1, descripcion: 'Aceites' },
            { id: 2, descripcion: 'Respuestos' },
            { id: 3, descripcion: 'Insumos Maquinaria' },
            { id: 4, descripcion: 'Aceites' }
        ]
        return tipos[codigo - 1].descripcion
    }

    const handleFiltrarClick = async () => {
        try {
            let url = 'http://localhost:4000/productos/'
            if (filtro) {
                url = url + filtro
            }
            console.log(url)
            const { data } = await axios.get(url);
            setItems(data)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }

    }
    const handleFiltrarChange = (e) => { setFiltro(e.target.value) }

    return (
        <>
            <div className="card shadow-sm py-1 mt-5">
                <div className="card-body">
                    <form className="row g-2 align-items-center">
                        <div className="col-md-11">
                            <input
                                type="text"
                                onChange={handleFiltrarChange} //sincronizar el estado filtro con el input
                                className="form-control"
                                placeholder="Buscar productos por nombre..."
                                name="filtro"
                            />
                        </div>
                        <div className="col-md-1">
                            <button onClick={handleFiltrarClick} type="button" className="btn btn-primary w-100">
                                Filtrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table table-striped container-xl mt-3">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Marca</th>
                        <th scope="col">A reponer</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        items.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.nombre}</td>
                                    <td>{getTipo(e.tipo)}</td>
                                    <td>{e.precio || 0}</td>
                                    <td>{e.marca}</td>
                                    <td>{!e.a_reponer ? 'NO' : 'SI'}</td>
                                    <td><button onClick={() => { handleEditarClick(e) }} className='btn btn-primary'>Editar</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button onClick={handleNuevoClick} className='btn btn-success'>Nuevo</button>
        </>
    )
}
