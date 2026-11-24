import React, {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form'



export default function DeudoresRegistro({onVolver}) {


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const onSubmit = async (datos) => {
        try {
            const ajuste = {
                nombreApellido: datos.nombre,
                importe: datos.deuda,
                fechaDeuda: datos.fecha,
            }
            const {data} = await axios.post('http://localhost:3000/deudores', ajuste)
            if(data) {
                alert('Se guardo el deudor con exito!!')
                onVolver()
            }
        } catch (error) {
            console.log('Error al cargar el deudor: ', error)
        }  
    }


    return(
        <div>
            <h3> Registrar deudor</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>Nombre del deudor (*)</label>
                    <input type="text" {...register('nombre' , {required: true})} className="form-control"/>
                    {errors.nombre && <span className="text-danger">Campo obligatorio</span>}
                </div>

                <div className="form-group">
                    <label>Fecha de deuda (*)</label>
                    <input type="date" {...register('fecha' , {required: true})} className="form-control"/>
                    {errors.fecha && <span className="text-danger">Campo obligatorio</span>}
                </div>

                <div className="form-group">
                    <label>Importe de deuda (*)</label>
                    <input type="number" {...register('deuda' , {required: true})} className="form-control"/>
                    {errors.deuda && <span className="text-danger">Campo obligatorio</span>}
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>

            </form>
            <button onClick={onVolver} className="btn btn-secondary">Volver al listado</button>
        </div>
    )
}