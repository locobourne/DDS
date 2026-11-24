import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import DeudoresListado from "./DeudoresListado";
import DeudoresRegistro from "./DeudoresRegistro";


export default function Deudores(){
    const [vista, setVista] = useState('listado');


    return(
        <div>
            {vista === 'listado' && <DeudoresListado onAgregar={() => setVista('registro')} />}
            {vista === 'registro' && <DeudoresRegistro onVolver={() => setVista('listado')} />}
        </div>
    )
}