import React from "react";
import {Link} from 'react-router-dom'


export default function Menu() {
    return (
        <div>
            <h3>Menu de deudores</h3>
            <Link className="btn btn-primary" to='/deudores'>Deudores</Link>
        </div>
    )
}


