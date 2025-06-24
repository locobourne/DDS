// ConsultaAjustes.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ConsultaAjustes() {
  const [ajustes, setAjustes] = useState([])

  useEffect(() => {
    cargarAjustes()
  }, [])

  const cargarAjustes = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/ajustes')
      setAjustes(data)
    } catch (error) {
      console.log('Error al cargar los ajustes: ', error)
    }
  }

  return (
    <div>
      <h5>Consulta de Ajustes</h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {ajustes.map((e, i) => (
            <tr key={i}>
              <td>{e.Producto_id}</td>
              <td>{new Date(e.Fecha).toLocaleDateString("es-AR")}</td>
              <td>{e.Cantidad}</td>
              <td>{e.Motivo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='btn btn-secondary mx-1' to='/'>Volver</Link>
    </div>
  )
}
