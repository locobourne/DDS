import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarAjuste() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    cargarProductos()
    cargarAjuste()
  }, [])

  const cargarProductos = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/productos')
      setProductos(data)
    } catch (error) {
      console.log('Error al cargar productos:', error)
    }
  }

  const cargarAjuste = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/ajustes`)
      const ajuste = data.find((a) => a.Id === Number(id))
      if (!ajuste) {
        alert("Ajuste no encontrado")
        navigate('/consulta')
        return
      }
      setValue('prod', ajuste.Producto_id)
      setValue('fecha', ajuste.Fecha.slice(0, 10))
      setValue('cantidad', ajuste.CantidadAjuste)
      setValue('motivo', ajuste.Motivo)
    } catch (error) {
      console.log('Error al cargar ajuste:', error)
    }
  }

  const onSubmit = async (datos) => {
    try {
      const ajusteEditado = {
        Producto_id: Number(datos.prod),
        Fecha: datos.fecha,
        Motivo: datos.motivo || '',
        Cantidad: Number(datos.cantidad)
      }

      await axios.put(`http://localhost:3001/ajustes/${id}`, ajusteEditado)
      alert("Ajuste actualizado")
      navigate('/consulta')
    } catch (error) {
      console.log('Error al actualizar ajuste:', error)
      alert("Error al actualizar ajuste")
    }
  }

  return (
    <div>
      <h5>Editar Ajuste</h5>
      <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: 300 }}>
        <div className="form-group">
          <label>Producto (*)</label>
          <select {...register('prod', { required: true })} className="form-control">
            <option value="">-- Seleccione un producto --</option>
            {productos.map((p) => (
              <option key={p.Id} value={p.Id}>
                {p.Nombre} [Stock: {p.Stock}]
              </option>
            ))}
          </select>
          {errors.prod && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="form-group">
          <label>Fecha (*)</label>
          <input type="date" {...register('fecha', { required: true })} className="form-control" />
          {errors.fecha && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="form-group">
          <label>Cantidad (*)</label>
          <input type="number" {...register('cantidad', { required: true })} className="form-control" />
          {errors.cantidad && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="form-group">
          <label>Motivo</label>
          <input type="text" {...register('motivo')} className="form-control" />
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-success">Guardar Cambios</button>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate('/consulta')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
