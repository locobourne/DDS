import React, { useEffect, useState } from 'react'
//import Tabla from './Tabla'
//import Filtro from './Filtro'

export default function Consulta() {
    const [filas, setFilas] = useState([])

    useEffect(() => {
        const data = consultarDatos()
        setFilas(data)
    }, [])

    const filtrar = (filtro) => {
        const filtradas = filas.filter((x) => {
            return x.nombre.includes(filtro)
        })
        setFilas(filtradas)
    }


    const consultarDatos = () => {
        return [
            { codigo: 1, nombre: 'TEST', marca: 'Acme', stock: 20 },
            { codigo: 2, nombre: 'TEST 2', marca: 'Acme', stock: 0 },
            { codigo: 3, nombre: 'TEST 3', marca: 'Acme', stock: 5 }
        ]
    }
    return (
        <div className='container'>
            {/*<Filtro consultar={filtrar}></Filtro>
            <Tabla filas={filas}></Tabla>*/}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {consultarDatos().map((e, i)=>{
                        return (
                            <tr key={i}>
                               <td>{e.codigo}</td>
                               <td>{e.nombre}</td>
                               <td>{e.marca}</td>
                               <td>{e.stock}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}
