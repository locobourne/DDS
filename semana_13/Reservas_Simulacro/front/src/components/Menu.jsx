import React from "react";
import { Link } from "react-router-dom";



export default function Menu() {
    return(
        <div>
            <Link className="btn btn-primary" to='/registro'> Registrar Huesped</Link>
        </div>
    )
}