import React, {useState, useEffect} from "react";
import axios from 'axios';



export default function DeudoresListado({onAgregar}){
    const [deudores, setDeudores] = useState([])

    useEffect(() =>{
        cargarDeudores()
    }, [])


    const cargarDeudores= async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/deudores')
            setDeudores(data)
        } catch (error) {
            console.log('Error al cargar deudores: ', error)   
        }
    }

    return(
        <div>
            <h3>DEUDORES ACA </h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Apellido y Nombre</th>
                        <th>Fecha deuda</th>
                        <th>Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {deudores.map((e,i) => (
                        <tr key={i}>
                            <td>{e.nombreApellido}</td>
                            <td>{e.fechaDeuda}</td>
                            <td>{e.importe}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onAgregar}>Agregar deudor</button>
        </div>
    )
}