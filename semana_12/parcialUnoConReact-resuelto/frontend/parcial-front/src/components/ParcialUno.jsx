import { use, useEffect, useState } from "react"
import Registro from "./Registro"
import Tabla from "./Tabla"
import Actualizador from "./Actualizador"
import axios from "axios"

export default function ParcialUno() {
    const [accion, setAccion] = useState('C')
    const [items, setItems] = useState([])
    const [item, setItem] = useState(null)

    const onGuardar = async (data) => {
        try {
            const response = await axios.put(`http://localhost:4000/productos/${item.id}`, data)
            if (response.status === 200) {
                alert('Actualizado con exito')
                setAccion('C')
            }
        } catch (error) {
            alert('Ocurrió un error al actualizar el produto!')
        }

    }
    return (
        <div className="container">
            {accion === 'C' && (<Tabla setAccion={setAccion} items={items} setItems={setItems} setItem={setItem}></Tabla>)}
            {accion === 'A' && (<Registro setAccion={setAccion}></Registro>)}
            {accion === 'M' && (<Actualizador setAccion={setAccion} item={item} onGuardar={onGuardar}></Actualizador>)}
        </div>
    )

}