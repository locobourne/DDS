// AjusteStock.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form' // 👈 Hook de formularios

export default function AjusteStock() {
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()

  // 🎯 Hook de React Hook Form
  const {
    register,         // para registrar campos del formulario
    handleSubmit,     // para manejar el envío
    formState: { errors } // errores de validación
  } = useForm()

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/productos')
      setProductos(data)
    } catch (error) {
      console.log('Error al cargar los productos: ', error)
    }
  }

  const onSubmit = async (datos) => {
    try {
      const ajuste = {
        Producto_id: Number(datos.prod),
        Fecha: datos.fecha,
        Motivo: datos.motivo || '',
        Cantidad: Number(datos.cantidad)
      }

      const { data } = await axios.post('http://localhost:3001/ajustes', ajuste)
      if (data) {
        alert('Se grabó el ajuste!')
        navigate('/consulta')
      }
    } catch (error) {
      console.log('Error al registrar el ajuste| ', error)
    }
  }

  return (
    <div>
      <p className='fs-5'><strong>Ajustes de Stock</strong></p>

      {/* 📤 handleSubmit valida y luego ejecuta onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: 300 }}>

        {/* PRODUCTO */}
        <div className="form-group">
          <label>Producto (*)</label>
          <select {...register('prod', { required: true })} className="form-control">
            <option value="">-- Seleccione un producto --</option>
            {productos.map(e =>
              <option key={e.Id} value={e.Id}>{e.Nombre} [Stock: {e.Stock} unid.]</option>
            )}
          </select>
          {errors.prod && <span className="text-danger">Campo obligatorio</span>}
        </div>

        {/* FECHA */}
        <div className="form-group">
          <label>Fecha (*)</label>
          <input type='date' {...register('fecha', { required: true })} className="form-control" />
          {errors.fecha && <span className="text-danger">Campo obligatorio</span>}
        </div>

        {/* CANTIDAD */}
        <div className="form-group">
          <label>Cantidad (*)</label>
          <input type='number' {...register('cantidad', { required: true })} className="form-control" />
          {errors.cantidad && <span className="text-danger">Campo obligatorio</span>}
        </div>

        {/* MOTIVO */}
        <div className="form-group">
          <label>Motivo</label>
          <input type='text' {...register('motivo')} className="form-control" />
        </div>

        {/* BOTONES */}
        <div className="form-group mt-5">
          <button type='submit' className='btn btn-success'>Aceptar</button>
          <Link className='btn btn-secondary mx-1' to='/'>Volver</Link>
        </div>

      </form>
    </div>
  )
}
