import React from 'react'
import { Link } from 'react-router-dom'

export default function Principal() {
    return (
        <div>
            <h3>Propueta de Parcial II</h3>
            <Link className='btn btn-primary' to='/ajuste'>Ajustes</Link>
        </div>
    )
}
