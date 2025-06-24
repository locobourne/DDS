import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Consulta({}) {

    const [huespedes, setHuespedes] = useState([])

    useEffect(() =>{
        cargarHuespedes()
    }, [])

    const cargarHuespedes = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/reservas')
            setHuespedes(data)
        } catch (error) {
            console.log('Error al cargar huespedes: ', error);
        }
    }

    return(
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Fecha de ingreso</th>
                        <th>Fecha de salida</th>
                        <th>Tipo de servicio</th>
                        <th>Huespedes</th>
                    </tr>
                </thead>
                <tbody>
                    {huespedes.map((e,i) => (
                        <tr key={i}>
                            <td>{e.Dni}</td>
                            <td>{e.FechaIngreso}</td>
                            <td>{e.FechaSalida}</td>
                            <td>{e.TipoEstadia}</td>
                            <td>{e.Huespedes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="btn btn-secondary" to='/'>Volver</Link>
        </div>
    )
}