import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'
import axios from 'axios'


export default function Registro({onReserva}) {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = async (datos) => {
        try {
            const ajuste  = {
                Dni: datos.dni,
                FechaIngreso: datos.ingreso,
                FechaSalida: datos.salida,
                TipoEstadia: datos.estadia,
                Huespedes: datos.huespedes,
            }
            const {data} = await axios.post('http://localhost:3001/reservas', ajuste)
            if (data) {
                alert('Huesped cargado al sistema!!')
                onReserva()
            }
        } catch (error) {
            console.log('Error al cargar al huesped: ', error)
        }
    }

    return(
        <div>
            <h3>Registrar un huesped</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>Fecha de ingreso</label>
                    <input type="date" {...register('ingreso', {required:true})} className="form-control"></input>
                    {errors.ingreso && <span className="text-danger">Campo Obligatorio</span>}
                </div>

                <div className="form-group">
                    <label>Fecha de egreso</label>
                    <input type="date" {...register('salida', {required:true})} className="form-control"></input>
                    {errors.salida && <span className="text-danger">Campo Obligatorio</span>}
                </div>

                <div className="form-group">
                    <label>DNI reserva</label>
                    <input type="number" {...register('dni', {required:true})} className="form-control"></input>
                    {errors.dni && <span className="text-danger">Campo Obligatorio</span>}
                </div>

                <div className="form-group">
                    <label>Tipo de estadia</label>
                    <input type="text" {...register('estadia', {required:true})} className="form-control"></input>
                    {errors.estadia && <span className="text-danger">Campo Obligatorio</span>}
                </div>

                <div className="form-group">
                    <label>Numero de huespedes</label>
                    <input type="number" {...register('huespedes', {required:true})} className="form-control"></input>
                    {errors.huespedes && <span className="text-danger">Campo Obligatorio</span>}
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>

            </form>
            <Link className="btn btn-secondary" to='/'>Volver</Link>
        </div>
    )
}