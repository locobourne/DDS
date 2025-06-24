import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'



export default function Actualizador({ setAccion, item, onGuardar }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({})

    const onSubmit = (data)=>{ //callback que se ejecuta en el evento onSubmit
        onGuardar(data)
    }

    const handleCancelarClick = ()=>{
        setAccion('C')
    }
    useEffect(()=>{
        console.log(item.tipo)
        reset(item)
    }, [])

   

    return (
        <div className=' mt-3'>
            <h5>Editar producto</h5>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: 500 }}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register('nombre', { required: 'Nombre es requerido' })}
                    />
                    {errors.nombre && (<p className='text-danger'>{errors.nombre.message}</p>)}
                </div>
                <div className="form-group">
                    <label>Tipo</label>
                    <select
                        {...register('tipo', { required: 'Tipo es requerido' })}
                        className='form-control'>
                        <option value={1}>Aceites</option>
                        <option value={2}>Respuestos</option>
                        <option value={3}>Insumos Maquinaria</option>
                        <option value={4}>Varios</option>
                    </select>
                    {errors.tipo && (<p className='text-danger'>{errors.tipo.message}</p>)}
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        {...register('precio', { required: 'Precio es requerido' })}
                        type="number"
                        className="form-control" />
                    {errors.precio && (<p className='text-danger'>{errors.precio.message}</p>)}
                </div>
                <div className="form-group">
                    <label>Marca</label>
                    <input
                        {...register('marca')}
                        type="text"
                        className="form-control" ></input>
                </div>
                <div className="form-group">
                    <label>Para reponer?</label>
                    <select
                        {...register('a_reponer', { required: 'A reponer es requerido!' })}
                        className='form-control'>
                        <option value={true}>SI</option>
                        <option value={false}>NO</option>
                    </select>
                    {errors.aReponer && (<p className='text-danger'>{errors.aReponer.message}</p>)}
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-primary'>Aceptar</button>
                    <button onClick={handleCancelarClick} className='btn btn-secondary'>Cancelar</button>
                </div>
            </form>

        </div>
    )
}
