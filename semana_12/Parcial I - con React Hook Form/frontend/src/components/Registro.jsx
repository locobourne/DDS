import React, { useState } from 'react'

export default function Registro({ setModo, onSave }) {
    const [nombre, setNombre] = useState('')
    const [marca, setMarca] = useState('')
    const [tipo, setTipo] = useState('')
    const [precio, setPrecio] = useState('')
    const [aReponer, setAReponer] = useState('')
    
    const handleCancelClick = () => {
        setModo('C')
    }
    const handleSaveClick = () => {
        //TODO:
        onSave({
            nombre: nombre,
            marca: marca,
            tipo: tipo,
            precio: precio,
            a_reponer: aReponer
        })
    }

    return (
        <div className='container mt-5'>
            <h5>Nuevo producto</h5>
            <form>
                <div className="form-group">
                    <label>Nombre</label>
                    <input onChange={(e)=>{setNombre(e.target.value)}} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label >Tipo</label>
                    <input onChange={(e)=>{setTipo(e.target.value)}} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label >Marca</label>
                    <input onChange={(e)=>{setMarca(e.target.value)}} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input onChange={(e)=>{setPrecio(e.target.value)}} type="number" className="form-control" />
                </div>
                <div className="form-group">
                    <label >A reponer</label>
                    <input onChange={(e)=>{setAReponer(e.target.value)}} type="text" className="form-control" />
                </div>

                <div className="form-group mt-2">
                    <button onClick={handleSaveClick} className='btn btn-primary'>Aceptar</button>
                    <button onClick={handleCancelClick} className='btn btn-secondary'>Cancelar</button>
                </div>
            </form>
        </div>
    )
}
