import { useState } from "react";
import RegistroReserva from './RegistroReserva'
import Consulta from "./Consulta";


export default function Registro() {

    const [estado, setEstado] = useState('R')

    return(
        <div>
            {estado === 'R' && <RegistroReserva onReserva={() => setEstado('C')} />}
            {estado === 'C' && <Consulta/>}            
        </div>
    )
}