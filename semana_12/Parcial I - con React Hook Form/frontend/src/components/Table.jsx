import axios from 'axios'
import { useState } from 'react'


export default function Table({setModo, filas, setFilas}) {
    const [filtro, setFiltro] = useState('')


    const handleNuevoClick = ()=>{
        setModo('A')
    }

    const handleFiltrarClick = async() =>{
        const URL_BASE = 'http://localhost:4000/productos/'
        let url = URL_BASE
        
        if(filtro){
            url = `${URL_BASE}${filtro}` //http://localhost:4000/productos/filtro
            //url = `${URL_BASE}?filtro=${filtro}` //http://localhost:4000/productos/?filtro=valor
        }
        const {data} = await axios.get(url)
        setFilas(data)
    }

    return (
        <div className="container" style={{ marginTop: 70 }}>
            <div className="card shadow-sm py-1">
                <div className="card-body">
                    <form className="row g-2 align-items-center">
                        <div className="col-md-11">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar productos por nombre..."
                                onChange={(e)=>{
                                   setFiltro(e.target.value)
                                }}
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
                    </tr>
                </thead>
                <tbody>
                    {
                       filas.length > 0 && (
                            filas.map((item, i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{item.nombre}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.precio}</td>
                                        <td>{item.marca}</td>
                                        <td>{item.a_reponer ==='N'?'NO': 'SI'}</td>
                                    </tr>
                                )
                            })
                       )     
                    }
                    {
                        filas.length === 0 && (
                            <tr>
                                <td colSpan={5}>
                                    <p>Sin resultados</p>
                                </td>
                            </tr>
                        )
                    }   
                </tbody>
            </table>
            <button onClick={handleNuevoClick} className="btn btn-success mt-5">Nuevo</button>
        </div>

    )
}