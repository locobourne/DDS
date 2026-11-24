import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function ConsultaAjustes() {
  const [ajustes, setAjustes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarAjustes();
  }, []);

  const cargarAjustes = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/ajustes');
      setAjustes(data);
    } catch (error) {
      console.log('Error al cargar los ajustes: ', error);
    }
  };

  const eliminarAjuste = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este ajuste?")) return;

    try {
      await axios.delete(`http://localhost:3001/ajustes/${id}`);
      alert("Ajuste eliminado correctamente");
      cargarAjustes(); // Recarga la tabla
    } catch (error) {
      console.log('Error al eliminar el ajuste: ', error);
      alert("Error al eliminar el ajuste");
    }
  };

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ajustes.map((e, i) => (
            <tr key={i}>
              <td>{e.Producto_id}</td>
              <td>{new Date(e.Fecha).toLocaleDateString("es-AR")}</td>
              <td>{e.CantidadAjuste}</td>
              <td>{e.Motivo}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mx-1"
                  onClick={() => navigate(`/editar/${e.Id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => eliminarAjuste(e.Id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='btn btn-secondary mx-1' to='/'>Volver</Link>
    </div>
  );
}
