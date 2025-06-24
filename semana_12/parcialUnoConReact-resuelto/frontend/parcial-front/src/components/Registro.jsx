import React, { useState } from 'react'
import axios from 'axios'
export default function Registro({ setAccion }) {
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState(1)
    const [precio, setPrecio] = useState(0)
    const [marca, setMarca] = useState('')
    const [reponer, setReponer] = useState(false)
    
    const handleAceptarClick = async() => {
        
        const data = {
            nombre: nombre,
            tipo: parseInt(tipo),
            precio: parseFloat(precio),
            marca: marca,
            a_reponer: reponer,
        }
       
        const response = await axios.post('http://localhost:4000/productos', data)
        if(response.status === 200){
            alert('Registrado con exito')
            setAccion('C')
        }

    }
    const handleCancelarClick = () => {
        setAccion('C')
    }
    return (
        <div className=' mt-3'>
            <h5>Nuevo producto</h5>
            <form  style={{width: 500}}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input onChange={e=>setNombre(e.target.value)} type="text" className="form-control" ></input>
                </div>
                <div className="form-group">
                    <label>Tipo</label>
                    <select onChange={e=>setTipo(e.target.value)} className='form-control'>
                        <option value={1}>Aceites</option>
                        <option value={2}>Respuestos</option>
                        <option value={3}>Insumos Maquinaria</option>
                        <option value={4}>Varios</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input onChange={e=>setPrecio(e.target.value)} type="number" className="form-control" ></input>
                </div>
                <div className="form-group">
                    <label>Marca</label>
                    <input onChange={e=>setMarca(e.target.value)} type="text" className="form-control" ></input>
                </div>
                <div className="form-group">
                    <label>Para reponer?</label>
                    <select  value={reponer ? "1" : "0"} onChange={e=>setReponer(e.target.value === "1")} className='form-control'>
                        <option value="1">SI</option>
                        <option value="0">NO</option>
                    </select>
                </div>
            </form>
            <div className="form-group">
                <button onClick={handleAceptarClick} className='btn btn-primary'>Aceptar</button>
                <button onClick={handleCancelarClick} className='btn btn-secondary'>Cancelar</button>
            </div>
        </div>
    )
}
